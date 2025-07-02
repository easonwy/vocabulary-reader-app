import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
// VocabularyCard is used by Main component, so it's not directly needed here anymore if Main handles its own imports.
// We can remove it if Main.jsx imports VocabularyCard itself.
// For now, let's assume Main.jsx handles its own VocabularyCard import.

// const HandArrow = () => ( ... ); // Commented out as it's not currently used after refactor

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  const [currentSubject, setCurrentSubject] = useState('breakfast'); // Default subject
  const [vocabularyData, setVocabularyData] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([
    { key: 'breakfast', name: 'Breakfast' },
    { key: 'animals', name: 'Animals' },
    // Add more subjects here or fetch dynamically
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load vocabulary data
  const loadVocabulary = useCallback(async (subjectKey) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/vocabularies/${subjectKey}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${subjectKey}.json: ${response.statusText}`);
      }
      const data = await response.json();
      setVocabularyData(data);
      const subjectConfig = availableSubjects.find(s => s.key === subjectKey);
      if (subjectConfig) {
        // setCurrentSubject(subjectConfig.name); // Set the display name
      }
    } catch (err) {
      console.error("Error loading vocabulary data:", err);
      setError(err.message);
      setVocabularyData([]); // Clear data on error
    } finally {
      setIsLoading(false);
      setActiveIndex(null); // Reset active card index when subject changes
      setIsReading(false); // Reset reading state
      // Safely access properties of startBtnRef.current
      if (startBtnRef.current && typeof startBtnRef.current.disabled === 'boolean') {
        startBtnRef.current.disabled = false;
        if (typeof startBtnRef.current.innerHTML === 'string') {
          startBtnRef.current.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Start Learning
        `;
        }
      }
    }
  }, [availableSubjects, startBtnRef]);
  // Add availableSubjects to dependencies if it can change
  // Load initial vocabulary
  useEffect(() => {
    loadVocabulary(currentSubject);
  }, [currentSubject, loadVocabulary]);

  // Handler for subject change
  const handleSubjectChange = (newSubjectKey) => {
    setCurrentSubject(newSubjectKey);
  };
  // Function to speak text
  const speak = (text) => {
    return new Promise((resolve) => { // Removed reject as it's handled by resolving
      if (!('speechSynthesis' in window)) {
        console.warn('Speech Synthesis not supported by this browser.');
        setTimeout(resolve, 1000); 
        return;
      }
      
      window.speechSynthesis.cancel(); 
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.error('An error occurred during speech synthesis:', e);
        resolve(); // Resolve even on error to continue the sequence
      };
      
      window.speechSynthesis.speak(utterance);
    });
  };

  // Main function to read words aloud
  const startReadingSequence = async () => {
    if (isReading) return;
    setIsReading(true);
    const startBtn = startBtnRef.current;
    // Safely access properties of startBtn
    if (startBtn && typeof startBtn.disabled === 'boolean') {
      startBtn.disabled = true;
      // It's generally safer to avoid direct innerHTML manipulation if possible,
      // but for now, keeping consistent with existing code.
      if (typeof startBtn.innerHTML === 'string') {
        startBtn.innerHTML = 'Learning...';
      }
    }
    const cards = document.querySelectorAll('.food-card');
    for (let i = 0; i < vocabularyData.length; i++) {
      setActiveIndex(i);
      const card = cards[i];
      const word = vocabularyData[i].name;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(res => setTimeout(res, 500));
        card.classList.add('active');
        await speak(word);
        await new Promise(res => setTimeout(res, 200));
        card.classList.remove('active');
        await new Promise(res => setTimeout(res, 300));
      }
    }
    setActiveIndex(null);
    setIsReading(false);
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Start Again
      `;
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (isReading && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading]);

  // Show all words initially if not reading
  useEffect(() => {
    if (!isReading) setActiveIndex(null);
  }, [isReading]);

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-[#f0fdf4] cartoon-bg"> {/* Added flex flex-col */}
      <Header currentSubjectName={availableSubjects.find(s => s.key === currentSubject)?.name || 'Vocabulary'} />
      {isLoading && <div className="text-center p-4">Loading vocabulary...</div>}
      {error && <div className="text-center p-4 text-red-500">Error: {error}</div>}
      {!isLoading && !error && vocabularyData.length === 0 && <div className="text-center p-4">No vocabulary items found for this subject.</div>}
      {!isLoading && !error && vocabularyData.length > 0 && (
        <Main
          // breakfastItems prop should be renamed to vocabularyItems or similar
          vocabularyItems={vocabularyData} // Pass the dynamic vocabulary data
          activeIndex={activeIndex}
          isReading={isReading}
          gridRef={gridRef}
          setActiveIndex={setActiveIndex}
        />
      )}
      <Footer
        startReadingSequence={startReadingSequence}
        startBtnRef={startBtnRef}
        availableSubjects={availableSubjects}
        currentSubjectKey={currentSubject}
        onSubjectChange={handleSubjectChange}
        isReading={isReading} // Pass isReading to potentially disable dropdown during reading
      />
    </div>
  );
};

export default App;
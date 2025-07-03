import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import ControlPanel from './components/ControlPanel';

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  const [currentSubject, setCurrentSubject] = useState('breakfast'); // Default subject
  const [speechRate, setSpeechRate] = useState(1.0);
  const [vocabularyData, setVocabularyData] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([
    { key: 'breakfast', name: 'Breakfast' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'chinese-food', name: 'Chinese Food' },
    { key: 'kitchen', name: 'Kitchen' },
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
    } catch (err) {
      console.error("Error loading vocabulary data:", err);
      setError(err.message);
      setVocabularyData([]); // Clear data on error
    } finally {
      setIsLoading(false);
      setActiveIndex(null);
      setIsReading(false);
      if (startBtnRef.current) {
        startBtnRef.current.disabled = false;
      }
    }
  }, [availableSubjects]);

  // Load initial vocabulary
  useEffect(() => {
    loadVocabulary(currentSubject);
  }, [currentSubject, loadVocabulary]);

  // Handler for subject change
  const handleSubjectChange = (newSubjectKey) => {
    setCurrentSubject(newSubjectKey);
  };

  // Handler for speed change
  const handleSpeedChange = (newRate) => {
    setSpeechRate(parseFloat(newRate));
  };

  // Function to speak text
  const speak = (text) => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech Synthesis not supported by this browser.');
        setTimeout(resolve, 1000); 
        return;
      }
      
      window.speechSynthesis.cancel(); 
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
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
    if (startBtnRef.current) {
        startBtnRef.current.disabled = true;
    }

    // Wait before starting reading
    await new Promise(res => setTimeout(res, 5000));

    const cards = document.querySelectorAll('.food-card');
    for (let i = 0; i < vocabularyData.length; i++) {
      if (!window.speechSynthesis || !isReading) {
        window.speechSynthesis.cancel();
        break;
      }
      setActiveIndex(i);
      const card = cards[i];
      const word = vocabularyData[i].name;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(res => setTimeout(res, 500)); // Time for scroll
        await speak(word);
        await new Promise(res => setTimeout(res, 300)); // Pause before next word
      }
    }
    setActiveIndex(null);
    setIsReading(false);
    if (startBtnRef.current) {
      startBtnRef.current.disabled = false;
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Reset activeIndex when isReading changes to false
  useEffect(() => {
    if (!isReading) {
      setActiveIndex(null);
    }
  }, [isReading]);

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-[#f0fdf4] cartoon-bg">
      <Header currentSubjectName={availableSubjects.find(s => s.key === currentSubject)?.name || 'Vocabulary'} />

      {/* Main content area: flex-col on small screens, md:flex-row on medium and up */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Column: Playground (Vocabulary Grid) */}
        <div className="flex-1 overflow-y-auto p-4"> {/* Takes available space */}
          {isLoading && <div className="text-center p-4">Loading vocabulary...</div>}
          {error && <div className="text-center p-4 text-red-500">Error: {error}</div>}
          {!isLoading && !error && vocabularyData.length === 0 && (
            <div className="text-center p-4">No vocabulary items found for this subject.</div>
          )}
          {!isLoading && !error && vocabularyData.length > 0 && (
            <Main
              vocabularyItems={vocabularyData}
              activeIndex={activeIndex}
              isReading={isReading}
              gridRef={gridRef}
              setActiveIndex={setActiveIndex} // setActiveIndex is used by Main to set active card on click
            />
          )}
        </div>

        {/* Right Column: Control Panel */}
        {/* On small screens, border-t. On md screens, border-l. */}
        <div className="p-4 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto">
          <ControlPanel
            startReadingSequence={startReadingSequence}
            startBtnRef={startBtnRef}
            availableSubjects={availableSubjects}
            currentSubjectKey={currentSubject}
            onSubjectChange={handleSubjectChange}
            isReading={isReading}
            speechRate={speechRate} // Pass speechRate
            onSpeedChange={handleSpeedChange} // Pass handler
          />
        </div>
      </div>
    </div>
  );
};

export default App;
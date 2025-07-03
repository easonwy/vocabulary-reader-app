import React, { useEffect, useRef, useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import Playground from './components/Playground';

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  const [currentSubject, setCurrentSubject] = useState('breakfast'); // Default subject
  const [speechRate, setSpeechRate] = useState(1.0);
  const [vocabularyData, setVocabularyData] = useState([]);
  const [textOverlay, setTextOverlay] = useState(''); // State for text overlay
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
  const [countdownValue, setCountdownValue] = useState(null); // For 3, 2, 1 countdown
  const [textOverlayPosition, setTextOverlayPosition] = useState('bottom'); // State for overlay position

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

  // Handler for text overlay change
  const handleTextOverlayChange = (newText) => {
    setTextOverlay(newText);
  };

  // Handler for text overlay position change
  const handleTextOverlayPositionChange = (newPosition) => {
    setTextOverlayPosition(newPosition);
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
    if (isReading || countdownValue) return; // Prevent starting if already reading or counting down

    // Start countdown
    setCountdownValue(3);
    await new Promise(res => setTimeout(res, 1000));
    setCountdownValue(2);
    await new Promise(res => setTimeout(res, 1000));
    setCountdownValue(1);
    await new Promise(res => setTimeout(res, 1000));
    setCountdownValue(null); // Clear countdown

    setIsReading(true);
    if (startBtnRef.current) {
        startBtnRef.current.disabled = true;
    }

    // Original delay before actual reading of cards (can be removed if countdown is enough)
    // await new Promise(res => setTimeout(res, 5000));
    // For now, let's remove this extra delay as the countdown serves as preparation time.

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
      {/* Header is now part of Playground, so no direct rendering here */}

      {/* Main content area: flex-col on small screens, md:flex-row on medium and up */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Column: Playground */}
        <div className="flex-1 overflow-y-auto bg-gray-700"> {/* Playground will control its own padding & background */}
          <Playground
            currentSubjectName={availableSubjects.find(s => s.key === currentSubject)?.name || 'Vocabulary'}
            vocabularyItems={vocabularyData}
            activeIndex={activeIndex}
            isReading={isReading}
            gridRef={gridRef}
            setActiveIndex={setActiveIndex}
            isLoading={isLoading}
            error={error}
            textOverlay={textOverlay}
            countdownValue={countdownValue}
            textOverlayPosition={textOverlayPosition} // Pass position to Playground
          />
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
            speechRate={speechRate}
            onSpeedChange={handleSpeedChange}
            textOverlay={textOverlay} // Pass textOverlay to ControlPanel
            onTextOverlayChange={handleTextOverlayChange} // Pass handler to ControlPanel
          />
        </div>
      </div>
    </div>
  );
};

export default App;
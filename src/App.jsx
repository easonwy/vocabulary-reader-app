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
  const [cardsPerRow, setCardsPerRow] = useState(2); // State for words per row, default 2

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
      console.log("JULES_DEBUG: loadVocabulary's finally block. Current isReading val:", isReading, "Countdown val:", countdownValue); // Added log
      // setIsReading(false); // Temporarily commented out for diagnostics
      console.log("JULES_DEBUG: loadVocabulary's finally block. setIsReading(false) was TEMPORARILY COMMENTED OUT.");
      if (startBtnRef.current) {
        startBtnRef.current.disabled = false;
      }
    }
  }, [availableSubjects, countdownValue, isReading]); // Added countdownValue and isReading to dependencies for logging accuracy, though they don't influence the core logic of loadVocabulary itself.

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

  // Handler for cards per row change
  const handleCardsPerRowChange = (newCount) => {
    const count = parseInt(newCount, 10);
    if (count > 0 && count <= 10) { // Example validation: 1 to 10 cards
      setCardsPerRow(count);
    }
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

    console.log("JULES_DEBUG: Sequence phase: setIsReading(true) called.");
    console.log("JULES_DEBUG: Vocabulary data length:", vocabularyData.length);
    console.log("JULES_DEBUG: Querying for .food-card elements...");

    // const cards = document.querySelectorAll('.food-card'); // Original position of query
    // console.log("JULES_DEBUG: Number of .food-card elements found (before potential delay if re-added):", cards.length); // Original log

    // Delay removed as per plan step 3 - logs indicated cards were found.
    const cards = document.querySelectorAll('.food-card');
    console.log("JULES_DEBUG: Number of .food-card elements found:", cards.length);


    if (vocabularyData.length === 0) {
      console.log("JULES_DEBUG: No vocabulary data to read. Ending sequence.");
    } else if (cards.length === 0 && vocabularyData.length > 0) {
      console.log("JULES_DEBUG: Vocabulary data exists, but no .food-card elements were found in the DOM. Ending sequence. Check Main.jsx and VocabularyCard.jsx rendering.");
    } else {
      for (let i = 0; i < vocabularyData.length; i++) {
        if (!window.speechSynthesis || !isReading) {
          console.log("JULES_DEBUG: Breaking reading loop. Speech synthesis stopped or isReading is false.");
          window.speechSynthesis.cancel();
          break;
        }
        setActiveIndex(i);
        const card = cards[i]; // Should be safe if cards.length matches vocabularyData.length or is at least i
        const word = vocabularyData[i].name;

        if (card) {
          console.log(`JULES_DEBUG: Reading card ${i}: ${word}`);
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          await new Promise(res => setTimeout(res, 500)); // Time for scroll
          await speak(word);
          await new Promise(res => setTimeout(res, 300)); // Pause before next word
        } else {
          // This case should ideally not be reached if cards.length > 0 and matches vocabularyData.length
          console.log(`JULES_DEBUG: Card element not found for index ${i}, word: ${word}. This might indicate a mismatch between vocabularyData and rendered cards.`);
        }
      }
    }
    console.log("JULES_DEBUG: Reading loop finished or bypassed.");
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

  useEffect(() => {
    console.log("JULES_DEBUG: isReading state CHANGED to:", isReading);
  }, [isReading]);

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-[#f0fdf4] cartoon-bg">
      {/* Header is now part of Playground, so no direct rendering here */}

      {/* Main content area: flex-col on small screens, md:flex-row on medium and up */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Column: Playground wrapper - for centering the Playground component */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-1 bg-gray-800">
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
            textOverlayPosition={textOverlayPosition}
            cardsPerRow={cardsPerRow} // Pass cardsPerRow to Playground
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
            isReading={isReading || !!countdownValue} // Correctly disable controls if reading or counting down
            speechRate={speechRate}
            onSpeedChange={handleSpeedChange}
            textOverlay={textOverlay}
            onTextOverlayChange={handleTextOverlayChange}
            textOverlayPosition={textOverlayPosition}
            onTextOverlayPositionChange={handleTextOverlayPositionChange}
            cardsPerRow={cardsPerRow}
            onCardsPerRowChange={handleCardsPerRowChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
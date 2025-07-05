import React, { useEffect, useRef, useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import Playground from './components/Playground';

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const isReadingRef = useRef(isReading); // Ref to track isReading status immediately
  const [activeIndex, setActiveIndex] = useState(null);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  const [currentSubject, setCurrentSubject] = useState('breakfast'); // Default subject
  const [speechRate, setSpeechRate] = useState(1.0);
  const [vocabularyData, setVocabularyData] = useState([]);
  const [textOverlay, setTextOverlay] = useState(''); // State for text overlay
  const [availableSubjects] = useState([
    { key: 'breakfast', name: 'Breakfast' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'chinese-food', name: 'Chinese Food' },
    { key: 'kitchen', name: 'Kitchen' },
    { key: 'animals', name: 'Animals' },
    { key: 'living-room', name: 'Living Room' }, 
    { key: 'bedroom', name: 'Bedroom' }, 
    // Add more subjects here or fetch dynamically
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdownValue, setCountdownValue] = useState(null); // For 3, 2, 1 countdown
  const [textOverlayPosition, setTextOverlayPosition] = useState('bottom'); // State for overlay position
  const [cardsPerRow, setCardsPerRow] = useState(2); // State for words per row, default 3
  const [currentTheme, setCurrentTheme] = useState('theme-default'); // State for current theme
  // const [showScrollbar, setShowScrollbar] = useState(false); // Removed
  const [headerPosition, setHeaderPosition] = useState('top'); // 'top' or 'bottom'
  const [layout, setLayout] = useState('grid'); // 'grid' or 'circular'
  const [activeCardEffect, setActiveCardEffect] = useState('Liner'); // 'Liner' or 'LinerPro'
  const [siteName, setSiteName] = useState('Anna英语充电站'); // State for site name
  const [headerAnimationEffect, setHeaderAnimationEffect] = useState('pulsing-glow'); // Default header animation

  // Function to load vocabulary data
  const loadVocabulary = useCallback(async (subjectKey) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/vocabularies/${subjectKey}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${subjectKey}.json: ${response.statusText}`);
      }
      // Defensive: check content-type before parsing as JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Try to detect if it's an HTML error page (e.g. 404)
        const text = await response.text();
        if (text.trim().startsWith('<!DOCTYPE html>')) {
          throw new Error(
            `File not found or server returned HTML. Please check if /vocabularies/${subjectKey}.json exists.`
          );
        }
        throw new Error(
          `Invalid response format. Expected JSON but got: ${text.slice(0, 100)}`
        );
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
  }, [availableSubjects]); // Corrected dependencies: only availableSubjects

  // Load initial vocabulary
  useEffect(() => {
    loadVocabulary(currentSubject);
  }, [currentSubject, loadVocabulary]);

  // Handler for subject change
  const handleSubjectChange = (input) => {
    // Accepts: event from <select>, string, or subject object
    if (input?.target?.value) {
      setCurrentSubject(input.target.value);
    } else if (typeof input === 'string') {
      setCurrentSubject(input);
    } else if (input?.key) {
      setCurrentSubject(input.key);
    }
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

  // Handler for theme change
  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  // Handler for header position change
  const handleHeaderPositionChange = (newPosition) => {
    setHeaderPosition(newPosition);
  };

  // Handler for layout change
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  // Handler for active card effect change
  const handleActiveCardEffectChange = (newEffect) => {
    setActiveCardEffect(newEffect);
  };

  // Handler for site name change
  const handleSiteNameChange = (newName) => {
    setSiteName(newName);
  };

  // Function to scroll vocabulary grid to top by reloading the current subject
  const scrollToTop = () => {
    console.log('App.jsx - scrollToTop (reload list) called for subject:', currentSubject);
    loadVocabulary(currentSubject);
  };

  // Handler for header animation effect change
  const handleHeaderAnimationEffectChange = (newEffect) => {
    setHeaderAnimationEffect(newEffect);
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

    // Set reading state to true immediately to keep controls disabled
    setIsReading(true);
    isReadingRef.current = true;
    if (startBtnRef.current) {
        startBtnRef.current.disabled = true;
    }

    // Wait for 3 seconds before starting reading
    await new Promise(res => setTimeout(res, 3000));

    const cards = document.querySelectorAll('.food-card');

    if (vocabularyData.length > 0 && cards.length > 0) {
      for (let i = 0; i < vocabularyData.length; i++) {
        if (!window.speechSynthesis || !isReadingRef.current) {
          window.speechSynthesis.cancel();
          break;
        }
        setActiveIndex(i);
        const card = cards[i];
        const word = vocabularyData[i].name;

        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          await new Promise(res => setTimeout(res, 500));
          await speak(word);
          await new Promise(res => setTimeout(res, 300));
        }
      }
    }
    setActiveIndex(null);
    setIsReading(false);
    isReadingRef.current = false;
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
  // and synchronize isReadingRef
  useEffect(() => {
    if (!isReading) {
      setActiveIndex(null);
    }
    isReadingRef.current = isReading;
  }, [isReading]);

  const appRootStyle = currentTheme === 'theme-ios26' ? { backgroundImage: 'var(--app-bg-image)' } : {};
  const appRootClasses = `min-h-screen h-screen flex flex-col overflow-hidden ${currentTheme} ${currentTheme !== 'theme-ios26' ? 'cartoon-bg' : ''}`;

  return (
    <div className={appRootClasses} style={appRootStyle}>
      {/* Main content area: flex-col on small screens, md:flex-row on medium and up */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Column: Playground wrapper */}
        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden p-1 bg-[var(--playground-area-bg)]">
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
            cardsPerRow={cardsPerRow}
            // showScrollbar={showScrollbar} // Removed
            headerPosition={headerPosition}
            layout={layout} // Pass layout state
            activeCardEffect={activeCardEffect} // Pass activeCardEffect
            siteName={siteName} // Pass siteName
          />
        </div>

        {/* Right Column: Control Panel */}
        <div className="w-full md:w-1/2 p-8 bg-[var(--control-panel-bg)] border-t md:border-t-0 md:border-l border-[var(--control-panel-border-color)] overflow-y-auto flex flex-col items-center">
          <ControlPanel
            siteName={siteName}
            onSiteNameChange={handleSiteNameChange}
            startReadingSequence={startReadingSequence}
            startBtnRef={startBtnRef}
            availableSubjects={availableSubjects}
            currentSubjectKey={currentSubject}
            onSubjectChange={handleSubjectChange}
            isReading={isReading || !!countdownValue}
            speechRate={speechRate}
            onSpeedChange={handleSpeedChange}
            textOverlay={textOverlay}
            onTextOverlayChange={handleTextOverlayChange}
            textOverlayPosition={textOverlayPosition}
            onTextOverlayPositionChange={handleTextOverlayPositionChange}
            cardsPerRow={cardsPerRow}
            onCardsPerRowChange={handleCardsPerRowChange}
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            // showScrollbar={showScrollbar} // Removed
            // onScrollbarToggle={handleScrollbarToggle} // Removed
            headerPosition={headerPosition}
            onHeaderPositionChange={handleHeaderPositionChange}
            layout={layout} // Pass layout state
            onLayoutChange={handleLayoutChange} // Pass layout handler
            activeCardEffect={activeCardEffect} // Pass activeCardEffect state
            onActiveCardEffectChange={handleActiveCardEffectChange} // Pass handler
            headerAnimationEffect={headerAnimationEffect} // Pass headerAnimationEffect state
            onHeaderAnimationEffectChange={handleHeaderAnimationEffectChange} // Pass handler
            onScrollToTop={scrollToTop} // Added scrollToTop prop
          />
        </div>
      </div>
    </div>
  );
};

export default App;
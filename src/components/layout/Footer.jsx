import React, { useState, useRef, useEffect } from 'react';

// Use a stylish, highly readable font for vocabulary words
const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

// Simple Chevron Up icon for the trigger tab
const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const Footer = ({
  startReadingSequence,
  startBtnRef: initialStartBtnRef, // Rename to avoid conflict with local ref if needed, or ensure it's used correctly
  availableSubjects,
  currentSubjectKey,
  onSubjectChange,
  isReading
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const leaveTimeoutRef = useRef(null);
  const localStartBtnRef = useRef(null); // Local ref for the button inside the panel

  // Effect to potentially assign the passed initialStartBtnRef if it's a callback ref or to manage it
  useEffect(() => {
    if (typeof initialStartBtnRef === 'function') {
      initialStartBtnRef(localStartBtnRef.current);
    } else if (initialStartBtnRef && initialStartBtnRef.hasOwnProperty('current')) {
      initialStartBtnRef.current = localStartBtnRef.current;
    }
  }, [initialStartBtnRef]);


  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    setIsPanelOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsPanelOpen(false);
    }, 300); // 300ms delay before closing
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50" // Outer container for positioning
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Tab - visible when panel is closed */}
      {!isPanelOpen && (
        <div
          className="p-3 bg-amber-500 text-white rounded-t-lg cursor-pointer hover:bg-amber-600 shadow-lg"
          aria-label="Open controls panel" // Added for accessibility
        >
          <ChevronUpIcon />
        </div>
      )}

      {/* Panel Content - slides/fades in */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
                    bg-white p-6 rounded-lg shadow-xl border border-gray-200
                    ${isPanelOpen ? 'opacity-100 translate-y-0 max-h-[500px]' : 'opacity-0 translate-y-full max-h-0 pointer-events-none'}`}
        // Note: translate-y-full might push it too far down if the trigger is also part of this transform origin.
        // Consider adjusting transform origin or using a different initial hidden state if slide-up is desired.
        // For now, this aims for a slide-up from a conceptually "below" position.
      >
        <div className="flex flex-col items-center gap-4"> {/* This div now holds the actual content */}
          <button
            id="start-reading-btn"
            ref={localStartBtnRef} // Use local ref, which is then connected to initialStartBtnRef via useEffect
            onClick={startReadingSequence}
            disabled={isReading}
            className="btn-learn text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center cartoon-btn"
            style={{
              fontFamily: readableFont,
              background: "linear-gradient(90deg,#f59e42 60%,#fbbf24 100%)",
              border: "3px solid #fffbe9",
              boxShadow: "0 4px 16px 0 #f59e42",
            }}
            aria-label="Start Learning"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Learning
          </button>

          <div className="mt-1">
            <label htmlFor="subject-select-footer" className="mr-2 text-gray-700 text-sm" style={{ fontFamily: readableFont }}>
              Subject:
            </label>
            <select
              id="subject-select-footer"
              value={currentSubjectKey}
              onChange={(e) => onSubjectChange(e.target.value)}
              disabled={isReading}
              className="p-2 rounded-md border-2 border-amber-400 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white text-gray-900 text-sm"
              style={{ fontFamily: readableFont, minWidth: '140px' }}
            >
              {availableSubjects && availableSubjects.map(subject => (
                <option key={subject.key} value={subject.key}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-gray-500 text-xs mt-1">
            Tip: Click or press Enter/Space on a card to focus it.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

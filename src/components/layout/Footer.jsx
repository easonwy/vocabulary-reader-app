import React, { useState, useRef, useEffect } from 'react';

// Use a stylish, highly readable font for vocabulary words
const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

// REMOVED: ChevronUpIcon
// const ChevronUpIcon = () => ( ... );

// New Settings Icon
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Footer = ({
  startReadingSequence,
  startBtnRef: initialStartBtnRef,
  availableSubjects,
  currentSubjectKey,
  onSubjectChange,
  isReading
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const leaveTimeoutRef = useRef(null);
  const localStartBtnRef = useRef(null);

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
      className={`fixed bottom-4 right-4 z-50 ${isReading ? 'hidden' : ''}`}
      style={{ pointerEvents: 'none' }} // Prevents accidental blocking of other UI
    >
      {/* Settings Icon absolutely at right-bottom */}
      <button
        type="button"
        className="w-14 h-14 flex items-center justify-center bg-amber-500 text-white rounded-full cursor-pointer hover:bg-amber-600 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75"
        aria-label="Open controls panel"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 60,
          pointerEvents: 'auto'
        }}
        onClick={() => setIsPanelOpen(true)}
        tabIndex={isReading ? -1 : 0}
      >
        <SettingsIcon />
      </button>

      {/* Panel Content */}
      <div
        className={`transition-all duration-300 ease-in-out
                    bg-white p-6 rounded-lg shadow-xl border border-gray-200
                    ${isPanelOpen ? 'opacity-100 translate-y-0 max-h-[500px] pointer-events-auto' : 'opacity-0 translate-y-full max-h-0 pointer-events-none'}`}
        style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(50% + 36px)', // Icon height 56px (14 * 4px), so 28px to edge. Add 8px margin.
          transform: 'translateX(-50%)',
          zIndex: 55,
          minWidth: 260
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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

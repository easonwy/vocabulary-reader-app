import React from 'react';

// Using a similar readable font as was in Footer.jsx
const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const ControlPanel = ({
  startReadingSequence,
  startBtnRef,
  availableSubjects,
  currentSubjectKey,
  onSubjectChange,
  isReading,
  speechRate,     // Renamed from currentSpeed for clarity
  onSpeedChange,
}) => {
  return (
    <div
      // Use Tailwind for responsive width: full width on small screens, md:w-80 on medium and up.
      className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center gap-4 w-full md:w-80"
    >
      <button
        id="start-reading-btn"
        ref={startBtnRef}
        onClick={startReadingSequence}
        disabled={isReading}
        className="btn-learn text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center cartoon-btn w-full"
        style={{
          fontFamily: readableFont,
          background: "linear-gradient(90deg,#f59e42 60%,#fbbf24 100%)",
          border: "3px solid #fffbe9",
          boxShadow: "0 4px 16px 0 #f59e42",
        }}
        aria-label="Start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {isReading ? 'Learning...' : 'Start'}
      </button>

      <div className="mt-1 w-full">
        <label htmlFor="subject-select-panel" className="mr-2 text-gray-700 text-sm block mb-1" style={{ fontFamily: readableFont }}>
          Subject:
        </label>
        <select
          id="subject-select-panel"
          value={currentSubjectKey}
          onChange={(e) => onSubjectChange(e.target.value)}
          disabled={isReading}
          className="p-2 rounded-md border-2 border-amber-400 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white text-gray-900 text-sm w-full"
          style={{ fontFamily: readableFont }}
        >
          {availableSubjects && availableSubjects.map(subject => (
            <option key={subject.key} value={subject.key}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Speed Control */}
      <div className="mt-4 w-full">
        <label htmlFor="speed-control-slider" className="mr-2 text-gray-700 text-sm block mb-1" style={{ fontFamily: readableFont }}>
          Speed: {speechRate ? `${speechRate.toFixed(1)}x` : '1.0x'}
        </label>
        <input
          type="range"
          id="speed-control-slider"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate || 1.0}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          disabled={isReading} // Disable speed changes while reading is in progress
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
        />
        <div className="text-center text-sm text-gray-600 mt-1">
          {/* Speed value is now part of the label */}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

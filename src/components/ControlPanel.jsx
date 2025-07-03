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
  textOverlay,
  onTextOverlayChange,
  textOverlayPosition,
  onTextOverlayPositionChange,
  cardsPerRow,
  onCardsPerRowChange,
}) => {
  const positionOptions = [
    { id: 'pos-top', value: 'top', label: 'Top' },
    { id: 'pos-center', value: 'center', label: 'Center' },
    { id: 'pos-bottom', value: 'bottom', label: 'Bottom' },
  ];

  return (
    <div
      // Use Tailwind for responsive width: full width on small screens, md:w-80 on medium and up.
      className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center gap-4 w-full md:w-80"
    >
      <button
        id="start-reading-btn"
        ref={startBtnRef}
        onClick={startReadingSequence}
        disabled={isReading} // This prop in App.jsx should be (isReading || !!countdownValue)
        className="btn-learn text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center cartoon-btn w-full"
        style={{
          fontFamily: readableFont,
          background: "linear-gradient(90deg,#f59e42 60%,#fbbf24 100%)",
          border: "3px solid #fffbe9",
          boxShadow: "0 4px 16px 0 #f59e42",
        }}
        aria-label="Record"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
        {isReading ? 'Recording...' : 'Record'}
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
          Speed: {speechRate !== undefined ? `${speechRate.toFixed(1)}x` : '1.0x'}
        </label>
        <input
          type="range"
          id="speed-control-slider"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate === undefined ? 1.0 : speechRate}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          disabled={isReading}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
        />
      </div>

      {/* Text Overlay Input */}
      <div className="mt-4 w-full">
        <label htmlFor="text-overlay-input" className="mr-2 text-gray-700 text-sm block mb-1" style={{ fontFamily: readableFont }}>
          Text Overlay:
        </label>
        <input
          type="text"
          id="text-overlay-input"
          value={textOverlay || ''}
          onChange={(e) => onTextOverlayChange(e.target.value)}
          disabled={isReading}
          className="p-2 rounded-md border-2 border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white text-gray-900 text-sm w-full disabled:opacity-50"
          placeholder="Enter text for overlay..."
        />
      </div>

      {/* Text Overlay Position Controls */}
      <div className="mt-4 w-full">
        <label className="mr-2 text-gray-700 text-sm block mb-2" style={{ fontFamily: readableFont }}>
          Overlay Position:
        </label>
        <div className="flex justify-around items-center gap-2">
          {positionOptions.map(option => (
            <label key={option.id} htmlFor={option.id} className="flex items-center text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                id={option.id}
                name="textOverlayPosition"
                value={option.value}
                checked={textOverlayPosition === option.value}
                onChange={() => onTextOverlayPositionChange(option.value)}
                disabled={isReading}
                className="mr-1.5 h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500 disabled:opacity-50"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Cards Per Row Control */}
      <div className="mt-4 w-full">
        <label htmlFor="cards-per-row-input" className="mr-2 text-gray-700 text-sm block mb-1" style={{ fontFamily: readableFont }}>
          Words per Row (1-5):
        </label>
        <input
          type="number"
          id="cards-per-row-input"
          value={cardsPerRow === undefined ? 3 : cardsPerRow}
          onChange={(e) => onCardsPerRowChange(e.target.value)}
          disabled={isReading}
          min="1"
          max="5" // Max 5 for typical phone screen, can be adjusted
          className="p-2 rounded-md border-2 border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white text-gray-900 text-sm w-full disabled:opacity-50"
        />
      </div>
    </div>
  );
};

export default ControlPanel;

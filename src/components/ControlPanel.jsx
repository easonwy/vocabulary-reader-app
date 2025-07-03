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
  currentTheme,
  onThemeChange,
}) => {
  const positionOptions = [
    { id: 'pos-top', value: 'top', label: 'Top' },
    { id: 'pos-center', value: 'center', label: 'Center' },
    { id: 'pos-bottom', value: 'bottom', label: 'Bottom' },
  ];

  return (
    <div
      className="p-6 rounded-lg shadow-xl border flex flex-col items-center gap-4 w-full md:w-80"
      style={{
        backgroundColor: 'var(--control-panel-content-bg)',
        borderColor: 'var(--control-panel-border-color)',
        // The overall font for control panel text can be defined here or inherit from body
        fontFamily: 'var(--font-readable)'
      }}
    >
      <button
        id="start-reading-btn"
        ref={startBtnRef}
        onClick={startReadingSequence}
        disabled={isReading}
        className="text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center w-full cartoon-btn" // Removed btn-learn, text-white is now var
        style={{
          fontFamily: 'var(--button-font-family)', // Using the specific button font
          backgroundImage: 'var(--button-primary-bg-image)',
          borderColor: 'var(--button-primary-border-color)',
          boxShadow: 'var(--button-primary-shadow)',
          color: 'var(--text-button-primary)'
        }}
        aria-label="Record"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
        {isReading ? 'Recording...' : 'Record'}
      </button>

      {/* Generic style for input/select wrappers */}
      {[[
        "Subject:", "subject-select-panel", currentSubjectKey, onSubjectChange, availableSubjects.map(s => ({value: s.key, label: s.name})), "select"
      ],[
        `Speed: ${speechRate !== undefined ? speechRate.toFixed(1) + 'x' : '1.0x'}`, "speed-control-slider", speechRate === undefined ? 1.0 : speechRate, (e) => onSpeedChange(parseFloat(e.target.value)), {min: "0.5", max: "2", step: "0.1"}, "range"
      ],[
        "Text Overlay:", "text-overlay-input", textOverlay || '', (e) => onTextOverlayChange(e.target.value), {placeholder: "Enter text for overlay..."}, "text"
      ],[
        "Words per Row (1-5):", "cards-per-row-input", cardsPerRow === undefined ? 3 : cardsPerRow, (e) => onCardsPerRowChange(e.target.value), {min: "1", max: "5"}, "number"
      ],[
        "Theme:", "theme-select", currentTheme, (e) => onThemeChange(e.target.value), [
          { value: 'theme-default', label: 'Default' },
          { value: 'theme-dark', label: 'Dark Mode' },
          { value: 'theme-playful', label: 'Playful' },
          { value: 'theme-serene', label: 'Serene' },
        ], "select"
      ]].map(([labelContent, id, value, handleChange, optionsOrProps, type]) => (
        <div className="mt-4 w-full" key={id}>
          <label htmlFor={id} className="mr-2 text-sm block mb-1" style={{color: 'var(--text-primary)'}}>
            {labelContent}
          </label>
          {type === "select" ? (
            <select
              id={id}
              value={value}
              onChange={handleChange}
              disabled={isReading}
              className="p-2 rounded-md border-2 shadow-sm text-sm w-full disabled:opacity-[var(--input-disabled-opacity)]"
              style={{
                borderColor: id === 'subject-select-panel' ? 'var(--select-border-color)' : 'var(--input-border-color)',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--input-text-color)',
                fontFamily: 'var(--font-readable)',
                // Tailwind's focus:ring/border doesn't easily accept CSS vars for color, could use JS or more complex CSS if needed
              }}
            >
              {optionsOrProps.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          ) : type === "range" ? (
            <input
              type={type}
              id={id}
              value={value}
              onChange={handleChange}
              disabled={isReading}
              min={optionsOrProps.min}
              max={optionsOrProps.max}
              step={optionsOrProps.step}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:opacity-[var(--input-disabled-opacity)]"
              style={{
                backgroundColor: 'var(--slider-track-bg)',
                accentColor: 'var(--slider-thumb-color)' // For browsers supporting accent-color
              }}
            />
          ) : ( // text, number
            <input
              type={type}
              id={id}
              value={value}
              onChange={handleChange}
              disabled={isReading}
              min={optionsOrProps?.min}
              max={optionsOrProps?.max}
              placeholder={optionsOrProps?.placeholder}
              className="p-2 rounded-md border-2 shadow-sm text-sm w-full disabled:opacity-[var(--input-disabled-opacity)]"
              style={{
                borderColor: 'var(--input-border-color)',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--input-text-color)',
                fontFamily: 'var(--font-readable)'
              }}
            />
          )}
        </div>
      ))}

      {/* Text Overlay Position Controls - Radio buttons need more specific structure */}
      <div className="mt-4 w-full">
        <label className="mr-2 text-sm block mb-2" style={{ color: 'var(--text-primary)' }}>
          Overlay Position:
        </label>
        <div className="flex justify-around items-center gap-2">
          {positionOptions.map(option => (
            <label key={option.id} htmlFor={option.id} className="flex items-center text-sm cursor-pointer" style={{color: 'var(--text-secondary)'}}>
              <input
                type="radio"
                id={option.id}
                name="textOverlayPosition"
                value={option.value}
                checked={textOverlayPosition === option.value}
                onChange={() => onTextOverlayPositionChange(option.value)}
                disabled={isReading}
                className="mr-1.5 h-4 w-4 border-gray-300 disabled:opacity-[var(--input-disabled-opacity)]"
                style={{ accentColor: 'var(--text-accent)'}} // For browsers supporting accent-color
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

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
  // showScrollbar, // Removed
  // onScrollbarToggle, // Removed
  headerPosition,
  onHeaderPositionChange,
  layout, // Added layout prop
  onLayoutChange, // Added onLayoutChange prop
  onScrollToTop, // Added onScrollToTop prop
  activeCardEffect, // Added activeCardEffect prop
  onActiveCardEffectChange, // Added onActiveCardEffectChange prop
  siteName, // Added siteName prop
  onSiteNameChange, // Added onSiteNameChange prop
  // currentTheme is already correctly destructured earlier
}) => {
  // textOverlayPosition options
  const textOverlayPositionOptions = [
    { id: 'pos-top', value: 'top', label: 'Top' },
    { id: 'pos-center', value: 'center', label: 'Center' },
    { id: 'pos-bottom', value: 'bottom', label: 'Bottom' },
  ];

  return (
    <div
      className={`p-8 rounded-lg shadow-xl border flex flex-col gap-6 w-full md:w-[90%] max-w-2xl ${currentTheme === 'theme-ios26' ? 'control-panel-content-bg-glass' : ''}`}
      style={{
        backgroundColor: 'var(--control-panel-content-bg)', // Always use the variable; it's correctly translucent for theme-ios26
        borderColor: 'var(--control-panel-border-color)',
        fontFamily: 'var(--font-readable)'
      }}
    >
      {/* Section 1: Setup / Content */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: 'var(--text-accent)', borderColor: 'var(--control-panel-border-color)' }}>Setup & Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Subject */}
          <div>
            <label htmlFor="subject-select-panel" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Subject:</label>
            <select
              id="subject-select-panel"
            value={currentSubjectKey}
            onChange={onSubjectChange}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--select-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          >
            {availableSubjects.map(s => <option key={s.key} value={s.key}>{s.name}</option>)}
          </select>
        </div>
        {/* Theme */}
        <div>
          <label htmlFor="theme-select" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Theme:</label>
          <select
            id="theme-select"
            value={currentTheme}
            onChange={e => onThemeChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          >
            <option value="theme-default">Default</option>
            <option value="theme-dark">Dark Mode</option>
            <option value="theme-playful">Playful</option>
            <option value="theme-serene">Serene</option>
            <option value="theme-cartoon">Cartoon</option>
            <option value="theme-xiaohongshu">小红书风格</option>
            <option value="theme-ios26">iOS 26 Style</option>
          </select>
        </div>
        {/* Layout */}
        <div>
          <label htmlFor="layout-select" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Layout:</label>
          <select
            id="layout-select"
            value={layout}
            onChange={e => onLayoutChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          >
            <option value="grid">Grid</option>
            <option value="circular">Circular Images</option>
            <option value="no-image">No Image</option>
          </select>
        </div>
        {/* Card Effect */}
        <div>
          <label htmlFor="card-effect-select" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Active Card Effect:</label>
          <select
            id="card-effect-select"
            value={activeCardEffect}
            onChange={e => onActiveCardEffectChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          >
            <option value="Liner">Liner</option>
            <option value="LinerPro">Liner Pro</option>
          </select>
        </div>
        {/* Site Name */}
        <div className="md:col-span-2">
          <label htmlFor="site-name-input" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Site Name:</label>
          <input
            type="text"
            id="site-name-input"
            value={siteName || ''}
            onChange={e => onSiteNameChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
            placeholder="Enter site name..."
          />
        </div>
        </div> {/* End of Setup & Content grid */}
      </div> {/* End of Setup & Content section */}


      {/* Section 2: Reading & Display Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: 'var(--text-accent)', borderColor: 'var(--control-panel-border-color)' }}>Reading & Display</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Speed */}
          <div>
            <label htmlFor="speed-control-slider" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Speed: {speechRate !== undefined ? speechRate.toFixed(1) + 'x' : '1.0x'}</label>
            <input
            type="range"
            id="speed-control-slider"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate === undefined ? 1.0 : speechRate}
            onChange={e => onSpeedChange(parseFloat(e.target.value))}
            disabled={isReading}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--slider-track-bg)',
              accentColor: 'var(--slider-thumb-color)'
            }}
          />
        </div>
        {/* Cards Per Row */}
        <div>
          <label htmlFor="cards-per-row-input" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Words per Row (1-5):</label>
          <input
            type="number"
            id="cards-per-row-input"
            value={cardsPerRow === undefined ? 3 : cardsPerRow}
            onChange={e => onCardsPerRowChange(e.target.value)}
            disabled={isReading}
            min="1"
            max="5"
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          />
        </div>
        {/* Overlay Text */}
        <div className="md:col-span-2">
          <label htmlFor="text-overlay-input" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Overlay Text:</label>
          <input
            type="text"
            id="text-overlay-input"
            value={textOverlay || ''}
            onChange={e => onTextOverlayChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--input-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
            placeholder="Enter text for overlay..."
          />
        </div>
        {/* Overlay Position - Make it span 2 columns */}
        <div className="md:col-span-2">
          <label className="text-sm block mb-2" style={{ color: 'var(--text-primary)' }}>Overlay Position:</label>
          <div className="flex gap-x-4 gap-y-2 flex-wrap"> {/* Added flex-wrap and more gap for better spacing */}
            {["top", "center", "bottom"].map(pos => (
              <label key={pos} className="flex items-center text-sm cursor-pointer" style={{color: 'var(--text-secondary)'}}>
                <input
                  type="radio"
                  name="textOverlayPosition"
                  value={pos}
                  checked={textOverlayPosition === pos}
                  onChange={() => onTextOverlayPositionChange(pos)}
                  disabled={isReading}
                  className="mr-1.5 h-4 w-4"
                  style={{ accentColor: 'var(--text-accent)'}}
                />
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </label>
            ))}
          </div>
        </div>
        {/* Header Position - Changed to Select dropdown and given its own row */}
        <div className="md:col-span-2"> {/* Make this control take a full row on medium screens */}
          <label htmlFor="header-position-select" className="text-sm block mb-1" style={{color: 'var(--text-primary)'}}>Header Position:</label>
          <select
            id="header-position-select"
            value={headerPosition}
            onChange={e => onHeaderPositionChange(e.target.value)}
            disabled={isReading}
            className="p-2 rounded-md border-2 shadow-sm text-sm w-full"
            style={{
              borderColor: 'var(--select-border-color)',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text-color)',
              fontFamily: 'var(--font-readable)'
            }}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="hide">Hide</option>
          </select>
        </div>
        </div> {/* End of Reading & Display Options grid */}
      </div> {/* End of Reading & Display Options section */}

      {/* Actions Section - Buttons in a row */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {/* Start/Record Button */}
        <button
          id="start-reading-btn"
          ref={startBtnRef}
          onClick={startReadingSequence}
          disabled={isReading}
          className={`text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center cartoon-btn flex-1 ${currentTheme === 'theme-ios26' ? 'button-glass' : ''}`}
          style={{
            fontFamily: 'var(--button-font-family)',
            backgroundColor: currentTheme === 'theme-ios26' ? 'var(--button-primary-bg-color)' : undefined, // Use variable for glass, undefined for others to let CSS image take over
            backgroundImage: currentTheme === 'theme-ios26' ? 'none' : 'var(--button-primary-bg-image)',
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

        {/* Refresh Button */}
        <button
          onClick={onScrollToTop}
          disabled={isReading}
          className={`text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex items-center justify-center cartoon-btn flex-1 ${currentTheme === 'theme-ios26' ? 'button-glass' : ''}`}
          style={{
            fontFamily: 'var(--button-font-family)',
            backgroundColor: currentTheme === 'theme-ios26' ? 'var(--button-primary-bg-color)' : undefined, // Use variable for glass, undefined for others to let CSS image take over
            backgroundImage: currentTheme === 'theme-ios26' ? 'none' : 'var(--button-primary-bg-image)',
            borderColor: 'var(--button-primary-border-color)',
            boxShadow: 'var(--button-primary-shadow)',
            color: 'var(--text-button-primary)'
          }}
          aria-label="Refresh List"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

import React from 'react';

// readableFont can be removed if fonts are fully handled by CSS vars
// const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const Header = ({ currentSubjectName, siteName, className, headerPosition }) => { // Added headerPosition prop and siteName
  const mainTitle = (
    <h2
      className="text-2xl tracking-widest"
      style={{
        fontFamily: 'var(--font-display)', // Using general display font
        color: 'var(--header-text-color)' // Explicitly set or inherit
      }}
    >
      {siteName || 'Anna英语充电站'}
    </h2>
  );

  const subjectTitle = (
    <h1
      className="text-4xl font-bold"
      style={{
        fontFamily: 'var(--font-display)', // Using general display font, can be more specific if needed
        color: 'var(--header-text-color)' // Explicitly set or inherit
      }}
    >
      {currentSubjectName || 'Vocabulary'}
    </h1>
  );

  return (
    <header className={`text-center ${className || ''}`}> {/* Apply passed className */}
      <div
        className="inline-block px-6 py-2 rounded-xl shadow-lg" // Removed title-card, text-white. Will use CSS vars.
        style={{
          backgroundColor: 'var(--header-bg)', // Can be transparent or a color
          color: 'var(--header-text-color)', // Default text color for header content
          // fontFamily: 'var(--header-font-family)' // Main font for the header block
        }}
      >
        {headerPosition === 'bottom' ? (
          <>
            {subjectTitle}
            {mainTitle}
          </>
        ) : (
          <>
            {mainTitle}
            {subjectTitle}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

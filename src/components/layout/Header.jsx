import React from 'react';

// readableFont can be removed if fonts are fully handled by CSS vars
// const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const Header = ({ currentSubjectName, siteName, className, headerPosition, headerAnimationEffect }) => {

  const getAnimationClass = (effect) => {
    switch (effect) {
      case 'fade-in':
        return 'header-anim-fade-in';
      case 'breathing':
        return 'header-anim-breathing';
      case 'pulsing-glow':
        return 'header-anim-pulsing-glow';
      case 'slide-up-fade-in':
        return 'header-anim-slide-up-fade-in';
      case 'none':
      default:
        return '';
    }
  };

  const animationClass = getAnimationClass(headerAnimationEffect);

  const mainTitle = (
    <h2
      key={`${siteName}-${headerAnimationEffect}`} // Key to re-trigger animation
      className={`text-2xl tracking-widest ${animationClass}`}
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
      key={`${currentSubjectName}-${headerAnimationEffect}`} // Key to re-trigger animation
      className={`text-4xl font-bold ${animationClass}`}
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

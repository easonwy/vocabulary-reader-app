import React from 'react';
import VocabularyCard from '../VocabularyCard';

const Main = ({ vocabularyItems, activeIndex, isReading, gridRef, setActiveIndex, cardsPerRow, layout, activeCardEffect, currentTheme }) => { // Removed showScrollbar, Added layout, Added activeCardEffect, Added currentTheme
  // Helper: Render a single vocabulary card
  const renderCard = (item, index) => {
    const isActive = activeIndex === index;
    return (
      <VocabularyCard
        key={item.name + '-' + index} // Ensure key is unique, especially if names can repeat across lists
        item={item}
        isActive={isActive}
        index={index}
        onClick={() => {
          if (!isReading) setActiveIndex(index);
        }}
        onKeyDown={e => {
          if (!isReading && (e.key === 'Enter' || e.key === ' ')) setActiveIndex(index);
        }}
        layout={layout} // Pass layout to VocabularyCard
        activeCardEffect={activeCardEffect} // Pass activeCardEffect to VocabularyCard
        currentTheme={currentTheme} // Pass currentTheme to VocabularyCard
      />
    );
  };

  // Dynamically generate grid column class
  // Tailwind needs full class names, so we use a map or switch.
  // Max 5 columns for this example, can be extended.
  const getGridColsClass = (count) => {
    switch (count) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      case 5: return 'grid-cols-5';
      default: return 'grid-cols-3'; // Default to 3 if out of range or undefined
    }
  };
  const gridColsClass = getGridColsClass(cardsPerRow);
  // Changed to always use overflow-auto
  const vocabularyGridClasses = `box-border grid ${gridColsClass} gap-4 md:gap-6 px-4 w-full max-w-[1200px] overflow-auto`; // Changed px-2 to px-4

  return (
    // The main element itself is now just a flex container.
    // Its child, vocabulary-grid, will handle the scrolling.
    // Added an intermediate wrapper for overflow:visible to help with glow effects.
    <main className="flex flex-col items-center flex-grow w-full"> {/* Added w-full to main */}
      <div style={{ overflow: 'visible', width: '100%', display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        {/* This new div allows glow to escape grid bounds if needed, while centering the grid */}
        {/* It also needs to allow the grid to take appropriate width, hence width: 100% and flex properties */}
        <div
          id="vocabulary-grid"
          ref={gridRef} // Keep original ref assignment
          className={vocabularyGridClasses} // Apply dynamic grid class and overflow (overflow-auto is here)
          style={{
            paddingTop: '2rem', // Increased from 1rem
            paddingBottom: '2rem', // Increased from 1rem
            height: '100%'
            // max-width is part of vocabularyGridClasses, so grid won't exceed its defined max-width
          }}
        >
          {vocabularyItems && vocabularyItems.map(renderCard)}
        </div>
      </div>
    </main>
  );
};

export default Main;

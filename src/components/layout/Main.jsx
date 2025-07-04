import React from 'react';
import VocabularyCard from '../VocabularyCard';

const Main = ({ vocabularyItems, activeIndex, isReading, gridRef, setActiveIndex, cardsPerRow, showScrollbar }) => {
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
  const vocabularyGridClasses = `box-border grid ${gridColsClass} gap-4 md:gap-6 px-2 w-full max-w-[1200px] ${showScrollbar ? 'overflow-auto' : 'overflow-hidden'}`;

  return (
    // The main element itself is now just a flex container.
    // Its child, vocabulary-grid, will handle the scrolling.
    <main className="flex flex-col items-center flex-grow">
      <div
        id="vocabulary-grid"
        ref={gridRef} // Keep original ref assignment
        className={vocabularyGridClasses} // Apply dynamic grid class and overflow
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          height: '100%'
        }}
      >
        {vocabularyItems && vocabularyItems.map(renderCard)}
      </div>
    </main>
  );
};

export default Main;

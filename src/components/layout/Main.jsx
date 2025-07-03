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

  return (
    // The main element itself doesn't have much direct styling that needs theming,
    // mostly structure. Its children (cards) will be themed.
    <main className={`flex flex-col items-center flex-grow ${showScrollbar ? 'overflow-auto' : 'overflow-hidden'}`}>
      <div
        id="vocabulary-grid"
        ref={gridRef}
        className={`grid ${gridColsClass} gap-4 md:gap-6 px-2`} // Apply dynamic grid class
        style={{
          paddingTop: '1rem', // These paddings could also become variables if needed
          paddingBottom: '1rem',
          width: '100%',
          maxWidth: 1200
          // maxHeight and overflowY removed
        }}
      >
        {vocabularyItems && vocabularyItems.map(renderCard)}
      </div>
    </main>
  );
};

export default Main;

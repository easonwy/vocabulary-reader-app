import React from 'react';
import VocabularyCard from '../VocabularyCard';

const Main = ({ vocabularyItems, activeIndex, isReading, gridRef, setActiveIndex }) => {
  // Helper: Render a single vocabulary card
  const renderCard = (item, index) => {
    const isActive = activeIndex === index;
    return (
      <VocabularyCard
        key={item.name + '-' + index} // Ensure key is unique, especially if names can repeat across lists
        item={item}
        isActive={isActive}
        isReading={isReading}
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

  return (
    <main className="flex flex-col items-center flex-grow" style={{ minHeight: 'calc(100vh - 200px)' }}> {/* Adjusted for flex-grow and min-height */}
      <div
        id="vocabulary-grid"
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-2"
        style={{
          maxHeight: 'calc(100vh - 220px)', // Adjusted max height considering header/footer
          overflowY: 'auto',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          width: '100%',
          maxWidth: 1200
        }}
      >
        {vocabularyItems && vocabularyItems.map(renderCard)}
      </div>
    </main>
  );
};

export default Main;

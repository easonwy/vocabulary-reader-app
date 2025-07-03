import React from 'react';
import Header from './layout/Header'; // Assuming Header is in layout
import Main from './layout/Main';   // Assuming Main is in layout

const Playground = ({
  // Props for Header
  currentSubjectName,

  // Props for Main & its conditional rendering
  vocabularyItems,
  activeIndex,
  isReading,
  gridRef,
  setActiveIndex,

  // Props for conditional rendering logic (previously in App.jsx)
  isLoading,
  error,
  // Prop for text overlay
  textOverlay,
  // Prop for countdown display
  countdownValue,
  // Prop for text overlay position
  textOverlayPosition,
  // Prop for cards per row
  cardsPerRow,
}) => {
  const getOverlayPositionClasses = () => {
    switch (textOverlayPosition) {
      case 'top':
        return 'top-4 left-4 right-4';
      case 'center':
        return 'top-1/2 -translate-y-1/2 left-4 right-4';
      case 'bottom':
      default:
        return 'bottom-4 left-4 right-4';
    }
  };

  return (
    // Root element is now the 9:16 frame, taking ~99% height of parent, centered by parent in App.jsx
    // It's a flex column to arrange Header and Main.
    <div className="aspect-[9/16] h-[99%] w-auto max-w-full max-h-full bg-white shadow-2xl rounded-lg flex flex-col overflow-hidden relative mx-auto">
      {/* Header renders normally at the top */}
      <Header currentSubjectName={currentSubjectName} />

      {/* Main Content Area (or status messages) - takes remaining space and scrolls */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4"> {/* Added some padding */}
        {isLoading && <div className="text-center p-4">Loading vocabulary...</div>}
        {error && <div className="text-center p-4 text-red-500">Error: {error}</div>}
            {!isLoading && !error && (!vocabularyItems || vocabularyItems.length === 0) && (
              <div className="text-center p-4">No vocabulary items found for this subject.</div>
            )}
            {!isLoading && !error && vocabularyItems && vocabularyItems.length > 0 && (
              <Main
                vocabularyItems={vocabularyItems}
                activeIndex={activeIndex}
                isReading={isReading}
                gridRef={gridRef}
                setActiveIndex={setActiveIndex}
                cardsPerRow={cardsPerRow} // Pass cardsPerRow to Main
              />
            )}
          </div>

      {/* Text Overlay Display - positioned relative to the root Playground div */}
      {textOverlay && (
        <div
          className={`absolute p-2 bg-black bg-opacity-60 text-white text-center text-sm md:text-base rounded pointer-events-none z-20 ${getOverlayPositionClasses()}`}
          style={{ fontFamily: "'Baloo 2', 'Nunito', sans-serif" }}
        >
          {textOverlay}
        </div>
      )}

      {/* Countdown Display - positioned relative to the root Playground div */}
      {countdownValue && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30 pointer-events-none">
          <span className="text-white text-8xl md:text-9xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            {countdownValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default Playground;

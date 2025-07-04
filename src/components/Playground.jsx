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
  // Prop for scrollbar visibility - REMOVED
  // showScrollbar,
  // Prop for header position
  headerPosition,
}) => {
  const mainContentWrapperClasses = `flex-1 p-2 md:p-4 text-[var(--text-primary)] overflow-hidden`;

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
    // Uses CSS variables for background, shadow, and border-radius.
    <div
      className="aspect-[9/16] h-[99%] w-auto max-w-full max-h-full flex flex-col overflow-hidden relative mx-auto"
      style={{
        backgroundColor: 'var(--canvas-bg)',
        boxShadow: 'var(--canvas-shadow)',
        borderRadius: 'var(--canvas-border-radius)'
      }}
    >
      {/* Header: Conditionally rendered based on headerPosition */}
      {headerPosition === 'top' && <Header currentSubjectName={currentSubjectName} className="mb-2 md:mb-4"/>}

      {/* Main Content Area (or status messages) - takes remaining space and scrolls */}
      {/* Text color for status messages should also be themed */}
      <div className={mainContentWrapperClasses}>
        {isLoading && <div className="text-center p-4">Loading vocabulary...</div>}
        {error && <div className="text-center p-4 text-red-500">Error: {error}</div>} {/* Error color might need its own var */}
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
                cardsPerRow={cardsPerRow}
                // showScrollbar={showScrollbar} // Removed
              />
            )}
          </div>

      {/* Footer: Conditionally rendered Header if position is 'bottom' */}
      {/* Header is not rendered if headerPosition is 'hide' */}
      {headerPosition === 'bottom' && <Header currentSubjectName={currentSubjectName} className="mt-2 md:mt-4"/>}

      {/* Text Overlay Display - positioned relative to the root Playground div */}
      {textOverlay && (
        <div
          className={`absolute p-2 text-center text-sm md:text-base rounded pointer-events-none z-20 ${getOverlayPositionClasses()}`}
          style={{
            backgroundColor: 'var(--overlay-bg)',
            color: 'var(--overlay-text-color)',
            fontFamily: 'var(--font-readable)'
          }}
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

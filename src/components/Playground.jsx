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
}) => {
  return (
    // Playground container: flex column, take full height, center content, add some padding for the frame effect
    <div className="flex flex-col h-full items-center justify-center bg-gray-800 p-2 md:p-4 overflow-hidden relative">
      <Header currentSubjectName={currentSubjectName} className="absolute top-0 left-0 right-0 z-10" />

      {/* 9:16 Aspect Ratio Frame - also a positioning context for overlays */}
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="aspect-[9/16] bg-white shadow-2xl max-w-[400px] md:max-w-[min(100vh*9/16-100px,450px)] max-h-[calc(100%-60px)] w-auto h-full flex flex-col overflow-hidden rounded-lg relative">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-1">
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
              />
            )}
          </div>

          {/* Text Overlay Display */}
          {textOverlay && (
            <div
              className="absolute bottom-4 left-4 right-4 p-2 bg-black bg-opacity-50 text-white text-center text-sm md:text-base rounded pointer-events-none z-20"
              style={{ fontFamily: "'Baloo 2', 'Nunito', sans-serif" }}
            >
              {textOverlay}
            </div>
          )}

          {/* Countdown Display */}
          {countdownValue && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30 pointer-events-none">
              <span className="text-white text-8xl md:text-9xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                {countdownValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;

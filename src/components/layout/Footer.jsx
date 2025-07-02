import React from 'react';

// Use a stylish, highly readable font for vocabulary words
const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const Footer = ({
  startReadingSequence,
  startBtnRef,
  availableSubjects,
  currentSubjectKey,
  onSubjectChange,
  isReading
}) => (
  <div className="mt-6 flex flex-col items-center gap-4 pb-4"> {/* Added pb-4 for spacing */}
    <button
      id="start-reading-btn"
      ref={startBtnRef}
      onClick={startReadingSequence}
      disabled={isReading} // Disable button while reading
      className="btn-learn text-white font-bold py-4 px-8 rounded-full shadow-lg text-xl flex items-center justify-center mx-auto transform hover:scale-105 transition-transform cartoon-btn"
      style={{
        fontFamily: readableFont,
        background: "linear-gradient(90deg,#f59e42 60%,#fbbf24 100%)",
        border: "3px solid #fffbe9",
        boxShadow: "0 4px 16px 0 #f59e42",
      }}
      aria-label="Start Learning"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline-block mr-2 -mt-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Start Learning
    </button>

    <div className="mt-2"> {/* Reverted: Removed inline style, kept mt-2 */}
      <label htmlFor="subject-select" className="mr-2 text-gray-700" style={{ fontFamily: readableFont }}>
        Change Subject:
      </label>
      <select
        id="subject-select"
        value={currentSubjectKey}
        onChange={(e) => onSubjectChange(e.target.value)}
        disabled={isReading} // Disable dropdown while reading
        className="p-2 rounded-md border-2 border-amber-400 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white text-gray-900"
        style={{ fontFamily: readableFont, minWidth: '150px' }}
      >
        {availableSubjects && availableSubjects.map(subject => (
          <option key={subject.key} value={subject.key}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>

    <div className="text-gray-500 text-sm mt-2"> {/* Reverted: Uncommented tip div */}
      Tip: Click or press Enter/Space on a card to focus it.
    </div>
  </div>
);

export default Footer;

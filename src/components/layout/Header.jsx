import React from 'react';

// Use a stylish, highly readable font for vocabulary words
const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const Header = ({ currentSubjectName }) => (
  <header className="text-center mb-4">
    <div className="inline-block px-6 py-2 rounded-xl title-card text-white shadow-lg" style={{ fontFamily: readableFont }}>
      <h2
        className="text-2xl tracking-widest"
        style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', 'Baloo 2', cursive, sans-serif" }}
      >
        Anna英语充电站
      </h2>
      <h1
        className="text-5xl font-bold"
        style={{ fontFamily: "'Luckiest Guy', 'Comic Neue', 'Baloo 2', cursive, sans-serif" }}
      >
        {currentSubjectName || 'Vocabulary'}
      </h1>
    </div>
  </header>
);

export default Header;

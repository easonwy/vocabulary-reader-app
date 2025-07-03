import React from 'react';

const readableFont = "'Baloo 2', 'Nunito', 'Segoe UI', 'Arial', sans-serif";

const HandArrow = () => (
  <svg
    className="hand-arrow"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    style={{
      position: 'absolute',
      left: '-50px',
      top: '50%',
      transform: 'translateY(-50%) rotate(-20deg)',
      zIndex: 10,
      pointerEvents: 'none'
    }}
  >
    <g>
      <path
        d="M50 30 Q40 28 35 40 Q33 45 30 40 Q28 35 35 35 Q25 35 25 45"
        stroke="#f59e42"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="50" cy="30" rx="7" ry="10" fill="#f59e42" />
      <ellipse cx="50" cy="30" rx="5" ry="8" fill="#fffbe9" />
      <ellipse cx="50" cy="30" rx="2" ry="3" fill="#f59e42" />
    </g>
  </svg>
);

const VocabularyCard = ({
  item,
  isActive,
  onClick,
  onKeyDown,
  index
}) => {
  // Base classes - structural and interactive, less theme-dependent directly
  const baseCardClasses = "food-card overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card";
  // Active state classes - some might be themeable (like border color if not using active specific var)
  const activeCardClasses = isActive ? "active cartoon-bounce relative z-10" : "";

  const cardStyle = {
    fontFamily: 'var(--card-font-family)',
    backgroundColor: isActive ? 'var(--card-active-bg)' : 'var(--card-bg)',
    boxShadow: isActive ? 'var(--card-active-shadow)' : 'var(--card-shadow)',
    borderRadius: 'var(--card-border-radius)',
    border: `4px solid ${isActive ? 'var(--card-active-border-color)' : 'var(--card-border-color)'}`, // Adjusted for consistent border width
    position: 'relative', // Keep for HandArrow
  };

  const imgStyle = {
    borderRadius: 'var(--card-image-border-radius)', // Uses a variable like '1.5rem 1.5rem 0 0'
    borderBottom: isActive ? `var(--card-image-border-bottom-active)` : 'none',
  };

  const nameStyle = {
    color: 'var(--card-name-text-color)',
    fontFamily: 'var(--font-readable)', // or specific card name font var
    letterSpacing: '0.02em',
  };

  const phoneticStyle = {
    fontSize: '1.2rem',
    backgroundColor: 'var(--card-phonetic-bg)',
    color: 'var(--card-phonetic-text-color)',
    borderRadius: '0.5rem',
    display: 'inline-block',
    padding: '0.1rem 0.5rem',
    marginBottom: '0.2rem',
    fontFamily: 'var(--font-readable)',
    fontWeight: 600,
  };

  const translationStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'var(--font-readable)',
    color: 'var(--card-translation-text-color)',
  };

  return (
    <div
      key={index} // key should be on the element being mapped if this is used in a map directly
      className={`${baseCardClasses} ${activeCardClasses}`}
      data-index={index}
      style={cardStyle}
      tabIndex={0}
      aria-label={`${item.name}, ${item.phonetic}, ${item.zh}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {isActive && <HandArrow />} {/* HandArrow might need theming if its colors are hardcoded */}
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-35 sm:h-40 object-cover cartoon-img" // cartoon-img might have themeable properties
        style={imgStyle}
        onError={e => {
          e.target.onerror = null;
          e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
        }}
      />
      <div className="p-4">
        <p className="font-bold text-1xl mb-1" style={nameStyle}>
          {item.name}
        </p>
        <div className="mt-2">
          <div className="font-mono" style={phoneticStyle}> {/* Removed text-green-700 */}
            {item.phonetic}
          </div>
          <div className="text-lg" style={translationStyle}> {/* Removed text-yellow-700 */}
            {item.zh}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
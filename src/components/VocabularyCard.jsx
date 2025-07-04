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
  index,
  layout // Added layout prop
}) => {
  // Base classes - structural and interactive, less theme-dependent directly
  const baseCardClasses = "food-card overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card";
  // Active state classes - some might be themeable (like border color if not using active specific var)
  const activeCardClasses = isActive ? "active cartoon-bounce relative z-10" : "";

  // Determine if circular layout is active
  const isCircularLayout = layout === 'circular';

  const cardStyle = {
    fontFamily: 'var(--card-font-family)',
    backgroundColor: isActive ? 'var(--card-active-bg)' : 'var(--card-bg)',
    boxShadow: isActive ? 'var(--card-active-shadow)' : 'var(--card-shadow)',
    borderRadius: isCircularLayout ? '50%' : 'var(--card-border-radius)', // Circular for card if layout is circular
    border: `4px solid ${isActive ? 'var(--card-active-border-color)' : 'var(--card-border-color)'}`,
    position: 'relative', // Keep for HandArrow
    aspectRatio: isCircularLayout ? '1 / 1' : '', // Maintain aspect ratio for circular cards
    display: isCircularLayout ? 'flex' : '', // Flex layout for circular cards
    flexDirection: isCircularLayout ? 'column' : '', // Stack image and text vertically
    alignItems: isCircularLayout ? 'center' : '', // Center items horizontally
    justifyContent: isCircularLayout ? 'center' : '', // Center items vertically
  };

  // For grid layout, use a fixed aspect ratio for image wrapper
  const gridImgWrapperStyle = {
    width: '100%',
    aspectRatio: '4 / 3', // or '1 / 1' for square, adjust as needed
    background: '#fff',
    display: 'block',
    overflow: 'hidden',
  };

  const imgStyle = {
    borderRadius: isCircularLayout ? '50%' : 'var(--card-image-border-radius)', // Circular image
    borderBottom: isActive && !isCircularLayout ? `var(--card-image-border-bottom-active)` : 'none', // No border bottom for circular
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    aspectRatio: isCircularLayout ? '1 / 1' : '', // Only for circular
    display: 'block',
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
      className={`${baseCardClasses} ${activeCardClasses} ${isCircularLayout ? 'layout-circular' : 'layout-grid'}`}
      data-index={index}
      style={cardStyle}
      tabIndex={0}
      aria-label={`${item.name}, ${item.phonetic}, ${item.zh}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {isActive && !isCircularLayout && <HandArrow />} {/* HandArrow might need theming or be hidden for circular */}
      {/* For grid layout, wrap image in a fixed aspect ratio box */}
      {!isCircularLayout ? (
        <div style={gridImgWrapperStyle}>
          <img
            src={item.img}
            alt={item.name}
            className="object-cover cartoon-img"
            style={imgStyle}
            onError={e => {
              e.target.onerror = null;
              e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
            }}
          />
        </div>
      ) : (
        <img
          src={item.img}
          alt={item.name}
          className="object-cover cartoon-img"
          style={imgStyle}
          onError={e => {
            e.target.onerror = null;
            e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
          }}
        />
      )}
      <div className={isCircularLayout ? "text-center mt-2" : "p-4"}>
        <p className={`font-bold mb-1 ${isCircularLayout ? 'text-lg' : 'text-2xl'}`} style={nameStyle}>
          {item.name}
        </p>
        <div className={isCircularLayout ? "mt-1" : "mt-2"}>
          {!isCircularLayout && ( // Only show phonetic and translation if not circular, or adjust styling
            <>
              <div className="font-mono" style={phoneticStyle}> {/* Removed text-green-700 */}
                {item.phonetic}
              </div>
              <div className="text-lg" style={translationStyle}> {/* Removed text-yellow-700 */}
                {item.zh}
              </div>
            </>
          )}
          {isCircularLayout && ( // Optionally, show a simplified version for circular
            <p className="text-xs" style={{ color: 'var(--card-phonetic-text-color)' }}>{item.phonetic}</p>
            // item.zh was duplicated here, removed. It's shown in the !isCircularLayout block or could be added here if desired for circular.
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
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
  layout,
  activeCardEffect
}) => {
  // Base classes - structural and interactive, less theme-dependent directly
  const baseCardClasses = "food-card overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card";
  // Determine classes based on active state and card effect
  let dynamicCardClasses = "";
  if (isActive) {
    dynamicCardClasses = "active relative z-10"; // Base active classes
    if (activeCardEffect === "LinerPro") {
      dynamicCardClasses += " liner-pro-active-glow"; // LinerPro on active: add glow, no bounce
    } else {
      dynamicCardClasses += " cartoon-bounce"; // Default (Liner) on active: add bounce
    }
  }

  // Determine if circular layout is active
  const isCircularLayout = layout === 'circular';

  // Card style: only the image is circular in circular layout
  const cardStyle = {
    fontFamily: 'var(--card-font-family)',
    backgroundColor: isActive ? 'var(--card-active-bg)' : 'var(--card-bg)',
    boxShadow: isActive ? 'var(--card-active-shadow)' : 'var(--card-shadow)',
    borderRadius: 'var(--card-border-radius)', // Always rounded, not 50%
    border: `4px solid ${isActive ? 'var(--card-active-border-color)' : 'var(--card-border-color)'}`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    aspectRatio: !isCircularLayout ? '' : 'auto', // Remove forced aspect for card
    minHeight: isCircularLayout ? 260 : undefined, // Ensure enough height for image+text
    padding: isCircularLayout ? '1.2rem 0.5rem 0.8rem 0.5rem' : undefined,
  };

  // For circular layout, image is a circle and centered
  const circularImgWrapperStyle = {
    width: 120,
    height: 120,
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
    marginBottom: '0.7rem',
    border: `3px solid ${isActive ? 'var(--card-active-border-color)' : 'var(--card-border-color)'}`,
    background: '#fff',
    boxShadow: isActive ? '0 0 0 4px #fffbe9' : '0 0 0 2px #fffbe9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // For grid layout, define gridImgWrapperStyle
  const gridImgWrapperStyle = {
    width: '100%',
    aspectRatio: '1.4/1', // or adjust as needed
    overflow: 'hidden',
    borderTopLeftRadius: 'var(--card-image-border-radius)',
    borderTopRightRadius: 'var(--card-image-border-radius)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
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
      key={index}
      className={`${baseCardClasses} ${dynamicCardClasses} ${isCircularLayout ? 'layout-circular' : 'layout-grid'}`}
      data-index={index}
      style={cardStyle}
      tabIndex={0}
      aria-label={`${item.name}, ${item.phonetic}, ${item.zh}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {isActive && !isCircularLayout && <HandArrow />}
      {/* CIRCULAR LAYOUT: circular image, text below */}
      {isCircularLayout ? (
        <>
          <div style={circularImgWrapperStyle}>
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
          <div className="text-center w-full">
            <p className="font-bold mb-1 text-lg" style={nameStyle}>{item.name}</p>
            <div className="mt-1">
              <div className="font-mono" style={phoneticStyle}>{item.phonetic}</div>
              <div className="text-lg" style={translationStyle}>{item.zh}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={gridImgWrapperStyle}>
            <img
              src={item.img}
              alt={item.name}
              className="object-cover cartoon-img"
              style={{
                ...imgStyle,
                borderRadius: 'var(--card-image-border-radius)',
                borderBottom: isActive ? `var(--card-image-border-bottom-active)` : 'none',
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
              }}
            />
          </div>
          <div className="p-4">
            <p className="font-bold mb-1 text-2xl" style={nameStyle}>{item.name}</p>
            <div className="mt-2">
              <div className="font-mono" style={phoneticStyle}>{item.phonetic}</div>
              <div className="text-lg" style={translationStyle}>{item.zh}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VocabularyCard;
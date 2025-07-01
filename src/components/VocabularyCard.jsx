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
  isReading,
  onClick,
  onKeyDown,
  index
}) => (
  <div
    key={index}
    className={`food-card bg-white rounded-4xl shadow-xl overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card
      ${isActive ? 'active cartoon-bounce border-4 border-yellow-400 relative z-10' : ''}`}
    data-index={index}
    style={{
      fontFamily: readableFont,
      borderColor: isActive ? '#f59e42' : 'transparent',
      position: 'relative',
      boxShadow: isActive
        ? '0 8px 32px 0 rgba(245,158,66,0.15)'
        : undefined,
      background: isActive
        ? 'linear-gradient(135deg,#fffbe9 80%,#ffe0b2 100%)'
        : '#fff'
    }}
    tabIndex={0}
    aria-label={`${item.name}, ${item.phonetic}, ${item.zh}`}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {isActive && <HandArrow />}
    <img
      src={item.img}
      alt={item.name}
      className="w-full h-45 sm:h-50 object-cover cartoon-img"
      style={{
        borderRadius: '1.5rem 1.5rem 0 0',
        borderBottom: isActive ? '3px dashed #f59e42' : 'none'
      }}
      onError={e => {
        e.target.onerror = null;
        e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
      }}
    />
    <div className="p-4">
      <p
        className="font-bold text-2xl mb-1"
        style={{
          color: '#f59e42',
          fontFamily: readableFont,
          letterSpacing: '0.02em'
        }}
      >
        {item.name}
      </p>
      <div className="mt-2">
        <div
          className="text-green-700 font-mono"
          style={{
            fontSize: '1.5rem',
            background: '#fffbe9',
            borderRadius: '0.5rem',
            display: 'inline-block',
            padding: '0.1rem 0.5rem',
            marginBottom: '0.2rem',
            fontFamily: readableFont,
            fontWeight: 600
          }}
        >
          {item.phonetic}
        </div>
        <div
          className="text-yellow-700 text-lg"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: readableFont
          }}
        >
          {item.zh}
        </div>
      </div>
    </div>
  </div>
);

export default VocabularyCard;
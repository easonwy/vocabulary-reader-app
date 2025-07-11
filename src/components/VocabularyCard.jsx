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
  activeCardEffect,
  currentTheme, // Added currentTheme prop
  cardSize = 'medium', // Added cardSize prop, default to medium
}) => {
  // Base classes - structural and interactive, less theme-dependent directly
  const baseCardClasses = "food-card overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card";

  const sizeConfigs = {
    small: {
      minHeightCircular: 112,
      minHeightNoImage: 72,
      paddingCircular: '0.55rem 0.25rem 0.3rem 0.25rem',
      paddingNoImage: '0.4rem',
      gridTextPaddingClass: 'p-1.5',
      circularImgSize: 52,
      circularImgMarginBottom: '0.3rem',
      circularImgBorderWidth: '1.5px',
      phoneticFontSize: '0.75rem', // Floor
      phoneticBorderRadius: '0.25rem',
      phoneticPadding: '0.05rem 0.25rem',
      phoneticMarginBottom: '0.05rem',
      translationFontSize: '0.75rem', // Floor
      nameFontClassGrid: 'text-xs', // Floor from 0.7rem target
      nameFontClassCircular: 'text-xs', // Floor
      nameFontClassNoImage: 'text-sm', // From 0.8rem target
      nameMarginBottomClass: 'mb-px',
      textDetailsMarginTopGrid: 'mt-0.5',
      textDetailsMarginTopCircular: 'mt-px',
      textDetailsMarginTopNoImage: 'mt-1',
      // Border radii for default theme (themes might override with their own logic or CSS vars)
      // Values for Cartoon, Xiaohongshu, iOS26 are calculated but applied via CSS vars if not overridden by dynamic styles.
      // This dynamic override is primarily for the default theme or if a theme doesn't specify its own radius.
      cardBorderRadius: '0.7rem',
      cardImageBorderRadius: '0.7rem 0.7rem 0 0',
    },
    medium: { // Current baseline
      minHeightCircular: 140,
      minHeightNoImage: 90,
      paddingCircular: '0.7rem 0.3rem 0.4rem 0.3rem',
      paddingNoImage: '0.5rem',
      gridTextPaddingClass: 'p-2',
      circularImgSize: 64,
      circularImgMarginBottom: '0.4rem',
      circularImgBorderWidth: '2px',
      phoneticFontSize: '0.75rem',
      phoneticBorderRadius: '0.3rem',
      phoneticPadding: '0.05rem 0.3rem',
      phoneticMarginBottom: '0.1rem',
      translationFontSize: '0.75rem',
      nameFontClassGrid: 'text-sm',
      nameFontClassCircular: 'text-xs',
      nameFontClassNoImage: 'text-base',
      nameMarginBottomClass: 'mb-0.5',
      textDetailsMarginTopGrid: 'mt-1',
      textDetailsMarginTopCircular: 'mt-0.5',
      textDetailsMarginTopNoImage: 'mt-1.5',
      cardBorderRadius: '0.9rem',
      cardImageBorderRadius: '0.9rem 0.9rem 0 0',
    },
    big: { // Updated to Medium * 1.3
      minHeightCircular: 182,
      minHeightNoImage: 117,
      paddingCircular: '0.9rem 0.4rem 0.5rem 0.4rem',
      paddingNoImage: '0.65rem',
      gridTextPaddingClass: 'p-2.5', // (0.625rem, from Medium 0.5rem * 1.3 = 0.65rem)
      circularImgSize: 84,
      circularImgMarginBottom: '0.5rem',
      circularImgBorderWidth: '3px',
      phoneticFontSize: '1rem', // text-base (from Medium 0.75rem * 1.3 = 0.975rem)
      phoneticBorderRadius: '0.4rem',
      phoneticPadding: '0.1rem 0.4rem',
      phoneticMarginBottom: '0.15rem',
      translationFontSize: '1rem', // text-base (from Medium 0.75rem * 1.3 = 0.975rem)
      nameFontClassGrid: 'text-lg', // (from Medium 0.875rem * 1.3 = 1.1375rem)
      nameFontClassCircular: 'text-base', // (from Medium 0.75rem * 1.3 = 0.975rem)
      nameFontClassNoImage: 'text-xl', // (from Medium 1rem * 1.3 = 1.3rem)
      nameMarginBottomClass: 'mb-1', // (from Medium 0.125rem * 1.3 = 0.1625rem)
      textDetailsMarginTopGrid: 'mt-1.5', // (from Medium 0.25rem * 1.3 = 0.325rem)
      textDetailsMarginTopCircular: 'mt-0.5', // (from Medium 0.125rem * 1.3 = 0.1625rem)
      textDetailsMarginTopNoImage: 'mt-2', // (from Medium 0.375rem * 1.3 = 0.4875rem)
      cardBorderRadius: '1.2rem', // (from Medium 0.9rem * 1.3 = 1.17rem)
      cardImageBorderRadius: '1.2rem 1.2rem 0 0', // (from Medium 0.9rem * 1.3 = 1.17rem)
    }
  };

  const currentSizeConfig = sizeConfigs[cardSize] || sizeConfigs.medium;

  // Determine if circular layout is active
  const isCircularLayout = layout === 'circular';
  const isNoImageLayout = layout === 'no-image';

  // Base classes applied to all cards
  const staticBaseClasses = "food-card overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card";

  let layoutClass;
  if (isCircularLayout) {
    layoutClass = 'layout-circular';
  } else if (isNoImageLayout) {
    layoutClass = 'layout-no-image';
  } else {
    layoutClass = 'layout-grid';
  }

  let dynamicClasses = [];
  let cardStyleOverrides = {};
  const baseActiveStyle = { // Common styles for any active card
    fontFamily: 'var(--card-font-family)',
    backgroundColor: 'var(--card-active-bg)',
    boxShadow: 'var(--card-active-shadow)', // Will be overridden by glow animation if present
    // borderRadius will be set dynamically based on cardSizeConfig
    border: `4px solid var(--card-active-border-color)`, // Border width could also be dynamic
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: isNoImageLayout ? 'center' : 'flex-start',
    aspectRatio: !isCircularLayout && !isNoImageLayout ? '' : 'auto',
    minHeight: isCircularLayout ? currentSizeConfig.minHeightCircular : (isNoImageLayout ? currentSizeConfig.minHeightNoImage : undefined),
    padding: isCircularLayout ? currentSizeConfig.paddingCircular : (isNoImageLayout ? currentSizeConfig.paddingNoImage : undefined),
  };
  const inactiveStyle = {
    fontFamily: 'var(--card-font-family)',
    backgroundColor: 'var(--card-bg)',
    boxShadow: 'var(--card-shadow)',
    // borderRadius will be set dynamically
    border: `4px solid var(--card-border-color)`, // Border width could also be dynamic
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: isNoImageLayout ? 'center' : 'flex-start',
    aspectRatio: !isCircularLayout && !isNoImageLayout ? '' : 'auto',
    minHeight: isCircularLayout ? currentSizeConfig.minHeightCircular : (isNoImageLayout ? currentSizeConfig.minHeightNoImage : undefined),
    padding: isCircularLayout ? currentSizeConfig.paddingCircular : (isNoImageLayout ? currentSizeConfig.paddingNoImage : undefined),
  };

  if (isActive) {
    dynamicClasses.push("relative", "z-10", "active");
    cardStyleOverrides = { ...baseActiveStyle };
    if (activeCardEffect === "LinerPro") {
      dynamicClasses.push("liner-pro-active-glow");
    } else {
      dynamicClasses.push("cartoon-bounce");
    }
  } else {
    cardStyleOverrides = { ...inactiveStyle };
  }

  // Dynamically set border radius from config. Themes might override this via CSS if their vars are more specific or use !important.
  cardStyleOverrides.borderRadius = currentSizeConfig.cardBorderRadius;


  let classList = [staticBaseClasses, ...dynamicClasses, layoutClass];
  if (currentTheme === 'theme-ios26') {
    classList.push('card-glass');
  }

  const finalClassNames = classList.join(' ').trim().replace(/\s+/g, ' ');
  const cardStyle = cardStyleOverrides;

  const circularImgWrapperStyle = {
    width: currentSizeConfig.circularImgSize,
    height: currentSizeConfig.circularImgSize,
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
    marginBottom: currentSizeConfig.circularImgMarginBottom,
    border: `${currentSizeConfig.circularImgBorderWidth} solid ${isActive ? 'var(--card-active-border-color)' : 'var(--card-border-color)'}`,
    background: '#fff',
    boxShadow: isActive ? `0 0 0 ${currentSizeConfig.circularImgBorderWidth === '1.5px' ? '1.5px' : '2px'} #fffbe9` : `0 0 0 1px #fffbe9`, // Adjusted shadow based on border
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // For grid layout, define gridImgWrapperStyle
  const gridImgWrapperStyle = {
    width: '100%',
    aspectRatio: '1.4/1', // or adjust as needed
    overflow: 'hidden',
    // Dynamically set image border radius from config for top corners
    borderTopLeftRadius: currentSizeConfig.cardImageBorderRadius.split(' ')[0], // Assumes format "value value 0 0"
    borderTopRightRadius: currentSizeConfig.cardImageBorderRadius.split(' ')[1], // Assumes format "value value 0 0"
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
    letterSpacing: '0.01em', // Slightly reduced letter spacing
  };

  const phoneticStyle = {
    fontSize: currentSizeConfig.phoneticFontSize,
    backgroundColor: 'var(--card-phonetic-bg)',
    color: 'var(--card-phonetic-text-color)',
    borderRadius: currentSizeConfig.phoneticBorderRadius,
    display: 'inline-block',
    padding: currentSizeConfig.phoneticPadding,
    marginBottom: currentSizeConfig.phoneticMarginBottom,
    fontFamily: 'var(--font-readable)',
    fontWeight: 600,
  };

  const translationStyle = {
    fontSize: currentSizeConfig.translationFontSize,
    fontWeight: 'bold',
    fontFamily: 'var(--font-readable)',
    color: 'var(--card-translation-text-color)',
  };

  // Determine text content area padding class
  const textContentPaddingClass = isCircularLayout ? '' : currentSizeConfig.gridTextPaddingClass;
  const textContentClasses = `text-center w-full ${isNoImageLayout ? `${textContentPaddingClass} flex flex-col justify-center items-center h-full` : textContentPaddingClass}`;


  // Determine name font class
  let nameFontClass = currentSizeConfig.nameFontClassGrid; // Default to grid
  if (isCircularLayout) {
    nameFontClass = currentSizeConfig.nameFontClassCircular;
  } else if (isNoImageLayout) {
    nameFontClass = currentSizeConfig.nameFontClassNoImage;
  }

  // Determine margin class for name paragraph
  const nameMarginBottomClass = currentSizeConfig.nameMarginBottomClass;

  // Determine margin class for the div containing phonetic and translation
  let textDetailsMarginTopClass = currentSizeConfig.textDetailsMarginTopGrid; // Default to grid
  if (isCircularLayout) {
    textDetailsMarginTopClass = currentSizeConfig.textDetailsMarginTopCircular;
  } else if (isNoImageLayout) {
    textDetailsMarginTopClass = currentSizeConfig.textDetailsMarginTopNoImage;
  }

  // Determine font size for phonetic and translation for no-image layout (others use style object)
  // For no-image layout, these specific font sizes from the config are used.
  // For other layouts, the font sizes are directly from the phoneticStyle and translationStyle objects.
  const noImagePhoneticFontSize = currentSizeConfig.phoneticFontSize;
  const noImageTranslationFontSize = currentSizeConfig.translationFontSize;

  // Determine translation text class for non-no-image layouts
  let translationTextClass = '';
  if (!isNoImageLayout) {
    if (currentSizeConfig.translationFontSize === '0.75rem') {
      translationTextClass = 'text-xs';
    } else if (currentSizeConfig.translationFontSize === '0.875rem') {
      translationTextClass = 'text-sm';
    } // Add more conditions if other font sizes are introduced for translation for non-no-image
  }


  return (
    <div
      key={index}
      className={finalClassNames}
      data-index={index}
      style={cardStyle}
      tabIndex={0}
      aria-label={`${item.name}, ${item.phonetic}, ${item.zh}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {isActive && !isCircularLayout && !isNoImageLayout && <HandArrow />}

      {/* Image Rendering: Only if not 'no-image' layout */}
      {!isNoImageLayout && (
        isCircularLayout ? (
          <div style={circularImgWrapperStyle}>
            <img
              src={item.img}
              alt={item.name}
              className="object-cover cartoon-img"
              style={imgStyle} // imgStyle already makes it a circle for this path if circularImgWrapper is a circle
              onError={e => {
                e.target.onerror = null;
                e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
              }}
            />
          </div>
        ) : ( // Grid layout image
          <div style={gridImgWrapperStyle}>
            <img
              src={item.img}
              alt={item.name}
              className="object-cover cartoon-img"
              style={{ // For grid, imgStyle's borderRadius: 50% is overridden by this specific borderRadius
                ...imgStyle,
                // Apply the top-left and top-right parts of cardImageBorderRadius
                borderRadius: `${currentSizeConfig.cardImageBorderRadius.split(' ')[0]} ${currentSizeConfig.cardImageBorderRadius.split(' ')[1]} 0 0`,
                borderBottom: isActive ? `var(--card-image-border-bottom-active)` : 'none',
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
              }}
            />
          </div>
        )
      )}

      {/* Text Content Area */}
      <div className={textContentClasses}>
        <p className={`font-bold ${nameMarginBottomClass} ${nameFontClass}`} style={nameStyle}>{item.name}</p>
        <div className={textDetailsMarginTopClass}>
          <div className="font-mono" style={{...phoneticStyle, fontSize: isNoImageLayout ? noImagePhoneticFontSize : phoneticStyle.fontSize }}>{item.phonetic}</div>
          <div className={isNoImageLayout ? '' : translationTextClass} style={{...translationStyle, fontSize: isNoImageLayout ? noImageTranslationFontSize : translationStyle.fontSize }}>{item.zh}</div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
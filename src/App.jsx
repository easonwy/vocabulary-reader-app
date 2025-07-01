import React, { useEffect, useRef, useState } from 'react';

// Use a stylish, highly readable font for vocabulary words
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

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  // Vocabulary data with phonetic and Chinese explanation
  const breakfastItems = [
    { name: 'Salad', phonetic: '/ˈsæl.əd/', zh: '沙拉', img: 'https://images.unsplash.com/photo-1650072387363-3c957ac79f0c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb' },
    { name: 'Sausage', phonetic: '/ˈsɔː.sɪdʒ/', zh: '香肠', img: 'https://images.unsplash.com/photo-1691480241974-92481cef09ff?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Tea', phonetic: '/tiː/', zh: '茶', img: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Cookies', phonetic: '/ˈkʊk.iz/', zh: '饼干', img: 'https://plus.unsplash.com/premium_photo-1670895801135-858a7d167ea4?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Baked Beans', phonetic: '/beɪkt biːnz/', zh: '烘豆', img: 'https://plus.unsplash.com/premium_photo-1669655027790-ce16e29405c9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Coffee', phonetic: '/ˈkɒf.i/', zh: '咖啡', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Muffin', phonetic: '/ˈmʌf.ɪn/', zh: '松饼', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Oatmeal', phonetic: '/ˈəʊt.miːl/', zh: '燕麦粥', img: 'https://images.unsplash.com/photo-1650294411492-8343eaec1124?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jam', phonetic: '/dʒæm/', zh: '果酱', img: 'https://images.unsplash.com/photo-1590083052217-3c5ca32f3906?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Sandwich', phonetic: '/ˈsæn.wɪtʃ/', zh: '三明治', img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Croissant', phonetic: '/ˈkwɑː.sɒ̃/', zh: '可颂', img: 'https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Toast', phonetic: '/təʊst/', zh: '吐司', img: 'https://images.unsplash.com/photo-1619095762086-66b82f914dcf?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Bagel', phonetic: '/ˈbeɪ.ɡəl/', zh: '百吉饼', img: 'https://images.unsplash.com/photo-1610735458851-bf3be7078588?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Waffle', phonetic: '/ˈwɒf.əl/', zh: '华夫饼', img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Hot Chocolate', phonetic: '/hɒt ˈtʃɒk.lət/', zh: '热巧克力', img: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Orange Juice', phonetic: '/ˈɒr.ɪndʒ dʒuːs/', zh: '橙汁', img: 'https://plus.unsplash.com/premium_photo-1675667390417-d9d23160f4a6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Pancakes', phonetic: '/ˈpæn.keɪks/', zh: '煎饼', img: 'https://images.unsplash.com/photo-1597524305544-cd821476715f?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Cereal', phonetic: '/ˈsɪə.ri.əl/', zh: '谷物', img: 'https://images.unsplash.com/photo-1583337346971-4ed7c964fb7f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Scrambled Eggs', phonetic: '/ˈskræm.bəld eɡz/', zh: '炒蛋', img: 'https://images.unsplash.com/photo-1562918005-50afb98e5d32?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Milk', phonetic: '/mɪlk/', zh: '牛奶', img: 'https://plus.unsplash.com/premium_photo-1694481100261-ab16523c4093?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  // Function to speak text
  const speak = (text) => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech Synthesis not supported by this browser.');
        setTimeout(resolve, 1000); 
        return;
      }
      
      window.speechSynthesis.cancel(); 
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.error('An error occurred during speech synthesis:', e);
        resolve(); 
      };
      
      window.speechSynthesis.speak(utterance);
    });
  };

  // Main function to read words aloud
  const startReadingSequence = async () => {
    if (isReading) return;
    setIsReading(true);
    const startBtn = startBtnRef.current;
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.innerHTML = 'Learning...';
    }
    const cards = document.querySelectorAll('.food-card');
    for (let i = 0; i < breakfastItems.length; i++) {
      setActiveIndex(i);
      const card = cards[i];
      const word = breakfastItems[i].name;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(res => setTimeout(res, 500));
        card.classList.add('active');
        await speak(word);
        await new Promise(res => setTimeout(res, 200));
        card.classList.remove('active');
        await new Promise(res => setTimeout(res, 300));
      }
    }
    setActiveIndex(null);
    setIsReading(false);
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Start Again
      `;
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (isReading && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading]);

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#f0fdf4] cartoon-bg">
      {/* Header */}
      <header className="text-center mb-4">
        <div className="inline-block px-6 py-2 rounded-xl title-card text-white shadow-lg" style={{ fontFamily: readableFont }}>
          <h2 className="text-2xl tracking-widest">Vocabulary</h2>
          <h1 className="text-5xl font-bold">Breakfast</h1>
        </div>
      </header>

      {/* Vocabulary Grid */}
      <div
        id="vocabulary-grid"
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-2"
        style={{ maxHeight: '85vh', overflowY: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        {breakfastItems.map((item, index) => (
          <div 
            key={index}
            className={
              `food-card bg-white rounded-3xl shadow-xl overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl cartoon-card
              ${activeIndex === index ? 'active cartoon-bounce border-4 border-yellow-400 relative z-10' : ''}`
            }
            data-index={index}
            style={{
              fontFamily: readableFont,
              borderColor: activeIndex === index ? '#f59e42' : 'transparent',
              position: 'relative',
              boxShadow: activeIndex === index
                ? '0 8px 32px 0 rgba(245,158,66,0.15)'
                : undefined,
              background: activeIndex === index
                ? 'linear-gradient(135deg,#fffbe9 80%,#ffe0b2 100%)'
                : '#fff'
            }}
          >
            {/* Hand Arrow */}
            {activeIndex === index && <HandArrow />}
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-32 sm:h-40 object-cover cartoon-img"
              style={{
                borderRadius: '1.5rem 1.5rem 0 0',
                borderBottom: activeIndex === index ? '3px dashed #f59e42' : 'none'
              }}
              onError={(e) => {
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
                  letterSpacing: '0.02em',
                  // Remove textShadow for clarity
                }}
              >
                {item.name}
              </p>
              {activeIndex === index && (
                <div className="mt-2">
                  <div
                    className="text-green-700 text-lg font-mono"
                    style={{
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
                      fontWeight: 'bold',
                      fontFamily: readableFont
                    }}
                  >
                    {item.zh}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div className="mt-6 text-center">
        <button 
          id="start-reading-btn" 
          ref={startBtnRef}
          onClick={startReadingSequence}
          className="btn-learn text-white font-bold py-4 px-8 rounded-full shadow-lg text-xl flex items-center justify-center mx-auto transform hover:scale-105 transition-transform cartoon-btn"
          style={{
            fontFamily: readableFont,
            background: 'linear-gradient(90deg,#f59e42 60%,#fbbf24 100%)',
            border: '3px solid #fffbe9',
            boxShadow: '0 4px 16px 0 #f59e42'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default App;
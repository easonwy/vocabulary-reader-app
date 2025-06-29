import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [isReading, setIsReading] = useState(false);
  const gridRef = useRef(null);
  const startBtnRef = useRef(null);

  // Vocabulary data with working image URLs
  const breakfastItems = [
    { name: 'Salad', img: ' https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Sausage', img: ' https://source.unsplash.com/400x400/?breakfast-sausage' },
    { name: 'Tea', img: ' https://source.unsplash.com/400x400/?cup-of-tea' },
    { name: 'Cookies', img: ' https://source.unsplash.com/400x400/?cookies' },
    { name: 'Baked Beans', img: ' https://source.unsplash.com/400x400/?baked-beans' },
    { name: 'Coffee', img: ' https://source.unsplash.com/400x400/?cup-of-coffee' },
    { name: 'Muffin', img: ' https://source.unsplash.com/400x400/?breakfast-muffin' },
    { name: 'Oatmeal', img: ' https://source.unsplash.com/400x400/?bowl-of-oatmeal' },
    { name: 'Jam', img: ' https://source.unsplash.com/400x400/?jar-of-jam' },
    { name: 'Sandwich', img: ' https://source.unsplash.com/400x400/?breakfast-sandwich' },
    { name: 'Croissant', img: ' https://source.unsplash.com/400x400/?croissant' },
    { name: 'Toast & Butter', img: ' https://source.unsplash.com/400x400/?toast,butter' },
    { name: 'Bagel', img: ' https://source.unsplash.com/400x400/?bagel' },
    { name: 'Waffle', img: ' https://source.unsplash.com/400x400/?waffle' },
    { name: 'Hot Chocolate', img: ' https://source.unsplash.com/400x400/?hot-chocolate' },
    { name: 'Orange Juice', img: ' https://source.unsplash.com/400x400/?orange-juice' },
    { name: 'Pancakes', img: ' https://source.unsplash.com/400x400/?pancakes' },
    { name: 'Cereal', img: ' https://source.unsplash.com/400x400/?bowl-of-cereal' },
    { name: 'Scrambled Eggs', img: ' https://source.unsplash.com/400x400/?scrambled-eggs' },
    { name: 'Milk', img: ' https://source.unsplash.com/400x400/?glass-of-milk' }
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
    <div className="min-h-screen h-screen overflow-hidden bg-[#f0fdf4]">
      {/* Header */}
      <header className="text-center mb-4">
        <div className="inline-block px-6 py-2 rounded-xl title-card text-white shadow-lg">
          <h2 className="text-2xl tracking-widest">Vocabulary</h2>
          <h1 className="text-5xl font-bold">Breakfast</h1>
        </div>
      </header>

      {/* Vocabulary Grid */}
      <div
        id="vocabulary-grid"
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 px-2"
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        {breakfastItems.map((item, index) => (
          <div 
            key={index} 
            className="food-card bg-white rounded-lg shadow-md overflow-hidden text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            data-index={index}
          >
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-32 sm:h-40 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ' https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found';
              }}
            />
            <div className="p-4">
              <p className="font-semibold text-lg">{item.name}</p>
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
          className="btn-learn text-white font-bold py-4 px-8 rounded-full shadow-lg text-xl flex items-center justify-center mx-auto transform hover:scale-105 transition-transform"
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
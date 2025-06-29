const VocabularyCard = ({ item, index, isActive }) => {
  return (
    <div 
      className={`food-card bg-white rounded-lg shadow-md overflow-hidden text-center cursor-pointer ${
        isActive ? 'active' : ''
      }`}
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
  );
};

export default VocabularyCard;
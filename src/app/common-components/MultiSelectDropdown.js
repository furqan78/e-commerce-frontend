import React, { useState, useEffect, useRef } from 'react';

const MultiSelectDropdown = ({ options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-64" ref={dropdownRef}>
      <div 
        className="flex flex-wrap items-center border p-2 cursor-pointer w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions?.length === 0 ? (
          <span className="text-gray-500">Select sizes</span>
        ) : (
          selectedOptions?.map((option) => (
            <div key={option.id} className="flex items-center bg-blue-500 text-white text-sm font-medium px-2 py-1 rounded mr-1 mb-1">
              {option.size}
              {/* <input
                type="number"
                min="0"
                value={option.stock}
                onChange={(e) => onStockChange(option.id, e.target.value)}
                className="ml-2 text-black px-1 py-0 rounded"
                placeholder="Stock"
              /> */}
            </div>
          ))
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded mt-1">
          {options?.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer p-2 ${selectedOptions?.find(selected => selected.id === option.id) ? 'bg-blue-100' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option.size}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

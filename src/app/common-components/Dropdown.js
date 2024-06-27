import React from 'react';

const Dropdown = ({ options, selectedOption, onSelect }) => {

  const handleSelect = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="relative inline-block w-64">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedOption}
        onChange={handleSelect}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

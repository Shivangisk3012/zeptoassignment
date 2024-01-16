

// AutoCompleteInput.js
import React, { useState, useEffect } from 'react';
import {items} from './constant/data'
const AutoCompleteInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState(items.slice());
  const [availableItems, setAvailableItems] = useState(allItems.slice());
  const [showFullList, setShowFullList] = useState(false);

  useEffect(() => {
    // Update available items whenever the full list changes
    setAvailableItems(allItems.slice());
  }, [allItems]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // If the input is not empty, filter available items based on name or other properties
    if (value.trim() !== '') {
      const filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        String(item.age).includes(value.trim())
      );
      setAvailableItems(filteredItems);
    } else {
      // If the input is empty, show the full list
      setAvailableItems(allItems);
    }
  };

  const handleInputFocus = () => {
    // Show the full list when the input is focused
    setShowFullList(true);
    setAvailableItems(allItems);
  };

  const handleItemClick = (item) => {
    // Add the selected item to the chips list and remove it from available items
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter(i => i !== item));
    setInputValue('');
    setShowFullList(false);
  };

  const handleChipRemove = (item) => {
    // Remove the chip and add the item back to available items
    setSelectedItems(selectedItems.filter(i => i !== item));
    setAvailableItems([...availableItems, item]);
  };

  return (
    <div className='w-[60%] mx-auto  py-4' >
        <h1 className="text-blue-900 text-2xl font-bold text-center py-4 ">Pick Users</h1>

      <div className="relative">
      <div className="flex items-center flex-wrap border-b-2 border-blue-900">
  {selectedItems.map((item, index) => (
    <div key={index} className="flex items-center bg-gray-200 rounded-2xl px-2 py-1 m-1">
      <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full mr-2" />
      <span className='font-semibold'>{item.name}</span>
      <span
        onClick={() => handleChipRemove(item)}
        className="ml-2 cursor-pointer"
      >
        X
      </span>
    </div>
  ))}
  <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
    onFocus={handleInputFocus}
    placeholder="Add new users"
    className="border-none outline-none"
  />
</div>
{showFullList && (
  <ul className="absolute z-10 bg-white border rounded mt-2 overflow-y-auto max-h-60">
    {availableItems.map((item, index) => (
      <li key={index} onClick={() => handleItemClick(item)} className="flex items-center cursor-pointer p-2">
        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <span className='font-semibold'>{item.name}</span>
          <span className="ml-2">({item.email})</span>
        </div>
      </li>
    ))}
  </ul>
)}
      </div>
    </div>
  );
};

export default AutoCompleteInput;

import React from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />
      
      {/* Location filter */}
      <div className="mt-4">
        <h1 className="font-bold text-lg">Location</h1>
        {filterData[0].array.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-center space-x-2 my-2">
            <input
              type="radio"
              id={item}
              name="location" // Same name groups the radios together
              value={item}
              className="custom-radio"
            />
            <label htmlFor={item} className="text-gray-700">
              {item}
            </label>
          </div>
        ))}
      </div>

      {/* Industry filter */}
      <div className="mt-4">
        <h1 className="font-bold text-lg">Industry</h1>
        {filterData[1].array.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-center space-x-2 my-2">
            <input
              type="radio"
              id={item}
              name="industry" // Same name groups the radios together
              value={item}
              className="custom-radio"
            />
            <label htmlFor={item} className="text-gray-700">
              {item}
            </label>
          </div>
        ))}
      </div>

      {/* Salary filter */}
      <div className="mt-4">
        <h1 className="font-bold text-lg">Salary</h1>
        {filterData[2].array.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-center space-x-2 my-2">
            <input
              type="radio"
              id={item}
              name="salary" // Same name groups the radios together
              value={item}
              className="custom-radio"
            />
            <label htmlFor={item} className="text-gray-700">
              {item}
            </label>
          </div>
        ))}
      </div>

      <style>{`
        /* Custom radio button styles */
        .custom-radio {
          appearance: none;
          -webkit-appearance: none;
          width: 20px; /* Set size for better visibility */
          height: 20px; /* Set size for better visibility */
          border: 2px solid #4a5568;
          background-color: white; /* Default background */
          border-radius: 50%; /* Make it circular */
          cursor: pointer;
          position: relative;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        /* When the radio button is checked */
        .custom-radio:checked {
          background-color: #1a202c; /* Dark background when checked */
          border-color: #1a202c; /* Border color matches the background */
        }

        /* Circle inside when checked (dot) */
        .custom-radio:checked::before {
          content: "";
          width: 12px; /* Dot size */
          height: 12px; /* Dot size */
          background-color: black; /* Dot color when checked */
          border-radius: 50%; /* Dot is circular */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* Focused state for accessibility */
        .custom-radio:focus {
          outline: 2px solid #1a202c; /* Outline when focused */
        }
      `}</style>
    </div>
  );
};

export default FilterCard;

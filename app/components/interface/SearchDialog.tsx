// import React, { useState, useEffect } from "react";
// import { useGlobalContext } from "@/app/context/globalContext";

// function SearchDialog() {
//   const { geocodedList, inputVal, handleInput } = useGlobalContext();
//   const [hoveredIndex, setHoveredIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   // Debugging
//   useEffect(() => {
//     console.log("🔍 SearchDialog - geocodedList updated:", geocodedList);
//   }, [geocodedList]);

//   const safeGeocodedList = Array.isArray(geocodedList) ? geocodedList : [];

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       {/* Search Bar */}
//       <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900">
//         <input
//           type="text"
//           value={inputVal}
//           onChange={handleInput}
//           onFocus={() => setIsOpen(true)}
//           onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Close dropdown after clicking outside
//           placeholder="Search for a city..."
//           className="w-full p-2 outline-none bg-transparent text-gray-900 dark:text-white"
//         />
//         <span className="ml-2 text-gray-500 dark:text-gray-400">🔍</span>
//       </div>

//       {/* Dropdown Suggestions */}
//       {isOpen && safeGeocodedList.length > 0 && (
//         <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
//           <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
//             Suggestions
//           </li>
//           {safeGeocodedList.map((item, index) => (
//             <li
//               key={index}
//               className={`px-4 py-2 text-gray-900 dark:text-white cursor-pointer ${
//                 hoveredIndex === index ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//               onMouseEnter={() => setHoveredIndex(index)}
//             >
//               {item.name}, {item.state && `${item.state},`} {item.country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SearchDialog;

import React, { useState, useEffect } from "react";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";

function SearchDialog() {
  const { geocodedList, inputVal, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const safeGeocodedList = Array.isArray(geocodedList) ? geocodedList : [];

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="relative">
      {/* Search Bar - Matching Button Height */}
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 h-10">
        <input
          type="text"
          value={inputVal}
          onChange={handleInput}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Close dropdown after clicking outside
          placeholder="Search for a city..."
          className="w-full px-3 py-1 outline-none bg-transparent text-gray-900 dark:text-white h-full leading-none"
        />
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && safeGeocodedList.length > 0 && (
        <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
            Suggestions
          </li>
          {safeGeocodedList.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-gray-900 dark:text-white cursor-pointer ${
                hoveredIndex === index ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => {
                getClickedCoords(item.lat, item.lon);
              }}
            >
              {item.name}, {item.state && `${item.state},`} {item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchDialog;

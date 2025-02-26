// import React, { useEffect, useState } from "react";
// import {
//   useGlobalContext,
//   useGlobalContextUpdate,
// } from "@/app/context/globalContext";

// function SearchDialog() {
//   const { geocodedList, inputVal, handleInput } = useGlobalContext();
//   const { setActiveCityCoords } = useGlobalContextUpdate();

//   const [hoveredIndex, setHoveredIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   const safeGeocodedList = Array.isArray(geocodedList) ? geocodedList : [];

//   useEffect(() => {
//     const savedCity = localStorage.getItem("selectedCity");
//     if (savedCity) {
//       const { lat, lon } = JSON.parse("selectedCity");
//       setActiveCityCoords([lat, lon]);
//     }
//   }, []);

//   const getClickedCoords = (
//     lat: number,
//     lon: number,
//     name: string,
//     state: string,
//     country: string
//   ) => {
//     const cityData = { lat, lon, name, state, country };
//     setActiveCityCoords([lat, lon]);
//     localStorage.setItem("selectedCity", JSON.stringify(cityData));
//   };

//   return (
//     <div className="relative w-[90%] sm:w-[30rem] max-w-[30rem]">
//       <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 h-10">
//         <input
//           type="text"
//           value={inputVal}
//           onChange={handleInput}
//           onFocus={() => setIsOpen(true)}
//           onBlur={() => setTimeout(() => setIsOpen(false), 200)}
//           placeholder="Search for a city..."
//           className="w-full px-3 py-1 outline-none bg-transparent text-gray-900 dark:text-white h-full leading-none"
//         />
//       </div>
//       {isOpen && safeGeocodedList.length > 0 && (
//         <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto z-[9999]">
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
//               onClick={() => {
//                 getClickedCoords(
//                   item.lat,
//                   item.lon,
//                   item.name,
//                   item.state,
//                   item.country
//                 );
//               }}
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


  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      const { lat, lon } = JSON.parse(savedCity);
      setActiveCityCoords([lat, lon]);
    }
  }, []);

  const getClickedCoords = (
    lat: number,
    lon: number,
    name: string,
    state: string,
    country: string
  ) => {
    const cityData = { lat, lon, name, state, country };
    setActiveCityCoords([lat, lon]);
    localStorage.setItem("selectedCity", JSON.stringify(cityData));
  };

  return (
    <div className="relative w-[90%] sm:w-[30rem] max-w-[30rem]">
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 h-10">
        <input
          type="text"
          value={inputVal}
          onChange={handleInput}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search for a city..."
          className="w-full px-3 py-1 outline-none bg-transparent text-gray-900 dark:text-white h-full leading-none"
        />
      </div>
      {isOpen && safeGeocodedList.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto z-[9999]">
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
                getClickedCoords(
                  item.lat,
                  item.lon,
                  item.name,
                  item.state,
                  item.country
                );
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


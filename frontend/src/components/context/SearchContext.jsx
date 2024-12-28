// import React, { createContext, useState, useContext } from 'react';

// const SearchContext = createContext();

// export const useSearch = () => useContext(SearchContext);

// export const SearchProvider = ({ children }) => {
//   const [searchData, setSearchData] = useState({
//     location: '',
//     pickupDate: '',
//     returnDate: ''
//   });

//   return (
//     <SearchContext.Provider value={{ searchData, setSearchData }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

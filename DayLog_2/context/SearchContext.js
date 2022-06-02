import React, {createContext, useState} from 'react';

export const searchContext = createContext();

function SearchContextProvider({children}) {
  const [search, setSearch] = useState('');

  return (
    <searchContext.Provider value={{search, setSearch}}>
      {children}
    </searchContext.Provider>
  );
}

export default SearchContextProvider;

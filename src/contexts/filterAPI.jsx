import React, { createContext, useState, useContext } from 'react';

export const FilterAPI = createContext();

export default function Provider({ children }) {
  const [filter, setFilter] = useState('');
  const store = {
    filter,
    setFilter,
  };
  return (
    <FilterAPI.Provider value={store}>
      {children}
    </FilterAPI.Provider>
  );
}
export function useFilterAPI() {
  const context = useContext(FilterAPI);
  return context;
}

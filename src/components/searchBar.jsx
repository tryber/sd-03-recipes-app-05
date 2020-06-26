import React from 'react';
import Filter from './filter';

function SerachBar() {
  return (
    <div>
      <Filter />
      <input
        type='text'
        placeholder='Buscar receita'
        data-testid='search-input'
      />
      <button  data-testid='exec-search-btn' >
        Buscar
      </button>
    </div>
  );
}

export default SerachBar;

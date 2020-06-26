import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as apiC from '../service/cocktailAPI';
import * as apiM from '../service/mealAPI';
import { useFilterAPI } from '../contexts/filterAPI';
import Filter from './filter';

function SerachBar() {
  const { filter } = useFilterAPI();
  const [ state, setState ] = useState('');
  const [ product, setProduct ] = useState({});

  function fetchProduct() {
    const location = useLocation();
    const path = location.pathname.slice(1).split('/')[0];
    if(filter === 'nome'){
      setProduct(
        path === 'comidas' ? apiM.getByName(state) : apiC.getByName(state)
      )
    }
    if(filter === 'PL'){
      setProduct(
        path === 'comidas' ? apiM.filterByFirst(state) : apiC.filterByFirst(state)
      )
    }
    if(filter === 'ingrediente'){
      setProduct(
        path === 'comidas' ? apiM.filterByIngredient (state) : apiC.filterByIngredient(state)
      )
    }
  }

  return (
    <div>
      <Filter />
      <input
        type="text"
        placeholder="Buscar receita"
        data-testid="search-input"
        value={state}
        onChange={ (e) => setState(e.target.value) }
      />
      <button data-testid="exec-search-btn" onClick={() => fetchProduct() } >
        Buscar
      </button>
    </div>
  );
}

export default SerachBar;

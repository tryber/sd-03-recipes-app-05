import React from 'react';
import { useFilterAPI } from '../contexts/filterAPI';

function Filter() {
  const { setFilter } = useFilterAPI();



  return (
    <form name="Filtro">
      <input
        type="radio"
        id="Ingrediente"
        name="filtro"
        data-testid="ingredient-search-radio"
        onClick={() => setFilter('ingrediente')}
      />
      <label htmlFor="Ingrediente">Ingrediente</label>
      <input
        type="radio"
        id="Nome"
        name="filtro"
        data-testid="name-search-radio"
        onClick={() => setFilter('nome')}
      />
      <label htmlFor="Nome">Nome</label>
      <input
        type="radio"
        id="primeira"
        name="filtro"
        data-testid="first-letter-search-radio"
        onClick={() => setFilter('PL')}
      />
      <label htmlFor="primeira">Primeira letra</label>
    </form>
  );
}

export default Filter;

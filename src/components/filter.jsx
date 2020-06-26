import React from 'react';

function Filter() {
  return (
    <form name='Filtro'>
      <input
        type='radio'
        id='Ingrediente'
        name='filtro'
        data-testid='ingredient-search-radio'
      />
      <label htmlFor='Ingrediente'>Ingrediente</label>
      <input
        type='radio'
        id='Nome'
        name='filtro'
        data-testid='name-search-radio'
      />
      <label htmlFor='Nome'>Nome</label>
      <input
        type='radio'
        id='primeira'
        name='filtro'
        data-testid='first-letter-search-radio'
      />
      <label htmlFor='primeira'>Primeira letra</label>
    </form>
  );
}

export default Filter;

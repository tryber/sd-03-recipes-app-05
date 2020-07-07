import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TelaPrincipalContext } from '../contexts/TelaPrincipalContext';
import { getByName, filterByIngredient, filterByFirstLetter } from '../service/mealAPI';
import {
  getByName as getCocktails,
  filterByIngredient as ingredientFetch,
  filterByFirstLetter as drinkFirstLetter,
} from '../service/cocktailAPI';

async function getName(type, name) {
  if (type === 'comidas') {
    return getByName(name || '');
  } if (type === 'bebidas') {
    return getCocktails(name || '');
  }
  return null;
}

async function changeByFirstLetter(type, letter) {
  if (type === 'comidas') {
    return filterByFirstLetter(letter);
  } if (type === 'bebidas') {
    return drinkFirstLetter(letter);
  }
  return undefined;
}

async function changeIngredientFetch(filterToUse, type) {
  if (type === 'comidas') {
    return filterByIngredient(filterToUse);
  } if (type === 'bebidas') {
    return ingredientFetch(filterToUse);
  }
  return undefined;
}

function SearchBar() {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const store = useContext(TelaPrincipalContext);
  const location = useLocation();
  const history = useHistory();

  async function handleSubmit() {
    const type = location.pathname.includes('comidas') ? 'comidas' : 'bebidas';
    if (radio === 'Ingrediente') {
      const result = await changeIngredientFetch(search, type);
      if (!result) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      else if (result.length === 1) history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
      else store.setContent(result.slice(0, 12));
    } else if (radio === 'Nome') {
      const result = await getName(type, search);
      if (!result) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      else if (result.length === 1) history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
      else store.setContent(result.slice(0, 12));
    } else if (radio === 'first') {
      if (search.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
      const result = await changeByFirstLetter(type, search);
      if (!result) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      else if (result.length === 1) history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
      else store.setContent(result.slice(0, 12));
    }
    return null;
  }

  return (
    <div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '80%', marginTop: 5, marginLeft: 5 }}
        type="text"
        placeholder="Buscar receita"
        data-testid="search-input"
        className="input-search"
        value={search}
      />
      <div>

        <input
          checked={radio === 'Ingrediente'}
          onChange={(e) => setRadio(e.target.value)}
          type="radio"
          id="Ingrediente"
          name="gender"
          value="Ingrediente"
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="Ingrediente">Ingrediente</label>
        <input
          onChange={(e) => setRadio(e.target.value)}
          checked={radio === 'Nome'}
          type="radio"
          id="Nome"
          name="gender"
          value="Nome"
          data-testid="name-search-radio"
        />
        <label htmlFor="Nome">Nome</label>
        <input
          onChange={(e) => setRadio(e.target.value)}
          checked={radio === 'first'}
          type="radio"
          id="first"
          name="gender"
          value="first"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first">Primeira letra</label>

      </div>
      <button onClick={handleSubmit} type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;

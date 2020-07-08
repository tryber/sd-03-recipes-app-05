import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TelaPrincipalContext } from '../contexts/TelaPrincipalContext';
import { getByName, filterByIngredient, filterByFirstLetter } from '../service/mealAPI';
import {
  getByName as getCocktails,
  filterByIngredient as ingredientFetch,
  filterByFirstLetter as drinkFirstLetter,
} from '../service/cocktailAPI';
import '../style/Search.css';

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

async function renderIfIngredient(store, search, type, history) {
  const result = await changeIngredientFetch(search, type);
  if (!result) return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  if (result.length === 1) return history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
  return store.setContent(result.slice(0, 12));
}

async function rendeIfName(store, search, type, history) {
  const result = await getName(type, search);
  if (!result) return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  if (result.length === 1) return history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
  return store.setContent(result.slice(0, 12));
}

async function renderIrFirst(store, search, type, history) {
  if (search.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
  const result = await changeByFirstLetter(type, search);
  if (!result) return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  if (result.length === 1) return history.push(`/${type}/${result[0].idMeal || result[0].idDrink}`);
  return store.setContent(result.slice(0, 12));
}

async function handleSubmit(location, radio, store, search, history) {
  const type = location.pathname.includes('comidas') ? 'comidas' : 'bebidas';
  if (radio === 'Ingrediente') {
    await renderIfIngredient(store, search, type, history);
  } else if (radio === 'Nome') {
    await rendeIfName(store, search, type, history);
  } else if (radio === 'first') {
    await renderIrFirst(store, search, type, history);
  }
  return null;
}

function renderInputs(radio, setRadio) {
  return (
    <div className="container-radios">
      <input
        checked={radio === 'Ingrediente'}
        onChange={(e) => setRadio(e.target.value)}
        type="radio"
        id="Ingrediente"
        name="gender"
        value="Ingrediente"
        data-testid="ingredient-search-radio"
        className="radio"
      />
      <label htmlFor="Ingrediente" className="radios">Ingrediente</label>
      <input
        onChange={(e) => setRadio(e.target.value)}
        checked={radio === 'Nome'}
        type="radio"
        id="Nome"
        name="gender"
        value="Nome"
        data-testid="name-search-radio"
        className="radio"
      />
      <label htmlFor="Nome" className="radios">Nome</label>
      <input
        onChange={(e) => setRadio(e.target.value)}
        checked={radio === 'first'}
        type="radio"
        id="first"
        name="gender"
        value="first"
        data-testid="first-letter-search-radio"
        className="radio"
      />
      <label htmlFor="first" className="radios">Primeira letra</label>
    </div>
  );
}

function SearchBar() {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const store = useContext(TelaPrincipalContext);
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="container-search">
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="ipt-search"
        type="text"
        placeholder="Buscar receita"
        data-testid="search-input"
        className="ipt-search"
        value={search}
      />
      {renderInputs(radio, setRadio)}
      <button
        className="btn-radios"
        onClick={() => handleSubmit(location, radio, store, search, history)}
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;

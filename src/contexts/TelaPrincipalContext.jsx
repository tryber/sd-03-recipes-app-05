import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import {
  getByName, getCategoryList, filterByCategory, filterByIngredient, filterByFirstLetter,
} from '../service/mealAPI';
import {
  getByName as getCocktails,
  filterByIngredient as ingredientFetch,
  getCategoryList as getDrinkCategory,
  filterByCategory as filterDrink,
  filterByFirstLetter as drinkFirstLetter,
} from '../service/cocktailAPI';

export const TelaPrincipalContext = createContext(null);

async function changeContentFetch(type, filter) {
  if (type === 'comidas') {
    return (await getByName(filter || '')).slice(0, 12);
  } if (type === 'bebidas') {
    return (await getCocktails(filter || '')).slice(0, 12);
  }
  return undefined;
}

async function changeCategoryFetch(type) {
  if (type === 'comidas') {
    return (await getCategoryList()).slice(0, 5);
  } if (type === 'bebidas') {
    return (await getDrinkCategory()).slice(0, 5);
  }
  return undefined;
}

// async function changeFirstLetter(type, letter) {
//   if (type === 'comidas') {
//     return (await filterByFirstLetter(letter)).slice(0, 5);
//   } if (type === 'bebidas') {
//     return (await drinkFirstLetter(letter)).slice(0, 5);
//   }
//   return undefined;
// }

async function changeFilteredFetch(filterToUse, type) {
  if (type === 'comidas') {
    return (await filterByCategory(filterToUse)).slice(0, 12);
  } if (type === 'bebidas') {
    return (await filterDrink(filterToUse)).slice(0, 12);
  }
}

async function changeIngredientFetch(filterToUse, type) {
  if (type === 'comidas') {
    return (await filterByIngredient(filterToUse)).slice(0, 12);
  } if (type === 'bebidas') {
    return (await ingredientFetch(filterToUse)).slice(0, 12);
  }
  return undefined;
}

const Provider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('All');

  async function getContent(type, filterTouse) {
    setContent([]);
    if (!filterTouse) {
      setContent(await changeContentFetch(type));
    } else {
      setContent(await changeIngredientFetch(filterTouse, type));
    }

    setFilter('All');
  }

  // async function getContentUsingName(type, name) {
  //   setContent([]);
  //   setContent(await changeContentFetch(type, name));
  // }

  // async function getByFisrtLetter(type, letter) {
  //   setContent(await changeFirstLetter(type, letter));
  // }

  async function getCategories(type) {
    setCategories(await changeCategoryFetch(type));
  }

  async function getFilteredResults(filterToUse, type) {
    setFilter(filterToUse);
    setContent([]);
    setContent(await changeFilteredFetch(filterToUse, type));
  }

  const store = {
    content,
    setContent,
    categories,
    filter,
    getContent,
    getCategories,
    getFilteredResults,
    // getContentUsingName,
    setFilter,
    // getByFisrtLetter,

  };

  return <TelaPrincipalContext.Provider value={store}>{children}</TelaPrincipalContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

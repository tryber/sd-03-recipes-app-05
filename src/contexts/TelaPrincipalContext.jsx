import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { getByName, getCategoryList, filterByCategory } from '../service/mealAPI';
import { getByName as getCocktails, getCategoryList as getDrinkCategory, filterByCategory as filterDrink } from '../service/cocktailAPI';

export const TelaPrincipalContext = createContext(null);

const Provider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('All');

  async function getContent(type) {
    setContent([]);
    if (type === 'comidas') {
      setContent((await getByName('')).slice(0, 12));
    } else if (type === 'bebidas') {
      setContent((await getCocktails('')).slice(0, 12));
    }
    setFilter('All');
  }

  async function getCategories(type) {
    if (type === 'comidas') {
      setCategories((await getCategoryList()).slice(0, 5));
    } else if (type === 'bebidas') {
      setCategories((await getDrinkCategory()).slice(0, 5));
    }
  }

  async function getFilteredResults(filterToUse, type) {
    setFilter(filterToUse);
    setContent([]);

    if (type === 'comidas') {
      setContent((await filterByCategory(filterToUse)).slice(0, 12));
    } else if (type === 'bebidas') {
      setContent((await filterDrink(filterToUse)).slice(0, 12));
    }
  }

  const store = {
    content,
    categories,
    filter,
    getContent,
    getCategories,
    getFilteredResults,

  };

  return <TelaPrincipalContext.Provider value={store}>{children}</TelaPrincipalContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

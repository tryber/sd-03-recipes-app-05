import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import {
  filterByArea, getAreaList, getByName,
} from '../service/mealAPI';

export const origemExplorerContext = createContext();

const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('All');

  async function getRecipes(filterToUse = filter) {
    if (filterToUse === 'All') {
      setRecipes((await getByName('')).slice(0, 12));
    } else { setRecipes((await filterByArea(filterToUse)).slice(0, 12)); }
  }

  async function changeFilter(newFilter) {
    setFilter(newFilter);
    getRecipes(newFilter);
  }

  async function getCategories() {
    setCategories(await getAreaList());
  }

  const store = {
    recipes, setRecipes, categories, setCategories, getRecipes, getCategories, changeFilter,

  };

  return <origemExplorerContext.Provider value={store}>{children}</origemExplorerContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

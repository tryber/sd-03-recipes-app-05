import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { getById, getByName } from '../service/mealAPI';
import { getById as getDrinkById, getByName as getDrinkCategoryList } from '../service/cocktailAPI';

export const ProducDetailsContext = createContext();

async function changeProductDetails(type, id) {
  if (type === 'comidas') {
    return getById(id);
  } if (type === 'bebidas') {
    return getDrinkById(id);
  }
  return undefined;
}

async function changeRecomendations(type) {
  if (type === 'comidas') {
    return getDrinkCategoryList('');
  } if (type === 'bebidas') {
    return getByName('');
  }
  return undefined;
}

const Provider = ({ children }) => {
  const [productDetails, setProductDetails] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [recipes, setRecipes] = useState([]);

  async function getProductDetails(type, id) {
    console.log('getting');
    setProductDetails(await changeProductDetails(type, id));
  }

  async function getRecomendations(type) {
    setRecomendations((await changeRecomendations(type)).slice(0, 6));
  }

  const store = {
    productDetails,
    getProductDetails,
    recomendations,
    getRecomendations,
    recipes,
    setRecipes,

  };

  return <ProducDetailsContext.Provider value={store}>{children}</ProducDetailsContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

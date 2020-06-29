import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';
import Loading from '../components/Loading';
import Checkboxingredient from '../components/CheckBoxIngredient';
import Favcontainer from '../components/FavContainer';
import printIngredients from '../service/utilFunctions';

const _ = require('lodash');

function saveDone(store, history, location) {
  const {
    strCategory, strAlcoholic, strDrink, strMeal, strDrinkThumb, strMealThumb, strTags,
  } = store.productDetails;
  const doneRecipe = {
    id: store.productDetails.idDrink || store.productDetails.idMeal,
    type: location.pathname.slice(1).split('/')[0],
    area: store.productDetails.strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink || strMeal,
    image: strMealThumb || strDrinkThumb,
    doneDate: new Date(),
    tags: strTags.split(',') || [],
  };

  const doneArray = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneArray) {
    localStorage.setItem('doneRecipes', JSON.stringify([...doneArray, doneRecipe]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  }

  history.push('/receitas-feitas');
}

function renderIngredients(store, location) {
  return (
    <div>
      <p>Ingredients</p>
      <div>
        {printIngredients(store)
          .map((ingredients, index) => (
            <Checkboxingredient
              key={_.uniqueId()}
              index={index}
              recipeId={location.pathname.slice(1).split('/')[1]}

            >
              {ingredients}
            </Checkboxingredient>
          ))}
      </div>
    </div>
  );
}

function renderImage(store) {
  return (
    <img
      style={{ width: 399, height: 299 }}
      src={store.productDetails.strMealThumb || store.productDetails.strDrinkThumb}
      alt="thumbnail"
      data-testid="recipe-photo"
    />
  );
}

export default function Inprocess() {
  const store = useContext(ProducDetailsContext);
  const location = useLocation();
  const history = useHistory();
  const [type, id] = location.pathname.slice(1).split('/');
  const [done, setDone] = useState(false);

  useEffect(() => {
    store.getProductDetails(type, id);
    store.getRecomendations(type);
  }, []);

  useEffect(() => {
    try {
      setDone(printIngredients(store).length === JSON.parse(localStorage.getItem('inProgressRecipes'))[id].length);
    } catch (e) {
      setDone(false);
    }
  });

  return (
    _.isEmpty(store.productDetails) ? <Loading />
      : (
        <div style={{ width: 500 }}>
          {renderImage(store)}
          <p data-testid="recipe-title">
            {store.productDetails.strMeal || store.productDetails.strDrink}
          </p>
          <p data-testid="recipe-category">
            {store.productDetails.strAlcoholic || store.productDetails.strCategory}
          </p>
          <Favcontainer />
          {renderIngredients(store, location)}
          <div data-testid="instructions">
            {store.productDetails.strInstructions}
          </div>

          <button
            style={{ position: 'fixed', bottom: 0 }}
            data-testid="finish-recipe-btn"
            type="button"
            onClick={() => saveDone(store, history, location)}
            disabled={done}
          >
            Finalizar Receita
          </button>

        </div>
      )
  );
}

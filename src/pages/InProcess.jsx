import React, { useContext, useEffect } from 'react';
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

function renderIngredients(store) {
  return (
    <div>
      <p>Ingredients</p>
      <div>
        {printIngredients(store)
          .map((ingredients, index) => (
            <Checkboxingredient
              key={_.uniqueId()}
              index={index}
            >
              {ingredients}
            </Checkboxingredient>
          ))}
      </div>
    </div>
  );
}

export default function Inprocess() {
  const store = useContext(ProducDetailsContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const [type, id] = location.pathname.slice(1).split('/');
    store.getProductDetails(type, id);
    store.getRecomendations(type);
  }, []);

  return (
    _.isEmpty(store.productDetails) ? <Loading />
      : (
        <div style={{ width: 500 }}>
          <img
            style={{ width: 399, height: 299 }}
            src={store.productDetails.strMealThumb || store.productDetails.strDrinkThumb}
            alt="thumbnail"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">
            {store.productDetails.strMeal || store.productDetails.strDrink}
          </p>
          <p data-testid="recipe-category">
            {store.productDetails.strAlcoholic || store.productDetails.strCategory}
          </p>
          <Favcontainer />
          {renderIngredients(store)}
          <div data-testid="instructions">
            {store.productDetails.strInstructions}
          </div>
          <button
            style={{ position: 'fixed', bottom: 0 }}
            data-testid="finish-recipe-btn"
            type="button"
            onClick={() => saveDone(store, history, location)}
          >
            Finalizar Receita
          </button>

        </div>
      )
  );
}

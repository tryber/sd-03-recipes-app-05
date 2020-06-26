import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';
import Loading from '../components/Loading';
import Minicard from '../components/MiniCard';
import Checkboxingredient from '../components/CheckBoxIngredient';

const _ = require('lodash');

export default function Inprocess() {
  const store = useContext(ProducDetailsContext);
  const [page, setPage] = useState(0);
  const location = useLocation();

  function printIngredients() {
    const ingredients = Object.keys(store.productDetails).filter((product) => product.includes('strIngredient'));
    const ingredientsList = [];
    ingredients.every((ingredient, i) => {
      if (store.productDetails[ingredient]) {
        const ing = store.productDetails[ingredient];
        const measure = store.productDetails[`strMeasure${i + 1}`];
        const message = measure ? `- ${ing} - ${measure}` : `- ${ing}`;
        ingredientsList.push(message);
        return true;
      }
      return false;
    });

    return ingredientsList;
  }

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
            style={{ width: 400, height: 400 }}
            src={store.productDetails.strMealThumb || store.productDetails.strDrinkThumb}
            alt="thumbnail"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{store.productDetails.strMeal || store.productDetails.strDrink}</p>
          <p data-testid="recipe-category">{store.productDetails.strAlcoholic || store.productDetails.strCategory}</p>
          <img data-testid="share-btn" src={share} alt="" />
          <img data-testid="favorite-btn" src={heart} alt="" />
          <div>
            <p>Ingredients</p>
            <div>
              {printIngredients()
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
          <div data-testid="instructions">
            {store.productDetails.strInstructions}
          </div>

          <button
            style={{ position: 'fixed', bottom: 0 }}
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar Receita

          </button>

        </div>
      )
  );
}

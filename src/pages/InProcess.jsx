import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';
import Loading from '../components/Loading';
import Checkboxingredient from '../components/CheckBoxIngredient';
import Favcontainer from '../components/FavContainer';
import printIngredients from '../service/utilFunctions';
import '../style/Inprocess.css';

const _ = require('lodash');

function renderId(store) {
  return store.productDetails.idDrink || store.productDetails.idMeal;
}

function renderArea(store) {
  return store.productDetails.strArea || '';
}

function saveDone(store, history, location) {
  const {
    strCategory, strAlcoholic, strDrink, strMeal, strDrinkThumb, strMealThumb, strTags,
  } = store.productDetails;
  const doneRecipe = {
    id: renderId(store),
    type: location.pathname.slice(1).split('/')[0].slice(0, 6),
    area: renderArea(store),
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink || strMeal,
    image: strMealThumb || strDrinkThumb,
    doneDate: new Date(),
    tags: (strTags && strTags.split(',')) || [],
  };

  const doneArray = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneArray) {
    localStorage.setItem('doneRecipes', JSON.stringify([...doneArray, doneRecipe]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  }

  history.push('/receitas-feitas');
}

function renderIngredients(store, location, setChecked) {
  return (
    <div>
      <p className="title-box">INGREDIENTS</p>
      <div>
        {printIngredients(store)
          .map((ingredients, index) => (
            <Checkboxingredient
              key={_.uniqueId()}
              index={index}
              recipeId={location.pathname.slice(1).split('/')[1]}
              setDone={setChecked}
            >
              {ingredients}
            </Checkboxingredient>
          ))}
      </div>
    </div>
  );
}

function buttonRefatorado(store, history, location, done) {
  return (
    <button
      className="btn-finalizar"
      data-testid="finish-recipe-btn"
      type="button"
      onClick={() => saveDone(store, history, location)}
      disabled={!done}
    >
      Finalizar Receita
    </button>
  );
}

function instrucions(store) {
  return (
    <div data-testid="instructions" className="body-box">
      <p className="title-box">INSTRUCTIONS</p>
      <p className="txt-ingredients">{store.productDetails.strInstructions}</p>
    </div>
  );
}

function categoryTxt(store) {
  return (
    <p className="category-txt" data-testid="recipe-category">
      {store.productDetails.strAlcoholic || store.productDetails.strCategory}
    </p>
  );
}

function renderImage(store) {
  return (
    <img
      className="image"
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

  const setChecked = () => {
    try {
      const keys = type === 'comidas' ? 'meals' : 'cocktails';
      setDone(printIngredients(store).length === JSON.parse(localStorage.getItem('inProgressRecipes'))[keys][id].length);
    } catch (e) {
      setDone(false);
    }
  };

  useEffect(() => {
    store.getProductDetails(type, id);
    store.getRecomendations(type);
  }, []);

  // useEffect(setChecked);

  return (
    _.isEmpty(store.productDetails) ? <Loading />
      : (
        <div className="body">
          {renderImage(store)}
          <p className="title-txt" data-testid="recipe-title">
            {store.productDetails.strMeal || store.productDetails.strDrink}
          </p>
          {categoryTxt(store)}
          <span className="favs"><Favcontainer /></span>
          <span className="body-box">
            <p className="txt-ingredients">{renderIngredients(store, location, setChecked)}</p>
          </span>
          {instrucions(store)}
          {buttonRefatorado(store, history, location, done)}
        </div>
      )
  );
}

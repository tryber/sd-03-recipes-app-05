import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';
import Loading from '../components/Loading';
import Minicard from '../components/MiniCard';
import Favcontainer from '../components/FavContainer';
import printIngredients from '../service/utilFunctions';

const _ = require('lodash');

function isDone(store) {
  const product = store.productDetails;
  const idtoCompare = product.idMeal || product.idDrink;
  const doneArray = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  return doneArray.some(({ id }) => id === idtoCompare);
}

function goToProgress(store, buttonText, location, history) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const id = store.productDetails.idDrink || store.productDetails.idMeal;
  if (buttonText === 'Iniciar Receita') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgress, [id]: [] }));
  }

  const path = location.pathname;
  history.push(`${path}/in-progress`);
}

function makeButtonText(id) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) return 'Iniciar Receita';

  return Object.keys(inProgress).includes(id) ? 'Continuar Receita' : 'Iniciar Receita';
}

function renderIngredients(store) {
  return (
    <div>
      <p>Ingredients</p>
      <div>
        {printIngredients(store)
          .map((ingredients, index) => (
            <p
              data-testid={`${index}-ingredient-name-and-measure`}
              key={_.uniqueId()}
            >
              {ingredients}
            </p>
          ))}
      </div>
    </div>
  );
}

function renderRecomendations(store, page) {
  return (
    <div>
      <p>Recomendadas</p>
      {store.recomendations.map((reco, index) => (
        <Minicard
          style={{ display: _.inRange(index, page, page + 2) ? 'inline' : 'none' }}
          thumb={reco.strMealThumb || reco.strDrinkThumb}
          title={reco.strMeal || reco.strDrink}
          category={reco.strCategory}
          index={index}
        />
      ))}
    </div>
  );
}

function renderYoutube(store) {
  return store.productDetails.strYoutube && (
    <div className="video">
      <p>Youtube</p>
      <iframe
        data-testid="video"
        title="youtube Video"
        src={store.productDetails.strYoutube.replace('watch?v=', 'embed/')}
      />
    </div>
  );
}

function renderImage(store) {
  return (
    <img
      style={{ width: 400, height: 400 }}
      src={store.productDetails.strMealThumb || store.productDetails.strDrinkThumb}
      alt="thumbnail"
      data-testid="recipe-photo"
    />
  );
}

export default function Productdetails() {
  const store = useContext(ProducDetailsContext);
  const [page] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const [buttonText, setButtonText] = useState('Iniciar receita');

  useEffect(() => {
    const [type, id] = location.pathname.slice(1).split('/');
    store.getRecomendations(type);
    store.getProductDetails(type, id);
    setButtonText(makeButtonText(id));
  }, []);

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
          {renderIngredients(store)}
          <div data-testid="instructions">
            {store.productDetails.strInstructions}
          </div>
          {renderYoutube(store)}
          {renderRecomendations(store, page)}
          <button
            onClick={() => goToProgress(store, buttonText, location, history)}
            style={{ position: 'fixed', bottom: 0, display: isDone(store) ? 'none' : 'block' }}
            data-testid="start-recipe-btn"
            type="button"
          >
            {buttonText}

          </button>
          )

        </div>
      )
  );
}
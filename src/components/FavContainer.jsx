import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import favHeart from '../images/blackHeartIcon.svg';

import { ProducDetailsContext } from '../contexts/ProducDetailsContext';

const ClipboardJS = require('clipboard');

function renderId(store) {
  return store.productDetails.idDrink || store.productDetails.idMeal;
}

function renderName(store) {
  return store.productDetails.strDrink || store.productDetails.strMeal;
}

function renderThumb(store) {
  return store.productDetails.strMealThumb || store.productDetails.strDrinkThumb;
}

function setFavorite(store, fav, location, setFav) {
  if (!fav) {
    const { strCategory, strAlcoholic } = store.productDetails;
    const favorite = {
      id: renderId(store),
      type: location.pathname.slice(1).split('/')[0],
      area: store.productDetails.strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: renderName(store),
      image: renderThumb(store),
    };

    const favArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favArray) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favArray, favorite]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
    }

    setFav(true);
  } else {
    const thisId = store.productDetails.idDrink || store.productDetails.idMeal;
    setFav(false);
    const favArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favArray.filter(({ id }) => id !== thisId)));
  }
}

function renderImage(location) {
  return (
    <img
      className="clip"
      style={{ cursor: 'pointer' }}
      data-testid="share-btn"
      data-clipboard-text={`localhost:3000${location.pathname}`}
      src={share}
      alt=""
    />
  );
}

export default function Favcontainer() {
  const location = useLocation();
  const [aria, setAria] = useState(false);
  const [fav, setFav] = useState(false);
  const store = useContext(ProducDetailsContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('.clip');
    const thisId = store.productDetails.idDrink || store.productDetails.idMeal;

    const favArray = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favArray)setFav(favArray.some(({ id }) => id === thisId));

    clipboard.on('success', function () {
      setAria(true);
      setTimeout(() => setAria(false), 2000);
    });
  }, []);

  return (
    <div>
      {renderImage(location)}
      <button
        type="button"
        onClick={() => setFavorite(store, fav, location, setFav)}
        data-testid="favorite-btn"
      >
        <img
          src={fav ? favHeart : heart}
          alt=""
        />
      </button>

      {aria && (
      <p
        style={{
          position: 'fixed',
          top: 10,
          right: '50%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '4px 8px',
          color: 'white',

        }}
      >
        Link copiado!
      </p>
      )}
    </div>
  );
}

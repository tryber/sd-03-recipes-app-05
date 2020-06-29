import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import favHeart from '../images/blackHeartIcon.svg';

import { ProducDetailsContext } from '../contexts/ProducDetailsContext';

const ClipboardJS = require('clipboard');

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

  function setFavorite() {
    if (!fav) {
      const {
        strCategory, strAlcoholic, strDrink, strMeal, strDrinkThumb, strMealThumb,
      } = store.productDetails;
      const favorite = {
        id: store.productDetails.idDrink || store.productDetails.idMeal,
        type: location.pathname.slice(1).split('/')[0],
        area: store.productDetails.strArea || '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink || strMeal,
        image: strMealThumb || strDrinkThumb,
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

  return (
    <div>
      <img
        className="clip"
        style={{ cursor: 'pointer' }}
        data-testid="share-btn"
        data-clipboard-text={`localhost:3000${location.pathname}`}
        src={share}
        alt=""
      />
      <img
        role="presentation"
        onClick={setFavorite}
        data-testid="favorite-btn"
        src={fav ? favHeart : heart}
        alt=""
      />

      {aria && (
      <p style={{
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

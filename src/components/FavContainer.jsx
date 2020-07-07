import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import heart from '../images/whiteHeartIcon.svg';
import favHeart from '../images/blackHeartIcon.svg';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';

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
      type: location.pathname.slice(1).split('/')[0].slice(0, 6),
      area: store.productDetails.strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
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

function copyContent(location, setAria) {
  const [type, id] = location.pathname.slice(1).split('/');
  navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`).then(() => {
    setAria(true);
    setTimeout(() => setAria(false), 2000);
  });
}

function renderImage(location, setAria) {
  return (
    <button
      type="button"
      data-testid="share-btn"
      className="button-ico"
      onClick={() => copyContent(location, setAria)}
    >
      <img
        style={{ cursor: 'pointer' }}
        src={share}
        alt="icone compartilhar"
        className="image-ico"
      />
    </button>
  );
}

export default function Favcontainer() {
  const location = useLocation();
  const [aria, setAria] = useState(false);
  const [fav, setFav] = useState(false);
  const store = useContext(ProducDetailsContext);

  useEffect(() => {
    const thisId = store.productDetails.idDrink || store.productDetails.idMeal;

    const favArray = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favArray)setFav(favArray.some(({ id }) => id === thisId));
  }, []);

  return (
    <div>
      {renderImage(location, setAria)}
      <button
        type="button"
        onClick={() => setFavorite(store, fav, location, setFav)}
        className="button-ico"
      >
        <img
          data-testid="favorite-btn"
          src={fav ? favHeart : heart}
          alt=""
          className="image-ico"
        />
      </button>

      {aria && (
      <p
        style={{
          position: 'fixed',
          top: '10px',
          right: '38%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '5px 10px',
          color: 'white',

        }}
      >
        Link copiado!
      </p>
      )}
    </div>
  );
}

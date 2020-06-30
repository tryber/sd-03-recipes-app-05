import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import Namebutton from './NameButton';
import Copybutton from './CopyButton';

function copyCont(type, id, setAria) {
  navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`).then(() => {
    setAria(true);
    setTimeout(() => setAria(false), 2001);
  });
}

function moveDetails(history, type, id) {
  history.push(`/${type}s/${id}`);
}

function renderAria(aria) {
  return aria && (
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
  );
}

function renderImage(index, history, type, id, image) {
  return (
    <button
      type="button"
      onClick={() => moveDetails(history, type, id)}
      className="card-thumb"
    >
      <img
        data-testid={`${index}-horizontal-image`}
        src={image}
        alt=""
        style={{ width: 200 }}
      />
    </button>
  );
}

function desFav(recipeId, setRecipes) {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const filteredRecipes = recipes.filter(({ id }) => id !== recipeId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  setRecipes(filteredRecipes);
}

export default function FavoriteRecipeCard({ index, recipe, setRecipes }) {
  const {
    image, name, type, alcoholicOrNot, area, category, id,
  } = recipe;
  const [aria, setAria] = useState(false);
  const history = useHistory();

  return (
    <div>
      {renderImage(index, history, type, id, image)}
      <span data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot || `${area} - ${category}`}</span>
      {/* <button
        type="button"
        onClick={() => moveDetails(history, type, id)}
        data-testid={`${index}-horizontal-name`}
        className="name"
      >
        {name}

      </button> */}
      <Namebutton {...{
        name, index, moveDetails, history, type, id,
      }}
      />

      <button
        type="button"
        onClick={(e) => desFav(id, setRecipes)}
      >
        <img
          data-testid={`${index}-horizontal-favorite-btn`}
          src={favIcon}
          alt=""
        />
      </button>

      {/* <button
        type="button"
        onClick={(e) => copyCont(type, id, setAria)}
        className="content-type"
      >
        <img
          data-testid={`${index}-horizontal-share-btn`}
          style={{ cursor: 'pointer' }}
          src={share}
          alt=""
        />
      </button> */}
      <Copybutton {...{
        copyCont, type, id, setAria, share, index,
      }}
      />
      {renderAria(aria)}
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  setRecipes: PropTypes.func.isRequired,
};

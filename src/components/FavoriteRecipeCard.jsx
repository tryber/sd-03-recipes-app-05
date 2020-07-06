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
    <p>
      Link copiado!
    </p>
  );
}

function renderImage(index, history, type, id, image) {
  return (
    // <button
    //   type="button"
    //   onClick={() => moveDetails(history, type, id)}
    //   className="card-thumb"
    // >
    //   <img
    //     data-testid={`${index}-horizontal-image`}
    //     src={image}
    //     alt=""
    //     style={{ width: 200 }}
    //   />
    // </button>
    <Namebutton
      {...{
        index, moveDetails, history, type, id,
      }}
    >
      <img
        data-testid={`${index}-horizontal-image`}
        src={image}
        alt="Imagem receita"
        className="img-box-fav"
      />

    </Namebutton>
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
    <div className="container-receita-fav">
      <span className="btn-image-fav">{renderImage(index, history, type, id, image)}</span>
      <div className="container-right-fav">
        <span className="category-text-fav" data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot || `${area} - ${category}`}</span>
        {/* <button
          type="button"
          onClick={() => moveDetails(history, type, id)}
          data-testid={`${index}-horizontal-name`}
          className="name"
        >
          {name}

        </button> */}
        <Namebutton
          {...{
            index, moveDetails, history, type, id,
          }}
        >
          {name}

        </Namebutton>
        <div className="icons">
          <button
            type="button"
            onClick={() => desFav(id, setRecipes)}
            className="btn-icon-fav"
          >
            <img
              data-testid={`${index}-horizontal-favorite-btn`}
              src={favIcon}
              alt=""
              className="img-icon-fav"
            />
          </button>
          <Copybutton
            {...{
              copyCont, type, id, setAria, share, index,
            }}
          />
          {renderAria(aria)}
        </div>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  setRecipes: PropTypes.func.isRequired,
};

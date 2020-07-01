import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import share from '../images/shareIcon.svg';

function copyContent(type, id, setAria) {
  navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`).then(() => {
    setAria(true);
    setTimeout(() => setAria(false), 2000);
  });
}

function moveToDetails(history, type, id) {
  history.push(`/${type}s/${id}`);
}

function renderAria(aria) {
  return aria && (
    <p
      style={{
        position: 'fixed',
        top: 10,
        left: '50%',
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
      onClick={() => moveToDetails(history, type, id)}
      className="btn-image"
    >
      <img
        data-testid={`${index}-horizontal-image`}
        src={image}
        alt=""
        className="img-box"
      />
    </button>
  );
}

export default function Recipecard({ index, recipe }) {
  const {
    image, tags, name, doneDate, type, alcoholicOrNot, area, category, id,
  } = recipe;
  const [aria, setAria] = useState(false);
  const history = useHistory();

  return (
    <div className="container-receita">
      {renderImage(index, history, type, id, image)}
      <div className="container-right">
        <div className="box-title">
          <p className="category-text" data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot || `${area} - ${category}`}</p>
          <button
            className="btn-share"
            type="button"
            onClick={() => copyContent(type, id, setAria)}
          >
            <img
              data-testid={`${index}-horizontal-share-btn`}
              className="img-share"
              src={share}
              alt=""
            />
          </button>
        </div>
        <button
          className="btn-title"
          type="button"
          onClick={() => moveToDetails(history, type, id)}
          data-testid={`${index}-horizontal-name`}
        >
          {name}
        </button>
        <p className="txt-date" data-testid={`${index}-horizontal-done-date`}>{`Feita em: ${doneDate}`}</p>

        <div className="tag-container">
          {tags.slice(0, 2)
            .map((tagName) => <p className="tags" data-testid={`${index}-${tagName}-horizontal-tag`}>{tagName}</p>)}
        </div>
        {renderAria(aria)}
      </div>
    </div>
  );
}

Recipecard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

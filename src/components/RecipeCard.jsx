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
      onClick={() => moveToDetails(history, type, id)}
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

export default function Recipecard({ index, recipe }) {
  const {
    image, tags, name, doneDate, type, alcoholicOrNot, area, category, id,
  } = recipe;
  const [aria, setAria] = useState(false);
  const history = useHistory();

  return (
    <div>
      {renderImage(index, history, type, id, image)}
      <p data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot || `${area} - ${category}`}</p>
      <button
        type="button"
        onClick={() => moveToDetails(history, type, id)}
        data-testid={`${index}-horizontal-name`}
      >
        {name}

      </button>
      <p data-testid={`${index}-horizontal-done-date`}>{`feito em:${doneDate}`}</p>

      <div className="tag-container">
        {tags.slice(0, 2)
          .map((tagName) => <p data-testid={`${index}-${tagName}-horizontal-tag`}>{tagName}</p>)}
      </div>

      <button
        type="button"
        onClick={() => copyContent(type, id, setAria)}
      >
        <img
          data-testid={`${index}-horizontal-share-btn`}
          style={{ cursor: 'pointer' }}
          src={share}
          alt=""
        />
      </button>
      {renderAria(aria)}
    </div>
  );
}

Recipecard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

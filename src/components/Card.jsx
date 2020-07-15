/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/Comidas.css';

export default function Card({
  index, thumb, meal, id,
}) {
  const history = useHistory();

  function handleClick() {
    let type;
    if (history.location.pathname.includes('comidas')) {
      type = 'comidas';
    } else { type = 'bebidas'; }
    history.push(`/${type}/${id}`);
  }

  return (
    <div className="cards" onClick={handleClick} data-testid={`${index}-recipe-card`}>
      <img
        className="images"
        src={thumb}
        alt="Meal"
        data-testid={`${index}-card-img`}
      />
      <p data-testid={`${index}-card-name`} className="text-card">{meal}</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

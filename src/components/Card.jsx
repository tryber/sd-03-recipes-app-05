import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/Comidas.css';

export default function Card({
  index, thumb, meal, id,
}) {
  const history = useHistory();

  function handleClick() {
    history.push(`${history.location.pathname}/${id}`);
  }

  return (
    <div
      onClick={handleClick}
      data-testid={`${index}-recipe-card`}
      className="cards"
    >
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
  id: PropTypes.number.isRequired,
};

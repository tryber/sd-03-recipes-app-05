/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

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

    <div
      onClick={handleClick}
      data-testid={`${index}-recipe-card`}
      style={{
        width: 200,
        height: 280,
        borderRadius: 10,
        border: 'thin solid black',
        boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
        margin: 5,
      }}
    >
      <img
        style={{ width: '100%', borderRadius: '10px 10px 0 0 ' }}
        src={thumb}
        alt="Meal"
        data-testid={`${index}-card-img`}
      />
      <p style={{ margin: '10px 0 0 30px', fontSize: 24 }} data-testid={`${index}-card-name`}>{meal}</p>

    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

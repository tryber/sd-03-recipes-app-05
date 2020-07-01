import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function fetchIngredient(children, type) {
  if (type === 'comidas') {
    return `https://www.themealdb.com/images/ingredients/${children}-Small.png`;
  }
  return `https://www.thecocktaildb.com/images/ingredients/${children}-Small.png`;
}

export default function ExplorarCard({ index, children }) {
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  return (
    <Link to={{ pathname: `/${type}`, state: { filter: children } }}>
      <div data-testid={`${index}-ingredient-card`}>
        <img data-testid={`${index}-card-img`} src={fetchIngredient(children, type)} alt="" />
        <p data-testid={`${index}-card-name`}>{children}</p>
      </div>
    </Link>
  );
}

ExplorarCard.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};

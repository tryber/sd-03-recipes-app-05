import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src={mealIcon} alt="food icon" />
      </Link>

      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src={exploreIcon} alt="search icon" />
      </Link>

      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={drinkIcon} alt="drink icon" />
      </Link>
    </footer>
  );
}

export default Footer;

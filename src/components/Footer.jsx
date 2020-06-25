import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer>
      <Link to="/comidas">
        <img src={mealIcon} alt="food icon" />
      </Link>

      <Link to="/explorar">
        <img src={exploreIcon} alt="search icon" />
      </Link>

      <Link to="/bebidas">
        <img src={drinkIcon} alt="drink icon" />
      </Link>
    </footer>
  );
}

export default Footer;

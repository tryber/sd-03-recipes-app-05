import React from 'react';
import { Link } from 'react-router-dom';
import foodIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const Footer = () => {
  return (
    <footer>
      <Link to="/comidas">
        <img src={foodIcon} alt="food icon" />
      </Link>

      <Link to="/explorar">
        <img src={exploreIcon} alt="search icon" />
      </Link>

      <Link to="/bebidas">
        <img src={drinkIcon} alt="drink icon" />
      </Link>
    </footer>
  );
};

export default Footer;

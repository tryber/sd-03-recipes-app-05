import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={mealIcon}
          className="icon"
          alt="food icon"
        />
      </Link>

      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={exploreIcon}
          className="icon"
          alt="search icon"
        />
      </Link>

      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={drinkIcon}
          className="icon"
          alt="drink icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRandomDrink } from '../service/cocktailAPI';
import { getRandomMeal } from '../service/mealAPI';
import FoodLoading from './Loading';
import Footer from './Footer';
import '../style/Explorer-com-beb.css';
import Header from './Header';

async function getRandomDrinkOrMeal(setLink, location) {
  const type = location.pathname.slice(10);

  if (type === 'comidas') {
    const id = await getRandomMeal().then(({ idMeal }) => idMeal);
    setLink(`/comidas/${id}`);
    return;
  }
  const id = await getRandomDrink().then(({ idDrink }) => idDrink);
  setLink(`/bebidas/${id}`);
}

export default function DrinkAndMealExplorer() {
  const [link, setLink] = useState('');

  const location = useLocation();

  useEffect(() => {
    getRandomDrinkOrMeal(setLink, location);
  }, []);

  return link ? (
    <div className="body">
      <Header title={location.pathname.includes('comidas') ? 'Explorar Comidas' : 'Explorar Bebidas'} />
      <section className="btn-group">
        <Link to={`${location.pathname}/ingredientes`} data-testid="explore-by-ingredient">
          <button className="btn">Por Ingredientes</button>
        </Link>
        {location.pathname.slice(10) === 'comidas' && (
          <Link to={`${location.pathname}/area`} data-testid="explore-by-area">
            <button className="btn">Por Local de Origem</button>
          </Link>
        )}
        <Link to={link} data-testid="explore-surprise">
          <button className="btn-3">Me Surpreenda!</button>
        </Link>
      </section>
      <Footer />
    </div>
  ) : (
    <FoodLoading />
  );
}

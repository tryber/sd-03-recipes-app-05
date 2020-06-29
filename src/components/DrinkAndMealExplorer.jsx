import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getRandomDrink } from '../service/cocktailAPI';
import { getRandomMeal } from '../service/mealAPI';
import FoodLoading from '../components/Loading';
import Footer from './Footer';
import '../style/Explorer-com-beb.css';

export default function DrinkAndMealExplorer() {
  const [link, setLink] = useState('');

  const location = useLocation();

  const getRandomDrinkOrMeal = async () => {
    const type = location.pathname.slice(10);

    if (type === 'comidas') {
      const id = await getRandomMeal().then(({ idMeal }) => idMeal);
      setLink(`/comidas/${id}`);
      return;
    }
    const id = await getRandomDrink().then(({ idDrink }) => idDrink);
    setLink(`/bebidas/${id}`);
  };

  useEffect(() => {
    getRandomDrinkOrMeal();
  }, []);

  return link ? (
    <div className="body">
      <section className="btn-group">
        <Link to={`${location.pathname}/ingredientes`} data-testid="explore-by-ingredient">
          <button className="btn">Por Ingredientes</button>
        </Link>
        {location.pathname.slice(10) === 'comidas' && (
          <Link to={`${location.pathname}/area`} data-testid="explore-by-area">
            <button className="btn">Por local de origem</button>
          </Link>
        )}
        <Link to={link} data-testid="explore-surprise">
        <button className="btn-3">Me surpreenda!</button>
        </Link>
      </section>
      <Footer />
    </div>
  ) : (
    <FoodLoading />
  );
}

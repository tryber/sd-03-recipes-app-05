import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getRandomDrink } from '../service/cocktailAPI';
import { getRandomMeal } from '../service/mealAPI';
import FoodLoading from '../components/Loading';

export default function DrinkAndMealExplorer() {
  const [link, setLink] = useState('');

  const location = useLocation();

  const getRandomDrinkOrMeal = async () => {
    
    const type = location.pathname.slice(10);
    console.log(type);
    if (type === 'comidas') {
      const idMeal = await getRandomMeal().then(({ idMeal }) => idMeal);
      setLink(`/comidas/${idMeal}`);
      return;
    }
    const idDrink = await getRandomDrink().then(({ idDrink }) => idDrink);
    setLink(`/bebidas/${idDrink}`);
  };

  useEffect(() => {
    getRandomDrinkOrMeal();
  }, []);

  return link ? (
    <div>
      <Link to={`${location.pathname}/ingredientes`} data-testid="explore-by-ingredient">
        Por Ingredientes
      </Link>
      {location.pathname.slice(10) === 'comidas' && (
        <Link to={`${location.pathname}/area`} data-testid="explore-by-area">
          Por Local de Origem
        </Link>
      )}
      <Link to={link} data-testid="explore-surprise">
        Me Surpreenda!
      </Link>
    </div>
  ) : (
    <FoodLoading />
  );
}

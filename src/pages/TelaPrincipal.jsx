import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Categoryfilter from '../components/CategoryFilter';
import Loading from '../components/Loading';
import { TelaPrincipalContext } from '../contexts/TelaPrincipalContext';
import '../style/Comidas.css';

export default function Telaprincipal() {
  const store = useContext(TelaPrincipalContext);
  const location = useLocation();

  useEffect(() => {
    store.getContent(location.pathname.slice(1));
    store.getCategories(location.pathname.slice(1));
  }, []);
  return (
    !store.content.length || !store.categories.length ? <Loading />
      : (
        <div className="body">
          <div className="container-category">
            <Categoryfilter category="All" />
            {store.categories
              .map((category) => <Categoryfilter key={category} category={category} />)}
          </div>
          <div className="filters-container">

            {store.content.map((meal, index) => (
              <Card
                id={meal.idMeal || meal.idDrink}
                key={meal.strMeal || meal.strDrink}
                index={index}
                thumb={meal.strMealThumb || meal.strDrinkThumb}
                meal={meal.strMeal || meal.strDrink}
              />
            ))}

          </div>

        </div>

      )
  );
}

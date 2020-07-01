import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getIngredientList as drinkIngredients } from '../service/cocktailAPI';
import { getIngredientList } from '../service/mealAPI';
import ExplorarCard from '../components/ExplorarCard';

function fetchIngredientList(type) {
  if (type === 'comidas') {
    return getIngredientList();
  }
  return drinkIngredients();
}

export default function ExplorarIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  useEffect(() => {
    fetchIngredientList(type).then((r) => setIngredients(r.slice(0, 12)));
  }, []);

  return (
  // ingredients.length ? (
    <div>
      {ingredients
        .map((ingredient, index) => (
          <ExplorarCard
            index={index}
            key={ingredient}
          >
            {ingredient}
          </ExplorarCard>
        ))}
    </div>
  // ) : <p>Loading</p>
  );
}

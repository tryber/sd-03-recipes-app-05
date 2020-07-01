import React, { useContext, useEffect } from 'react';
import { origemExplorerContext } from '../contexts/OrigemExplorerContext';
import Card from '../components/Card';

export default function OrigemExplorer() {
  const store = useContext(origemExplorerContext);

  useEffect(() => {
    store.getCategories();
    store.getRecipes();
  }, []);

  return (
    store.recipes.length
    && (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        value={store.filter}
        onChange={(e) => store.changeFilter(e.target.value)}
        name="areas"
        id=""
      >
        <option data-testid="All-option" value="All">All</option>
        {store.categories.map((area) => <option data-testid={`${area}-option`} value={area}>{area}</option>)}
      </select>
      <div>
        {store.recipes.map((meal, index) => (
          <Card
            id={meal.idMeal}
            key={meal.strMeal}
            index={index}
            thumb={meal.strMealThumb}
            meal={meal.strMeal}
          />
        ))}
      </div>

    </div>
    )
  );
}

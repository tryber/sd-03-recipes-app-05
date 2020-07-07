import React, { useContext, useEffect } from 'react';
import { origemExplorerContext } from '../contexts/OrigemExplorerContext';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Explorer-orig.css';

export default function OrigemExplorer() {
  const store = useContext(origemExplorerContext);

  useEffect(() => {
    store.getCategories();
    store.getRecipes();
  }, []);

  return (
    store.recipes.length
    && (
    <div className="body-orig">
      <Header title="Explorar Origem" search />
      <select
        data-testid="explore-by-area-dropdown"
        className="select-orig"
        value={store.filter}
        onChange={(e) => store.changeFilter(e.target.value)}
        name="areas"
        id=""
      >
        <option data-testid="All-option" value="All">All</option>
        {store.categories.map((area) => <option data-testid={`${area}-option`} value={area}>{area}</option>)}
      </select>
      <div className="container-orig">
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
      <Footer />

    </div>
    )
  );
}

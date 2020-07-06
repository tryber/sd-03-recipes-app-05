import React, { useState } from 'react';
import Filtertag from '../components/FilterTag';
import RecipeCard from '../components/RecipeCard';

function filterType(filter) {
  if (filter === 'All') {
    return (name) => name;
  }
  if (filter === 'Food') {
    return (({ type }) => type === 'comida');
  }
  return (({ type }) => type === 'bebida');
}

export default function DoneRecipes() {
  const [filter, setFilter] = useState('All');
  const recipes = JSON.parse(localStorage.getItem('doneRecipes')).filter(filterType(filter));
  return (
    <div>
      <div className="filter-container">
        <Filtertag
          setFilter={setFilter}
          datatest="filter-by-all-btn"
        >
          All

        </Filtertag>
        <Filtertag
          setFilter={setFilter}
          datatest="filter-by-food-btn"
        >
          Food

        </Filtertag>
        <Filtertag
          setFilter={setFilter}
          datatest="filter-by-drink-btn"
        >
          Drinks

        </Filtertag>
      </div>
      <div>
        {recipes.map((recipe, index) => <RecipeCard recipe={recipe} index={index} />)}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Filtertag from '../components/FilterTag';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function filterType(filter) {
  if (filter === 'All') {
    return (name) => name;
  }
  if (filter === 'Food') {
    return (({ type }) => type === 'comida');
  }
  return (({ type }) => type === 'bebida');
}

export default function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const rerender = useState(false)[1];
  let recipes = [];
  try {
    recipes = JSON.parse(localStorage.getItem('favoriteRecipes')).filter(filterType(filter));
  } catch (e) { recipes = []; }

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
        {recipes.length === 0 && 'Não há receitas favoritadas'}
        {recipes.map((recipe, index) => <FavoriteRecipeCard rerender={rerender} recipe={recipe} index={index} />)}
      </div>
    </div>
  );
}

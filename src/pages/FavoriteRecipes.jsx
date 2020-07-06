import React, { useState, useEffect } from 'react';
import Filtertag from '../components/FilterTag';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';

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
  const [recipes, setRecipes] = useState([]);
  const filteredRecipes = recipes.filter(filterType(filter));

  useEffect(() => {
    try {
      setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } catch (e) { setRecipes([]); }
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="filter-container-favorite">
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
        {filteredRecipes
          .map((recipe, index) => (
            <FavoriteRecipeCard
              setRecipes={setRecipes}
              recipe={recipe}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}

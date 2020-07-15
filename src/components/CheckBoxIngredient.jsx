import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const _ = require('lodash');

function check({
  recipeId, index, checked, setChecked, keys,
}) {
  let recipe;
  let inProgress;

  try {
    inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    recipe = inProgress[keys][recipeId];
  } catch (e) {
    inProgress = [];
    recipe = [];
  }
  if (recipe.includes(index)) {
    _.pull(recipe, index);
  } else {
    recipe.push(index);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgress, [keys]: { [recipeId]: recipe } }));
  // store.setRecipes({ ...inProgress, [recipeId]: recipe });
  setChecked(!checked);
}

export default function Checkboxingredient({
  index, children, recipeId, setDone,
}) {
  const location = useLocation();
  const type = location.pathname.includes('comidas') ? 'comidas' : 'bebidas';
  const keys = type === 'comidas' ? 'meals' : 'cocktails';
  function setCheckState() {
    try {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return inProgress[keys][recipeId].includes(index);
    } catch (err) {
      return false;
    }
  }
  const [checked, setChecked] = useState(setCheckState());
  // const store = useContext(ProducDetailsContext);

  return (
    <div
      style={{ display: 'flex' }}
      data-testid={`${index}-ingredient-step`}
    >
      <input
        checked={checked}
        onChange={() => {
          check({
            recipeId, index, checked, setChecked, keys,
          });
          setDone();
          console.log(localStorage.getItem('inProgressRecipes'));
        }}
        type="checkbox"
        name="ingredient"
        id="ingredient"
      />
      <label
        style={{ textDecoration: checked ? 'line-through' : 'none' }}
        htmlFor="ingredient"
      >
        {children}

      </label>
    </div>
  );
}

Checkboxingredient.propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.number.isRequired,
  setDone: PropTypes.func.isRequired,
};

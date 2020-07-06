import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { ProducDetailsContext } from '../contexts/ProducDetailsContext';

const _ = require('lodash');

function check(recipeId, index, checked, setChecked, store) {
  let recipe;
  let inProgress;
  try {
    inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    recipe = inProgress[recipeId];
  } catch (e) {
    inProgress = [];
    recipe = [];
  }
  if (recipe.includes(index)) {
    _.pull(recipe, index);
  } else {
    recipe.push(index);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgress, [recipeId]: recipe }));
  store.setRecipes({ ...inProgress, [recipeId]: recipe });
  setChecked(!checked);
}

export default function Checkboxingredient({ index, children, recipeId }) {
  function setCheckState() {
    try {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return inProgress[recipeId].includes(index);
    } catch (err) {
      return false;
    }
  }
  const [checked, setChecked] = useState(setCheckState());
  const store = useContext(ProducDetailsContext);

  return (
    <div
      style={{ display: 'flex' }}
      data-testid={`${index}-ingredient-step`}
    >
      <input
        checked={checked}
        onChange={() => check(recipeId, index, checked, setChecked, store)}
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
};

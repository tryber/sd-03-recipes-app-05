import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function Checkboxingredient({ index, children, recipeId }) {
  function setCheckState() {
    try {
      return localStorage.getItem(recipeId).includes(index);
    } catch (err) {
      return false;
    }
  }
  const [checked, setChecked] = useState(setCheckState());

  return (
    <div
      style={{ display: 'flex' }}
      data-testid={`${index}-ingredient-step`}
    >
      <input
        checked={checked}
        onChange={() => setChecked(!checked)}
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

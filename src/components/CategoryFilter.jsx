/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { TelaPrincipalContext } from '../contexts/TelaPrincipalContext';
import '../style/Comidas.css';

export default function Categoryfilter({ category = 'All' }) {
  const store = useContext(TelaPrincipalContext);
  const location = useLocation();

  function handleClick() {
    if (store.filter === category || category === 'All') {
      store.getContent(location.pathname.slice(1));
    } else {
      store.getFilteredResults(category, location.pathname.slice(1));
    }
  }
  return (
    <div
      onClick={handleClick}
      data-testid={`${category}-category-filter`}
      className="category"
      style={{
        backgroundColor: store.filter === category ? 'orange' : 'white',
      }}
    >

      <span className="text-category">{category.toUpperCase()}</span>

    </div>
  );
}

Categoryfilter.propTypes = {
  category: PropTypes.string.isRequired,
};

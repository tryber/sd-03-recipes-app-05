import PropTypes from 'prop-types';
import React from 'react';

export default function Filtertag({ children, datatest, setFilter }) {
  return (
    <button
      type="button"
      onClick={() => setFilter(children)}
      data-testid={datatest}
      className="sub-menu"
    >
      <span>{children}</span>
    </button>
  );
}

Filtertag.propTypes = {
  children: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

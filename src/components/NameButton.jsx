import PropTypes from 'prop-types';
import React from 'react';

export default function Namebutton({
  children, index, moveDetails, history, type, id, notDataTest,
}) {
  return (
    <button
      type="button"
      onClick={() => moveDetails(history, type, id)}
      data-testid={!notDataTest && `${index}-horizontal-name`}
      className="btn-title-fav"
    >
      {children}

    </button>
  );
}

Namebutton.propTypes = {
  history: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  moveDetails: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  notDataTest: PropTypes.bool.isRequired,
};

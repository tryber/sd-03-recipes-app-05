import PropTypes from 'prop-types';
import React from 'react';

export default function Namebutton({
  name, index, moveDetails, history, type, id,
}) {
  return (
    <button
      type="button"
      onClick={() => moveDetails(history, type, id)}
      data-testid={`${index}-horizontal-name`}
      className="name"
    >
      {name}

    </button>
  );
}

Namebutton.propTypes = {
  history: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  moveDetails: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

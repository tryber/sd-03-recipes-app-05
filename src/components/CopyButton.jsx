import PropTypes from 'prop-types';
import React from 'react';

export default function Copybutton({
  copyCont, type, id, setAria, share, index,
}) {
  return (
    <button
      type="button"
      onClick={() => copyCont(type, id, setAria)}
      className="content-type"
    >
      <img
        data-testid={`${index}-horizontal-share-btn`}
        style={{ cursor: 'pointer' }}
        src={share}
        alt=""
      />
    </button>
  );
}

Copybutton.propTypes = {
  copyCont: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setAria: PropTypes.func.isRequired,
  share: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

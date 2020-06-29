import PropTypes from 'prop-types';
import React from 'react';

export default function Minicard({
  index, thumb, title, category, style,
}) {
  return (
    <div style={style}>
      <img
        data-testid={`${index}-recomendation-card`}
        style={{ width: 300, height: 300 }}
        src={thumb}
        alt=""
      />
      <p data-testid={`${index}-recomendation-title`}>{title}</p>
      <p>{category}</p>
    </div>
  );
}

Minicard.propTypes = {
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

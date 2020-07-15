import PropTypes from 'prop-types';
import React from 'react';

export default function Minicard({
  index, thumb, title, category, style,
}) {
  return (
    <div style={style} className="box-recom">
      <img
        data-testid={`${index}-recomendation-card`}
        className="img-recom"
        src={thumb}
        alt=""
      />
      <p className="txt-ingredients" data-testid={`${index}-recomendation-title`}>{title}</p>
      <p className="txt-ingredients">{category}</p>
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

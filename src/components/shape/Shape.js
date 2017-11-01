import React from 'react';
import propTypes from 'prop-types';

import config from '../../config';
import './Shape.css';

const { ALL_SHAPES } = config;

const Shape = ({ shape = '' }) => {
  const normalizedShape = shape.toLowerCase();

  return (
    <div className="box has-text-centered shape">
      <i className={`fa fa-hand-${normalizedShape}-o`} style={{ fontSize: "5em" }} aria-hidden="true"></i>
    </div>
  );
};

Shape.propTypes = {
  shape: propTypes.oneOf(ALL_SHAPES).isRequired,
};

export default Shape;
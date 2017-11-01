import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import config from '../../config';
import './Shape.css';

const { ALL_SHAPES } = config;

const Shape = ({ shape = '', selected }) => {
  const normalizedShape = shape.toLowerCase();

  return (
    <div className={classnames('box has-text-centered shape', { selected })}>
      <i className={`fa fa-hand-${normalizedShape}-o`} style={{ fontSize: "5em" }} aria-hidden="true"></i>
    </div>
  );
};

Shape.propTypes = {
  shape: propTypes.oneOf(ALL_SHAPES).isRequired,
  selected: propTypes.bool,
};

Shape.defaultProps = {
  selected: false,
};

export default Shape;
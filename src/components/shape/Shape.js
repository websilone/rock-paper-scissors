import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import config from '../../config';
import { GAME_STATUS_TIE } from '../../constants/gameStatus.constants';
import './Shape.css';

const { ALL_SHAPES } = config;

const Shape = ({ shape = '', selected, winning, gameStatus, canBePlayed, onClick }) => {
  const normalizedShape = shape.toLowerCase();
  const cssClass = classnames(
    'box has-text-centered shape',
    { selected },
    { canBePlayed },
    { winning: selected && winning },
    { loosing: selected && !winning && (gameStatus !== GAME_STATUS_TIE) }
  );

  return (
    <div
      onClick={onClick}
      className={cssClass}
    >
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
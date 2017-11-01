import React from 'react';
import PropTypes from 'prop-types';

import { GAME_MODE_COMPUTER, GAME_MODE_USER} from '../../constants/gameMode.constants';

const MODE_TYPES = [GAME_MODE_COMPUTER, GAME_MODE_USER];

const GameMode = ({ player1, player2 }) => (
  <article className="message is-primary">
    <div className="message-body has-text-centered">
      <span className="icon is-large">
        <i className={`fa fa-2x fa-${player1}`} />
      </span>
      &nbsp;vs&nbsp;
      <span className="icon is-large">
        <i className={`fa fa-2x fa-${player2}`} />
      </span>
    </div>
  </article>
);

GameMode.propTypes = {
  player1: PropTypes.oneOf(MODE_TYPES).isRequired,
  player2: PropTypes.oneOf(MODE_TYPES).isRequired,
};

export default GameMode;
import React from 'react';
import propTypes from 'prop-types';

import {
  GAME_STATUS_START,
  GAME_STATUS_WIN,
  GAME_STATUS_LOSS,
  GAME_STATUS_TIE,
} from '../../constants/gameStatus.constants';
import I18N from '../../i18n';

const GameStatus = ({ status }) => {
  return status ? (
    <div className="box has-text-centered" style={{ marginTop: '14em' }}>
      {
        status === GAME_STATUS_START && (
          <p>
            <span className="icon is-medium" style={{ marginRight: '1em' }}><i className="fa fa-handshake-o fa-2x" /></span><br />
            {I18N.gameStatus.start}
          </p>
        )
      }

      {
        status === GAME_STATUS_WIN && (
          <p>
            <span className="icon is-medium" style={{ marginRight: '1em' }}><i className="fa fa-thumbs-up fa-2x" /></span><br />
            {I18N.gameStatus.win}
          </p>
        )
      }

      {
        status === GAME_STATUS_LOSS && (
          <p>
            <span className="icon is-medium" style={{ marginRight: '1em' }}><i className="fa fa-thumbs-down fa-2x" /></span><br />
            {I18N.gameStatus.loss}
          </p>
        )
      }

      {
        status === GAME_STATUS_TIE && (
          <p>
            <span className="icon is-medium" style={{ marginRight: '1em' }}><i className="fa fa-meh-o fa-2x" /></span><br />
            {I18N.gameStatus.tie}
          </p>
        )
      }
    </div>
  ) : null;
};

GameStatus.propTypes = {
  status: propTypes.oneOf([GAME_STATUS_START,
    GAME_STATUS_WIN,
    GAME_STATUS_LOSS,
    GAME_STATUS_TIE,
  ]),
};

export default GameStatus;
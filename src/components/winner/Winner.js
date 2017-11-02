import React from 'react';

import {
  GAME_STATUS_TIE, GAME_STATUS_START,
} from '../../constants/gameStatus.constants';
import I18N from '../../i18n';

const Winner = ({ winner, players, status }) => (
  <div className="box has-text-centered" style={{ marginTop: '14em' }}>
    {
      winner && (<span>{players[winner].name} {I18N.wins}</span>)
    }

    {
      status === GAME_STATUS_TIE && (<span>{I18N.gameStatus.tie}</span>)
    }

    {
      status === GAME_STATUS_START && (<span>{I18N.gameStatus.start}</span>)
    }
  </div>
);

export default Winner;
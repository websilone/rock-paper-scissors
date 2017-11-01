import config from '../../config';
import createReducer from '../createReducer';
import utils from './gameUtils';

import { GAME_STATUS_START } from '../../constants/gameStatus.constants';

export const types = {
  INIT: 'GAME/INIT',
};

export const INITIAL_STATE = {
  availableShapes : [],
  gameStatus: null,
};

export default createReducer(INITIAL_STATE, {
  [types.INIT] (state) {
    return {
      ...state,
      availableShapes: utils.getAvailableShapes(config),
      gameStatus: GAME_STATUS_START,
    };
  }
});

export const actions = {
  init: () => ({ type: types.INIT}),
};
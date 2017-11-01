import config from '../../config';
import createReducer from '../createReducer';
import utils from './gameUtils';

export const types = {
  INIT: 'GAME/INIT',
};

const INITIAL_STATE = {
  availableShapes : [],
};

export default createReducer(INITIAL_STATE, {
  [types.INIT] (state) {
    return {
      ...state,
      availableShapes: utils.getAvailableShapes(config),
    };
  }
});

export const actions = {
  init: () => ({ type: types.INIT}),
};
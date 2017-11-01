import config from '../../config';
import createReducer from '../createReducer';
import utils from './gameUtils';

import { GAME_STATUS_START } from '../../constants/gameStatus.constants';

export const types = {
  INIT: 'GAME/INIT',
  PLAY: 'GAME/PLAY',
  AUTO_PLAY: 'GAME/AUTO_PLAY',
  SET_STATUS: 'GAME/SET_STATUS',
};

export const PLAYERS = {
  PLAYER1: 'player1',
  PLAYER2: 'player2',
};

const DEFAULT_PLAYER = {
  selectedShape: null,
};

export const INITIAL_STATE = {
  availableShapes : [],
  gameStatus: null,
  players: {
    [PLAYERS.PLAYER1]: { ...DEFAULT_PLAYER },
    [PLAYERS.PLAYER2]: { ...DEFAULT_PLAYER },
  },
};

export default createReducer(INITIAL_STATE, {
  [types.INIT] (state) {
    return {
      ...state,
      availableShapes: utils.getAvailableShapes(config),
      gameStatus: GAME_STATUS_START,
      players: {
        [PLAYERS.PLAYER1]: { ...DEFAULT_PLAYER },
        [PLAYERS.PLAYER2]: { ...DEFAULT_PLAYER },
      },
    };
  },

  [types.PLAY] (state, { payload: { player, shape } }) {
    if (!state.players[player] || !utils.getAvailableShapes(config).includes(shape)) {
      return state;
    }
    
    return {
      ...state,
      players: { ...state.players, [player]: { selectedShape: shape } },
    }
  },

  [types.AUTO_PLAY] (state, { payload: { player }}) {
    if (!state.players[player]) {
      return state;
    }

    return {
      ...state,
      players: { ...state.players, [player]: { selectedShape: utils.getRandomShape(config)(Math.random) } },
    }
  },

  [types.SET_STATUS] (state, { payload: { player, opponent }}) {
    return {
      ...state,
      gameStatus: utils.getResultForPlayer(config, state.players, player, opponent),
    };
  },
});

export const actions = {
  init: () => ({ type: types.INIT}),
  play: (player, shape) => {
    const opponent = utils.getOpponent(PLAYERS, player);

    return (dispatch) => {
      dispatch({ type: types.PLAY, payload: { player, shape } });
      dispatch({ type: types.AUTO_PLAY, payload: { player: opponent } });
      dispatch({ type: types.SET_STATUS, payload: { player, opponent } });
    }
  },
};
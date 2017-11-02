import config from '../../config';
import createReducer from '../createReducer';
import utils from './gameUtils';

import { GAME_STATUS_START, GAME_STATUS_WIN, GAME_STATUS_LOSS } from '../../constants/gameStatus.constants';
import { GAME_MODE_COMPUTER, GAME_MODE_USER } from '../../constants/gameMode.constants';

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
  name: '',
  canPlay: false,
};

const player1 = { ...DEFAULT_PLAYER, name: 'You', icon: GAME_MODE_USER, canPlay: true };
const player2 = { ...DEFAULT_PLAYER, name: 'Computer', icon: GAME_MODE_COMPUTER };

export const INITIAL_STATE = {
  availableShapes : [],
  gameStatus: null,
  showResetButton: false,
  players: {
    [PLAYERS.PLAYER1]: player1,
    [PLAYERS.PLAYER2]: player2,
  },
  showPlayButton: false,
};

export default createReducer(INITIAL_STATE, {
  [types.INIT] (state, { payload: { mode } }) {
    if (mode === 'computer') {
      mode = GAME_MODE_COMPUTER;
    }
    else {
      mode = GAME_MODE_USER;
    }

    return {
      ...state,
      availableShapes: utils.getAvailableShapes(config),
      gameStatus: GAME_STATUS_START,
      showResetButton: false,
      winner: null,
      showPlayButton: mode === GAME_MODE_COMPUTER,
      players: {
        [PLAYERS.PLAYER1]: mode === GAME_MODE_COMPUTER ? { ...player1, name: 'Computer 1', icon: GAME_MODE_COMPUTER, canPlay: false} : player1,
        [PLAYERS.PLAYER2]: mode === GAME_MODE_COMPUTER ? { ...player2, name: 'Computer 2' } : player2,
      },
    };
  },

  [types.PLAY] (state, { payload: { player, shape } }) {
    if (!state.players[player] || !utils.getAvailableShapes(config).includes(shape)) {
      return state;
    }
    
    return {
      ...state,
      players: { ...state.players, [player]: { ...state.players[player], selectedShape: shape } },
    }
  },

  [types.AUTO_PLAY] (state, { payload: { player }}) {
    if (!state.players[player]) {
      return state;
    }

    return {
      ...state,
      players: { ...state.players, [player]: { ...state.players[player], selectedShape: utils.getRandomShape(config)(Math.random) } },
    }
  },

  [types.SET_STATUS] (state, { payload: { player, opponent }}) {
    const status = utils.getResultForPlayer(config, state.players, player, opponent);
    
    return {
      ...state,
      gameStatus: status,
      winner: status === GAME_STATUS_WIN ? player : (status === GAME_STATUS_LOSS) ? opponent : null,
      showResetButton: !state.showPlayButton,
    };
  },
});

export const actions = {
  init: (mode) => ({ type: types.INIT, payload: { mode }}),
  play: (player, shape) => {
    const opponent = utils.getOpponent(PLAYERS, player);

    return (dispatch) => {
      dispatch({ type: types.PLAY, payload: { player, shape } });
      dispatch({ type: types.AUTO_PLAY, payload: { player: opponent } });
      dispatch({ type: types.SET_STATUS, payload: { player, opponent } });
    }
  },
  autoPlay: () => {
    return (dispatch) => {
      dispatch({ type: types.AUTO_PLAY, payload: { player: PLAYERS.PLAYER1 } });
      dispatch({ type: types.AUTO_PLAY, payload: { player: PLAYERS.PLAYER2 } });
      dispatch({ type: types.SET_STATUS, payload: { player: PLAYERS.PLAYER1, opponent: PLAYERS.PLAYER2 } });
    };
  }
};
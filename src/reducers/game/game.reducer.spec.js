import sinon from 'sinon';

import config from '../../config';
import { GAME_STATUS_START, GAME_STATUS_WIN } from '../../constants/gameStatus.constants';

import gameUtils from './gameUtils';
import reducer, { types, INITIAL_STATE, PLAYERS, actions } from './game.reducer';

const { ROCK_SHAPE } = config;

describe('Game reducer', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });
 
  describe('Initial state', () => {
    let state;
    
    beforeEach(() => {
      state = reducer();
    });

    describe('availableShapes', () => {
      it('should be an empty array', () => {
        expect(state.availableShapes).toEqual([]);
      });
    });

    describe('gameStatus', () => {
      it('should be null', () => {
        expect(state.gameStatus).toBe(null);
      });
    });

    describe('showResetButton', () => {
      it('should be false', () => {
        expect(state.showResetButton).toBe(false);
      });
    });

    describe(`${PLAYERS.PLAYER1}`, () => {
      it('should be have a selectedShape property set to null', () => {
        expect(state.players[PLAYERS.PLAYER1].selectedShape).toBe(null);
      });
    });

    describe(`${PLAYERS.PLAYER2}`, () => {
      it('should be have a selectedShape property set to null', () => {
        expect(state.players[PLAYERS.PLAYER2].selectedShape).toBe(null);
      });
    });
  });

  describe('INIT', () => {
    let state;

    beforeEach(() => {
      sandbox.stub(gameUtils, 'getAvailableShapes').returns([1, 2]);
      state = reducer(INITIAL_STATE, { type: types.INIT });
    });

    it('should set the available shapes by calling the getAvailableShapes util', () => {
      expect(gameUtils.getAvailableShapes.calledOnce).toBe(true);
      expect(state.availableShapes).toEqual([1, 2]);
    });

    it('should set the gameStatus to START', () => {
      expect(state.gameStatus).toEqual(GAME_STATUS_START);
    });

    it('should set the showResetButton to false', () => {
      state = reducer(state, { type: types.SET_STATUS, payload: { player: PLAYERS.PLAYER1, opponent: PLAYERS.PLAYER2 } });
      state = reducer(state, { type: types.INIT });
      expect(state.showResetButton).toBe(false);
    });
  });

  describe('PLAY', () => {
    describe('The player does not exist', () => {
      it('should return the unchanged state', () => {
        const state = reducer(INITIAL_STATE, { type: types.PLAY, payload: { player: 'toto', shape: ROCK_SHAPE }});

        expect(state).toEqual(INITIAL_STATE);
      });
    });

    describe('The shape in not one of the available ones', () => {
      it('should return the unchanged state', () => {
        const state = reducer(INITIAL_STATE, { type: types.PLAY, payload: { player: PLAYERS.PLAYER1, shape: 'someShape' } });

        expect(state).toEqual(INITIAL_STATE);
      });
    });

    describe('with correct player and shape', () => {
      it('should update the selectedShape for the given player', () => {
        const state = reducer(INITIAL_STATE, { type: types.PLAY, payload: { player: PLAYERS.PLAYER1, shape: ROCK_SHAPE } });

        expect(state.players[PLAYERS.PLAYER1].selectedShape).toBe(ROCK_SHAPE);
        expect(state.players[PLAYERS.PLAYER1].name).toBe("You");
        expect(state.players[PLAYERS.PLAYER2].selectedShape).toBe(null);
      });
    });
  });

  describe('AUTO_PLAY', () => {
    describe('The player does not exist', () => {
      it('should return the unchanged state', () => {
        const state = reducer(INITIAL_STATE, { type: types.AUTO_PLAY, payload: { player: 'toto' } });

        expect(state).toEqual(INITIAL_STATE);
      });
    });

    describe('with an existing player', () => {
      let state;

      beforeEach(() => {
        sandbox.stub(gameUtils, 'getRandomShape').returns(() => ROCK_SHAPE);
        state = reducer(INITIAL_STATE, { type: types.AUTO_PLAY, payload: { player: PLAYERS.PLAYER2 } });
      });
      
      it('should call the getRandomShape util', () => {
        expect(gameUtils.getRandomShape.calledOnce).toBe(true);
      });

      it('should update the selectedShape for the given player', () => {
        expect(state.players[PLAYERS.PLAYER2].selectedShape).toBe(ROCK_SHAPE);
        expect(state.players[PLAYERS.PLAYER2].name).toBe("Computer");
      });
    });
  });

  describe('SET_STATUS', () => {
    let state;

    beforeEach(() => {
      sandbox.stub(gameUtils, 'getResultForPlayer').returns(GAME_STATUS_WIN);
      state = reducer(INITIAL_STATE, { type: types.SET_STATUS, payload: { player: PLAYERS.PLAYER1, opponent: PLAYERS.PLAYER2 } });
    });

    it('should call the getResultForPlayer util', () => {
      expect(gameUtils.getResultForPlayer.calledOnce).toBe(true);
    });

    it('should update the gameStatus', () => {
      expect(state.gameStatus).toBe(GAME_STATUS_WIN);
    });

    it('should set the showResetButton to true', () => {
      expect(state.showResetButton).toBe(true);
    });
  });

  describe('Actions', () => {
    describe('play', () => {
      it('should call the dispatch method with the correct payload', () => {
        const dispatch = sinon.stub();

        actions.play('player', 'shape')(dispatch);

        expect(dispatch.calledWith({
          type: types.PLAY,
          payload: { player: 'player', shape: 'shape' },
        }));
      });
    });

    describe('init', () => {
      it('should be a function', () => {
        expect(actions.init).toBeInstanceOf(Function);
      });

      it('should return an object with a type INIT', () => {
        const action = actions.init();

        expect(action.type).toBe(types.INIT);
      });

      it('should return an object without a payload', () => {
        const action = actions.init();

        expect(action.payload).toBeUndefined();
      });
    });
  });
});
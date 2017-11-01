import sinon from 'sinon';

import { GAME_STATUS_START } from '../../constants/gameStatus.constants';

import gameUtils from './gameUtils';
import reducer, { types, INITIAL_STATE } from './game.reducer';

describe('Game reducer', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });
 
  describe('Initial state', () => {
    describe('availableShapes', () => {
      it('should be an empty array', () => {
        const state = reducer();

        expect(state.availableShapes).toEqual([]);
      });
    });

    describe('gameStatus', () => {
      it('should be undefined', () => {
        const state = reducer();

        expect(state.gameStatus).toBe(null);
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
  });
});
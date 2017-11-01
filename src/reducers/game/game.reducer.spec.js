import sinon from 'sinon';

import gameUtils from './gameUtils';
import reducer, { types } from './game.reducer';

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
  });

  describe('INIT', () => {
    beforeEach(() => {
      sandbox.stub(gameUtils, 'getAvailableShapes').returns([1, 2]);
    });

    it('should set the available shapes by calling the getAvailableShapes util', () => {
      const state = reducer({}, { type: types.INIT });

      expect(gameUtils.getAvailableShapes.calledOnce).toBe(true);
      expect(state.availableShapes).toEqual([1, 2]);
    });
  });
});
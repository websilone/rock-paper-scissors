import sinon from 'sinon';

import config from '../../config';
import {
  GAME_STATUS_WIN,
  GAME_STATUS_LOSS,
  GAME_STATUS_TIE,
} from '../../constants/gameStatus.constants';
import utils from './gameUtils';

describe("Game utils", () => {
  const PLAYERS = {
    PLAYER1: 'player1',
    PLAYER2: 'player2',
  };

  describe('getAvailableShapes', () => {
    it('should return the available shapes from the config', () => {
      expect(utils.getAvailableShapes(config)).toEqual(config.ALL_SHAPES);
    });

    it('should return an empty array by default', () => {
      expect(utils.getAvailableShapes({})).toEqual([]);
    });
  });

  describe('getRandomShape', () => {
    it('should call the given random function', () => {
      const randomStub = sinon.stub();

      utils.getRandomShape(config)(randomStub);

      expect(randomStub.calledOnce).toBe(true);
    });

    it('should return a shape', () => {
      const result = utils.getRandomShape(config)(Math.random);

      expect(config.ALL_SHAPES.includes(result)).toBe(true);
    });

    it('should return the first shape', () => {
      const randomStub = sinon.stub().returns(0.2);
      const result = utils.getRandomShape(config)(randomStub);

      expect(result).toBe(config.ALL_SHAPES[0]);
    });

    it('should return the second shape', () => {
      const randomStub = sinon.stub().returns(0.5);
      const result = utils.getRandomShape(config)(randomStub);

      expect(result).toBe(config.ALL_SHAPES[1]);
    });

    it('should return the last shape', () => {
      const randomStub = sinon.stub().returns(0.9);
      const result = utils.getRandomShape(config)(randomStub);

      expect(result).toBe(config.ALL_SHAPES[2]);
    });
  });

  describe('getOpponent', () => {
    it('should return the other player left', () => {
      const opponent = utils.getOpponent(PLAYERS, PLAYERS.PLAYER1);

      expect(opponent).toBe(PLAYERS.PLAYER2);
    });
  });

  describe('getResultForPlayer', () => {
    describe('WIN', () => {
      it('should return the WIN status', () => {
        const playersResults = {
          [PLAYERS.PLAYER1]: { selectedShape: config.ROCK_SHAPE },
          [PLAYERS.PLAYER2]: { selectedShape: config.SCISSORS_SHAPE },
        };

        const result = utils.getResultForPlayer(config, playersResults, PLAYERS.PLAYER1, PLAYERS.PLAYER2);

        expect(result).toBe(GAME_STATUS_WIN);
      });
    });

    describe('LOSS', () => {
      it('should return the LOSS status', () => {
        const playersResults = {
          [PLAYERS.PLAYER1]: { selectedShape: config.ROCK_SHAPE },
          [PLAYERS.PLAYER2]: { selectedShape: config.PAPER_SHAPE },
        };

        const result = utils.getResultForPlayer(config, playersResults, PLAYERS.PLAYER1, PLAYERS.PLAYER2);

        expect(result).toBe(GAME_STATUS_LOSS);
      });
    });

    describe('TIE', () => {
      it('should return the TIE status', () => {
        const playersResults = {
          [PLAYERS.PLAYER1]: { selectedShape: config.ROCK_SHAPE },
          [PLAYERS.PLAYER2]: { selectedShape: config.ROCK_SHAPE },
        };

        const result = utils.getResultForPlayer(config, playersResults, PLAYERS.PLAYER1, PLAYERS.PLAYER2);

        expect(result).toBe(GAME_STATUS_TIE);
      });
    });
  });
});
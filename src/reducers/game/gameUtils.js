import { omitBy, first } from 'lodash';

import {
  GAME_STATUS_TIE,
  GAME_STATUS_WIN,
  GAME_STATUS_LOSS,
} from '../../constants/gameStatus.constants';

function getAvailableShapes(config = {}) {
  return config.ALL_SHAPES || [];
}

function getRandomShape(config) {
  const min = 0;
  const max = config.ALL_SHAPES.length - 1;

  return (randomFunc) => {
    const randomIndex = Math.floor(randomFunc() * (max - min + 1) + min);
    return config.ALL_SHAPES[randomIndex];
  }
}

function getOpponent(players, currentPlayer) {
  const opponent = omitBy(players, (p) => p === currentPlayer);
  const key = first(Object.keys(opponent));

  return opponent[key];
}

function getResultForPlayer(config, playersResults, currentPlayer, opponent) {
  const RULES = config.RULES;
  const currentPlayerShape = playersResults[currentPlayer].selectedShape;
  const opponentShape = playersResults[opponent].selectedShape;

  if (currentPlayerShape === opponentShape) {
    return GAME_STATUS_TIE;
  }

  if (RULES[currentPlayerShape].includes(opponentShape)) {
    return GAME_STATUS_WIN;
  }

  return GAME_STATUS_LOSS;
}

export default {
  getAvailableShapes,
  getRandomShape,
  getOpponent,
  getResultForPlayer,
}
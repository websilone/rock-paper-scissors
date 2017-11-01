import { omitBy, first } from 'lodash';

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

export default {
  getAvailableShapes,
  getRandomShape,
  getOpponent,
}
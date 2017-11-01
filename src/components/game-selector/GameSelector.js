import React from 'react';
import { Link } from 'react-router-dom';

import GameMode from '../game-mode/GameMode';
import { GAME_MODE_USER, GAME_MODE_COMPUTER } from '../../constants/gameMode.constants';

const GameSelector = () => (
  <div>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="is-size-4 has-text-centered">
            Choose how you want to play
          </div>
        </div>
      </div>
    </section>

    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column">
              <Link to="/user">
                <GameMode player1={GAME_MODE_USER} player2={GAME_MODE_COMPUTER} />
              </Link>
            </div>

            <div className="column">
              <Link to="/computer">
                <GameMode player1={GAME_MODE_COMPUTER} player2={GAME_MODE_COMPUTER} />
              </Link>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default GameSelector;
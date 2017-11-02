import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { get } from 'lodash';

import './Game.css';

import { GAME_MODE_USER } from '../../constants/gameMode.constants';
import I18N from '../../i18n';
import Player from '../player/Player';
import GameStatus from '../game-status/GameStatus';
import Winner from '../winner/Winner';

class Game extends Component {
  componentDidMount() {
    this.props.init(get(this.props, 'match.params.mode', GAME_MODE_USER));
  }

  render() {
    const { shapes, status, players = {}, showReset, showPlay, init, autoPlay, winner } = this.props;
    const playersKeys = Object.keys(players);

    return (
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to="/">
                <span className="icon is-small"><i className="fa fa-chevron-circle-left"></i></span><span>{ I18N.back }</span>
              </Link>
            </li>
          </ul>
        </nav>

        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <Player player={get(players, playersKeys[0])} playerKey={playersKeys[0]} shapes={shapes} play={this.props.play} />
                {
                  !showPlay && (
                    <div className="column">
                      <GameStatus status={status} />

                      {
                        showReset && (
                          <p className="has-text-centered">
                            <span className="button is-small" onClick={init}>{I18N.resetButton}</span>
                          </p>
                        )
                      }
                    </div>
                  )
                }    

                {
                  showPlay && (
                    <div className="column">
                      <Winner players={players} winner={winner} status={status} />

                      <p className="has-text-centered">
                        <span id="autoPlayButton" className="button is-primary" onClick={autoPlay}>{I18N.playButton}</span>
                      </p>
                    </div>
                  )
                }

                <Player player={get(players, playersKeys[1])} playerKey={playersKeys[1]} shapes={shapes} play={this.props.play} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  init: propTypes.func.isRequired,
  play: propTypes.func.isRequired,
  autoPlay: propTypes.func.isRequired,
  shapes : propTypes.array.isRequired,
  status: propTypes.string,
  players: propTypes.shape({
    selectedShape: propTypes.string,
  }),
  winner: propTypes.string,
  showReset: propTypes.bool,
  showPlay: propTypes.bool,
  match: propTypes.any,
};

export default Game;
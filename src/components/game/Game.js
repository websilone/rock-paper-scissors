import React, { Component } from 'react';
import propTypes from 'prop-types';
import { get } from 'lodash';

import { GAME_MODE_USER } from '../../constants/gameMode.constants';
import I18N from '../../i18n';
import Shape from '../shape/Shape';
import GameStatus from '../game-status/GameStatus';

class Game extends Component {
  componentDidMount() {
    this.props.init(get(this.props, 'match.params.mode', GAME_MODE_USER));
  }

  handlePlay(player, shape) {    
    this.props.play(player, shape);
  }

  renderShapes(playerKey, player = {}) {
    const { shapes } = this.props;
    const { selectedShape, canPlay } = player;

    return (
      <div>
        {
          shapes.map((shape, idx) => {
            return (<Shape
              key={idx}
              shape={shape}
              selected={shape === selectedShape}
              canBePlayed={canPlay}
              onClick={() => {
                canPlay && this.handlePlay(playerKey, shape);
              }}
            />);
          })
        }
      </div>
    );
  }

  render() {
    const { status, players = {}, showReset, showPlay, init, autoPlay } = this.props;
    const playersKeys = Object.keys(players);

    return (
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <p className="has-text-centered">
                    <span className="tag is-large is-rounded">
                      <span className="icon is-small" style={{ marginRight: '1em' }}><i className="fa fa-user" /></span>{get(players, `${playersKeys[0]}.name`)}
                    </span>
                  </p>
                  <br />
                  {this.renderShapes(playersKeys[0], get(players, `${playersKeys[0]}`))}
                </div>

                <div className="column">
                  <GameStatus status={status} />

                  {
                    showReset && (
                      <p className="has-text-centered">
                        <span className="button is-small" onClick={init}>{ I18N.resetButton }</span>
                      </p>
                    ) 
                  }

                  {
                    showPlay && (
                      <p className="has-text-centered">
                        <span id="autoPlayButton" className="button is-primary" onClick={autoPlay}>{I18N.playButton}</span>
                      </p>
                    )
                  }
                </div>

                <div className="column">
                  <p className="has-text-centered">
                    <span className="tag is-large is-rounded">
                      <span className="icon is-small" style={{ marginRight: '1em' }}><i className="fa fa-desktop" /></span>{get(players, `${playersKeys[1]}.name`)}
                    </span>
                  </p>
                  <br />
                  {this.renderShapes(playersKeys[1], get(players, `${playersKeys[1]}`))}
                </div>
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
  showReset: propTypes.bool,
  showPlay: propTypes.bool,
  match: propTypes.any,
};

export default Game;
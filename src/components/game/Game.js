import React, { Component } from 'react';
import propTypes from 'prop-types';
import { get } from 'lodash';

import I18N from '../../i18n';
import Shape from '../shape/Shape';
import GameStatus from '../game-status/GameStatus';

class Game extends Component {
  componentDidMount() {
    this.props.init();
  }

  handlePlay(player, shape) {    
    this.props.play(player, shape);
  }

  renderShapes(playerKey, player = {}) {
    const { shapes } = this.props;
    const { selectedShape } = player;

    return (
      <div>
        {
          shapes.map((shape, idx) => {
            return (<Shape key={idx} shape={shape} selected={shape === selectedShape} onClick={() => {
              this.handlePlay(playerKey, shape);
            }} />);
          })
        }
      </div>
    );
  }

  render() {
    const { status, players = {}, showReset } = this.props;
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
                        <span className="button is-small" onClick={() => this.props.init()}>{ I18N.resetButton }</span>
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
  shapes : propTypes.array.isRequired,
  status: propTypes.string,
  players: propTypes.shape({
    selectedShape: propTypes.string,
  }),
  showReset: propTypes.bool,
};

export default Game;
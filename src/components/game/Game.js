import React, { Component } from 'react';
import propTypes from 'prop-types';

import Shape from '../shape/Shape';

class Game extends Component {
  componentDidMount() {
    this.props.init();
  }

  renderShapes() {
    const { shapes } = this.props;

    return (
      <div>
        {
          shapes.map((shape, idx) => {
            return (<Shape key={idx} shape={shape} />);
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <p className="has-text-centered">
                    <span className="tag is-large is-rounded">
                      <span className="icon is-small" style={{ marginRight: '1em' }}><i className="fa fa-user" /></span>You
                    </span>
                  </p>
                  <br />
                  {this.renderShapes()}
                </div>

                <div className="column">
                  
                </div>

                <div className="column">
                  <p className="has-text-centered">
                    <span className="tag is-large is-rounded">
                      <span className="icon is-small" style={{ marginRight: '1em' }}><i className="fa fa-desktop" /></span>Computer
                    </span>
                  </p>
                  <br />
                  {this.renderShapes()}
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
  shapes : propTypes.array.isRequired,
};

export default Game;
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Game extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { shapes } = this.props;

    return (
      <div>
        { shapes.join(', ') }
      </div>
    );
  }
}

Game.propTypes = {
  init: propTypes.func.isRequired,
  shapes : propTypes.array.isRequired,
};

export default Game;
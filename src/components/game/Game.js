import React, { Component } from 'react';
import propTypes from 'prop-types';

import Shape from '../shape/Shape';

class Game extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { shapes } = this.props;

    return (
      <div>
        { shapes.map((shape, idx) => {
          return (<Shape key={idx} shape={shape} />);
        }) }
      </div>
    );
  }
}

Game.propTypes = {
  init: propTypes.func.isRequired,
  shapes : propTypes.array.isRequired,
};

export default Game;
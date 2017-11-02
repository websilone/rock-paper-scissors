import React from 'react';

import Shape from '../shape/Shape';

const Player = ({ player, playerKey, shapes, play }) => (
  <div className="column">
    <p className="has-text-centered">
      <span className="tag is-large is-rounded">
        <span className="icon is-small" style={{ marginRight: '1em' }}><i className={`fa fa-${player.icon}`} /></span>{player.name}
      </span>
    </p>
    <br />
    <div>
      {
        shapes.map((shape, idx) => {
          return (<Shape
            key={idx}
            shape={shape}
            selected={shape === player.selectedShape}
            canBePlayed={player.canPlay}
            onClick={() => {
              player.canPlay && play(playerKey, shape);
            }}
          />);
        })
      }
    </div>
  </div>
);

export default Player;
import { connect } from 'react-redux';
import Game from '../components/game/Game';
import { actions } from '../reducers/game/game.reducer';

const mapStateToProps = state => {
  return {
    shapes: state.game.availableShapes,
    status: state.game.gameStatus,
    players: state.game.players,
    showReset: state.game.showResetButton,
    mode: state.game.gameMode,
  };
}

const mapDispatchToProps = {
  init: actions.init,
  play: actions.play,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

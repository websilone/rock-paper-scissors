import { connect } from 'react-redux';
import Game from '../components/game/Game';
import { actions } from '../reducers/game/game.reducer';

const mapStateToProps = state => {
  return {
    shapes: state.game.availableShapes,
    status: state.game.gameStatus,
  };
}

const mapDispatchToProps = {
  init: actions.init,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

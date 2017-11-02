import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers/configureStore';

import Header from './components/header/Header';
import GameSelector from './components/game-selector/GameSelector';
import GameContainer from './containers/Game.container';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Header />

        <Route exact path="/" component={GameSelector} />
        <Route path="/:mode(user|computer)" component={GameContainer} />
      </div>
    </Router>
  </Provider>
);

export default App;

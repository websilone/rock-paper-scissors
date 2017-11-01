import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import GameSelector from './components/game-selector/GameSelector';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={GameSelector} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';

import './App.css';

import Game from './Components/Game';
import GameData from './Models/GameData';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameData = new GameData();
  }

  render() {
    return (
      <Game gameData={this.gameData} />
    );
  }
}

export default App;

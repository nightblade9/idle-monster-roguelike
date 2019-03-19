import React, { Component } from 'react';

import './App.css';

import GameGrid from './Components/GameGrid';
import GameData from './Models/GameData';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameData = new GameData();
  }

  render() {
    return (
      <GameGrid gameData={this.gameData} />
    );
  }
}

export default App;

import React, { Component } from 'react';
import GameData from './Models/GameData';

import './App.css';
import GameGrid from './Components/GameGrid';

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

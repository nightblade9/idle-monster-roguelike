import React, { Component } from 'react';
import GameGrid from './Components/GameGrid';
import GameData from './Models/GameData';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameData = new GameData();
  }

  render() {
    return (

      <div id="container">
        <GameGrid gameData={this.gameData} />
      </div>
    );
  }
}

export default App;

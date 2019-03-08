import React, { Component } from 'react';
import GameData from './Models/GameData';

import './App.css';
import PlayerController from './Components/PlayerController';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameData = new GameData();
  }

  render() {
    return (

      <div id="container">
        <PlayerController gameData={this.gameData} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import GameGrid from './Components/GameGrid';

import './App.css';

class App extends Component {
  render() {
    return (

      <div id="container">
        <GameGrid />
      </div>
    );
  }
}

export default App;

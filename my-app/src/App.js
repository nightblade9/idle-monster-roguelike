import React, { Component } from 'react';
import GameGrid from './Components/GameGrid';
// import logo from './logo.svg';
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

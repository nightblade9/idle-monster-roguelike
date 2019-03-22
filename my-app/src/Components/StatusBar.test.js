import React from 'react';
import ReactDOM from 'react-dom';

import GameData from '../Models/GameData';
import Player from '../Models/PlayerModel';
import StatusBar from './StatusBar';
import FpsCounter from '../Models/FpsCounter';

it('renders a statusBar div containing direction, with a debug div containing coordinates', () => {
  // Arrange
  const div = document.createElement('div');
  var gameData = new GameData();
  var fpsCounter = new FpsCounter();

  // Act
  gameData.tryMovePlayer(12, 13);

  // Assert
  expect(gameData.player.x).toBe(12);
  expect(gameData.player.y).toBe(13);
  
  ReactDOM.render(<StatusBar gameData={gameData} fpsCounter={fpsCounter} />, div);
  expect(div.textContent).toContain(gameData.player.facing);
  expect(div.children.length).toBe(1);
  var mainDiv = div.children[0];
  expect(mainDiv.id).toBe("statusBar");

  expect(mainDiv.children.length).toBe(1);
  var debugDiv = mainDiv.children[0];
  expect(debugDiv.id).toBe("debug");
  var coordinatesString = gameData.player.x + ", " + gameData.player.y;
  expect(debugDiv.textContent).toContain(coordinatesString);
});

it('statusBar renders FPS from FPS counter', () => {
  // Arrange
  const div = document.createElement('div');
  var gameData = new GameData();
  var fpsCounter = new FpsCounter();
  ReactDOM.render(<StatusBar gameData={gameData} fpsCounter={fpsCounter} />, div);

  var statusBarDiv = div.children[0];
  var debugDiv = div.children[0];
});
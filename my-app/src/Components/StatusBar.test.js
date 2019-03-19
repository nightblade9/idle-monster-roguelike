import React from 'react';
import ReactDOM from 'react-dom';

import GameData from '../Models/GameData';
import Player from '../Models/PlayerModel';
import StatusBar from './StatusBar';

it('renders a statusBar div containing direction, with a debug div containing coordinates', () => {
  // Arrange
  const div = document.createElement('div');
  var gameData = new GameData();

  // Act
  gameData.tryMovePlayer(12, 13);

  // Assert
  expect(gameData.player.x).toBe(12);
  expect(gameData.player.y).toBe(13);
  
  ReactDOM.render(<StatusBar gameData={gameData} />, div);
  expect(div.textContent).toContain(gameData.player.facing);
  expect(div.children.length).toBe(1);
  var mainDiv = div.children[0];
  expect(mainDiv.id).toBe("statusBar");

  expect(mainDiv.children.length).toBe(1);
  var debugDiv = mainDiv.children[0];
  expect(debugDiv.id).toBe("debug");
  var coordinatesString = gameData.player.x + ", " + gameData.player.y;
  expect(debugDiv.textContent).toContain(coordinatesString);
})
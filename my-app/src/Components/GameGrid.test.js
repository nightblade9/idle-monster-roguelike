import React from 'react';
import ReactDOM from 'react-dom';
import GameGrid from './GameGrid';
import GameData from './../Models/GameData';

it('renders without crashing and has a grid div with some tiles', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameGrid gameData={new GameData()} />, div);
  expect(div.children.length).toBe(1);

  var controllerDiv = div.children[0];
  expect(controllerDiv.id).toBe("playerController")
  expect(controllerDiv.children.length).toBe(2);

  var gridDiv = controllerDiv.children[0];
  expect(gridDiv.id).toBe("grid")
  expect(gridDiv.children.length).toBeGreaterThan(1);

  ReactDOM.unmountComponentAtNode(div);
});

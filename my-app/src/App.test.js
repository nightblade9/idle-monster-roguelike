import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameGrid from './GameGrid';

it('renders without crashing and has a container div with a gamegrid', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.children.length).toBe(1);

  var containerDiv = div.children[0];
  expect(containerDiv.id).toBe("container")
  expect(containerDiv.children.length).toBe(1)

  var gameGrid = containerDiv.children[0];
  expect(gameGrid.id).toBe("grid");

  ReactDOM.unmountComponentAtNode(div);
});

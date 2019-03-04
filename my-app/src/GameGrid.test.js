import React from 'react';
import ReactDOM from 'react-dom';
import GameGrid from './GameGrid';

it('renders without crashing and has a grid div with some tiles', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameGrid />, div);
  expect(div.children.length).toBe(1);

  var gridDiv = div.children[0];
  expect(gridDiv.id).toBe("grid")
  expect(gridDiv.children.length).toBeGreaterThan(1);

  ReactDOM.unmountComponentAtNode(div);
});

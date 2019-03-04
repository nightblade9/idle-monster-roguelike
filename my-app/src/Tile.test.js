import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';

it('renders as a floor tile without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe(".")

  ReactDOM.unmountComponentAtNode(div);
});

it('renders as a wall tile if isWall is specified', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile isWall />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("#")

  ReactDOM.unmountComponentAtNode(div);
});

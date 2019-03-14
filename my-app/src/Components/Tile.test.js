import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import TileModel from '../Models/TileModel';

it('renders as a floor tile if contents are specified as floor', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile contents={new TileModel("floor")} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe(".")

  ReactDOM.unmountComponentAtNode(div);
});

it('renders as a wall tile if contents is specified as wall', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile contents={new TileModel("wall")} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("#")

  ReactDOM.unmountComponentAtNode(div);
});

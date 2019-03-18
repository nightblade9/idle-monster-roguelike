import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import TileModel from '../Models/TileModel';
import Player from '../Models/PlayerModel';

it('renders as a floor tile if contents are specified as floor in players sight', () => {
  const div = document.createElement('div');
  var player = new Player(3, 7);
  ReactDOM.render(<Tile contents={new TileModel("floor")} x={player.x - 1} y={player.y + 2} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe(".")

  ReactDOM.unmountComponentAtNode(div);
});

it('renders as a wall tile if contents is specified as wall in players sight', () => {
  const div = document.createElement('div');
  var player = new Player(60, 17);
  ReactDOM.render(<Tile contents={new TileModel("wall")} x={player.x} y={player.y} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("#")

  ReactDOM.unmountComponentAtNode(div);
});

it("renders a wall tile with an empty character placeholder when out of players sight", () => {
  const div = document.createElement('div');
  var player = new Player(30, 20);
  ReactDOM.render(<Tile contents={new TileModel("wall")} x={0} y={0} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("_")

  ReactDOM.unmountComponentAtNode(div);
})
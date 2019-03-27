import React from 'react';
import ReactDOM from 'react-dom';

import Effect from '../Models/Effect';
import Player from '../Models/PlayerModel';
import Tile from './Tile';
import TileModel from '../Models/TileModel';

it('renders as a floor tile if contents are specified as floor in players sight', () => {
  const div = document.createElement('div');
  var player = new Player(3, 7);
  ReactDOM.render(<Tile contents={new TileModel(4, 4, "floor")} x={player.x - 1} y={player.y + 2} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe(".")

  ReactDOM.unmountComponentAtNode(div);
})

it('renders as a wall tile if contents is specified as wall in players sight', () => {
  const div = document.createElement('div');
  var player = new Player(60, 17);
  ReactDOM.render(<Tile contents={new TileModel(60, 15, "wall")} x={player.x} y={player.y} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("#")

  ReactDOM.unmountComponentAtNode(div);
})

it("renders a wall tile with an empty character placeholder when out of players sight", () => {
  const div = document.createElement('div');
  var player = new Player(30, 20);
  ReactDOM.render(<Tile contents={new TileModel(30, 21, "wall")} x={0} y={0} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("_")

  ReactDOM.unmountComponentAtNode(div);
})

it("renders contents if a tile has occupant and is in sight", () => {
  const div = document.createElement('div');
  var player = new Player(30, 20);
  var model = new TileModel(30, 29, "floor");
  model.occupy(player);
  ReactDOM.render(<Tile contents={model} x={player.x} y={player.y} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("@")

  ReactDOM.unmountComponentAtNode(div);
})

it('renders floor/wall character if discovered but out of sight', () => {
  const div = document.createElement('div');
  var player = new Player(30, 20);

  var occupant = Object.assign({}, {DISPLAY_CHARACTER: 'a'});
  var model = new TileModel(0, 0, "floor");
  // Shouldn't see 'a', should see '.'
  model.occupy(occupant);
  
  ReactDOM.render(<Tile contents={model} x={player.x} y={player.y} player={player} />, div);
  expect(div.children.length).toBe(1);
  
  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("a")
})

it('renders effects when set and in-sight', () => {
  const div = document.createElement('div');
  var player = new Player(3, 2);
  var model = new TileModel(1, 1, "floor");
  model.effect = new Effect('*', '#f80');
  ReactDOM.render(<Tile contents={model} x={player.x} y={player.y} player={player} />, div);
  expect(div.children.length).toBe(1);

  var contentDiv = div.children[0];
  expect(contentDiv.innerHTML).toBe("*")

  ReactDOM.unmountComponentAtNode(div);
})
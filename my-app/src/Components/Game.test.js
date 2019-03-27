import React from 'react';
import ReactDOM from 'react-dom';

import Game from './Game';
import GameData from '../Models/GameData';
import ProjectileType from '../Enums/ProjectileType';

it('renders without crashing and has a grid div with some tiles', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game gameData={new GameData()} />, div);
  expect(div.children.length).toBe(1);

  var controllerDiv = div.children[0];
  expect(controllerDiv.id).toBe("playerController")
  expect(controllerDiv.children.length).toBe(2);

  var gridDiv = controllerDiv.children[0];
  expect(gridDiv.id).toBe("grid")
  expect(gridDiv.children.length).toBeGreaterThan(1);

  ReactDOM.unmountComponentAtNode(div);
});

it('onKeyPress calls chargeShot on player for fire key', () => {
  var game = new Game({ gameData: new GameData() });
  game.onKeyPress({key: 'f'});
  expect(game.state["gameData"].player.chargingSince != null);
})

it('getProjectileCharacter returns correct character', () => {
  var game = new Game({ gameData: new GameData() });
  expect(game.getProjectileCharacter(ProjectileType.NORMAL, true)).toBe('-');
  expect(game.getProjectileCharacter(ProjectileType.NORMAL, false)).toBe('|');
  expect(game.getProjectileCharacter(ProjectileType.CHARGED, true)).toBe('=');
  expect(game.getProjectileCharacter(ProjectileType.CHARGED, false)).toBe('║');
})

it('getProjectileCharacter throws when type is unknown', () => {
  var game = new Game({ gameData: new GameData() });
  expect(() => game.getProjectileCharacter("ZIGZAG", true)).toThrow();
})
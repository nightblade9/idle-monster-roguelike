import sinon from 'sinon/lib/sinon';

import Direction from "../Enums/Direction";
import Effect from '../Models/Effect';
import GameData from '../Models/GameData';
import ProjectileController from "./ProjectileController";
import Projectile from "../Models/Projectile";

var clock;

beforeEach(function() {
  clock = sinon.useFakeTimers();
});

afterEach(function() {
  clock.restore();
});

it('moveProjectile moves it in all four compass directions', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);
  
  var projectile = new Projectile(3, 3, Direction.UP);
  system.moveProjectile(projectile)
  expect(projectile.x).toBe(3);
  expect(projectile.y).toBe(2);

  projectile.facing = Direction.RIGHT;
  system.moveProjectile(projectile)
  expect(projectile.x).toBe(4);
  expect(projectile.y).toBe(2);

  projectile.facing = Direction.DOWN;
  system.moveProjectile(projectile)
  expect(projectile.x).toBe(4);
  expect(projectile.y).toBe(3);

  projectile.facing = Direction.LEFT;
  system.moveProjectile(projectile)
  expect(projectile.x).toBe(3);
  expect(projectile.y).toBe(3);
});

it('shouldBeDestroyed returns true if projectile is out of bounds', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);

  // baseline / positive test case
  var projectile = new Projectile(5, 5, Direction.UP);
  expect(system.shouldBeDestroyed(projectile)).toBe(false);

  projectile = new Projectile(-1, 3, Direction.UP);
  expect(system.shouldBeDestroyed(projectile)).toBe(true);

  projectile = new Projectile(1, -3, Direction.UP);
  expect(system.shouldBeDestroyed(projectile)).toBe(true);

  projectile = new Projectile(gameData.currentMap.tilesWide, 3, Direction.UP);
  expect(system.shouldBeDestroyed(projectile)).toBe(true);

  projectile = new Projectile(3, gameData.currentMap.tilesHigh, Direction.UP);
  expect(system.shouldBeDestroyed(projectile)).toBe(true);
});

it('shouldBeDestroyed returns true if projectil tile is a wall', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);
  var projectile = new Projectile(0, 7); // walls along the top
  expect(system.shouldBeDestroyed(projectile)).toBe(true);
})

it('getProjectilePath stops on walls', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);
  var projectile = new Projectile(7, 7, Direction.UP);

  var path = system.getProjectilePath(projectile); // hits top wall and 'splodes
  var finalStep = path[path.length - 1];
  expect(finalStep.y).toBe(0); // top wall
});

it('moveUntilDestroyed moves projectile periodically (setting effect) and executes callback on complete', () => {
  var millisecondsPerStep = 100;

  // Arrange
  var gameData = new GameData();
  // Stay in FOV, observe it hitting the wall
  gameData.player.x = 2;
  gameData.player.y = 2;
  var controller = new ProjectileController(gameData);
  // Travels to (0, 3) and poof!
  var projectile = new Projectile(3, 3, Direction.LEFT);
  var path = controller.getProjectilePath(projectile);
  var effect = new Effect('$', "#ff0");
  var calledOnComplete = false;

  // Act/Assert
  controller.moveUntilDestroyed(projectile, path, millisecondsPerStep, effect, () => calledOnComplete = true);
  // No time elapsed, so projectile should still be in the same spot.
  expect(projectile.x).toBe(3);
  clock.tick(millisecondsPerStep - 1);
  expect(projectile.x).toBe(3);

  // Move and see it moved
  clock.tick(1);
  expect(projectile.x).toBe(2);
  var currentTile = gameData.currentMap.getTile(projectile.x, projectile.y);
  expect(currentTile.effect).toBe(effect);
  // Previously-occupied tile is empty of effects
  expect(gameData.currentMap.getTile(projectile.x + 1, projectile.y).effect).toBe(null);

  // Move it three more times, should be destroyed
  clock.tick(millisecondsPerStep * 3);
  expect(projectile.x).toBe(0);
  expect(projectile.y).toBe(3);

  currentTile = gameData.currentMap.getTile(projectile.x, projectile.y);
  expect(currentTile.effect).toBe(null);

  expect(calledOnComplete).toBe(true);
})

it('moveUntilDestroyed short-cuts projectile to end-path when it gies out of sight', () => {
  var millisecondsPerStep = 50;

  // Arrange
  var gameData = new GameData();
  // Map is wide. It should traverse all the way to the right-side.
  gameData.player.x = 2;
  gameData.player.y = 2;
  var controller = new ProjectileController(gameData);
  // Travels to (0, 3) and poof!
  var projectile = new Projectile(3, 3, Direction.RIGHT);
  var path = controller.getProjectilePath(projectile);
  var effect = new Effect('%', "#ff0");
  var calledOnComplete = false;

  // Act/Assert
  controller.moveUntilDestroyed(projectile, path, millisecondsPerStep, effect, () => calledOnComplete = true);

  // Move and see it moved
  clock.tick(millisecondsPerStep);
  expect(projectile.x).toBe(4);
  var currentTile = gameData.currentMap.getTile(projectile.x, projectile.y);
  expect(currentTile.effect).toBe(effect);
  // Previously-occupied tile is empty of effects
  expect(gameData.currentMap.getTile(projectile.x + 1, projectile.y).effect).toBe(null);

  // Move it a few more times, should go out of sight
  clock.tick(millisecondsPerStep * 7);
  expect(projectile.x).toBe(gameData.currentMap.tilesWide - 1);
  expect(projectile.y).toBe(3);

  currentTile = gameData.currentMap.getTile(projectile.x, projectile.y);
  expect(currentTile.effect).toBe(null);

  expect(calledOnComplete).toBe(true);
})
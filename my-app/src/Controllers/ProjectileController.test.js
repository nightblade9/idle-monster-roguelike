import Direction from "../Enums/Direction";
import ProjectileController from "./ProjectileController";
import GameData from '../Models/GameData';
import Projectile from "../Models/Projectile";

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

it('isDestroyed returns true if projectile is out of bounds', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);

  // baseline / positive test case
  var projectile = new Projectile(5, 5, Direction.UP);
  expect(system.isDestroyed(projectile)).toBe(false);

  projectile = new Projectile(-1, 3, Direction.UP);
  expect(system.isDestroyed(projectile)).toBe(true);

  projectile = new Projectile(1, -3, Direction.UP);
  expect(system.isDestroyed(projectile)).toBe(true);

  projectile = new Projectile(gameData.mapWidth, 3, Direction.UP);
  expect(system.isDestroyed(projectile)).toBe(true);

  projectile = new Projectile(3, gameData.mapHeight, Direction.UP);
  expect(system.isDestroyed(projectile)).toBe(true);
});

it('isDestroyed returns true if projectil tile is a wall', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);
  var projectile = new Projectile(0, 7); // walls along the top
  expect(system.isDestroyed(projectile)).toBe(true);
})

it('processProjectile does not freeze', () => {
  var gameData = new GameData();
  var system = new ProjectileController(gameData);
  system.processProjectile(7, 7, Direction.UP); // hits top wall and 'splodes
});
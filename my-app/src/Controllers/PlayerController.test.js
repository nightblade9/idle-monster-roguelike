import GameData from '../Models/GameData'
import PlayerController from "./PlayerController";
import Direction from '../Enums/Direction';
import TileMap from '../Models/TileMap';

it('tryMovePlayer throws if direction is invalid', () => {
  var gameData = new GameData();
  var controller = new PlayerController(gameData);
  expect(function() { controller.tryMovePlayer("180 Degrees"); }).toThrow();
});

it('tryMovePlayer returns gameData.tryToMove and sets player direction if direction is legit', () => {
  var gameData = new GameData();
  // generates an empty map (no monsters)
  gameData.currentMap = new TileMap(50, 16);
  gameData.currentMap.generate();
  gameData.player.facing = Direction.UP;
  var controller = new PlayerController(gameData);

  var actual = controller.tryMovePlayer(Direction.UP);
  expect(actual).toBe(true);

  // Move up until we bump into a wall
  var n = 10;
  while (n-- > 0) {
    controller.tryMovePlayer(Direction.DOWN);
  }

  actual = controller.tryMovePlayer(Direction.DOWN);
  expect(actual).toBe(false);
  expect(gameData.player.facing).toBe(Direction.DOWN);
});

it('tryMovePlayer discovers tiles in the FOV if moved', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;
  player.x = 3;
  player.y = 3;
  
  // just check one tile
  var fovTile = gameData.currentMap.getTile(player.x - 1, player.y);
  fovTile.discovered = false;
  
  // Act
  var controller = new PlayerController(gameData);
  controller.tryMovePlayer(Direction.UP);

  // Assert
  expect(fovTile.discovered).toBe(true);
});

it('getPlayerFovTiles gets tiles around player', () => {
  var gameData = new GameData();
  var player = gameData.player;
  player.x = 20;
  player.y = 10;

  var controller = new PlayerController(gameData);
  var actual = controller.getPlayerFovTiles();
  expect(actual.length).toBe(47); // manually verified
});

it("tryMovePlayer doesn't move the player if canMove=false", () => {
  var gameData = new GameData();
  var controller = new PlayerController(gameData);

  var expectedCoordinates = [gameData.player.x, gameData.player.y];
  gameData.player.facing = Direction.DOWN;
  gameData.player.canMove = false;
  var actual = controller.tryMovePlayer(Direction.UP);
  var actualCoordinates = [gameData.player.x, gameData.player.y];

  expect(actual).toBe(false);
  expect(gameData.player.facing).toBe(Direction.DOWN);
  expect(actualCoordinates.toString()).toBe(expectedCoordinates.toString());
})
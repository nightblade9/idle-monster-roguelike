import GameData from "./GameData";

it('creates a map in the constructor and sets the player coordinates and tile', () => {
  var gameData = new GameData();
  var mapWidth = gameData.mapWidth;
  var mapHeight = gameData.mapHeight;
  var player = gameData.player;

  expect(gameData.mapWidth).toBeGreaterThan(0);
  expect(gameData.mapHeight).toBeGreaterThan(0);
  expect(gameData.currentMap.length).toBeGreaterThan(0);

  expect(gameData.player.x).toBe(mapWidth / 2);
  expect(gameData.player.y).toBe(mapHeight / 2);

  var playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  var playerTile = gameData.currentMap[playerIndex];
  expect(playerTile.contents).toBe(player);
});

it('creates a map with some wall tiles and some floor tiles, in the constructor', () => {
  var gameData = new GameData();
  var numFloors = 0;
  var numWalls = 0;

  for (var i = 0; i < gameData.currentMap.length; i++) {
    var tile = gameData.currentMap[i];
    var type = tile.type;

    if (type === "wall") {
      numWalls++;
    } else if (type === "floor") {
      numFloors++;
    }
  }

  expect(numFloors).toBeGreaterThan(0);
  expect(numWalls).toBeGreaterThan(0);
});

it('clears old tile contents and moves player to the new tile contents in movePlayer', () => {
  // Arrange
  var gameData = new GameData();
  var mapWidth = gameData.mapWidth;
  var mapHeight = gameData.mapHeight;
  
  var player = gameData.player;

  // Redundant but makes it clear later
  var playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  var playerTile = gameData.currentMap[playerIndex];
  expect(playerTile.contents).toBe(player);

  // Act
  gameData.movePlayer(7, 3); // teleporting is okay for tests

  // Assert
  var newPlayerIndex = gameData.coordinatesToIndex(player.x, player.y);
  expect(newPlayerIndex).not.toBe(playerIndex);
  
  var newPlayerTile = gameData.currentMap[newPlayerIndex];
  expect(newPlayerTile.contents).toBe(player);
  expect(playerTile.contents).toBe(null);
});
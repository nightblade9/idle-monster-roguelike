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
  expect(playerTile.occupant).toBe(player);
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

it('tryMovePlayer clears old tile occupant and moves player to the new tile occupant if walkable', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;

  // Redundant but makes it clear later
  var playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  var playerTile = gameData.currentMap[playerIndex];
  expect(playerTile.occupant).toBe(player);

  // Act
  gameData.tryMovePlayer(10, 9); // teleporting is okay for tests

  // Assert
  var newPlayerIndex = gameData.coordinatesToIndex(player.x, player.y);
  expect(newPlayerIndex).not.toBe(playerIndex);
  
  var newPlayerTile = gameData.currentMap[newPlayerIndex];
  expect(newPlayerTile.occupant).toBe(player);
  expect(playerTile.occupant).toBe(null);
});

it('tryMovePlayer does not move player if target tile is a wall', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;
  player.x = 7;
  player.y = 6;

  // Redundant but makes it clear later
  var playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  var playerTile = gameData.currentMap[playerIndex];
  playerTile.occupy(player);

  // Act
  var tileIndex = gameData.coordinatesToIndex(0, 1);
  var tile = gameData.currentMap[tileIndex];
  tile.type = "wall";
  gameData.tryMovePlayer(0, 1); // Wall at (0, 1)

  // Assert
  expect(tile.occupant).toBe(null);
  expect(player.x).toBe(7);
  expect(player.y).toBe(6);
  playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  playerTile = gameData.currentMap[playerIndex];
  expect(playerTile.occupant).toBe(player);
});

it('tryMovePlayer does not move player if target tile is already occupied', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;
  player.x = 7;
  player.y = 6;

  // Redundant but makes it clear later
  var playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  var playerTile = gameData.currentMap[playerIndex];
  playerTile.occupy(player);

  // Act
  var tileIndex = gameData.coordinatesToIndex(0, 1);
  var tile = gameData.currentMap[tileIndex];
  tile.occupy("random monster");
  gameData.tryMovePlayer(0, 1); // Creature at (0, 1)

  // Assert
  expect(player.x).toBe(7);
  expect(player.y).toBe(6);
  playerIndex = gameData.coordinatesToIndex(player.x, player.y);
  playerTile = gameData.currentMap[playerIndex];
  expect(playerTile.occupant).toBe(player);
});

it('getTile gets tile at specified coordinates', () => {
  var gameData = new GameData();
  var x = 17;
  var y = 13;

  var index = gameData.coordinatesToIndex(x, y);
  var expectedTile = gameData.currentMap[index];
  var actualTile = gameData.getTile(x, y);

  expect(expectedTile).toBe(actualTile);
});

it('getTile returns null if tile is out of bounds', () => {
  var gameData = new GameData();
  var actual = gameData.getTile(999, 9);
  expect(actual).toBe(null);
});
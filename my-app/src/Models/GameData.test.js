import GameData from "./GameData";

it('creates a map in the constructor and sets the player coordinates and tile', () => {
  var gameData = new GameData();
  var mapWidth = gameData.currentMap.tilesWide;
  var mapHeight = gameData.currentMap.tilesHigh;
  var player = gameData.player;

  expect(gameData.currentMap.tilesWide).toBeGreaterThan(0);
  expect(gameData.currentMap.tilesHigh).toBeGreaterThan(0);
  expect(gameData.currentMap.tileData.length).toBeGreaterThan(0);

  expect(gameData.player.x).toBe(mapWidth / 2);
  expect(gameData.player.y).toBe(mapHeight / 2);

  var playerTile = gameData.currentMap.getTile(player.x, player.y);
  expect(playerTile.occupant).toBe(player);
});

it('tryMovePlayer clears old tile occupant and moves player to the new tile occupant if walkable', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;

  // Redundant but makes it clear later
  var playerTile = gameData.currentMap.getTile(player.x, player.y);
  expect(playerTile.occupant).toBe(player);

  // Act
  gameData.tryMovePlayer(10, 9); // teleporting is okay for tests

  // Assert
  var newPlayerTile = gameData.currentMap.getTile(player.x, player.y);
  expect(newPlayerTile).not.toBe(playerTile);
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
  var playerTile = gameData.currentMap.getTile(player.x, player.y);
  playerTile.occupy(player);

  // Act
  var tile = gameData.currentMap.getTile(0, 1);
  tile.type = "wall";
  gameData.tryMovePlayer(0, 1); // Wall at (0, 1)

  // Assert
  expect(tile.occupant).toBe(null);
  expect(player.x).toBe(7);
  expect(player.y).toBe(6);
  playerTile = gameData.currentMap.getTile(player.x, player.y);
  expect(playerTile.occupant).toBe(player);
});

it('tryMovePlayer does not move player if target tile is already occupied', () => {
  // Arrange
  var gameData = new GameData();
  var player = gameData.player;
  player.x = 7;
  player.y = 6;

  // Redundant but makes it clear later
  var playerTile = gameData.currentMap.getTile(player.x, player.y);
  playerTile.occupy(player);

  // Act
  var tile = gameData.currentMap.getTile(0, 1);
  tile.occupy("random monster");
  gameData.tryMovePlayer(0, 1); // Creature at (0, 1)

  // Assert
  expect(player.x).toBe(7);
  expect(player.y).toBe(6);
  playerTile = gameData.currentMap.getTile(player.x, player.y);
  expect(playerTile.occupant).toBe(player);
});

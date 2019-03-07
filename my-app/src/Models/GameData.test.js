import GameData from "./GameData";

it('creates a map in the constructor', () => {
  var gameData = new GameData();
  expect(gameData.mapWidth).toBeGreaterThan(0);
  expect(gameData.mapHeight).toBeGreaterThan(0);
  expect(gameData.currentMap.length).toBeGreaterThan(0);
});

it('creates a map with some wall tiles and some floor tiles, in the constructor', () => {
  var gameData = new GameData();
  var numFloors = 0;
  var numWalls = 0;

  for (var i = 0; i < gameData.currentMap.length; i++) {
    var state = gameData.currentMap[i];
    
    if (state === "wall") {
      numWalls++;
    } else if (state === "empty") {
      numFloors++;
    }
  }

  expect(numFloors).toBeGreaterThan(0);
  expect(numWalls).toBeGreaterThan(0);
});
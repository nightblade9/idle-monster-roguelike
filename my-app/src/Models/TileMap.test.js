import TileMap from "./TileMap";
import Tile from "./TileModel";

it('getTile gets tile at specified coordinates', () => {
var tileMap = new TileMap(50, 16);
var x = 17;
var y = 13;

var index = tileMap.coordinatesToIndex(x, y);
var expectedTile = tileMap.tileData[index];
var actualTile = tileMap.getTile(x, y);

expect(expectedTile).toBe(actualTile);
});
  
it('getTile returns null if tile is out of bounds', () => {
    var tileMap = new TileMap(3, 3);
    var actual = tileMap.getTile(999, 9);
    expect(actual).toBe(null);
});

it('coordinatesToIndex returns correct value', () => {
    var tileMap = new TileMap(3, 3);
    var expectedTile = tileMap.tileData[5]; // (2, 1)
    var actualTile = tileMap.tileData[tileMap.coordinatesToIndex(2, 1)];
    expect(actualTile).toBe(expectedTile);
});

it('generate creates a map with some wall tiles and some floor tiles, in the constructor', () => {
    var tileMap = new TileMap(50, 50);
    tileMap.generate();
    var numFloors = 0;
    var numWalls = 0;
  
    for (var i = 0; i < tileMap.tileData.length; i++) {
      var tile = tileMap.tileData[i];
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
import TileMap from "./TileMap";
import TileModel from "./TileModel";
import MonsterModel from "./MonsterModel";

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

  it('findEmptyTile finds an unoccupied floor tile', () => {
    // Create a map with only four tiles: two walkable/unoccupied, one walkable/occupied, and one wall.
    // Assert that we eventually get both of the two walkable/unoccupied tiles.

    var tileMap = new TileMap(4, 1);
    
    // Manual generation
    for (var i = 0; i < 4; i++) {
      tileMap.tileData[i] = new TileModel(0, 0, "floor");
    }

    tileMap.tileData[0].type = "wall";
    tileMap.tileData[1].occupy(new MonsterModel(1, 0));

    // Act/assert
    var expectedTiles = [tileMap.getTile(2, 0), tileMap.getTile(3, 0)];
    var actualTiles = [];
    var numIterations = 0;

    while (actualTiles.length != expectedTiles.length && numIterations < 1000) {
      var nextTile = tileMap.findEmptyTile();
      if (actualTiles.indexOf(nextTile) === -1) {
        actualTiles.push(nextTile);
      }
      numIterations++;
    }

    expect(numIterations).not.toBe(1000); // 1000 tries, didn't get two available tiles.
    expect(actualTiles.length).toBe(expectedTiles.length);
    expect(actualTiles).toContain(tileMap.getTile(2, 0));
    expect(actualTiles).toContain(tileMap.getTile(3, 0));
  })

  it('generateMonsters generates monsters in expected range', () => {
    var tileMap = new TileMap(20, 15);
    tileMap.generate();
    tileMap.generateMonsters();

    var actualMonsters = 0;
    for (var i = 0; i < tileMap.tileData.length; i++) {
      if (tileMap.tileData[i].occupant != null) {
        actualMonsters++;
      }
    }

    expect(actualMonsters >= TileMap.MIN_MONSTERS && actualMonsters <= TileMap.MAX_MONSTERS);
  })
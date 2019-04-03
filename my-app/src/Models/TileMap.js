import Monster from './MonsterModel';
import TileModel from './TileModel';

const MIN_MONSTERS = 10
const MAX_MONSTERS = 20

// 2D map, plus related responsibilities
class TileMap {

    constructor(tilesWide, tilesHigh) {
        this.tilesWide = tilesWide;
        this.tilesHigh = tilesHigh;
        this.tileData = Array(tilesWide * tilesHigh);
    }

    getTile = (x, y) => {
        if (x < 0 || y < 0 || x >= this.tilesWide || y >= this.tilesHigh) {
            return null; // makes things easier than throwing
        }
        var index = this.coordinatesToIndex(x, y);
        return this.tileData[index];
    }

    generate = () => {
        for (let y = 0; y < this.tilesHigh; y++) {
            for (let x = 0; x < this.tilesWide; x++) {
                var index = this.coordinatesToIndex(x, y);
                if (x === 0 || y === 0 || x === this.tilesWide - 1 || y === this.tilesHigh - 1) {
                    this.tileData[index] = new TileModel(x, y, "wall");
                } else {
                    this.tileData[index] = new TileModel(x, y, "floor");
                }
            }
        }
    }

    findEmptyTile = () => {
        var x = Math.floor(Math.random() * this.tilesWide);
        var y = Math.floor(Math.random() * this.tilesHigh);
        
        while (!this.getTile(x, y).isWalkable()) {
            x = Math.floor(Math.random() * this.tilesWide);
            y = Math.floor(Math.random() * this.tilesHigh);
        }

        return this.getTile(x, y);
    }

    generateMonsters = () => {
        var numMonsters = Math.random(MAX_MONSTERS - MIN_MONSTERS) + MIN_MONSTERS;
        for (var i = 0; i < numMonsters; i++) {
            var tile = this.findEmptyTile();
            tile.occupy(new Monster(tile.x, tile.y));
        }
    }
    
    coordinatesToIndex = (x, y) => {
        return (y * this.tilesWide) + x;
    }
}

export default TileMap;

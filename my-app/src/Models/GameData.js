/// All the data we need for our game, eg. the current board, player, etc.
// Not just that, but "controller" methods to manipulate that data. :think:
import TileModel from './TileModel';
import PlayerModel from './PlayerModel';

const MAP_TILES_WIDE = 50
const MAP_TILES_HIGH = 16

class GameData {
    constructor() {

        this.currentMap = Array(MAP_TILES_WIDE * MAP_TILES_HIGH);
        this.mapWidth = MAP_TILES_WIDE;
        this.mapHeight = MAP_TILES_HIGH;

        this.player = new PlayerModel(this.mapWidth / 2, this.mapHeight / 2);        
        
        for (let y = 0; y < MAP_TILES_HIGH; y++) {
            for (let x = 0; x < MAP_TILES_WIDE; x++) {
                var index = this.coordinatesToIndex(x, y);
                if (x === 0 || y === 0 || x === MAP_TILES_WIDE - 1 || y === MAP_TILES_HIGH - 1) {
                    this.currentMap[index] = new TileModel("wall");
                } else {
                    this.currentMap[index] = new TileModel("floor");
                }
            }
        }

        var playerTile = this.currentMap[(this.player.y * MAP_TILES_WIDE) + this.player.x];
        playerTile.occupy(this.player);
    }

    getTile = (x, y) => {
        var currentIndex = this.coordinatesToIndex(x, y);
        if (currentIndex < this.currentMap.length) {
            return this.currentMap[currentIndex];
        } else {
            return null;
        }
    }

    coordinatesToIndex = (x, y) => {
        return (y * MAP_TILES_WIDE) + x;
    }

    // Controller method. Moves player if the target tile is walkable. Returns true if the player moved.
    tryMovePlayer = (x, y) => {
        var previousIndex = this.coordinatesToIndex(this.player.x, this.player.y);
        var previousTile = this.currentMap[previousIndex];
        
        var currentIndex = this.coordinatesToIndex(x, y);
        var currentTile = this.currentMap[currentIndex];

        if (currentTile.isWalkable()) {
            this.player = Object.assign(this.player, { x: x, y: y});
            previousTile.empty();
            currentTile.occupy(this.player);
            return true;
        } else {
            return false;
        }
    }
}

export default GameData;
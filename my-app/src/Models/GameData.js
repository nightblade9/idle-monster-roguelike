/// All the data we need for our game, eg. the current board, player, etc.
import TileModel from './TileModel';

const MAP_TILES_WIDE = 50
const MAP_TILES_HIGH = 16

class GameData {
    constructor() {
        this.currentMap = Array(MAP_TILES_WIDE * MAP_TILES_HIGH);
        this.mapWidth = MAP_TILES_WIDE;
        this.mapHeight = MAP_TILES_HIGH;
        
        for (let y = 0; y < MAP_TILES_HIGH; y++) {
            for (let x = 0; x < MAP_TILES_WIDE; x++) {
                var index = (y * MAP_TILES_WIDE) + x;
                if (x === 0 || y === 0 || x === MAP_TILES_WIDE - 1 || y === MAP_TILES_HIGH - 1) {
                    this.currentMap[index] = new TileModel("wall");
                } else {
                    this.currentMap[index] = new TileModel("floor");
                }
            }
        }
    }
}

export default GameData;
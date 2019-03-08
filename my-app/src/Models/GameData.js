/// All the data we need for our game, eg. the current board, player, etc.
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
                
                var index = (y * MAP_TILES_WIDE) + x;
                if (x === 0 || y === 0 || x === MAP_TILES_WIDE - 1 || y === MAP_TILES_HIGH - 1) {
                    this.currentMap[index] = new TileModel("wall");
                } else {
                    this.currentMap[index] = new TileModel("floor");
                }
            }
        }

        var playerTile = this.currentMap[(this.player.y * MAP_TILES_WIDE) + this.player.x];
        playerTile.contents = this.player;
    }
}

export default GameData;
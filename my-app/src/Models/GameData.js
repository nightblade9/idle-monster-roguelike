/// All the data we need for our game, eg. the current board, player, etc.
// Not just that, but "controller" methods to manipulate that data. :think:
import PlayerModel from './PlayerModel';
import TileMap from './TileMap';

const MAP_TILES_WIDE = 50
const MAP_TILES_HIGH = 16

class GameData {
    constructor() {
        this.currentMap = new TileMap(MAP_TILES_WIDE, MAP_TILES_HIGH);
        
        this.currentMap.generate();
        this.currentMap.generateMonsters();

        this.player = new PlayerModel(this.currentMap.tilesWide / 2, this.currentMap.tilesHigh / 2);        
        var playerTile = this.currentMap.get(this.player.x, this.player.y);
        playerTile.occupy(this.player);
    }

    // Controller method. Moves player if the target tile is walkable. Returns true if the player moved.
    tryMovePlayer = (x, y) => {
        var previousTile = this.currentMap.get(this.player.x, this.player.y);
        var currentTile = this.currentMap.get(x, y);

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
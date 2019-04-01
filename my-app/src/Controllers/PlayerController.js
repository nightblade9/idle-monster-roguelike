import Direction from '../Enums/Direction';

class PlayerController {
    constructor(gameData) {
        this.gameData = gameData;
    }

    tryMovePlayer = (direction) => {
            
        var player = this.gameData.player;
        if (player.canMove) {
            var newX = player.x;
            var newY = player.y;

            switch (direction) {
                case Direction.UP:
                    newY -= 1;
                    break;
                case Direction.RIGHT:
                    newX += 1;
                    break;
                case Direction.DOWN:
                    newY += 1;
                    break;
                case Direction.LEFT: 
                    newX -= 1;
                    break;
                default:
                    throw Error("Invalid direction: " + direction);
            }

            if (newX !== player.x || newY !== player.y) {
                var isPlayerMoved = this.gameData.tryMovePlayer(newX, newY);

                if (isPlayerMoved) {
                    this.gameData.player.facing = direction;
                    var fovTiles = this.getPlayerFovTiles();
                    
                    for (var i = 0; i < fovTiles.length; i++) {
                        var fovTile = fovTiles[i];
                        fovTile.discover();
                    }

                }
                return isPlayerMoved;
            }
        }

        return false; // Didn't move, frozen
    }

    getPlayerFovTiles = () => {
        var toReturn = [];

        var startX = this.gameData.player.x - this.gameData.player.sightRadius;
        var startY = this.gameData.player.y - this.gameData.player.sightRadius;
        var endX = this.gameData.player.x + this.gameData.player.sightRadius;
        var endY = this.gameData.player.y + this.gameData.player.sightRadius;
        
        for (var y = startY; y < endY; y++) {
            for (var x = startX; x < endX; x++) {
                var distance = Math.sqrt(Math.pow(x - this.gameData.player.x, 2) + Math.pow(y - this.gameData.player.y, 2));
                if (x >= 0 && y >= 0 && x <= this.gameData.currentMap.tilesWide && y <= this.gameData.currentMap.tilesHigh && distance <= this.gameData.player.sightRadius) {
                    var currentTile = this.gameData.currentMap.get(x, y);
                    if (currentTile != null) {
                        toReturn.push(currentTile);
                    }
                }
            }
        }

        return toReturn;
    }
}

export default PlayerController;
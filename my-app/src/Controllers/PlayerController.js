import Directions from '../Enums/Direction';

class PlayerController {
    constructor(gameData) {
        this.gameData = gameData;
    }

    tryMovePlayer = (direction) => {
            
        var player = this.gameData.player;
        var newX = player.x;
        var newY = player.y;

        switch (direction) {
            case Directions.UP:
                newY -= 1;
                break;
            case Directions.RIGHT:
                newX += 1;
                break;
            case Directions.DOWN:
                newY += 1;
                break;
            case Directions.LEFT: 
                newX -= 1;
                break;
            default:
                throw Error("Invalid direction: " + direction);
        }

        if (newX !== player.x || newY !== player.y) {
            var isPlayerMoved = this.gameData.tryMovePlayer(newX, newY);

            if (isPlayerMoved) {
                var fovTiles = this.getPlayerFovTiles();
                
                for (var i = 0; i < fovTiles.length; i++) {
                    var fovTile = fovTiles[i];
                    fovTile.discover();
                }

            }
            return isPlayerMoved;
        }
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
                if (distance <= this.gameData.player.sightRadius) {
                    var currentTile = this.gameData.getTile(x, y);
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
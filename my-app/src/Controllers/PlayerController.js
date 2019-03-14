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
            return isPlayerMoved;
        }
    }
}

export default PlayerController;
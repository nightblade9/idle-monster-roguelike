import Bullet from "../Models/Bullet";
import Direction from "../Enums/Direction";

class BulletSystem {
    constructor(gameData) {
        this.gameData = gameData;
        this.bullets = [];
    }

    addBullet = (x, y, direction) => {
        var bullet = new Bullet(x, y, direction);
        this.bullets.push(bullet);
    }

    onUpdate = () => {
        for (var i = 0; i < this.bullets.length; i++) {
            var bullet = this.bullets[i];
            this.moveBullet(bullet);
            this.destroyIfImpacted(bullet);
        }
    }

    moveBullet = (bullet) => {
        switch(bullet.direction) {
            case Direction.UP:
                bullet.y -= 1;
                break;
            case Direction.RIGHT:
                bullet.x += 1;
                break;
            case Direction.DOWN:
                bullet.y += 1;
                break;
            case Direction.LEFT:
                bullet.x -= 1;
                break;
            default:
                throw "Not sure how to move bullet in direction=" + bullet.direction;
        }
    }

    destroyIfImpacted = (bullet) => {
        for (var y = 0; y < this.gameData.mapHeight; y++) {
            for (var x = 0; x < this.gameData.mapWidth; x++) {
                var tile = this.gameData.getTile(x, y);
                if (!tile.isWalkable()) {
                    // kill bullet
                    var index = this.bullets.indexOf(bullet);
                    if (index > -1) {
                        this.bullets.splice(index, 1);
                    }
                    var occupant = tile.occupant;
                    // damage occupant
                }
            }
        }
    }
}

export default BulletSystem;
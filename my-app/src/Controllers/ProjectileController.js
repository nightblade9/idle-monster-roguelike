import Projectile from "../Models/Projectile";
import Direction from "../Enums/Direction";

class ProjectileController {

    constructor(gameData) {
        this.gameData = gameData
    }

    // Move a projectile until it's untimely demise.
    // TODO: accept an array of projectiles instead. Isn't that right, Spazer?
    processProjectile = (x, y, direction) => {
        var projectiles = [new Projectile(x, y, direction)];

        while (projectiles.length > 0) {
            for (var i = 0; i < projectiles.length; i++) {
                var projectile = projectiles[i];
                this.moveProjectile(projectile);
                if (this.isDestroyed(projectile)) {
                    // Remove from array
                    var index = projectiles.indexOf(projectile);
                    projectiles.splice(index, 1);
                }
            }
        }
    }

    moveProjectile = (projectile) => {
        switch(projectile.facing) {
            case Direction.UP:
                projectile.y -= 1;
                break;
            case Direction.RIGHT:
                projectile.x += 1;
                break;
            case Direction.DOWN:
                projectile.y += 1;
                break;
            case Direction.LEFT:
                projectile.x -= 1;
                break;
            default:
                throw "Not sure how to move projectile in direction=" + projectile.facing;
        }
    }

    isDestroyed = (projectile) => {
        if (projectile.x < 0 || projectile.x >= this.gameData.mapWidth || projectile.y < 0 || projectile.y >= this.gameData.mapHeight) {
            return true;
        }

        var tile = this.gameData.getTile(projectile.x, projectile.y);
        if (!tile.isWalkable()) {
            var occupant = tile.occupant;
            if (occupant != null) {
                // damage occupant
            }
            return true;
        }

        return false;
    }
}

export default ProjectileController;
import Direction from "../Enums/Direction";

class ProjectileController {

    constructor(gameData) {
        this.gameData = gameData
    }

    // Move a projectile until it's untimely demise.
    getProjectilePath = (projectile) => {
        var path = [];
        path.push({x: projectile.x, y: projectile.y});

        while (!this.shouldBeDestroyed(projectile)) {
            this.moveProjectile(projectile);
            path.push({x: projectile.x, y: projectile.y});
        }

        return path;
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
                throw Error("Not sure how to move projectile in direction=" + projectile.facing);
        }
    }

    shouldBeDestroyed = (projectile) => {
        if (projectile.x < 0 || projectile.x >= this.gameData.mapWidth || projectile.y < 0 || projectile.y >= this.gameData.mapHeight) {
            return true;
        }

        var tile = this.gameData.getTile(projectile.x, projectile.y);
        if (!tile.isWalkable()) {
            return true;
        }

        return false;
    }
}

export default ProjectileController;
import Direction from "../Enums/Direction";
import PlayerController from "./PlayerController";

class ProjectileController {

    constructor(gameData) {
        this.gameData = gameData;
        // Used for line-of-sight checks
        this.playerController = new PlayerController(this.gameData);
    }

    // Move a projectile until it's untimely demise.
    getProjectilePath = (projectile) => {
        var path = [];

        var copy = Object.assign({}, projectile);
        path.push({x: copy.x, y: copy.y});

        while (!this.shouldBeDestroyed(copy)) {
            this.moveProjectile(copy);
            path.push({x: copy.x, y: copy.y});
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
        if (projectile.x < 0 || projectile.x >= this.gameData.currentMap.tilesWide || projectile.y < 0 || projectile.y >= this.gameData.currentMap.tilesHigh) {
            return true;
        }

        var tile = this.gameData.currentMap.get(projectile.x, projectile.y);
        if (!tile.isWalkable()) {
            return true;
        }

        return false;
    }

    moveUntilDestroyed = (projectile, path, displayMillsecondsPerStep, effect, onCompleteCallback) => {
        var currentIndex = 0;
        var playerFovTiles = this.playerController.getPlayerFovTiles();
        
        var onProjectileDestroyed = () => {
            clearInterval(intervalId);
            this.gameData.currentMap.get(projectile.x, projectile.y).effect = null;
            onCompleteCallback();
        }

        var setIntervalCallback = () => {
            if (currentIndex < path.length) {
                var currentStep = path[currentIndex];

                if (currentIndex > 0) {
                    this.gameData.currentMap.get(projectile.x, projectile.y).effect = null;
                }
                
                projectile.x = currentStep.x;
                projectile.y = currentStep.y;
                var currentTile = this.gameData.currentMap.get(projectile.x, projectile.y);
                currentTile.effect = effect;
                
                currentIndex++;
                
                var projectileTile = playerFovTiles.find(tile => tile.x === projectile.x && tile.y === projectile.y);
                var isInSight = (typeof(projectileTile) !== "undefined");
                if (!isInSight) {
                    // Don't make the player wait until it gets destroyed.
                    // TODO: process damage along the path. For now, just skip to the end.
                    this.gameData.currentMap.get(projectile.x, projectile.y).effect = null;
                    var finalTile = path[path.length - 1];
                    projectile.x = finalTile.x;
                    projectile.y = finalTile.y;
                    onProjectileDestroyed();
                }
            } else {
               onProjectileDestroyed();
            }
        }

        var intervalId = setInterval(setIntervalCallback, displayMillsecondsPerStep);
        setIntervalCallback();
    }
}

export default ProjectileController;
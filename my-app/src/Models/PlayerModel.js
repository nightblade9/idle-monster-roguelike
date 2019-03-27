import Direction from '../Enums/Direction';
import ProjectileType from '../Enums/ProjectileType';

class PlayerModel {
    DISPLAY_CHARACTER = '@';
    TIME_TO_CHARGE_SHOT_MS = 250;
    
    x = 0;
    y = 0;
    sightRadius = 4;
    facing = Direction.UP;
    canMove = true;
    chargingSince = null; // or: Date.now() when charging

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.facing = Direction.UP;
    }

    chargeShot = () => {
        if (this.chargingSince === null) {
            this.chargingSince = Date.now();
        }
    }

    dischargeShot = () => {
        if (this.chargingSince === null) {
            throw Error("Can't discharge shot without charging first!");
        }
        
        var now = Date.now();
        var toReturn = ProjectileType.NORMAL;

        if ((now - this.chargingSince) >= this.TIME_TO_CHARGE_SHOT_MS) {
            toReturn = ProjectileType.CHARGED;
        }

        this.chargingSince = null;
        return toReturn;
    }
}

export default PlayerModel;
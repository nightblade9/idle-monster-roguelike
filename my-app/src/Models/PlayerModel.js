import Direction from '../Enums/Direction';

class PlayerModel {
    DISPLAY_CHARACTER = '@';
    
    x = 0;
    y = 0;
    sightRadius = 4;
    facing = Direction.UP;
    canMove = true;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.facing = Direction.UP;
    }
}

export default PlayerModel;
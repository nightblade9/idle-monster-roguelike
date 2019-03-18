class PlayerModel {
    DISPLAY_CHARACTER = '@';
    
    x = 0;
    y = 0;
    sightRadius = 4;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default PlayerModel;
import Palette from '../Enums/Palette';

class MonsterModel {
    DISPLAY_CHARACTER = 'm';
    BASE_COLOUR = Palette.RED;
    
    x = 0;
    y = 0;
    sightRadius = 4; // for laterz

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default MonsterModel;
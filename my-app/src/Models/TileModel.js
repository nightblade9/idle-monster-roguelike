// Should probably rename this to something other than "tile"
class Tile {
    constructor(type) {
        this.type = type; // "floor", "wall", etc.
        this.occupant = null; // just one person
        this.discovered = false; // fog of war
        this.effect = null; // ephermal effect, eg. explosion
    }

    occupy = (occupant) => {
        this.occupant = occupant;
    }

    empty = () => {
        this.occupant = null;
    }

    isWalkable = () => {
        return this.type === "floor" && this.occupant == null;
    }

    discover = () => {
        this.discovered = true;
    }
}

export default Tile;

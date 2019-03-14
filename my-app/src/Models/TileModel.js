// Should probably rename this to something other than "tile"
class Tile {
    constructor(type) {
        this.type = type; // "floor", "wall", etc.
        this.occupant = null; // just one person
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
}

export default Tile;

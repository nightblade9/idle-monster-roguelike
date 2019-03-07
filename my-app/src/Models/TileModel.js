// Should probably rename this to something other than "tile"
class Tile {
    constructor(type) {
        this.type = type; // empty, wall, etc.
        this.contents = null; // just one item
    }
}

export default Tile;

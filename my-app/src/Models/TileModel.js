// Should probably rename this to something other than "tile"
class Tile {
    constructor(type) {
        this.type = type; // empty, wall, etc.
        this.contents = null; // just one item
    }

    setContents = (newContents) => {
        this.contents = newContents;
    }

    clearContents = () => {
        this.setContents(null);
    }
}

export default Tile;

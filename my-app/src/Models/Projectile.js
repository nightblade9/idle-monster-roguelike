class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.facing = direction;
        // TODO: should throw if x/y are out of bounds
    }
}

export default Projectile;

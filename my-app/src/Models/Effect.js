// Temporary effect on a tile, such a a projectile/explosion
class Effect {
    constructor(character, colour) {
        this.character = character;
        this.colour = colour;
        this.lastUpdated = Date.now();
    }
}

export default Effect;
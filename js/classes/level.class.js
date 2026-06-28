/**
 * Holds all objects that belong to a single level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Bundles all level objects into one level instance.
     * @param {MovableObject[]} enemies - Chickens and the endboss.
     * @param {Cloud[]} clouds - The background clouds.
     * @param {BackgroundObject[]} backgroundObjects - Parallax layers.
     * @param {Coin[]} coins - Collectable coins.
     * @param {Bottle[]} bottles - Collectable bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}

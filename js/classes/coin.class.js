/**
 * A collectable coin that floats in the level and rotates slightly.
 */
class Coin extends MovableObject {
    height = 120;
    width = 120;
    offset = { top: 40, left: 40, right: 40, bottom: 40 };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Places the coin at the given position and animates it.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /** Cycles between the two coin frames. */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_COIN), 350);
    }
}

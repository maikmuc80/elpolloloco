/**
 * A salsa bottle lying on the ground that the character can collect.
 */
class Bottle extends MovableObject {
    height = 80;
    width = 70;
    y = 350;
    offset = { top: 15, left: 25, right: 20, bottom: 12 };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Places the bottle and picks one of the two ground images.
     * @param {number} x - Horizontal position.
     */
    constructor(x) {
        super();
        let index = Math.round(Math.random());
        this.loadImage(this.IMAGES_BOTTLE[index]);
        this.x = x;
    }
}

/**
 * A small, faster chicken enemy.
 * Behaves like a normal chicken but is smaller and quicker.
 */
class SmallChicken extends MovableObject {
    height = 50;
    width = 50;
    y = 375;
    offset = { top: 4, left: 4, right: 4, bottom: 4 };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    dead_sound = new Audio('audio/chicken/chickenDead2.mp3');

    /**
     * Places the small chicken and starts its animation.
     * @param {number} x - Horizontal start position.
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }

    /** Moves the small chicken left and animates walking or death. */
    animate() {
        setInterval(() => {
            if (!this.isDead()) this.moveLeft();
        }, 1000 / 60);
        setInterval(() => this.playWalkOrDead(), 130);
    }

    /** Plays the dead image or the walking cycle. */
    playWalkOrDead() {
        if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
        else this.playAnimation(this.IMAGES_WALKING);
    }
}

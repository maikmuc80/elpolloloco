/**
 * A normal walking chicken enemy.
 * Moves to the left and can be killed by jumping on it.
 */
class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 360;
    offset = { top: 4, left: 4, right: 4, bottom: 4 };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    dead_sound = new Audio('audio/chicken/chickenDead.mp3');

    /**
     * Places the chicken on the level and starts its animation.
     * @param {number} x - Horizontal start position.
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.3 + Math.random() * 0.4;
        this.animate();
    }

    /** Moves the chicken left and animates walking or death. */
    animate() {
        setInterval(() => {
            if (!this.isDead()) this.moveLeft();
        }, 1000 / 60);
        setInterval(() => this.playWalkOrDead(), 150);
    }

    /** Plays the dead image or the walking cycle. */
    playWalkOrDead() {
        if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
        else this.playAnimation(this.IMAGES_WALKING);
    }
}

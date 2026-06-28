/**
 * A salsa bottle that the character throws.
 * Rotates while flying and splashes when it hits something.
 */
class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;
    offset = { top: 10, left: 10, right: 10, bottom: 10 };
    hasSplashed = false;

    IMAGES_ROTATION = buildPaths('img/6_salsa_bottle/bottle_rotation/', 1, 4, '_bottle_rotation.png');
    IMAGES_SPLASH = buildPaths('img/6_salsa_bottle/bottle_rotation/bottle_splash/', 1, 6, '_bottle_splash.png');
    break_sound = new Audio('audio/throwable/bottleBreak.mp3');

    /**
     * Creates a thrown bottle at the given position and direction.
     * @param {number} x - Start x position.
     * @param {number} y - Start y position.
     * @param {boolean} otherDirection - True if thrown to the left.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /** Starts the throw: gravity, horizontal flight and rotation. */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.flyInterval = setInterval(() => this.fly(), 1000 / 60);
        this.rotateInterval = setInterval(() => this.playAnimation(this.IMAGES_ROTATION), 80);
    }

    /** Moves the bottle horizontally depending on the direction. */
    fly() {
        if (this.otherDirection) this.x -= 10;
        else this.x += 10;
    }

    /** Plays the splash animation once and stops the flight. */
    splash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true;
        clearInterval(this.flyInterval);
        clearInterval(this.rotateInterval);
        this.break_sound.play();
        this.currentImage = 0;
        this.splashInterval = setInterval(() => this.playAnimation(this.IMAGES_SPLASH), 60);
    }
}

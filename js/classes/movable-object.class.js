/**
 * Base class for everything that moves: characters, enemies, bottles.
 * Adds gravity, movement, animation and collision logic.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    groundY = 150;
    jumpPower = 30;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Applies gravity by reducing the vertical speed over time.
     * @param {number} [fps=25] - How often gravity is applied per second.
     *     A higher rate makes the jump shorter and the fall smoother.
     */
    applyGravity(fps = 25) {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            this.landOnGround();
        }, 1000 / fps);
    }

    /**
     * Stops a fall exactly on the ground. The last gravity step can
     * overshoot, which would leave the object standing below the floor
     * for the rest of the game.
     */
    landOnGround() {
        if (this instanceof ThrowableObject || this.speedY > 0) return;
        if (this.y > this.groundY) {
            this.y = this.groundY;
            this.speedY = 0;
        }
    }

    /**
     * Checks whether the object is currently in the air.
     * @returns {boolean} True if above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return this.y < 360;
        return this.y < this.groundY;
    }

    /**
     * Plays an animation by cycling through the given images.
     * @param {string[]} images - Paths of the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    /** Moves the object to the right by its speed. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left by its speed. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Lets the object jump by setting a positive vertical speed. */
    jump() {
        this.speedY = this.jumpPower;
    }

    /**
     * Checks rectangular collision with another object using offsets.
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True if both hitboxes overlap.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces energy on hit and stores the time of the hit.
     * One hit costs a fifth of the energy, which is exactly one step of
     * the status bar, so every hit is visible.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;
        else this.lastHit = new Date().getTime();
    }

    /**
     * Checks whether the object was hit in the last second.
     * @returns {boolean} True while still hurt.
     */
    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < 1;
    }

    /**
     * Checks whether the object has no energy left.
     * @returns {boolean} True if dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Debug helper: outlines the image edge in blue and the hitbox that the
     * collision check really uses in red. Switched on with showHitboxes.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawHitbox(ctx) {
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width  - this.offset.left - this.offset.right,
            this.height - this.offset.top  - this.offset.bottom
        );
    }
}

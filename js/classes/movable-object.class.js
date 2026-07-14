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
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Applies gravity by reducing the vertical speed over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is currently in the air.
     * @returns {boolean} True if above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return this.y < 360;
        return this.y < 150;
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
        this.speedY = 30;
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

    /** Reduces energy on hit and stores the time of the hit. */
    hit() {
        this.energy -= 5;
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

    drawHitbox(ctx) {
        ctx.strokeStyle = 'blue';                 // Bildkante
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'red';                  // echte Hitbox mit Offset
        ctx.strokeRect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width  - this.offset.left - this.offset.right,
            this.height - this.offset.top  - this.offset.bottom
        );
    }
}

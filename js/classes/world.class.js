/**
 * The game world. Connects character, level and status bars,
 * runs the game loop and draws everything onto the canvas.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    coinsCollected = 0;
    bottlesCollected = 0;
    running = true;

    statusBarHealth = new StatusBar(BAR_HEALTH, 20, 0, 100);
    statusBarCoin = new StatusBar(BAR_COIN, 20, 45, 0);
    statusBarBottle = new StatusBar(BAR_BOTTLE, 20, 90, 0);
    statusBarEndboss = new StatusBar(BAR_ENDBOSS, 490, 0, 100);

    /**
     * Builds the world and starts the loops.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The shared keyboard state.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /** Gives the character a reference back to the world. */
    setWorld() {
        this.character.world = this;
    }

    /** Runs the collision and throwing checks on a fixed interval. */
    run() {
        setInterval(() => {
            if (!this.running) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollecting();
            this.checkEndboss();
            this.checkGameOver();
        }, 1000 / 30);
    }

    /** Draws the whole scene and schedules the next frame. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        requestAnimationFrame(() => this.draw());
    }

    /** Draws the fixed status bars on top of the scene. */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.character.x > 1900) this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws a list of objects onto the map.
     * @param {DrawableObject[]} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => this.addToMap(o));
    }

    /**
     * Draws one object, flipping it if it faces the other direction.
     * @param {MovableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Mirrors the context horizontally for the given object.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the context after a flipped draw.
     * @param {MovableObject} mo - The flipped object.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

/**
 * A slowly drifting cloud in the background.
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Places the cloud and starts the drifting animation.
     * @param {number} x - Horizontal start position.
     */
    constructor(x) {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.speed = 0.15;
        this.animate();
    }

    /** Moves the cloud slowly to the left. */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }
}

/**
 * A static background layer image used for the parallax desert.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Loads a background layer at full canvas height.
     * @param {string} imagePath - Path to the layer image.
     * @param {number} x - Horizontal position of the layer.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}

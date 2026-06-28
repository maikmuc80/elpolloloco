/**
 * A status bar showing a percentage value (health, coins or bottles).
 * Picks the matching image for the current percentage.
 */
class StatusBar extends DrawableObject {
    width = 200;
    height = 60;
    percentage = 100;

    /**
     * Creates a status bar of a given type at a position.
     * @param {string[]} images - The six bar images from 0 to 100.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     * @param {number} percentage - Initial fill percentage.
     */
    constructor(images, x, y, percentage) {
        super();
        this.IMAGES = images;
        this.loadImages(images);
        this.x = x;
        this.y = y;
        this.setPercentage(percentage);
    }

    /**
     * Updates the bar to a new percentage and swaps the image.
     * @param {number} percentage - The new fill value from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the percentage to an index in the image array.
     * @returns {number} Index between 0 and 5.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}

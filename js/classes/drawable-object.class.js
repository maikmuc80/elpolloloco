/**
 * Base class for every object that can be drawn onto the canvas.
 * Holds the position, size and image cache of an object.
 */
class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image into this.img.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads several images into the cache for animations.
     * @param {string[]} paths - Array of image paths.
     */
    loadImages(paths) {
        paths.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of the object onto the context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

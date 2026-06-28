/**
 * Builds an array of numbered image paths for an animation.
 * @param {string} prefix - Path up to the number, e.g. "img/.../I-".
 * @param {number} from - First number of the sequence.
 * @param {number} to - Last number of the sequence (inclusive).
 * @param {string} suffix - File ending including the dot, e.g. ".png".
 * @returns {string[]} The list of full image paths.
 */
function buildPaths(prefix, from, to, suffix) {
    let paths = [];
    for (let i = from; i <= to; i++) {
        paths.push(prefix + i + suffix);
    }
    return paths;
}

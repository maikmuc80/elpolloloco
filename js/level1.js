let level1;

/**
 * Status bar image sets, ordered from 0% to 100%.
 */
const BAR_HEALTH = buildBarPaths('img/7_statusbars/1_statusbar/2_statusbar_health/green/');
const BAR_COIN = buildBarPaths('img/7_statusbars/1_statusbar/1_statusbar_coin/green/');
const BAR_BOTTLE = buildBarPaths('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/');
const BAR_ENDBOSS = buildBossBarPaths('img/7_statusbars/2_statusbar_endboss/green/green');

/**
 * Builds the six paths of a normal status bar.
 * @param {string} folder - Folder path ending with a slash.
 * @returns {string[]} Paths for 0,20,40,60,80,100 percent.
 */
function buildBarPaths(folder) {
    return ['0', '20', '40', '60', '80', '100'].map((p) => folder + p + '.png');
}

/**
 * Builds the six paths of the endboss status bar.
 * @param {string} prefix - Path up to the number.
 * @returns {string[]} Paths for 0,20,40,60,80,100 percent.
 */
function buildBossBarPaths(prefix) {
    return ['0', '20', '40', '60', '80', '100'].map((p) => prefix + p + '.png');
}

/**
 * (Re)creates level 1 with fresh enemies, clouds, coins and bottles.
 */
function initLevel() {
    level1 = new Level(
        createEnemies(),
        [new Cloud(200), new Cloud(900), new Cloud(1600), new Cloud(2300)],
        createBackground(),
        createCoins(),
        createBottles()
    );
}

/**
 * Creates the enemy list: chickens, small chickens and the endboss.
 * @returns {MovableObject[]} All enemies of the level.
 */
function createEnemies() {
    let enemies = [];
    for (let i = 0; i < 5; i++) enemies.push(new Chicken(500 + i * 350));
    for (let i = 0; i < 4; i++) enemies.push(new SmallChicken(700 + i * 400));
    enemies.push(new Endboss());
    return enemies;
}

/**
 * Creates several collectable coins placed in a wave pattern.
 * @returns {Coin[]} The coins of the level.
 */
function createCoins() {
    let coins = [];
    for (let i = 0; i < 8; i++) {
        let y = 250 + Math.sin(i) * 70;
        coins.push(new Coin(350 + i * 220, y));
    }
    return coins;
}

/**
 * Creates the collectable salsa bottles on the ground.
 * @returns {Bottle[]} The bottles of the level.
 */
function createBottles() {
    let bottles = [];
    for (let i = 0; i < 8; i++) bottles.push(new Bottle(300 + i * 250));
    return bottles;
}

/**
 * Creates the repeating parallax background segments.
 * @returns {BackgroundObject[]} All background layer objects.
 */
function createBackground() {
    let objects = [];
    for (let i = -1; i < 4; i++) objects.push(...createBackgroundSegment(i, i * 719));
    return objects;
}

/**
 * Creates one full set of background layers for a segment.
 * @param {number} i - Segment index, decides which layer variant is used.
 * @param {number} x - Horizontal position of the segment.
 * @returns {BackgroundObject[]} The four layers of one segment.
 */
function createBackgroundSegment(i, x) {
    let v = i % 2 === 0 ? '2' : '1';
    return [
        new BackgroundObject('img/5_background/layers/air.png', x),
        new BackgroundObject('img/5_background/layers/3_third_layer/' + v + '.png', x),
        new BackgroundObject('img/5_background/layers/2_second_layer/' + v + '.png', x),
        new BackgroundObject('img/5_background/layers/1_first_layer/' + v + '.png', x)
    ];
}

/**
 * Game logic of the world: collisions, throwing, collecting and game over.
 * The methods are added to the World prototype to keep the files small.
 */

/** Checks character-enemy collisions and resolves them. */
World.prototype.checkCollisions = function () {
    this.level.enemies.forEach((enemy) => {
        if (enemy.isDead()) return;
        if (this.isJumpKill(enemy)) this.killByJump(enemy);
        else if (this.character.isColliding(enemy)) this.hurtCharacter();
    });
};

/**
 * Checks whether the character is falling onto a small enemy.
 * @param {MovableObject} enemy - The enemy to test.
 * @returns {boolean} True if it is a valid jump kill.
 */
World.prototype.isJumpKill = function (enemy) {
    let isChicken = enemy instanceof Chicken || enemy instanceof SmallChicken;
    let feet = this.character.y + this.character.height - this.character.offset.bottom;
    return isChicken && this.character.isColliding(enemy) &&
        this.character.speedY < 0 && feet < enemy.y + enemy.height / 2;
};

/**
 * Kills an enemy by jumping on it and bounces the character up.
 * @param {MovableObject} enemy - The enemy that gets killed.
 */
World.prototype.killByJump = function (enemy) {
    this.character.speedY = 18;
    this.killEnemy(enemy);
};

/**
 * Marks an enemy as dead and removes it after its death animation.
 * @param {MovableObject} enemy - The enemy that gets killed.
 */
World.prototype.killEnemy = function (enemy) {
    enemy.energy = 0;
    enemy.dead_sound.play();
    setTimeout(() => this.removeEnemy(enemy), 1000);
};

/** Lets the character take damage and updates its status bar. */
World.prototype.hurtCharacter = function () {
    this.character.hit();
    this.statusBarHealth.setPercentage(this.character.energy);
};

/**
 * Removes an enemy from the level once it finished dying.
 * @param {MovableObject} enemy - The enemy to remove.
 */
World.prototype.removeEnemy = function (enemy) {
    let index = this.level.enemies.indexOf(enemy);
    if (index > -1) this.level.enemies.splice(index, 1);
};

/** Throws a bottle when D is pressed and bottles are available. */
World.prototype.checkThrowObjects = function () {
    if (!this.keyboard.D || this.bottlesCollected <= 0 || this.isThrowOnCooldown()) return;
    let x = this.character.x + (this.character.otherDirection ? 0 : 60);
    let bottle = new ThrowableObject(x, this.character.y + 100, this.character.otherDirection);
    this.throwableObjects.push(bottle);
    this.bottlesCollected -= 20;
    this.statusBarBottle.setPercentage(this.bottlesCollected);
    this.lastThrow = new Date().getTime();
};

/**
 * Prevents throwing several bottles within a short time.
 * @returns {boolean} True while the throw is still cooling down.
 */
World.prototype.isThrowOnCooldown = function () {
    return new Date().getTime() - (this.lastThrow || 0) < 600;
};

/** Checks bottle hits on enemies and on the ground. */
World.prototype.checkBottleHits = function () {
    this.throwableObjects.forEach((bottle) => {
        if (bottle.hasSplashed) return;
        if (bottle.y >= 360) return this.groundSplash(bottle);
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && bottle.isColliding(enemy)) this.bottleHitsEnemy(bottle, enemy);
        });
    });
};

/**
 * Lets a bottle splash on the ground without hitting an enemy.
 * @param {ThrowableObject} bottle - The thrown bottle.
 */
World.prototype.groundSplash = function (bottle) {
    bottle.splash();
    setTimeout(() => this.removeBottle(bottle), 500);
};

/**
 * Applies a bottle hit to an enemy, splashing the bottle.
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @param {MovableObject} enemy - The hit enemy.
 */
World.prototype.bottleHitsEnemy = function (bottle, enemy) {
    bottle.splash();
    if (enemy instanceof Endboss) this.hurtEndboss(enemy);
    else this.killEnemy(enemy);
    setTimeout(() => this.removeBottle(bottle), 500);
};

/**
 * Removes a thrown bottle from the world.
 * @param {ThrowableObject} bottle - The bottle to remove.
 */
World.prototype.removeBottle = function (bottle) {
    let index = this.throwableObjects.indexOf(bottle);
    if (index > -1) this.throwableObjects.splice(index, 1);
};

/**
 * Reduces the endboss energy and updates its status bar.
 * @param {Endboss} endboss - The boss that was hit.
 */
World.prototype.hurtEndboss = function (endboss) {
    endboss.energy = Math.max(0, endboss.energy - 20);
    endboss.lastHit = new Date().getTime();
    this.statusBarEndboss.setPercentage(endboss.energy);
};

/** Checks whether the character collects coins or bottles. */
World.prototype.checkCollecting = function () {
    this.checkBottleHits();
    this.collectItems(this.level.coins, 'coin');
    this.collectItems(this.level.bottles, 'bottle');
};

/**
 * Collects items of one type the character is colliding with.
 * @param {MovableObject[]} items - Coins or bottles to check.
 * @param {string} type - Either "coin" or "bottle".
 */
World.prototype.collectItems = function (items, type) {
    items.forEach((item, index) => {
        if (this.character.isColliding(item)) {
            items.splice(index, 1);
            this.applyCollect(type);
        }
    });
};

/**
 * Updates the counters and bars after collecting an item.
 * @param {string} type - Either "coin" or "bottle".
 */
World.prototype.applyCollect = function (type) {
    if (type === 'coin') {
        this.coinsCollected = Math.min(100, this.coinsCollected + 20);
        this.statusBarCoin.setPercentage(this.coinsCollected);
        playSound('audio/collectibles/collectSound.wav');
    } else {
        this.bottlesCollected = Math.min(100, this.bottlesCollected + 20);
        this.statusBarBottle.setPercentage(this.bottlesCollected);
        playSound('audio/collectibles/bottleCollectSound.wav');
    }
};

/** Wakes the endboss when the character comes close enough. */
World.prototype.checkEndboss = function () {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && !endboss.hadFirstContact && this.character.x > 1900) {
        endboss.hadFirstContact = true;
    }
};

/** Ends the game when the character or the endboss dies. */
World.prototype.checkGameOver = function () {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (this.character.isDead()) this.endGame(false);
    else if (endboss && endboss.isDead()) this.endGame(true);
};

/**
 * Stops the world and shows the matching end screen.
 * @param {boolean} won - True if the player won the game.
 */
World.prototype.endGame = function (won) {
    if (!this.running) return;
    this.running = false;
    this.character.snore_sound.pause();
    setTimeout(() => showEndScreen(won), 800);
};

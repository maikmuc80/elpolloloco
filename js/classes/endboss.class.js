/**
 * The final boss chicken.
 * Stays idle until the character gets close, then alerts and attacks.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    speed = 1.8;
    hadFirstContact = false;
    world;
    offset = { top: 70, left: 30, right: 30, bottom: 15 };

    IMAGES_WALKING = buildPaths('img/4_enemie_boss_chicken/1_walk/G', 1, 4, '.png');
    IMAGES_ALERT = buildPaths('img/4_enemie_boss_chicken/2_alert/G', 5, 12, '.png');
    IMAGES_ATTACK = buildPaths('img/4_enemie_boss_chicken/3_attack/G', 13, 20, '.png');
    IMAGES_HURT = buildPaths('img/4_enemie_boss_chicken/4_hurt/G', 21, 23, '.png');
    IMAGES_DEAD = buildPaths('img/4_enemie_boss_chicken/5_dead/G', 24, 26, '.png');
    hurt_sound = new Audio('audio/endboss/endbossApproach.wav');

    /** Loads all boss images and starts its behaviour loop. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2400;
        this.animate();
    }

    /** Runs the boss state machine and its movement loop. */
    animate() {
        setInterval(() => this.playState(), 150);
        setInterval(() => this.chase(), 1000 / 60);
    }

    /** Chooses the animation that matches the current boss state. */
    playState() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt()) this.playHurt();
        else if (this.hadFirstContact) this.playActive();
        else this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Plays the hurt animation together with its sound. The animation also
     * runs while the end screen fades in, the sound must not - it would
     * start again right after the game stopped all sounds.
     */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.world || this.world.running) this.hurt_sound.play();
    }

    /** Attacks close to the character and walks while approaching. */
    playActive() {
        if (this.distanceToCharacter() < 260) this.playAnimation(this.IMAGES_ATTACK);
        else this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Moves the boss towards the character and turns it to face him.
     * Right next to the character it only turns, otherwise it would step
     * back and forth around him and flip its sprite every frame.
     */
    chase() {
        if (!this.canChase()) return;
        this.otherDirection = this.world.character.x > this.x;
        if (this.distanceToCharacter() < 40) return;
        this.x += this.otherDirection ? this.currentSpeed() : -this.currentSpeed();
    }

    /**
     * Checks whether the boss is allowed to move at the moment.
     * @returns {boolean} True while it is awake, alive and not stunned.
     */
    canChase() {
        return this.hadFirstContact && !this.isDead() && !this.isHurt() &&
            !!this.world && this.world.running;
    }

    /**
     * Speeds the boss up the more damage it has taken, so the fight gets
     * harder instead of easier towards the end.
     * @returns {number} Pixels the boss moves per frame.
     */
    currentSpeed() {
        return this.speed + (100 - this.energy) / 100 * 1.6;
    }

    /**
     * Measures the horizontal distance to the character.
     * @returns {number} Distance in pixels, Infinity before the world is set.
     */
    distanceToCharacter() {
        if (!this.world) return Infinity;
        return Math.abs(this.world.character.x - this.x);
    }
}

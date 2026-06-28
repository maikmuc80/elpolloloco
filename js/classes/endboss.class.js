/**
 * The final boss chicken.
 * Stays idle until the character gets close, then alerts and attacks.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    speed = 4;
    hadFirstContact = false;
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

    /** Runs the boss state machine on a fixed interval. */
    animate() {
        setInterval(() => this.playState(), 150);
    }

    /** Chooses the animation that matches the current boss state. */
    playState() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt()) this.playHurt();
        else if (this.hadFirstContact) this.playActive();
        else this.playAnimation(this.IMAGES_ALERT);
    }

    /** Plays the hurt animation together with its sound. */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }

    /** Walks towards the character while attacking. */
    playActive() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.moveLeft();
    }
}

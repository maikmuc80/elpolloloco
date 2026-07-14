/**
 * The playable character "Pepe".
 * Handles movement, the different animation states and its sounds.
 */
class Character extends MovableObject {
    height = 280;
    width = 130;
    y = 150;
    speed = 6;
    world;
    lastMove = new Date().getTime();
    offset = { top: 110, left: 40, right: 40, bottom: 4 };

    IMAGES_IDLE = buildPaths('img/2_character_pepe/1_idle/idle/I-', 1, 10, '.png');
    IMAGES_SLEEP = buildPaths('img/2_character_pepe/1_idle/long_idle/I-', 11, 20, '.png');
    IMAGES_WALKING = buildPaths('img/2_character_pepe/2_walk/W-', 21, 26, '.png');
    IMAGES_JUMPING = buildPaths('img/2_character_pepe/3_jump/J-', 31, 39, '.png');
    IMAGES_HURT = buildPaths('img/2_character_pepe/4_hurt/H-', 41, 43, '.png');
    IMAGES_DEAD = buildPaths('img/2_character_pepe/5_dead/D-', 51, 57, '.png');

    walking_sound = new Audio('audio/character/characterRun.mp3');
    jump_sound = new Audio('audio/character/characterJump.wav');
    snore_sound = new Audio('audio/character/characterSnoring.mp3');

    /** Loads all images and starts gravity and the animation loops. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /** Starts the movement loop and the animation loop. */
    animate() {
        setInterval(() => this.handleMovement(), 1000 / 60);
        setInterval(() => this.playState(), 100);
    }

    /** Reads the keyboard and moves the character accordingly. */
    handleMovement() {
        if (this.isDead()) return;
        this.walking_sound.pause();
        if (this.canMoveRight()) this.walkRight();
        if (this.canMoveLeft()) this.walkLeft();
        if (this.world.keyboard.SPACE && !this.isAboveGround()) this.startJump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character is allowed to move right.
     * @returns {boolean} True if RIGHT is pressed and end not reached.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character is allowed to move left.
     * @returns {boolean} True if LEFT is pressed and start not reached.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }

    /** Moves right, plays the run sound and resets the idle timer. */
    walkRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) this.walking_sound.play();
        this.lastMove = new Date().getTime();
    }

    /** Moves left, plays the run sound and resets the idle timer. */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) this.walking_sound.play();
        this.lastMove = new Date().getTime();
    }

    /** Triggers the jump, plays the sound and resets the idle timer. */
    startJump() {
        this.jump();
        this.jump_sound.play();
        this.lastMove = new Date().getTime();
    }

    /** Selects and plays the animation that fits the current state. */
    playState() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
        else if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
        else this.playIdleState();
    }

    /**
     * Checks whether a walking key is currently pressed.
     * @returns {boolean} True if RIGHT or LEFT is held.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /** Plays the idle animation, switching to sleep after 15 seconds. */
    playIdleState() {
        let idle = (new Date().getTime() - this.lastMove) / 1000;
        if (idle > 15) {
            this.playAnimation(this.IMAGES_SLEEP);
            this.snore_sound.play();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            this.snore_sound.pause();
        }
    }
}

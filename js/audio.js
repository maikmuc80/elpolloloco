let isMuted = JSON.parse(localStorage.getItem('epl_muted')) || false;
let playingSounds = [];
const originalPlay = Audio.prototype.play;

/**
 * Central play override: skips playback while muted and remembers
 * every started sound so it can be stopped on mute.
 * @returns {Promise|undefined} The original play result or nothing.
 */
Audio.prototype.play = function () {
    if (isMuted) return;
    if (this.volume === 1) this.volume = 0.4;
    playingSounds.push(this);
    return originalPlay.apply(this, arguments);
};

/**
 * Plays a short one-shot sound effect.
 * @param {string} path - Path to the sound file.
 */
function playSound(path) {
    let sound = new Audio(path);
    sound.volume = 0.4;
    sound.play();
}

/**
 * Toggles the global mute state, persists it and updates the icon.
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('epl_muted', JSON.stringify(isMuted));
    if (isMuted) stopAllSounds();
    updateMuteIcon();
}

/** Pauses every sound that is currently playing. */
function stopAllSounds() {
    playingSounds.forEach((sound) => sound.pause());
    playingSounds = [];
}

/** Updates the mute button icon to match the current state. */
function updateMuteIcon() {
    let icon = document.getElementById('muteIcon');
    if (icon) icon.innerHTML = isMuted ? '🔇' : '🔊';
}

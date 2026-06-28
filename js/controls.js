/** Connects the physical keyboard to the keyboard state object. */
function bindKeyboard() {
    window.onkeydown = (event) => setKey(event.keyCode, true);
    window.onkeyup = (event) => setKey(event.keyCode, false);
}

/**
 * Sets a keyboard flag based on a key code.
 * @param {number} code - The key code of the event.
 * @param {boolean} state - True on key down, false on key up.
 */
function setKey(code, state) {
    if (code == 39) keyboard.RIGHT = state;
    if (code == 37) keyboard.LEFT = state;
    if (code == 38) keyboard.UP = state;
    if (code == 40) keyboard.DOWN = state;
    if (code == 32) keyboard.SPACE = state;
    if (code == 68) keyboard.D = state;
}

/**
 * Sets a keyboard flag from a mobile touch button.
 * @param {string} key - Name of the key, e.g. "LEFT".
 * @param {boolean} state - True while the button is pressed.
 * @param {Event} event - The touch event to suppress.
 */
function pressButton(key, state, event) {
    event.preventDefault();
    keyboard[key] = state;
}

/**
 * Opens an overlay dialog by its id.
 * @param {string} id - The id of the dialog element.
 */
function openDialog(id) {
    document.getElementById(id).classList.remove('d-none');
}

/**
 * Closes an overlay dialog by its id.
 * @param {string} id - The id of the dialog element.
 */
function closeDialog(id) {
    document.getElementById(id).classList.add('d-none');
}

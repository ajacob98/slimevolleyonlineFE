export class Keyboard {
    static state =  new Map();
    static initialize() {
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
        // The `.bind(this)` here isn't necesary as these functions won't use `this`!
        document.addEventListener("keydown", Keyboard.keyDown);
        document.addEventListener("keyup", Keyboard.keyUp);
    }
    static keyDown(e) {
        Keyboard.state.set(e.code, true)
    }
    static keyUp(e) {
        Keyboard.state.set(e.code, false)
    }
}
// based on https://github.com/Mugen87/yuka/blob/6024251f17f0d74019c1b5a184855a78591d9dad/src/core/Regulator.js

class Regulator {
    /**
     * define initial time and ready interval
     * @param {number} frequency 
     */
    constructor( frequency = 33 ) {
        this.time      = performance.now();
        this.interval  = 1000/frequency;
    }

    /**
     * returns if is ready to update
     * @returns {Boolean}
     */
    ready() {
        const current  = performance.now();
        const ellapsed = current - this.time;

        if( ellapsed >= this.interval ) {
            this.time = current;

            return true;
        }

        return false;
    }
}

export { Regulator };
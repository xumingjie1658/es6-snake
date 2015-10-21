'use strict';

class Food {

    constructor() {
        this.init();
    }

    init() {
        let p = this.generatePosition();
        while(p.y == 4 && (p.x == 0 || p.x == 1 || p.x == 2 || p.x == 3)){
            p = this.generatePosition();
        }
        this.setPosition(p);
    }

    setPosition({x = 5,y = 5} = {}) {
        this.position = {x,y};
    }

    getPosition() {
        return this.position;
    }

    generatePosition() {
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);
        return {x : x, y : y};
    }

    reset() {
        this.init();
    }
}

export default Food;
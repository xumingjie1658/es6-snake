'use strict';

class Food {

    construtor() {
        this.position = {};
    }

    setPosition({x = 0,y = 0} = {}) {
        this.position = {x,y};
    }

    getPosition() {
        return this.position;
    }
}

export default Food;
'use strict';

class Node {

    contructor(position) {
        this.position = position;
        this.next = null;
    }

    setPosition({x = 0,y = 0} = {}) {
        this.position = {x,y};
    }

    getPosition() {
        return this.position;
    }
}

export  default Node;
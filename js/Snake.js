'use strict';

import Queue from './Queue';
import ErrorCode from './ErrorCode';
import Event from './Event';

class Snake {

    constructor() {
        this.body = new Queue();
        this.direction = {x: 1, y : 0};
        this.deadEvent = new Event(this);
        this.catchFoodEvent = new Event(this);
        this.successEvent = new Event(this);
        this.init();
    }

    add(element) {
        if(!this.body.enqueue(element).success){
            this.successEvent.notify();
        }
    }

    remove() {
        this.body.dequeue();
    }

    getSnakeHead() {
        return this.body.getRear();
    }

    init() {
        this.add({x:0,y:4});
        this.add({x:1,y:4});
        this.add({x:2,y:4});
        this.add({x:3,y:4});
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getDirection() {
        return this.direction;
    }

    move() {
        let head = this.getSnakeHead().getPosition();
        let x = head.x + this.direction.x;
        let y = head.y + this.direction.y;
        if(x == 10 || x == -1 || y == 10 || y == -1 || this.body.canFind({x,y})){
            this.deadEvent.notify();
        }
        else {
            this.remove();
            this.add({x: x,y : y});
        }
    }

    grow() {
        let head = this.getSnakeHead().getPosition();
        let x = head.x + this.direction.x;
        let y = head.y + this.direction.y;
        this.add({x : x, y : y});
        this.catchFoodEvent.notify();
    }

    reset() {
        this.body = new Queue();
        this.direction = {x: 1, y : 0};
        this.init();
    }
}

export default Snake;
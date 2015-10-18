'use strict';

import Queue from './Queue';
import ErrorCode from './ErrorCode';

class Snake {

    constructor() {
        this.body = new Queue();
        this.direction = {x: 1, y : 0};
    }

    add(element) {
        this.body.enqueue(element);
    }

    remove() {
        this.body.dequeue();
    }

    getSnakeHeadPosition() {
        return this.body.getRear().getPosition();
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

    move() {
        let head = getSnakeHeadPosition();
        let x = head.x + this.direction.x;
        let y = head.y + this.direction.y;
        if(x == 10 || x == -1 || y == 10 || y == -1 || this.body.canFind({x,y})){
            return {
                'success' : false,
                'errorCode' : ErrorCode.GAME_OVER
            }
        }
        else {
            this.remove();
            this.add({x: x,y : y});
        }

    }
}

export default Snake;
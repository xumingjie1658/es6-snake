'use strict';

import Node from './Node';
import ErrorCode from './ErrorCode';

class Queue {

    constructor() {
        this.maxSize = 100;
        this.size = 0;
        this.front = null;
        this.rear = null;
    }

    isFull() {
        return (this.size == this.maxSize);
    }

    isEmpty() {
        return (this.size == 0);
    }

    canFind(position){
        let node = this.front;
        while(node != null) {
            let nodePosition = node.getPosition();
            if (position.x == nodePosition.x && position.y == nodePosition.y) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    enqueue(position) {
        if(this.isFull()) {
            return {
                'success' : false,
                'errorCode' : ErrorCode.QUEUE_FULL
            }
        }
        let newNode = new Node(position);
        if(this.isEmpty()) {
            this.front = newNode;
        }
        else {
            this.rear.next = newNode;
        }
        this.rear = newNode;
        this.size++;
        return {
            'success' : true
        }
    }

    dequeue() {
        if(this.isEmpty()){
            return {
                'success' : false,
                'errorCode' : ErrorCode.QUEUE_EMPTY
            }
        }
        this.front = this.front.next;
        this.size--;
        if(this.isEmpty()) {
            this.rear = null;
        }

        return {
            'success' : true
        }
    }

    getRear() {
        return this.rear;
    }

    getFront() {
        return this.front;
    }

}

export default Queue;
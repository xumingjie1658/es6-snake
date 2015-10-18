'use strict';

import Node from './Node';
import ErrorCode from './ErrorCode';

class Queue {

    const MAX_SIZE = 100;

    static maxSize = MAX_SIZE;

    contructor(head) {
        this.size = 0;
        this.front = null;
        this.rear = null;
    }

    isFull() {
        return (this.size == maxSize);
    }

    isEmpty() {
        return (this.size == 0);
    }

    canFind(position){
        let node = this.front;
        while(node != null) {
            if (node.getPosition() === position) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    enqueue(position) {
        if(isFull()) {
            return {
                'success' : false,
                'errorCode' : ErrorCode.QUEUE_FULL
            }
        }
        let newNode = new Node(position);
        if(isEmpty()) {
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
        if(isEmpty()){
            return {
                'success' : false,
                'errorCode' : ErrorCode.QUEUE_EMPTY
            }
        }
        this.front = this.front.next;
        this.size--;
        if(isEmpty()) {
            this.rear = null;
        }

        return {
            'success' : true
        }
    }

    getRear() {
        return this.rear;
    }

}
'use strict';

class Event {
    constructor(sender) {
        this.sender = sender;
        this.listeners = [];
    }

    attach(listener) {
        this.listeners.push(listener);
    }

    notify(args) {
        for( let i = 0; i < this.listeners.length; i++ ){
            this.listeners[i](this.sender, args);
        }
    }
}

export default Event;
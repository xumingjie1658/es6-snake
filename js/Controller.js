'use strict';

import Model from "./Model";
import CanvasView from "./CanvasView";
import KeyBoardEvent from "./KeyBoardEvent";

class Controller {

    constructor(model, CanvasView, restartButton) {
        this.model = model;
        this.canvasView = CanvasView;
        this.restartButton = restartButton;
    }

    init() {
        this.canvasView.start(this.model);
        this.bindEvent();
    }

    bindEvent() {
        this.restartButton.onclick = function(){
            this.reset();
        }.bind(this);

        this.model.scoreUpdateEvent.attach(function(sender,args){
            this.canvasView.updateScore(args.score);
        }.bind(this));

        this.model.stopViewEvent.attach(function(){
            this.canvasView.stop();
        }.bind(this));

        for(let prop in KeyBoardEvent){
            KeyBoardEvent[prop].attach(this.changeDirection.bind(this));
        }

        document.onkeyup = function(callback_e) {
            let e = callback_e || event;
            let currKey = e.keyCode || e.which || e.charCode;
            switch(currKey){
                case 87 : //W
                    if(this.model.snake.getDirection().y == 0) {
                        KeyBoardEvent.KeyUpEvent.notify();
                    }
                    break;
                case 83 : //S
                    if(this.model.snake.getDirection().y == 0) {
                        KeyBoardEvent.KeyDownEvent.notify();
                    }
                    break;
                case 65 : //A
                    if(this.model.snake.getDirection().x == 0) {
                        KeyBoardEvent.KeyLeftEvent.notify();
                    }
                    break;
                case 68 : //D
                    if(this.model.snake.getDirection().x == 0) {
                        KeyBoardEvent.KeyRightEvent.notify();
                    }
                    break;
            }
        }.bind(this);
    }


    changeDirection(eventType, args) {
        switch (eventType) {
            case 'KeyUpEvent' :
                this.model.snake.setDirection({x: 0, y: -1});
                break;
            case 'KeyDownEvent' :
                this.model.snake.setDirection({x:0, y:1});
                break;
            case 'KeyLeftEvent' :
                this.model.snake.setDirection({x:-1, y:0});
                break;
            case 'KeyRightEvent' :
                this.model.snake.setDirection({x:1, y:0});
                break;
        }
    }

    reset() {
        this.model.reset();
        this.canvasView.start(this.model);
        this.canvasView.updateScore(0);
    }

}

export default Controller;
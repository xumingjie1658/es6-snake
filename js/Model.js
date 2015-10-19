'use strict';

import Food from './Food';
import Snake from './Snake';
import Event from './Event';

class Model {

    constructor(food, snake) {
        this.food = food;
        this.snake = snake;
        this.score = 0;
        this.scoreUpdateEvent = new Event(this);
        this.stopViewEvent = new Event();
        this.bindEvent();
    }

    bindEvent() {
        this.snake.deadEvent.attach(function(){
            alert('GAME OVER. Your score is ' + this.score);
            this.stopViewEvent.notify();
        }.bind(this));

        this.snake.successEvent.attach(function(){
            alert('You Win ! ');
            this.stopViewEvent.notify();
        }.bind(this));

        this.snake.catchFoodEvent.attach(function(){
            this.score += 100;
            this.scoreUpdateEvent.notify({score : this.score});
        }.bind(this));
    }

    checkFood() {
        let snakeHead = this.snake.getSnakeHead();
        let snakeHeadPosition = snakeHead.getPosition();
        let direction = this.snake.getDirection();
        let nextPosition = {x : snakeHeadPosition.x + direction.x , y : snakeHeadPosition.y + direction.y};
        let foodPosition = this.food.getPosition();
        if(nextPosition.x == foodPosition.x && nextPosition.y == foodPosition.y){
            let p = this.food.generatePosition();
            while(this.checkFoodPosition(p,foodPosition)){
                p = this.food.generatePosition();
            }
            this.food.setPosition(p);
            return true;
        }
        else{
            return false;
        }
    }

    checkFoodPosition(position,foodPosition) {
        if(position.x == foodPosition.x && position.y == foodPosition.y || this.snake.body.canFind(position)){
            return true;
        }
        return false;
    }

    reset() {
        this.snake.reset();
        this.food.reset();
        this.score = 0;
    }

}

export default Model;
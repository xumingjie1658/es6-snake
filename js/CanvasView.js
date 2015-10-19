'use strict';

import View from './View';

class CanvasView extends View{
    constructor(canvas,context,scoreElement) {
        super();
        this.canvas = canvas;
        this.context = context;
        this.scoreElement = scoreElement;
    }

    renderBackground(backgroundColor) {
        this.context.fillStyle = backgroundColor;
        this.context.fillRect(0, 0, 400, 400);
    }

    start(model) {
        this.interval = setInterval(function(){
            if(model.checkFood()){
                model.snake.grow();
            }
            else {
                model.snake.move();
            }
            this.render(model);
        }.bind(this),(1 / (this.fps / 1000)));
    }

    render(model) {
        this.renderBackground('#ecf0f1');
        this.renderMesh(model.food.position, 'food');
        let snakeFront = model.snake.body.getFront();
        while(snakeFront != null) {
            this.renderMesh(snakeFront.position,'snake');
            snakeFront = snakeFront.next;
        }
    }

    renderMesh({x = 0,y = 0} = {}, type = 'food') {
        let color;

        if( type == 'food'){
            color = '#9B59B6';
        }
        else if(type == 'snake'){
            color = '#BDC3C7';
        }

        this.context.fillStyle = color;
        this.context.fillRect(x * 40 +2, y * 40 + 2, 36, 36);
    }

    updateScore(score) {
        this.scoreElement.innerHTML = score;
    }

    stop() {
        clearInterval(this.interval);
    }
}

export default CanvasView;
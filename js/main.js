
import Snake from './Snake';
import Food from './Food';
import Model from './Model';
import CanvasView from './CanvasView';
import ThreeDView from './3DView';
import Controller from './Controller';

(function(){

    let snake = new Snake();
    let food = new Food();
    let model = new Model(food,snake);
    const convasId = "snake-canvas";
    const contextType = '2d';
    const scoreElement = document.getElementById("score");
    const canvas = document.getElementById(convasId);
    const context = canvas.getContext(contextType);
    const restartButton = document.getElementById('restartButton');
    const threeDViewElement = document.getElementById('3d-view-container');
    const threeDScoreElement = document.getElementById("3d-score");
    let canvasView = new CanvasView(canvas,context,scoreElement);
    let threeDView = new ThreeDView(threeDViewElement,threeDScoreElement);
    let controller = new Controller(model, canvasView, threeDView, restartButton);
    controller.init();

})();
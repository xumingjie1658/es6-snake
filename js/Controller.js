'use strict';

import Model from "./Model";
import CanvasView from "./CanvasView";


class Controller {

    contructor() {
        this.model = new Model();
        this.canvasView = new CanvasView();
    }

    init() {

    }

    freshView() {

    }

}

export default Controller;
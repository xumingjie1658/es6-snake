(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by xumingjie on 15/10/19.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var ThreeDView = (function (_View) {
    _inherits(ThreeDView, _View);

    function ThreeDView(renderElement, scoreElement) {
        _classCallCheck(this, ThreeDView);

        _get(Object.getPrototypeOf(ThreeDView.prototype), 'constructor', this).call(this);
        this.renderElement = renderElement;
        this.scoreElement = scoreElement;
        this.initMap();
        this.initScene();
        this.initLight();
        this.setCameraPosition();
    }

    _createClass(ThreeDView, [{
        key: 'initMap',
        value: function initMap() {
            this.map = new Array(10);
            for (var i = 0; i < 10; i++) {
                this.map[i] = new Array(10);
                for (var j = 0; j < 10; j++) {
                    this.map[i][j] = 0;
                }
            }
        }
    }, {
        key: 'initScene',
        value: function initScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(60, 6 / 4, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(600, 400);
            this.renderElement.appendChild(this.renderer.domElement);
            this.renderedObject = new THREE.Object3D();
        }
    }, {
        key: 'initLight',
        value: function initLight() {
            var ambientLight = new THREE.AmbientLight(0x000000);
            this.scene.add(ambientLight);
            var lights = [];
            lights[0] = new THREE.PointLight(0xffffff, 1, 0);
            lights[1] = new THREE.PointLight(0xffffff, 1, 0);
            lights[2] = new THREE.PointLight(0xffffff, 1, 0);
            lights[0].position.set(0, 200, 0);
            lights[1].position.set(100, 200, 100);
            lights[2].position.set(-100, -200, -100);

            this.scene.add(lights[0]);
            this.scene.add(lights[1]);
            this.scene.add(lights[2]);
        }
    }, {
        key: 'setCameraPosition',
        value: function setCameraPosition() {
            this.camera.position.z = 8;
            this.camera.position.y = 3;
            this.camera.position.x = 0.7;
        }
    }, {
        key: 'render',
        value: function render(model) {
            this.scene.remove(this.renderedObject);
            this.initMap();
            this.renderedObject = new THREE.Object3D();
            this.map[model.food.position.x][model.food.position.y] = 1;
            this.renderMesh({ x: (model.food.position.x - 4) * 1.1, y: -(9 - model.food.position.y) * 1.1 }, 'food');
            var snakeFront = model.snake.body.getFront();
            while (snakeFront != null) {
                this.map[snakeFront.position.x][snakeFront.position.y] = 1;
                this.renderMesh({ x: (snakeFront.position.x - 4) * 1.1, y: -(9 - snakeFront.position.y) * 1.1 }, 'snake');
                snakeFront = snakeFront.next;
            }
            this.renderMap();
            this.renderedObject.rotation.x = Math.PI / 3;
            this.scene.add(this.renderedObject);
            this.renderer.render(this.scene, this.camera);
        }
    }, {
        key: 'renderMap',
        value: function renderMap() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this.map[i][j] == 0) {
                        this.renderMesh({ x: (i - 4) * 1.1, y: (j - 9) * 1.1 }, 'map');
                    }
                }
            }
        }
    }, {
        key: 'renderMesh',
        value: function renderMesh() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;
            var type = arguments.length <= 1 || arguments[1] === undefined ? 'food' : arguments[1];

            var mesh = new THREE.Object3D();
            mesh.add(new THREE.LineSegments(new THREE.BoxGeometry(1, 0.2, 1), new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            })));
            if (type == 'snake') {
                mesh.add(new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, 1), new THREE.MeshPhongMaterial({
                    color: 0x156289,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })));
            } else if (type == 'food') {
                mesh.add(new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, 1), new THREE.MeshPhongMaterial({
                    color: 0x9B59B6,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })));
            } else if (type == 'map') {
                mesh.add(new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, 1), new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })));
            }

            mesh.position.x = x;
            mesh.position.z = y;
            this.renderedObject.add(mesh);
        }
    }, {
        key: 'updateScore',
        value: function updateScore(score) {
            this.scoreElement.innerHTML = score;
        }
    }]);

    return ThreeDView;
})(_View3['default']);

exports['default'] = ThreeDView;
module.exports = exports['default'];


},{"./View":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var CanvasView = (function (_View) {
    _inherits(CanvasView, _View);

    function CanvasView(canvas, context, scoreElement) {
        _classCallCheck(this, CanvasView);

        _get(Object.getPrototypeOf(CanvasView.prototype), 'constructor', this).call(this);
        this.canvas = canvas;
        this.context = context;
        this.scoreElement = scoreElement;
    }

    _createClass(CanvasView, [{
        key: 'renderBackground',
        value: function renderBackground(backgroundColor) {
            this.context.fillStyle = backgroundColor;
            this.context.fillRect(0, 0, 400, 400);
        }
    }, {
        key: 'render',
        value: function render(model) {
            this.renderBackground('#ecf0f1');
            this.renderMesh(model.food.position, 'food');
            var snakeFront = model.snake.body.getFront();
            while (snakeFront != null) {
                this.renderMesh(snakeFront.position, 'snake');
                snakeFront = snakeFront.next;
            }
        }
    }, {
        key: 'renderMesh',
        value: function renderMesh() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;
            var type = arguments.length <= 1 || arguments[1] === undefined ? 'food' : arguments[1];

            var color = undefined;

            if (type == 'food') {
                color = '#9B59B6';
            } else if (type == 'snake') {
                color = '#BDC3C7';
            }

            this.context.fillStyle = color;
            this.context.fillRect(x * 40 + 2, y * 40 + 2, 36, 36);
        }
    }, {
        key: 'updateScore',
        value: function updateScore(score) {
            this.scoreElement.innerHTML = score;
        }
    }]);

    return CanvasView;
})(_View3['default']);

exports['default'] = CanvasView;
module.exports = exports['default'];


},{"./View":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Model = require("./Model");

var _Model2 = _interopRequireDefault(_Model);

var _CanvasView = require("./CanvasView");

var _CanvasView2 = _interopRequireDefault(_CanvasView);

var _KeyBoardEvent = require("./KeyBoardEvent");

var _KeyBoardEvent2 = _interopRequireDefault(_KeyBoardEvent);

var _DView = require("./3DView");

var _DView2 = _interopRequireDefault(_DView);

var Controller = (function () {
    function Controller(model, canvasView, threeDView, restartButton) {
        _classCallCheck(this, Controller);

        this.model = model;
        this.canvasView = canvasView;
        this.threeDView = threeDView;
        this.restartButton = restartButton;
        this.fps = 5;
    }

    _createClass(Controller, [{
        key: "init",
        value: function init() {
            this.start();
            this.bindEvent();
        }
    }, {
        key: "bindEvent",
        value: function bindEvent() {
            this.restartButton.onclick = (function () {
                this.reset();
            }).bind(this);

            this.model.scoreUpdateEvent.attach((function (sender, args) {
                this.canvasView.updateScore(args.score);
                this.threeDView.updateScore(args.score);
            }).bind(this));

            this.model.stopViewEvent.attach((function () {
                this.stop();
            }).bind(this));

            for (var prop in _KeyBoardEvent2["default"]) {
                _KeyBoardEvent2["default"][prop].attach(this.changeDirection.bind(this));
            }

            document.onkeyup = (function (callback_e) {
                var e = callback_e || event;
                var currKey = e.keyCode || e.which || e.charCode;
                switch (currKey) {
                    case 87:
                        //W
                        if (this.model.snake.getDirection().y == 0) {
                            _KeyBoardEvent2["default"].KeyUpEvent.notify();
                        }
                        break;
                    case 83:
                        //S
                        if (this.model.snake.getDirection().y == 0) {
                            _KeyBoardEvent2["default"].KeyDownEvent.notify();
                        }
                        break;
                    case 65:
                        //A
                        if (this.model.snake.getDirection().x == 0) {
                            _KeyBoardEvent2["default"].KeyLeftEvent.notify();
                        }
                        break;
                    case 68:
                        //D
                        if (this.model.snake.getDirection().x == 0) {
                            _KeyBoardEvent2["default"].KeyRightEvent.notify();
                        }
                        break;
                }
            }).bind(this);
        }
    }, {
        key: "changeDirection",
        value: function changeDirection(eventType, args) {
            switch (eventType) {
                case 'KeyUpEvent':
                    this.model.snake.setDirection({ x: 0, y: -1 });
                    break;
                case 'KeyDownEvent':
                    this.model.snake.setDirection({ x: 0, y: 1 });
                    break;
                case 'KeyLeftEvent':
                    this.model.snake.setDirection({ x: -1, y: 0 });
                    break;
                case 'KeyRightEvent':
                    this.model.snake.setDirection({ x: 1, y: 0 });
                    break;
            }
        }
    }, {
        key: "start",
        value: function start() {
            this.interval = setInterval((function () {
                if (this.model.checkFood()) {

                    this.model.snake.grow();
                } else {
                    this.model.snake.move();
                }
                this.canvasView.render(this.model);
                this.threeDView.render(this.model);
            }).bind(this), 1 / (this.fps / 1000));
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.interval);
        }
    }, {
        key: "reset",
        value: function reset() {
            this.model.reset();
            this.start();
            this.canvasView.updateScore(0);
            this.threeDView.updateScore(0);
        }
    }]);

    return Controller;
})();

exports["default"] = Controller;
module.exports = exports["default"];


},{"./3DView":1,"./CanvasView":2,"./KeyBoardEvent":7,"./Model":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function () {
    return {
        'QUEUE_FULL': 400,
        'QUEUE_EMPTY': 401,
        'GAME_OVER': 402
    };
})();

module.exports = exports['default'];


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Event = (function () {
    function Event(sender) {
        _classCallCheck(this, Event);

        this.sender = sender;
        this.listeners = [];
    }

    _createClass(Event, [{
        key: 'attach',
        value: function attach(listener) {
            this.listeners.push(listener);
        }
    }, {
        key: 'notify',
        value: function notify(args) {
            for (var i = 0; i < this.listeners.length; i++) {
                this.listeners[i](this.sender, args);
            }
        }
    }]);

    return Event;
})();

exports['default'] = Event;
module.exports = exports['default'];


},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Food = (function () {
    function Food() {
        _classCallCheck(this, Food);

        this.init();
    }

    _createClass(Food, [{
        key: 'init',
        value: function init() {
            var p = this.generatePosition();
            while (p.y == 4 && (p.x == 0 || p.x == 1 || p.x == 2 || p.x == 3)) {
                p = this.generatePosition();
            }
            this.setPosition(p);
        }
    }, {
        key: 'setPosition',
        value: function setPosition() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 5 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 5 : _ref$y;

            this.position = { x: x, y: y };
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this.position;
        }
    }, {
        key: 'generatePosition',
        value: function generatePosition() {
            var x = Math.floor(Math.random() * 10);
            var y = Math.floor(Math.random() * 10);
            return { x: x, y: y };
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.init();
        }
    }]);

    return Food;
})();

exports['default'] = Food;
module.exports = exports['default'];


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

exports['default'] = (function () {
    return {
        'KeyUpEvent': new _Event2['default']('KeyUpEvent'),
        'KeyDownEvent': new _Event2['default']('KeyDownEvent'),
        'KeyLeftEvent': new _Event2['default']('KeyLeftEvent'),
        'KeyRightEvent': new _Event2['default']('KeyRightEvent')
    };
})();

module.exports = exports['default'];


},{"./Event":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Food = require('./Food');

var _Food2 = _interopRequireDefault(_Food);

var _Snake = require('./Snake');

var _Snake2 = _interopRequireDefault(_Snake);

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var Model = (function () {
    function Model(food, snake) {
        _classCallCheck(this, Model);

        this.mapSize = 10;
        this.food = food;
        this.snake = snake;
        this.score = 0;
        this.scoreUpdateEvent = new _Event2['default'](this);
        this.stopViewEvent = new _Event2['default']();
        this.bindEvent();
    }

    _createClass(Model, [{
        key: 'bindEvent',
        value: function bindEvent() {
            this.snake.deadEvent.attach((function () {
                alert('GAME OVER. Your score is ' + this.score);
                this.stopViewEvent.notify();
            }).bind(this));

            this.snake.successEvent.attach((function () {
                alert('You Win ! ');
                this.stopViewEvent.notify();
            }).bind(this));

            this.snake.catchFoodEvent.attach((function () {
                this.score += 100;
                this.scoreUpdateEvent.notify({ score: this.score });
            }).bind(this));
        }
    }, {
        key: 'checkFood',
        value: function checkFood() {
            var snakeHead = this.snake.getSnakeHead();
            var snakeHeadPosition = snakeHead.getPosition();
            var direction = this.snake.getDirection();
            var nextPosition = { x: snakeHeadPosition.x + direction.x, y: snakeHeadPosition.y + direction.y };
            var foodPosition = this.food.getPosition();
            if (nextPosition.x == foodPosition.x && nextPosition.y == foodPosition.y) {
                var p = this.food.generatePosition();
                while (this.checkFoodPosition(p, foodPosition)) {
                    p = this.food.generatePosition();
                }
                this.food.setPosition(p);
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'checkFoodPosition',
        value: function checkFoodPosition(position, foodPosition) {
            if (position.x == foodPosition.x && position.y == foodPosition.y || this.snake.body.canFind(position)) {
                return true;
            }
            return false;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.snake.reset();
            this.food.reset();
            this.score = 0;
        }
    }]);

    return Model;
})();

exports['default'] = Model;
module.exports = exports['default'];


},{"./Event":5,"./Food":6,"./Snake":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Node = (function () {
    function Node(position) {
        _classCallCheck(this, Node);

        this.position = position;
        this.next = null;
    }

    _createClass(Node, [{
        key: 'setPosition',
        value: function setPosition() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;

            this.position = { x: x, y: y };
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this.position;
        }
    }]);

    return Node;
})();

exports['default'] = Node;
module.exports = exports['default'];


},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _ErrorCode = require('./ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

var Queue = (function () {
    function Queue() {
        _classCallCheck(this, Queue);

        this.maxSize = 100;
        this.size = 0;
        this.front = null;
        this.rear = null;
    }

    _createClass(Queue, [{
        key: 'isFull',
        value: function isFull() {
            return this.size == this.maxSize;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size == 0;
        }
    }, {
        key: 'canFind',
        value: function canFind(position) {
            var node = this.front;
            while (node != null) {
                var nodePosition = node.getPosition();
                if (position.x == nodePosition.x && position.y == nodePosition.y) {
                    return true;
                }
                node = node.next;
            }
            return false;
        }
    }, {
        key: 'enqueue',
        value: function enqueue(position) {
            if (this.isFull()) {
                return {
                    'success': false,
                    'errorCode': _ErrorCode2['default'].QUEUE_FULL
                };
            }
            var newNode = new _Node2['default'](position);
            if (this.isEmpty()) {
                this.front = newNode;
            } else {
                this.rear.next = newNode;
            }
            this.rear = newNode;
            this.size++;
            return {
                'success': true
            };
        }
    }, {
        key: 'dequeue',
        value: function dequeue() {
            if (this.isEmpty()) {
                return {
                    'success': false,
                    'errorCode': _ErrorCode2['default'].QUEUE_EMPTY
                };
            }
            this.front = this.front.next;
            this.size--;
            if (this.isEmpty()) {
                this.rear = null;
            }

            return {
                'success': true
            };
        }
    }, {
        key: 'getRear',
        value: function getRear() {
            return this.rear;
        }
    }, {
        key: 'getFront',
        value: function getFront() {
            return this.front;
        }
    }]);

    return Queue;
})();

exports['default'] = Queue;
module.exports = exports['default'];


},{"./ErrorCode":4,"./Node":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _ErrorCode = require('./ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var Snake = (function () {
    function Snake() {
        _classCallCheck(this, Snake);

        this.body = new _Queue2['default']();
        this.direction = { x: 1, y: 0 };
        this.deadEvent = new _Event2['default'](this);
        this.catchFoodEvent = new _Event2['default'](this);
        this.successEvent = new _Event2['default'](this);
        this.init();
    }

    _createClass(Snake, [{
        key: 'add',
        value: function add(element) {
            if (!this.body.enqueue(element).success) {
                this.successEvent.notify();
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.body.dequeue();
        }
    }, {
        key: 'getSnakeHead',
        value: function getSnakeHead() {
            return this.body.getRear();
        }
    }, {
        key: 'init',
        value: function init() {
            this.add({ x: 0, y: 4 });
            this.add({ x: 1, y: 4 });
            this.add({ x: 2, y: 4 });
            this.add({ x: 3, y: 4 });
        }
    }, {
        key: 'setDirection',
        value: function setDirection(direction) {
            this.direction = direction;
        }
    }, {
        key: 'getDirection',
        value: function getDirection() {
            return this.direction;
        }
    }, {
        key: 'move',
        value: function move() {
            var head = this.getSnakeHead().getPosition();
            var x = head.x + this.direction.x;
            var y = head.y + this.direction.y;
            if (x == 10 || x == -1 || y == 10 || y == -1 || this.body.canFind({ x: x, y: y })) {
                this.deadEvent.notify();
            } else {
                this.remove();
                this.add({ x: x, y: y });
            }
        }
    }, {
        key: 'grow',
        value: function grow() {
            var head = this.getSnakeHead().getPosition();
            var x = head.x + this.direction.x;
            var y = head.y + this.direction.y;
            this.add({ x: x, y: y });
            this.catchFoodEvent.notify();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.body = new _Queue2['default']();
            this.direction = { x: 1, y: 0 };
            this.init();
        }
    }]);

    return Snake;
})();

exports['default'] = Snake;
module.exports = exports['default'];


},{"./ErrorCode":4,"./Event":5,"./Queue":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var View = (function () {
    function View() {
        _classCallCheck(this, View);
    }

    _createClass(View, [{
        key: 'initMap',
        value: function initMap() {}
    }, {
        key: 'freshView',
        value: function freshView() {}
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'stop',
        value: function stop() {}
    }]);

    return View;
})();

;

exports['default'] = View;
module.exports = exports['default'];


},{}],13:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Snake = require('./Snake');

var _Snake2 = _interopRequireDefault(_Snake);

var _Food = require('./Food');

var _Food2 = _interopRequireDefault(_Food);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _CanvasView = require('./CanvasView');

var _CanvasView2 = _interopRequireDefault(_CanvasView);

var _DView = require('./3DView');

var _DView2 = _interopRequireDefault(_DView);

var _Controller = require('./Controller');

var _Controller2 = _interopRequireDefault(_Controller);

(function () {

    var snake = new _Snake2['default']();
    var food = new _Food2['default']();
    var model = new _Model2['default'](food, snake);
    var convasId = "snake-canvas";
    var contextType = '2d';
    var scoreElement = document.getElementById("score");
    var canvas = document.getElementById(convasId);
    var context = canvas.getContext(contextType);
    var restartButton = document.getElementById('restartButton');
    var threeDViewElement = document.getElementById('3d-view-container');
    var threeDScoreElement = document.getElementById("3d-score");
    var canvasView = new _CanvasView2['default'](canvas, context, scoreElement);
    var threeDView = new _DView2['default'](threeDViewElement, threeDScoreElement);
    var controller = new _Controller2['default'](model, canvasView, threeDView, restartButton);
    controller.init();
})();


},{"./3DView":1,"./CanvasView":2,"./Controller":3,"./Food":6,"./Model":8,"./Snake":11}]},{},[13]);

/**
 * Created by xumingjie on 15/10/19.
 */

'use strict';

import View from './View';

class ThreeDView extends View{
    constructor(renderElement, scoreElement) {
        super();
        this.renderElement = renderElement;
        this.scoreElement = scoreElement;
        this.initMap();
        this.initScene();
        this.initLight();
        this.setCameraPosition();
    }

    initMap() {
        this.map = new Array(10);
        for( let i = 0; i < 10; i++ ) {
            this.map[i] = new Array(10);
            for(let j = 0; j < 10; j++) {
                this.map[i][j] = 0;
            }
        }
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 60, 6/4, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize( 600, 400 );
        this.renderElement.appendChild( this.renderer.domElement );
        this.renderedObject =  new THREE.Object3D();
    }

    initLight() {
        let ambientLight = new THREE.AmbientLight( 0x000000 );
        this.scene.add( ambientLight );
        let lights = [];
        lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[0].position.set( 0, 200, 0 );
        lights[1].position.set( 100, 200, 100 );
        lights[2].position.set( -100, -200, -100 );

        this.scene.add( lights[0] );
        this.scene.add( lights[1] );
        this.scene.add( lights[2] );
    }

    setCameraPosition() {
        this.camera.position.z = 8;
        this.camera.position.y = 3;
        this.camera.position.x = 0.7;
    }

    render(model) {
        this.scene.remove(this.renderedObject);
        this.initMap();
        this.renderedObject =  new THREE.Object3D();
        this.map[model.food.position.x][model.food.position.y] = 1;
        this.renderMesh({x : (model.food.position.x-4) * 1.1, y : -( 9 -model.food.position.y) * 1.1}, 'food');
        let snakeFront = model.snake.body.getFront();
        while(snakeFront != null) {
            this.map[snakeFront.position.x][snakeFront.position.y] = 1;
            this.renderMesh({ x : (snakeFront.position.x-4) * 1.1, y : -( 9 -snakeFront.position.y) * 1.1},'snake');
            snakeFront = snakeFront.next;
        }
        this.renderMap();
        this.renderedObject.rotation.x = Math.PI / 3;
        this.scene.add(this.renderedObject);
        this.renderer.render(this.scene, this.camera);
    }

    renderMap() {
        for( let i = 0; i < 10; i++ ){
            for( let j = 0; j < 10; j++ ) {
                if(this.map[i][j] == 0) {
                    this.renderMesh({x : (i-4) * 1.1 , y : (j - 9) * 1.1}, 'map');
                }
            }
        }
    }

    renderMesh({x = 0,y = 0} = {}, type = 'food') {
        let mesh = new THREE.Object3D();
        mesh.add(new THREE.LineSegments(
            new THREE.BoxGeometry(1, 0.2, 1),
            new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            })
        ));
        if(type == 'snake') {
            mesh.add(new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.2, 1),
                new THREE.MeshPhongMaterial({
                    color: 0x156289,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })
            ));
        }
        else if(type == 'food') {
            mesh.add(new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.2, 1),
                new THREE.MeshPhongMaterial({
                    color: 0x9B59B6,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })
            ));
        }
        else if(type == 'map') {
            mesh.add(new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.2, 1),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                })
            ));
        }

        mesh.position.x = x;
        mesh.position.z = y;
        this.renderedObject.add(mesh);
    }

    updateScore(score) {
        this.scoreElement.innerHTML = score;
    }
}

export default ThreeDView;
import { Game, Node } from "./engino/engino/Engino.js";
import Rectangle from "./engino/engino/Nodes/Rectangle.js";
import { YOrderedGroup } from "./engino/engino/Nodes/YOrderedGroup.js";
import { Vector2, clamp, Matrix2x2 } from "./engino/engino/Utilities.js";
import Camera from "./engino/engino/Nodes/Camera.js";


class Player extends Node {
    constructor(left, right, color, ...args) {
        super(...args)
        this.left = left
        this.right = right
        this.color = color
        this.movementSpeed = 100
        this.direction = 0
        this.controlModifier = 1
    }

    ready() {
        this.sprite = new Rectangle(new Vector2(10, 10), this.color)
        this.addChild(this.sprite)
    }

    update(deltatime) {
        const deltaTimeInSec = deltatime / 1000;
        if (this.inputManager.isDown('a')) {
            this.direction -= deltaTimeInSec * this.controlModifier
        }
        if (this.inputManager.isDown('d')) {
            this.direction += deltaTimeInSec * this.controlModifier
        }

        const scaledMoveSpeed = deltaTimeInSec * this.movementSpeed
        const movementDirection = Matrix2x2.rotate(this.direction).apply(new Vector2(1, 0))
        const movementDelta = movementDirection.mul(scaledMoveSpeed)
        this.position = this.position.add(movementDelta);
        this.rotation = this.direction
    }
}

// class Map extends Node {
//     ready() {
//         this.grid = []
//     }

//     /// param
//     addSkatedPoint(point) {

//     }

// }

class MainScene extends YOrderedGroup {
    ready() {
        this.player = new Player('a', 'd', '#FFFFFF')
        // this.block = new Rectangle(new Vector2(100, 30), 'gold', new Vector2(300, 300), Math.PI / 8);
        // this.addChild(this.block);
        this.addChild(this.player);
        this.camera = new Camera()
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());

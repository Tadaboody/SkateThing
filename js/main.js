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
        this.rotationSpeed = 2
    }

    ready() {
        this.sprite = new Rectangle(new Vector2(10, 10), this.color)
        this.addChild(this.sprite)
    }

    update(deltatime) {
        const deltaTimeInSec = deltatime / 1000;
        if (this.inputManager.isDown(this.left)) {
            this.rotation -= deltaTimeInSec * this.rotationSpeed
        }
        if (this.inputManager.isDown(this.right)) {
            this.rotation += deltaTimeInSec * this.rotationSpeed
        }

        const scaledMoveSpeed = deltaTimeInSec * this.movementSpeed
        const movementDirection = Matrix2x2.rotate(this.rotation).apply(new Vector2(1, 0))
        const movementDelta = movementDirection.mul(scaledMoveSpeed)
        this.position = this.position.add(movementDelta);
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
        this.players = [new Player('a', 'd', '#FFFFFF'), new Player('k', 'l', '#FFFF00')]
        this.players.forEach(player => this.addChild(player))
        this.camera = new Camera()
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());

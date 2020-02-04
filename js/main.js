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

const RinkStates = {
    Skated: [0xFF, 0xFF, 0xFF, 0xFF],
    Empty: [0x00, 0xFF, 0xFF, 0xFF],
    Water: [0xFF, 0x00, 0xFF, 0xFF],
}

class SkatingRink extends Node {
    constructor(dimensions, ...args) {
        super(...args)
        this.grid = new Uint8ClampedArray(dimensions.x * dimensions.y * 4)
        this.dimensions = dimensions
    }

    setPoint(point, value) {
        for (let index = 0; index < 4; index++) {
            this.grid[(point.x * this.dimensions.x) + (point.y * 4) + index] = value[index]
        }
    }

    skatePoint(point) {
        this.setPoint(point, RinkStates.Skated)
    }

    render(context) {
        const imData = context.createImageData(this.dimensions.x, this.dimensions.y)
        this.grid.forEach((value, index) => imData.data[index] = value)
        context.putImageData(imData, 0, 0)
    }

}

class MainScene extends YOrderedGroup {
    ready() {
        this.rink = new SkatingRink(new Vector2(1000, 1000))
        this.players = [new Player('a', 'd', '#FFFFFF'), new Player('k', 'l', '#FFFF00')]
        this.players.forEach(player => this.addChild(player))
        this.camera = new Camera()
        this.addChild(this.rink)
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());

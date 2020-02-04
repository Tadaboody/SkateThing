import { Game, Node } from "./engino/engino/Engino.js";
import Rectangle from "./engino/engino/Nodes/Rectangle.js";
import { YOrderedGroup } from "./engino/engino/Nodes/YOrderedGroup.js";
import { Vector2, clamp, Matrix2x2 } from "./engino/engino/Utilities.js";
import Camera from "./engino/engino/Nodes/Camera.js";


class Player extends Node {
    constructor(directions, color, rink, ...args) {
        super(...args)
        this.left = directions[0]
        this.right = directions[1]
        this.color = color
        this.rink = rink
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
        this.rink.skatePoint(this.position)
    }
}

const RinkStates =
{
    Skated: "#FFFFFF",
    Empty: "#00FFFF",
    Water: "#FF0000",
}


class SkatingRink extends Node {
    constructor(dimensions, ...args) {
        super(...args)
        this.grid = new OffscreenCanvas(dimensions.x, dimensions.y)
        this.dimensions = dimensions
    }

    setPoint(point, value) {
        const context = this.grid.getContext("2d");
        context.fillStyle = value
        context.fillRect(point.x, point.y, 2, 2)
    }

    skatePoint(point) {
        this.setPoint(point, RinkStates.Skated)
    }

    render(context) {
        context.drawImage(this.grid, 0, 0)
    }

}

class MainScene extends YOrderedGroup {

    addPlayer(direction, color) {
        const center = this.canvasDims.mul(0.5);
        this.players.push(new Player(direction, color, this.rink, center))
    }

    get canvasDims() {
        return new Vector2(this.engine.canvas.width, this.engine.canvas.height);
    }

    ready() {
        this.rink = new SkatingRink(this.canvasDims)
        this.addChild(this.rink)
        this.players = []
        this.addPlayer(['a', 'd'], "#FFFFFF")
        this.addPlayer(['k', 'l'], '#FFFF00')
        this.players.forEach(player => this.addChild(player))
        this.camera = new Camera(this.canvasDims.div(2))
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());

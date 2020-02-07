import { Game, Node } from "./engino/engino/Engino.js";
import Rectangle from "./engino/engino/Nodes/Rectangle.js";
import { YOrderedGroup } from "./engino/engino/Nodes/YOrderedGroup.js";
import { Vector2, clamp, Matrix2x2 } from "./engino/engino/Utilities.js";
import Camera from "./engino/engino/Nodes/Camera.js";
import { getLine, floor, neighbors, fourWayNeighbors } from "./tools.js";


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
        this.inputManager.attachKey(this.right)
        this.inputManager.attachKey(this.left)
    }

    normalize(key) {
        return key
    }

    update(deltatime) {
        const deltaTimeInSec = deltatime / 1000;
        if (this.inputManager.isDown(this.normalize(this.left))) {
            this.rotation -= deltaTimeInSec * this.rotationSpeed
        }
        if (this.inputManager.isDown(this.normalize(this.right))) {
            this.rotation += deltaTimeInSec * this.rotationSpeed
        }

        const scaledMoveSpeed = deltaTimeInSec * this.movementSpeed
        const movementDirection = Matrix2x2.rotate(this.rotation).apply(new Vector2(1, 0))
        const movementDelta = movementDirection.mul(scaledMoveSpeed)
        const newPosition = this.position.add(movementDelta);
        this.rink.setLine(this.position, newPosition, RinkStates.Skated)
        this.position = newPosition;
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
        this.drawingCanvas = new OffscreenCanvas(dimensions.x, dimensions.y)
        // canvas where we draw 1-width lines to make the closed shape detection easier
        this.shadowArray = new Uint32Array(dimensions.x * dimensions.y)
        this.dimensions = dimensions
    }

    setLine(start, end, value) {
        function draw(context, width) {
            context.strokeStyle = value
            context.lineWidth = width
            context.beginPath()
            context.moveTo(start.x, start.y)
            context.lineTo(end.x, end.y)
            context.stroke()
        }

        draw(this.drawingCanvas.getContext("2d"), 0.5)
        const intersection = this.getIntersection(start, end);
        if (!(start.equals(end)) && intersection != undefined) {
            const shape = this.followClosedShape(intersection)[0]
            const context = this.drawingCanvas.getContext("2d")
            context.moveTo(intersection.x, intersection.y)
            context.fillStyle = "#FF0000"
            shape.forEach(point => context.fillRect(point.x, point.y, 10, 10))
            // shape.forEach(point=> this.shadowArray[this.getShaIndex(point)] = )
        }
        this.shadraw(start, end)
    }

    /// how did names come to this
    shadraw(start, end) {
        start = floor(start)
        end = floor(end)
        getLine(start, end).forEach(point => this.shadowArray[this.getShaIndex(point)] = 0xFFFFFF)
    }

    getShaIndex(point) {
        return point.x + point.y * this.dimensions.x
    }

    followClosedShape(firstPoint, visited = []) {
        visited.push(firstPoint)
        const isSkated = this.isSkated.bind(this)
        let nextPoints = neighbors(firstPoint)
            .filter(point => !visited.some(other => point.equals(other)))
            .filter(isSkated)
        nextPoints.forEach(point => visited.push(point))
        if (nextPoints.length == 0) {
            return []
        }
        if (nextPoints.length > 1) {
            return nextPoints.map(point => this.followClosedShape(point, visited)).filter(li => li.length > 0)
        }
        return nextPoints.concat(this.followClosedShape(nextPoints[0], visited))
    }

    isSkated(point) {
        return this.shadowArray[this.getShaIndex(point)] == 0xFFFFFF
    }

    getIntersection(start, end) {
        // The first point is always the last point of the previous line so we 
        // remove it. 
        // We check all 8 neighbors as well as the points on themselves since 
        // diagonal intersections might miss each other. 

        const line = getLine(start, end)
        const checkedPoints = line.splice(1).flatMap(neighbors)
                              .filter(point => !point.equals(line[0]))
        return checkedPoints.filter(this.isSkated.bind(this))[0]
    }

    render(context) {
        context.drawImage(this.drawingCanvas, 0, 0)
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
        this.addPlayer(['a', 'd'], "#00FFFF")
        // this.addPlayer(['k', 'l'], '#FFFF00')
        this.players.forEach(player => this.addChild(player))
        this.camera = new Camera(this.canvasDims.div(2))
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());



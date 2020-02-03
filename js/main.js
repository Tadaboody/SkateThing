import { Game, Node } from "./engino/engino/Engino.js";
import Rectangle from "./engino/engino/Nodes/Rectangle.js";
import { YOrderedGroup } from "./engino/engino/Nodes/YOrderedGroup.js";
import { Vector2, clamp, Matrix2x2 } from "./engino/engino/Utilities.js";
import Camera from "./engino/engino/Nodes/Camera.js";


export class Player extends Node {
    ready() {
        this.sprite = new Rectangle(new Vector2(10, 10), "#FFFFFF")
        this.addChild(this.sprite)
        this.camera = new Camera()
        this.addChild(this.camera)
        this.camera.setActive()
    }
}

class MainScene extends YOrderedGroup {
    ready() {
        this.player = new Player()
        // this.block = new Rectangle(new Vector2(100, 30), 'gold', new Vector2(300, 300), Math.PI / 8);
        // this.addChild(this.block);
        this.addChild(this.player);
    }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MainScene());

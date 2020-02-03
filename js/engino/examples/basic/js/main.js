import { Game, Node } from "../../../engino/Engino.js";
import { Sprite } from "../../../engino/Nodes/Sprite.js";
import { Animation } from "../../../engino/Nodes/Animation.js";
import { Rectangle } from "../../../engino/Nodes/Rectangle.js";
import { Camera } from "../../../engino/Nodes/Camera.js";
import { YOrderedGroup } from "../../../engino/Nodes/YOrderedGroup.js";
import { Vector2, clamp, Matrix2x2 } from "../../../engino/Utilities.js";

class ScalableCamera extends Camera {
  ready() {
    this.signalRouter.attachListener(
      'wheelEvent', 
      this.updateScale.bind(this)
    );
  }

  updateScale(wheelEvent) {
    const minScale = 0.2;
    const maxScale = 2;

    this.scale.x += -wheelEvent.delta.y / 1000;
    this.scale.y += -wheelEvent.delta.y / 1000;

    this.scale.x = clamp(this.scale.x, minScale, maxScale);
    this.scale.y = clamp(this.scale.y, minScale, maxScale);
  }
}

class Player extends Node {
  ready() {

    this.sprite = new Sprite(
      document.getElementById('spritesheet'), 
      new Vector2(16, 16), 
      null
    );

    const spriteIndexAnimation = new Animation(
      'spriteIndex', 
      0, 
      3, 
      500, 
      0
    );

    this.sprite.addChild(spriteIndexAnimation);
    spriteIndexAnimation.start();

    const camera = new ScalableCamera();
    this.addChild(camera);
    this.camera = camera;
    camera.setActive();

    this.addChild(this.sprite);

    this.attachKeys();

    this.movementSpeed = 150;
    this.rotationSpeed = Math.PI / 8;
  }

  attachKeys() {
    const keys = [
      'a', 
      'w', 
      's', 
      'd'
    ];

    for (let movementKey of keys)
      this.inputManager.attachKey(movementKey);
  }

  update(deltatime) {
    let movementDirection = new Vector2();

    if (this.inputManager.isDown('a'))
      movementDirection.x--;
    if (this.inputManager.isDown('d'))
      movementDirection.x++;
    if (this.inputManager.isDown('w'))
      movementDirection.y--;
    if (this.inputManager.isDown('s'))
      movementDirection.y++;
        
    const movementSize = movementDirection.size;
    
    if (movementSize > 0)
      this.position = this.position.add(movementDirection.mul(deltatime / 1000 * this.movementSpeed / movementSize));
  }
}

class MyScene extends YOrderedGroup {
  ready() {
    this.player = new Player();
    this.block = new Rectangle(new Vector2(100, 30), 'gold', new Vector2(300, 300), Math.PI / 8);
    this.addChild(this.block);
    this.addChild(this.player);
  }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new MyScene());

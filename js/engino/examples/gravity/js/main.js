import { Game, Node } from "../../../engino/Engino.js";
import { Circle } from "../../../engino/Nodes/Circle.js";
import { Vector2 } from "../../../engino/Utilities.js";

class Planet extends Circle {
  constructor(mass, velocity, ...args) {
    super(mass, ...args);
    this.mass = mass;
    this.velocity = velocity || new Vector2();
  }

  update(deltatime) {
    let force = new Vector2();

    for (let planet of this.parent.children)
      if (planet !== this)
        force = force.add(this.calculateForce(planet));
    
    this.position = this.position.add(this.velocity.mul(deltatime / 1000));
    this.velocity = this.velocity.add(force.div(this.mass).mul(deltatime / 1000));
  }

  calculateForce(planet) {
    const vectorTo = planet.position.sub(this.position);
    const distance = vectorTo.size;
    if (distance)
      return vectorTo.mul(this.mass * planet.mass * 10000).div(Math.pow(distance, 3));
    return new Vector2();
  }
}

class SpaceScene extends Node {
  ready() {
    const planetCount = 8;
    
    for (let i = 0; i < planetCount; i++)
      this.addChild(this.generatePlanet());
  }

  generatePlanet() {
    const minMass = 5;
    const maxMass = 25;

    const maxVelocity = 25;


    return new Planet(
      this.generateInt(minMass, maxMass), 
      new Vector2(this.generateInt(-maxVelocity, maxVelocity), this.generateInt(-maxVelocity, maxVelocity)), 
      this.generateColor(), 
      new Vector2(Math.random() * this.engine.canvas.width, Math.random() * this.engine.canvas.height)
    );
  }

  generateColor() {
    return '#' + this.generateInt(0, Math.pow(16, 6)).toString(16);
  }

  generateInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

const game = new Game(document.getElementById('game-canvas'));
game.start(new SpaceScene());

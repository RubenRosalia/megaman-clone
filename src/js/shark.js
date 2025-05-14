import { Actor, Vector, Keys } from "excalibur";
import { Resources } from "./resources.js";
import { Fish } from "./fish.js";

export class Shark extends Actor {
  constructor() {
    super({
      width: Resources.Shark.width,
      height: Resources.Shark.height,
      pos: new Vector(50, 255),
    });
  }

  onInitialize() {
    // Set the sprite directly on this actor.
    this.graphics.use(Resources.Shark.toSprite());
    
    this.pos = new Vector(500, 300);
    this.vel = new Vector(-10, 0);

    this.on("collisionstart", (event) => this.hitSomething(event));
  }

  hitSomething(event) {
    if (event.other.owner instanceof Fish) {
        // Access addScore through the engine instance
        this.scene.engine.addScore();
        
        // Reset fish position
        event.other.owner.resetPosition();
        
        // Play sound
        Resources.Eat.play();
    }
  }

  onPreUpdate(engine) {
    let xspeed = 0;
    let yspeed = 0;
    let kb = engine.input.keyboard;

    if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up)) {
      yspeed = -300;
    }
    if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) {
      yspeed = 300;
    }
    if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) {
      xspeed = -300;
      this.graphics.flipHorizontal = true; // flip de sprite
    }
    if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) {
      xspeed = 300;
      this.graphics.flipHorizontal = false; // flip de sprite
    }
    this.vel = new Vector(xspeed, yspeed);

    // als er maar 1x iets gebeurt check je of die key was ingedrukt in dit frame.
    if (kb.wasPressed(Keys.Space)) {
      this.shoot();
    }
  }

}

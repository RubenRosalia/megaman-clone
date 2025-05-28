import { Actor, Vector, Keys } from "excalibur";
import { Resources } from "./resources.js";
import { Fish } from "./fish.js";
import { Mine } from "./mine.js";
import { Bubble } from "./bubbles.js";

export class Shark extends Actor {
  constructor(name, x, y, playerType) {
    super({
      width: Resources.Shark.width,
      height: Resources.Shark.height,
      pos: new Vector(50, 255),
    });

    this.name = name;
    this.score = 0;
    this.pos = new Vector(x, y);
    this.playerType = playerType;
    this.controls = this.getControls(playerType);

    console.log(name, x, y);
  }

  getControls(playerType) {
    const controlSchemes = {
      "player-one": {
        up: Keys.W,
        down: Keys.S,
        left: Keys.A,
        right: Keys.D,
        action: Keys.Space,
      },
      "player-two": {
        up: Keys.Up,
        down: Keys.Down,
        left: Keys.Left,
        right: Keys.Right,
        action: Keys.Enter,
      },
    };
    return controlSchemes[playerType];
  }

  onInitialize() {
    // Set the sprite directly on this actor.
    this.graphics.use(Resources.Shark.toSprite());

    this.vel = new Vector(-10, 0);

    this.on("collisionstart", (event) => this.hitSomething(event));
  }

  howManyFishes() {
    let fishes = this.scene.actors.filter((act) => act instanceof Fish);
    console.log(`Er zijn nog ${fishes.length} vissen`);
  }

  hitSomething(event) {
    if (event.other.owner instanceof Fish) {
      // Increment score
      this.score++;

      // Log which shark hit the fish
      console.log(`${this.name} hit a fish! Score: ${this.score}`);

      // Update UI and check for winner.
      this.scene.engine.ui.updateScore(this.playerType, this.score);

      // Check for win condition
      if (this.score >= 10) {
        console.log("Yup");
        this.scene.engine.ui.showWinScreen(this.name);
      }

      // Reset fish position
      event.other.owner.resetPosition();

      // Play sound
      Resources.Eat.play();

      // Checks if mine is hit.
    } else if (event.other.owner instanceof Mine) {

      // Find all fish
      let fishes = this.scene.actors.filter((actor) => actor instanceof Fish);

      // Play explosion sound. 
      Resources.Explosion.play();
      
      // Loop through fishes and trigger eat animation
      for (let fish of fishes) {
        fish.wasEatenByShark();
        this.score += 2; 
      }

      // Update UI
      this.scene.engine.ui.updateScore(this.playerType, this.score);

      let newMine = new Mine();
      this.scene.add(newMine);

      // Remove hit mine
      event.other.owner.kill();
    }
  }

  shoot() {

    // Get direction of Shark.
    let direction;
    if (this.graphics.flipHorizontal) {
        direction = 1;
    } else {
        direction = -1;
    }
    
    // Create bubble position for Shark.
    const bubblePos = new Vector(
        this.pos.x + (direction * 1),
        this.pos.y
    );
    
    // Create bubble with position and direction
    const bubble = new Bubble(bubblePos, direction);
    this.scene.add(bubble);
}

  onPreUpdate(engine) {
    let xspeed = 0;
    let yspeed = 0;
    let kb = engine.input.keyboard;
    const controls = this.controls;

    if (kb.isHeld(controls.up)) {
      yspeed = -300;
    }
    if (kb.isHeld(controls.down)) {
      yspeed = 300;
    }
    if (kb.isHeld(controls.left)) {
      xspeed = -300;
      this.graphics.flipHorizontal = false;
    }
    if (kb.isHeld(controls.right)) {
      xspeed = 300;
      this.graphics.flipHorizontal = true;
    }

    this.vel = new Vector(xspeed, yspeed);

    if (kb.wasPressed(controls.action)) {
      this.shoot();
    }
  }
}

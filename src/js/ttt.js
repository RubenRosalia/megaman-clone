import "../css/style.css";
import { Actor, Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    console.log("START THE GAME!");

    // // Create initial fish.
    // for (let i = 0; i < 30; i++) {
    //   this.createFish();
    //   this.createEnemy();
    // }
  }

  // Create fish.
  createFish() {
    const fish = new Actor();
    fish.graphics.use(Resources.Fish.toSprite());
    fish.pos = this.getRandomPosition();
    fish.vel = this.getRandomVel();
    fish.events.on("exitviewport", (e) => this.fishLeft(e));
    this.add(fish);
  }

  // Create enemy.
  createEnemy() {
    const Enemy = new Actor();
    Enemy.graphics.use(Resources.Enemy.toSprite());
    Enemy.pos = this.getRandomPosition();
    Enemy.vel = this.getRandomVel();
    Enemy.events.on("exitviewport", (e) => this.fishLeft(e));
    this.add(Enemy);
  }

  getRandomPosition() {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    return new Vector(x, y);
  }

  getRandomVel() {
    const up = Math.random() * 800;
    const down = Math.random() * 600;
    return new Vector(up,down);
  }


  fishLeft(e) {
    // Remove the fish that left the screen.
    e.target.kill();

    // Display actors at random places.
    this.createFish();
    this.createEnemy();
  }
}

new Game();

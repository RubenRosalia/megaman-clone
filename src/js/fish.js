import { Actor,Vector  } from "excalibur";
import { Resources } from "./resources.js";

export class Fish  extends Actor {
    constructor() {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
            pos: new Vector(100, 300),
        });
}

    onInitialize() {
        // Set the sprite directly on this actor
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = this.getRandomPosition();
        this.vel = this.getRandomVel();


        // Listen for viewport exit on this instance

    }

    resetPosition() {
        console.log("Was eaten by shark")
        this.pos = this.getRandomPosition();
        this.vel = this.getRandomVel();
    }

    getRandomPosition() {
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        return new Vector(x, y);
    }

    getRandomVel() {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        return new Vector(x, y);
    }

}
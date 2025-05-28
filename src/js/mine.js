import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Mine extends Actor {
    constructor() {
        super({
            width: Resources.Mine.width,
            height: Resources.Mine.height,
            pos: new Vector(800, Math.random() * 500)
        });
    }

    onInitialize() {
        // Set sprite.
        this.graphics.use(Resources.Mine.toSprite());
        
        // Moves slowly to the left.
        this.vel = new Vector(-50, 0);
    }
}
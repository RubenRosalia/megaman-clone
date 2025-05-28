import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Bubble extends Actor {
    constructor(pos, direction) {
        super({
            width: 2,
            height: 2,
            pos: pos
        });
        this.direction = direction;
    }

    onInitialize() {
        // Use bubble sprite.
        this.graphics.use(Resources.Bubble.toSprite());

        // Set bubble velocity based on direction.
        this.vel = new Vector(this.direction * 300, 0);
        
        // Kill bubble after 2 sec.
        setTimeout(() => {
            this.kill();
        }, 2000);
    }

    
}
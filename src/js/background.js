import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor {
    constructor() {
        super({
            anchor: Vector.Zero,
            width: 800,
            height: 600,
            pos: new Vector(0, 0)
        });
    }

    onInitialize() {
        this.graphics.use(Resources.BG.toSprite());
    }
}
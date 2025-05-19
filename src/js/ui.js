import { Actor, Vector, Label, FontUnit, Color } from "excalibur";
import { Resources } from "./resources.js";

export class UI extends Actor {
    constructor() {
        super();
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(10, 10),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });
    }

    onInitialize(engine) {
        engine.add(this.scoreLabel);
    }

    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
    }
}
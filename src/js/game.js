// Load style.
import "../css/style.css";

// Import engine related.
import { Engine, Vector, DisplayMode, Actor, Label, FontUnit, Color } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";

// Load classes game.
import { Fish } from "./fish.js";
import { Shark } from "./shark.js";
import { Background } from "./background.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });

    // Initialize score.
    this.score = 0;
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    // Add background with matching game dimensions.
    // Gotta convert this into a class.
    const background = new  Background();

    this.add(background);

    // Create multiple fish
    for (let i = 0; i < 5; i++) {
      const fish = new Fish();
      this.add(fish);
    }

    // Create one Shark
    const shark = new Shark();
    this.add(shark);

    // Create label.
     this.label = new Label({
        text: 'Score 0:',
        score: '0',
        pos: new Vector(0, 0),
        font: Resources.PixelFont.toFont({
            unit: FontUnit.Px,
            size: 50,
            color: Color.White
        })
    })
    this.add(this.label)
  }

  addScore() {

    // Increase score by 10.
    this.score += 1;

    // Update label text.
    this.label.text = `Score: ${this.score}`;

}
  
}

new Game();

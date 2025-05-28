// Load style.
import "../css/style.css";

// Import engine related.
import { Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Fish } from "./fish.js";
import { Shark } from "./shark.js";
import { Background } from "./background.js";
import { UI } from "./ui.js";
import { Mine } from "./mine.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });

    // Initialize score
    this.score = 0;

    console.log("HELLO :D")
    
    // Start the resource loader
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    // Gotta convert this into a class.
    this.background = new  Background();

    this.add(this.background);

    // Create multiple fish
    for (let i = 0; i < 5; i++) {
      this.fish = new Fish();
      this.add(this.fish);
    }

    // Create sharkOne + Add sharkOne game.
    let sharkOne = new Shark("Gerald", 250, 225, "player-one");
    this.add(sharkOne);

    // Create sharkTwo + Add sharkTwo  game.
    let sharkTwo = new Shark("Gerda", 400, 325, "player-two");
    this.add(sharkTwo);

    this.ui = new UI(sharkOne.name, sharkTwo.name);
    this.add(this.ui);

    this.mine = new Mine();
    this.add(this.mine);

  }
}


const game = new Game();

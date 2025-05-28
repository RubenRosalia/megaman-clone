import { Actor, Vector, Label, FontUnit, Color, TextAlign } from "excalibur";

import { Resources } from "./resources.js";

export class UI extends Actor {
  constructor(playerOneName = "Player 1", playerTwoName = "Player 2") {
    super();

    // Store names and initliaze scores.
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;

    this.playerOneLabel = new Label({
      text: `${playerOneName}: ${this.playerOneScore}`,
      pos: new Vector(10, 70),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 24,
        color: Color.Red,
      }),
    });

    this.playerTwoLabel = new Label({
      text: `${playerTwoName}: ${this.playerTwoScore}`,
      pos: new Vector(10, 100),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 24,
        color: Color.Blue,
      }),
    });

    // Create win screen label (hidden by default)
    this.winLabel = new Label({
      text: "",
      pos: new Vector(400, 300),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 48,
        color: Color.White,
      }),
    });
    
    // Center the win label
    this.winLabel.textAlign = TextAlign.Center;
    this.winLabel.visible = false;
  }

  onInitialize(engine) {
    engine.add(this.playerOneLabel);
    engine.add(this.playerTwoLabel);
    engine.add(this.winLabel);

  }

  updateScore(playerType, score) {
    if (playerType === "player-one") {
      this.playerOneScore = score;
      this.playerOneLabel.text = `${this.playerOneName} Score: ${score}`;
    } else if (playerType === "player-two") {
      this.playerTwoScore = score;
      this.playerOneLabel.text = `${this.playerOneName} Score: ${score}`;
    }
  }

  showWinScreen(winnerName) {
    this.winLabel.text = `${winnerName} Wins!`;
    this.winLabel.visible = true;
  }
}

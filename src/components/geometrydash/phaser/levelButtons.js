import Phaser from "phaser";

export class LevelButtons {
  constructor(scene) {
    this.relatedScene = scene;
    this.levelText = null;
  }

  preload() {
    this.relatedScene.load.image(
      "button1",
      "/assets/images/geometrydash/others/level1Btn.png"
    );
    this.relatedScene.load.image(
      "button2",
      "/assets/images/geometrydash/others/level2Btn.png"
    );
    this.relatedScene.load.image(
      "button3",
      "/assets/images/geometrydash/others/level3Btn.png"
    );
  }

  create() {
    this.levelText = this.relatedScene.add.text(
      this.relatedScene.physics.world.bounds.width / 2,
      this.relatedScene.physics.world.bounds.height / 4,
      "SELECCIÓN DE NIVEL",
      {
        fontSize: "70px",
        fill: "#000",
        fontFamily: "Pusab",
      }
    );
    this.levelText.setOrigin(0.5);
    this.level1Button = this.relatedScene.add
      .sprite(250, 330, "button1")
      .setInteractive()
      .setScale(0.3);
    this.level2Button = this.relatedScene.add
      .sprite(500, 330, "button2")
      .setInteractive()
      .setScale(0.3);
    this.level3Button = this.relatedScene.add
      .sprite(750, 330, "button3")
      .setInteractive()
      .setScale(0.3);

    this.level1Button.on("pointerdown", () => {
      this.relatedScene.scene.start("Play", 1);
    });
    this.level2Button.on("pointerdown", () => {
      this.relatedScene.scene.start("Play", 2);
    });
    this.level3Button.on("pointerdown", () => {
      this.relatedScene.scene.start("Play", 3);
    });
  }
}

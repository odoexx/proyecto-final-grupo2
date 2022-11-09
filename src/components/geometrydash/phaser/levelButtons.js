import Phaser from "phaser";

export class LevelButtons {
  constructor(scene) {
    this.relatedScene = scene;
    this.levelText=null;
  }

  preload() {
    this.relatedScene.load.image('button1', '/assets/arkanoid/images/arkanoid/level1Btn.png');
    this.relatedScene.load.image('button2', '/assets/arkanoid/images/arkanoid/level2Btn.png');
  }

  create() {
    this.levelText = this.relatedScene.add.text(this.relatedScene.physics.world.bounds.width/2, this.relatedScene.physics.world.bounds.height/4, "SELECCIÓN DE NIVEL", {
      fontSize: "60px",
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    });
    this.levelText.setOrigin(0.5);
    this.level1Button = this.relatedScene.add.sprite(250, 330, 'button1').setInteractive().setScale(0.4);
    this.level2Button = this.relatedScene.add.sprite(550, 330, 'button2').setInteractive().setScale(0.4);

    this.level1Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Play', 1);
    });
    this.level2Button.on('pointerdown', () => {
        this.relatedScene.scene.start('Play', 2);
    });
  }
}

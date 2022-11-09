import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    //acá van las imágenes y spritesheets
    this.load.image("fondo", "/assets/arkanoid/images/arkanoid/background.png");
    this.load.spritesheet('nave', '/assets/arkanoid/images/arkanoid/nave.png', { frameWidth: 97, frameHeight: 26 });
    this.load.image("bola", "/assets/arkanoid/images/arkanoid/ball.png");
    this.load.spritesheet("bloque1", "/assets/arkanoid/images/arkanoid/bloque1.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque2", "/assets/arkanoid/images/arkanoid/bloque2.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque3", "/assets/arkanoid/images/arkanoid/bloque3.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque4", "/assets/arkanoid/images/arkanoid/bloque4.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque5", "/assets/arkanoid/images/arkanoid/bloque5.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque6", "/assets/arkanoid/images/arkanoid/bloque6.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque7", "/assets/arkanoid/images/arkanoid/bloque7.png", {frameWidth:56, frameHeight:35});
    //acá van todos los audios
    this.load.audio("musica", "/assets/arkanoid/sounds/BGM-Echelon.mp3");
    this.load.audio('impactoNaveSample', '/assets/arkanoid/sounds/click.wav');
    this.load.audio('choqueBarra', '/assets/arkanoid/sounds/choque_barra.mp3');
    this.load.audio('choqueBloques', '/assets/arkanoid/sounds/choque_bloques.mp3');
    this.load.audio('perder', '/assets/arkanoid/sounds/perder.mp3');
  }

  create() {
    this.scene.start("menu");
  }
}

export default Preload;

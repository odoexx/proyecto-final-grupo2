import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    //acá van las imágenes y spritesheets
    this.load.image("fondo", "/assets/images/arkanoid/background.png");
    this.load.spritesheet('nave', '/assets/images/arkanoid/nave.png', { frameWidth: 97, frameHeight: 26 });
    this.load.image("bola", "/assets/images/arkanoid/ball.png");
    this.load.spritesheet("bloque1", "/assets/images/arkanoid/bloque1.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque2", "/assets/images/arkanoid/bloque2.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque3", "/assets/images/arkanoid/bloque3.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque4", "/assets/images/arkanoid/bloque4.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque5", "/assets/images/arkanoid/bloque5.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque6", "/assets/images/arkanoid/bloque6.png", {frameWidth:56, frameHeight:35});
    this.load.spritesheet("bloque7", "/assets/images/arkanoid/bloque7.png", {frameWidth:56, frameHeight:35});
    //acá van todos los audios
    this.load.audio("musica", "/assets/sounds/BGM-Echelon.mp3");
    this.load.audio('impactoNaveSample', '/assets/sounds/click.wav');
    this.load.audio('choqueBarra', '/assets/sounds/choque_barra.mp3');
    this.load.audio('choqueBloques', '/assets/sounds/choque_bloques.mp3');
    this.load.audio('perder', '/assets/sounds/perder.mp3');
  }

  create() {
    this.scene.start("menu");
  }
}

export default Preload;

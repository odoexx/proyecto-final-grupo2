import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    //Imágenes y spritesheets
    //Nivel 1
    this.load.image("fondoNivel1", "/assets/images/geometrydash/scenes/nivel1/background.png");
    this.load.image("terrenoInferiorNivel1","/assets/images/geometrydash/scenes/nivel1/groundBottom.png");
    this.load.image("terrenoSuperiorNivel1","/assets/images/geometrydash/scenes/nivel1/groundTop.png");
    //Nivel 2
    this.load.image("fondoNivel2", "/assets/images/geometrydash/scenes/nivel2/background.png");
    this.load.image("terrenoInferiorNivel2","/assets/images/geometrydash/scenes/nivel2/groundBottom.png");
    this.load.image("terrenoSuperiorNivel2","/assets/images/geometrydash/scenes/nivel2/groundTop.png");
    //Nivel 3
    this.load.image("fondoNivel3", "/assets/images/geometrydash/scenes/nivel3/background.png");
    this.load.image("terrenoInferiorNivel3","/assets/images/geometrydash/scenes/nivel3/groundBottom.png");
    this.load.image("terrenoSuperiorNivel3","/assets/images/geometrydash/scenes/nivel3/groundTop.png");
    //Comunes a varios o todos los niveles
    this.load.image("jugador","/assets/images/geometrydash/characters/box.png");
    this.load.image("nave", "/assets/images/geometrydash/characters/rocket.png");
    /* this.load.spritesheet("jugador", "/assets/images/geometrydash/characters/box.png", { frameWidth: 97, frameHeight: 26 }); */
    this.load.image("portalSalida", "/assets/images/geometrydash/scenes/nivel1/portal.png");
    this.load.image("portalVuelo","/assets/images/geometrydash/scenes/nivel1/portalFlap.png");
    this.load.image("portalGravedad","/assets/images/geometrydash/scenes/nivel1/portalFlap.png");
    this.load.image("portalVelocidad","/assets/images/geometrydash/scenes/nivel1/portalVelocity.png");

    //BGM y SFX
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

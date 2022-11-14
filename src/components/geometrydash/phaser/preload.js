import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    //Imágenes y spritesheets
    this.load.image("fondo", "/assets/images/Geometry-Dash2.png");
    //Nivel 1
    this.load.image("fondoNivel1", "/assets/images/geometrydash/scenes/nivel1/background.png");
    this.load.image("terrenoInferiorNivel1", "/assets/images/geometrydash/scenes/nivel1/groundBottom.png");
    this.load.image("terrenoSuperiorNivel1", "/assets/images/geometrydash/scenes/nivel1/groundTop.png");
    this.load.image("pinchoArriba1", "/assets/images/geometrydash/obstacles/nivel1/spikeTop.png");
    this.load.image("pinchoAbajo1", "/assets/images/geometrydash/obstacles/nivel1/spikeBottom.png");
    this.load.image("pinchoLado1", "/assets/images/geometrydash/obstacles/nivel1/spikeSide.png");
    //Nivel 2
    this.load.image("fondoNivel2", "/assets/images/geometrydash/scenes/nivel2/background.png");
    this.load.image("terrenoInferiorNivel2", "/assets/images/geometrydash/scenes/nivel2/groundBottom.png");
    this.load.image("terrenoSuperiorNivel2", "/assets/images/geometrydash/scenes/nivel2/groundTop.png");
    this.load.image("pinchoArriba2", "/assets/images/geometrydash/obstacles/nivel2/spikeTop.png");
    this.load.image("pinchoAbajo2", "/assets/images/geometrydash/obstacles/nivel2/spikeBottom.png");
    this.load.image("pinchoLado2", "/assets/images/geometrydash/obstacles/nivel2/spikeSide.png");
    //Nivel 3
    this.load.image("fondoNivel3", "/assets/images/geometrydash/scenes/nivel3/background.png");
    this.load.image("terrenoInferiorNivel3", "/assets/images/geometrydash/scenes/nivel3/groundBottom.png");
    this.load.image("terrenoSuperiorNivel3", "/assets/images/geometrydash/scenes/nivel3/groundTop.png");
    this.load.image("pinchoArriba3", "/assets/images/geometrydash/obstacles/nivel3/spikeTop.png");
    this.load.image("pinchoAbajo3", "/assets/images/geometrydash/obstacles/nivel3/spikeBottom.png");
    this.load.image("pinchoLado3", "/assets/images/geometrydash/obstacles/nivel3/spikeSide.png");
    //Comunes a varios o todos los niveles
    //this.load.image("jugador", "/assets/images/geometrydash/characters/player.png");
    this.load.spritesheet("jugador", "/assets/images/geometrydash/characters/player.png", {frameWidth: 178, frameHeight: 240});
    /* this.load.spritesheet("nave", "/assets/images/geometrydash/characters/ufo.png", {frameWidth: 450, frameHeight: 270}); */
    this.load.image("nave", "/assets/images/geometrydash/characters/ufo.png");
    this.load.image("corredor", "/assets/images/geometrydash/characters/runner.png");
    this.load.image("portalSalida", "/assets/images/geometrydash/portals/portal.png");
    this.load.image("portalVuelo", "/assets/images/geometrydash/portals/portalFlap.png");
    this.load.image("portalGravedad", "/assets/images/geometrydash/portals/portalGravity.png");
    this.load.image("portalVelocidad", "/assets/images/geometrydash/portals/portalVelocity.png");

    //BGM y SFX
    /* this.load.audio("musica", "/assets/sounds/geometrydash/nivel1.wav");
    this.load.audio("musica2", "/assets/sounds/geometrydash/nivel2.wav");
    this.load.audio("musica3", "/assets/sounds/geometrydash/nivel3.wav"); */
  }

  create() {
    this.scene.start("menu");
  }
}

export default Preload;

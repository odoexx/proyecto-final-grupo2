import Phaser from "phaser";
import { LiveCounter } from "./liveCounter";
/* import { LevelCreator } from "./levelCreator"; */
import listaObtaculosAbajoNivel1 from "../../../json/geometryDash/obstaculosAbajoNivel1.json";
import listaObstaculosLadoNivel1 from "../../../json/geometryDash/obstaculosLadoNivel1.json";
import listaPortalesNivel1 from "../../../json/geometryDash/portalesNivel1.json";

class Play extends Phaser.Scene {
  constructor(config) {
    super({ key: "Play" });

    this.config = config;
    this.player = null;
    this.sonido = null;
    this.score = 0;
    this.pinchos = null;
    this.portales = null;
    this.openingText = null;
    this.liveCounter = new LiveCounter(this, this.config.vidas);
    this.groundBottom = null;
    this.jugador = null;
    this.estadoNave=false;
    /* this.levelCreator= new LevelCreator(this); */
  }

  create(nivel) {
    //condiciones iniciales
    this.physics.world.setBoundsCollision(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    //creando el fondo
    this.crearFondo(nivel);

    //agregando plataforma como player
    this.crearJugador();

    //agregando contador de vidas
    this.liveCounter.create();

    //agregando los obstaculos
    this.pinchos = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.crearObstaculos(nivel, listaObtaculosAbajoNivel1, "pinchoAbajo", 0, 1);
    this.crearObstaculos(nivel, listaObstaculosLadoNivel1, "pinchoLado", 0, 1);
    this.pinchos.setVelocityX(-this.config.velocidadX);

    //agregando portales
    this.portales = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.crearPortales(nivel, listaPortalesNivel1, "portalVuelo");
    this.portales.setVelocityX(-this.config.velocidadX);
    //this.crearPortales(nivel);

    this.crearColisiones();

    //agregando texto
    /* this.crearTextoInicio(); */

    //agregando sonido
    /*  this.crearSonido(); */

    //Texto score
    /* this.scoreText = this.add.text(16, 16, "PUNTOS: 0", {
      fontSize: "20px",
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    }); */
    //this.impactoNaveSample = this.sound.add('impactoNaveSample');
    this.setInitialState();
  }

  /* metodo para detectar las colisiones entre el jugador y el resto de objetos */
  crearColisiones() {
    /* le asignamos gravedad al jugador */
    this.jugador.body.gravity.y = this.config.gravedad;
    this.groundBottom = this.physics.add.collider(
      this.jugador,
      this.groundBottom,
      null,
      null,
      this
    );
    this.physics.add.overlap(
      this.jugador,
      this.pinchos,
      this.perderVida,
      null,
      this
    );
    this.physics.add.overlap(this.jugador, this.portales, this.cambiarNave, null, this); //this.onChangeToFlap
    /* this.groundTop = this.physics.add.collider(this.box, this.groundTop, this.resetJumpCount, null, this); */
  }

  crearFondo(nivel) {
    switch (nivel) {
      case 1:
        this.add.image(500, 300, "fondoNivel1");
        /* this.groundBottom = this.physics.add.staticSprite(0, 600, 'terrenoInferiorNivel1').setOrigin(0, 1); */
        this.groundBottom = this.physics.add
          .sprite(0, this.physics.world.bounds.height, "terrenoInferiorNivel1")
          .setOrigin(0, 1)
          .setImmovable(true);
        this.groundBottom.body.allowGravity = false;
        break;
      default:
        break;
    }
  }

  crearJugador() {
    this.jugador = this.physics.add
      .sprite(
        this.config.posicionInicial.x,
        this.config.posicionInicial.y,
        "jugador"
      )
      .setScale(0.25);
    /* this.jugador = this.physics.add.sprite(this.config.posicionInicial.x , this.config.posicionInicial.y, "jugador"); */
    this.jugador.body.allowGravity = true;
    this.jugador.setCollideWorldBounds(true);
    //animación del jugador
    this.anims.create({
      key: "jugadorCaminar",
      frames: this.anims.generateFrameNumbers("jugador", { start: 0, end: 12 }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "jugadorQuieto",
      frames: this.anims.generateFrameNumbers("jugador", { frames: [0] }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "jugadorSaltar",
      frames: this.anims.generateFrameNumbers("jugador", { frames: [9] }),
      frameRate: 20,
      repeat: 1,
    });
  }

  /* Método para crear los obstáculos en cada nivel */
  crearObstaculos(nivel, listaPinchos, spritePincho, origenX, origenY) {
    switch (nivel) {
      case 1:
        if (spritePincho != "pinchoLado") {
          for (const pincho of listaPinchos) {
            let posicionX = 0;
            /* creamos la variable cadena y le asignamos un numero aleatorio que representa la cantidad de obstaculos pegados*/
            let cadena = Math.floor(Math.random() * pincho.maxSpikes + 1);
            /* creamos las diferentes cadenas de obtaculos */
            for (let index = 0; index < cadena; index++) {
              let pinchoAux = this.pinchos
                .create(
                  pincho.seconds * this.config.velocidadX + posicionX,
                  pincho.y,
                  spritePincho
                )
                .setOrigin(origenX, origenY).setScale(1.25);
              posicionX += pinchoAux.width;
            }
          }
        } else {
          for (const pincho of listaPinchos) {
            let posicionY = 225;
            let cadena = Math.floor(Math.random() * pincho.maxSpikes + 1);
            for (let i = 0; i < cadena; i++) {
              let pinchoAux = this.pinchos
                .create(
                  pincho.seconds * this.config.velocidadX + pincho.x,
                  posicionY,
                  spritePincho
                )
                .setOrigin(origenX, origenY)
                .setScale(0.5);
              posicionY += pinchoAux.height*0.5;
            }
          }
        }
        break;

      default:
        break;
    }
  }

  crearPortales(nivel, listaPortales, spritePortal) {
    listaPortales.map((portal) => {
      this.portales
        .create(portal.seconds * 700, portal.y, spritePortal)
        .setOrigin(0);
    });
  }

  /* crearTextoInicio() {
    this.openingText = this.add.text(
      this.physics.world.bounds.width / 2,
      (this.physics.world.bounds.height / 2) * 1.5,
      'Presione "ARRIBA" para comenzar',
      {
        fontFamily: "Monaco, Courier, monospace",
        fontSize: "20px",
        fill: "#fff",
      }
    );

    this.openingText.setOrigin(0.5);
  } */

  perderVida() {
    let gameNotFinished = this.liveCounter.perderVida();
    /* this.soundPerder.play(); */
    if (!gameNotFinished) {
      //this.liveLostSample.play();
      /* this.setInitialState(); */
      this.physics.pause();
      this.time.addEvent
        ({
            delay: 2000,
            callback: ()=> {this.physics.resume()},
            /* callback: () => {this.scene.restart();}, */
            loop: false
        });
    }
  }

  /* crearSonido() {
    this.sonido = this.sound.add("musica");
    this.soundChoqueBarra = this.sound.add("choqueBarra");
    this.soundChoqueObstaculos = this.sound.add("choqueObstaculos");
    this.soundPerder = this.sound.add("perder");
    const soundConfig = {
      volume: 0.2,
      loop: true,
    };
    this.sonido.play(soundConfig);

    if (!this.sound.locked) {
      // already unlocked so play
      this.sonido.play(soundConfig);
    } else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.sonido.play(soundConfig);
      });
    }
  } */

  update() {
    //mover la plataforma
    if (this.cursors.up.isDown && this.jugador.body.touching.down) {
      this.jugador.setVelocityY(-1000);
    }
    //Animaciones del Jugador
    if (this.jugador.body.touching.down) {
      /* if (this.jugador.body.velocity.x != 0) { */
        this.jugador.play("jugadorCaminar", true);
      /* } else {
        this.jugador.play("jugadorCaminar", false);
      } */
    } else {
      this.jugador.play("jugadorSaltar", true);
    }
  }

  //metodos invocados

  /* incrementarPuntos(puntos) {
    this.score += puntos;
    this.scoreText.setText("PUNTOS: " + this.score);
  }
  */

  cambiarNave(jugador,portales){
    if(!this.estadoNave){
      portales.disableBody(true,true);
      //this.jugador.body.gravity=200;
      this.jugador.setTexture("nave");
      this.estadoNave=true;
      return;
    }else{
      portales.disableBody(true,true);
      //this.jugador.body.gravity=500;
      this.jugador.setTexture("jugador");
      this.estadoNave=false;
    }
  }

  setInitialState() {
    this.jugador.x = this.config.posicionInicial.x;
    this.jugador.y = this.config.posicionInicial.y;
    /* this.openingText.setVisible(true); */
  }

  endGame(completed) {
    if (!completed) {
      this.estadoNave=false;
      //this.gameOverSample.play();
      this.scene.start("gameover");
      this.score = 0;
    } else {
      //this.winSample.play();
      this.scene.start("congratulations");
    }
  }
}

export default Play;
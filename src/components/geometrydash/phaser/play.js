import Phaser from "phaser";
import { LiveCounter } from "./liveCounter";
/* import { LevelCreator } from "./levelCreator"; */
import listaObtaculosAbajoNivel1 from "../../../json/geometryDash/obstaculosAbajoNivel1.json";
import listaObstaculosLadoNivel1 from "../../../json/geometryDash/obstaculosLadoNivel1.json";
import listaObtaculosArribaNivel2 from "../../../json/geometryDash/obstaculosArribaNivel2.json";
import listaObtaculosAbajoNivel2 from "../../../json/geometryDash/obstaculosAbajoNivel2.json";
import listaObstaculosLadoNivel2 from "../../../json/geometryDash/obstaculosLadoNivel2.json";
import listaObtaculosArribaNivel3 from "../../../json/geometryDash/obstaculosArribaNivel3.json";
import listaObtaculosAbajoNivel3 from "../../../json/geometryDash/obstaculosAbajoNivel3.json";
import listaObstaculosLadoNivel3 from "../../../json/geometryDash/obstaculosLadoNivel3.json";
import listaPortalesNivel1 from "../../../json/geometryDash/portalesNivel1.json";
import listaPortalesNivel2 from "../../../json/geometryDash/portalesNivel2.json";
import listaPortalesNivel3 from "../../../json/geometryDash/portalesNivel3.json";
import { convertRoutesToDataRoutes } from "@remix-run/router/dist/utils";

class Play extends Phaser.Scene {
  constructor(config) {
    super({ key: "Play" });

    this.config = config;
    this.player = null;
    this.sonido = null;
    this.score = 0;
    this.pinchos = null;
    this.portalesFlap = null;
    this.portalesGravity = null;
    this.portalesVelocity = null;
    this.portalesExit = null;
    this.openingText = null;
    this.liveCounter = new LiveCounter(this, this.config.vidas);
    this.groundBottom = null;
    this.groundTop = null;
    this.jugador = null;
    this.isModoNave = false;
    this.isGravedadInvertida = false;
    this.contadorSaltos = 0;
    this.fuerzaSalto = -700;
    this.auxNivel = null;
    /* this.levelCreator= new LevelCreator(this); */
  }

  create(nivel) {
    //Condiciones iniciales y acciones
    this.auxNivel = nivel;
    this.isModoNave = false;
    this.isGravedadInvertida = false;
    this.physics.world.setBoundsCollision(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on = ("pointerdown", this.accion, this);
    /* this.input.keyboard.on = ("keydown-SPACE", this.accion, this); */

    //Creando elementos principales
    //Elementos de escenario y jugador
    this.crearFondo(nivel); //creando el fondo
    this.crearJugador(); //agregando sprite como player
    this.liveCounter.create(); //agregando contador de vidas

    //Creando los obstáculos
    this.pinchos = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    //Portales de vuelo
    this.portalesFlap = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    //Creando portales de gravedad
    this.portalesGravity = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    //Creando portales de salida
    this.portalesExit = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    //Eligiendo elementos ha crear según el nivel
    switch (nivel) {
      case 1:
        //creando lista de portales del nivel
        this.listaPortales = listaPortalesNivel1;
        //agregando los tipos obstáculos
        this.crearObstaculos(
          nivel,
          listaObtaculosAbajoNivel1,
          "pinchoAbajo1",
          0,
          1
        );
        this.crearObstaculos(
          nivel,
          listaObstaculosLadoNivel1,
          "pinchoLado1",
          0,
          1
        );
        break;
      case 2:
        //creando lista de portales del nivel
        this.listaPortales = listaPortalesNivel2;
        //agregando los tipos obstáculos
        this.crearObstaculos(
          nivel,
          listaObtaculosArribaNivel2,
          "pinchoArriba2",
          0,
          0
        );
        this.crearObstaculos(
          nivel,
          listaObtaculosAbajoNivel2,
          "pinchoAbajo2",
          0,
          1
        );
        this.crearObstaculos(
          nivel,
          listaObstaculosLadoNivel2,
          "pinchoLado2",
          0,
          1
        );
        break;
      case 3:
        //creando lista de portales del nivel
        this.listaPortales = listaPortalesNivel3;
        //agregando los tipos obstáculos
        this.crearObstaculos(
          nivel,
          listaObtaculosArribaNivel3,
          "pinchoArriba3",
          0,
          0
        );
        this.crearObstaculos(
          nivel,
          listaObtaculosAbajoNivel3,
          "pinchoAbajo3",
          0,
          1
        );
        this.crearObstaculos(
          nivel,
          listaObstaculosLadoNivel3,
          "pinchoLado3",
          0,
          1
        );
        console.log("pasamos al nivel 3");
        break;
    }

    //Agregando movimiento a los obstáculos
    this.pinchos.setVelocityX(-this.config.velocidadX);
    //Agregando portales de vuelo
    this.crearPortalesFlap(this.listaPortales, "portalVuelo");
    this.portalesFlap.setVelocityX(-this.config.velocidadX);
    //Agregando portales de gravedad
    this.crearPortalesGravity(this.listaPortales, "portalGravedad");
    this.portalesGravity.setVelocityX(-this.config.velocidadX);
    //Agregando portales de salida
    this.crearPortalesExit(this.listaPortales, "portalSalida");
    this.portalesExit.setVelocityX(-this.config.velocidadX);

    //Creamos las colisiones y solapamientos
    this.crearColisiones();

    /* this.crearTextoInicio(); */ //agregando texto
    /*  this.crearSonido(); */ //agregando sonido

    /* this.scoreText = this.add.text(16, 16, "PUNTOS: 0", {
      fontSize: "20px",
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    }); */ //Texto score
    //this.impactoNaveSample = this.sound.add('impactoNaveSample');
    this.setInitialState();
  }

  update() {
    //mover el jugador con el teclado o el mouse
    if (
      (this.cursors.up.isDown || this.input.activePointer.isDown) &&
      this.contadorSaltos < 2
    ) {
      //&& this.jugador.body.touching.down) {
      this.accion();
    }
    if (!this.isModoNave) {
      //Animaciones del Jugador
      if (this.jugador.body.touching.down) {
        this.jugador.play("jugadorCaminar", true);
      } else {
        this.jugador.play("jugadorSaltar", true);
      }
    }
    //Volar mientras se mantiene el botón izquierdo del mouse presionado
    if (this.isModoNave && this.input.activePointer.isDown) {
      this.accion();
    }
  }

  /* metodo para detectar las colisiones entre el jugador y el resto de objetos */
  crearColisiones() {
    /* le asignamos gravedad al jugador */
    this.jugador.body.gravity.y = this.config.gravedad;
    //Colision con suelo
    this.groundBottom = this.physics.add.collider(
      this.jugador,
      this.groundBottom,
      this.resetearContadorSaltos,
      null,
      this
    );
    //Colision con techo
    this.groundTop = this.physics.add.collider(
      this.jugador,
      this.groundTop,
      this.resetearContadorSaltos,
      null,
      this
    );
    //Colisión con pinchos
    this.pinchos = this.physics.add.overlap(
      this.jugador,
      this.pinchos,
      this.perderVida,
      null,
      this
    );
    //Portal vuelo
    this.portalesFlap = this.physics.add.overlap(
      this.jugador,
      this.portalesFlap,
      this.cambiarNave,
      null,
      this
    );
    //Portal gravedad
    this.portalesGravity = this.physics.add.overlap(
      this.jugador,
      this.portalesGravity,
      this.invertirGravedad,
      null,
      this
    );

    //Portal velocidad
    this.portalesVelocity = this.physics.add.overlap(
      this.jugador,
      this.portalesVelocity,
      null, //Agregar el mètodo
      null,
      this
    );

    //Portal salida
    this.portalesExit = this.physics.add.overlap(
      this.jugador,
      this.portalesExit,
      this.portalExit,
      null,
      this
    );
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
        this.groundTop = this.physics.add
          .sprite(0, 0, "terrenoSuperiorNivel1")
          .setOrigin(0, 0)
          .setImmovable(true);
        this.groundBottom.body.allowGravity = false;
        this.groundTop.body.allowGravity = false;
        break;
      case 2:
        //Cargamos las imágenes de fondo, suelo y techo
        this.add.image(500, 300, "fondoNivel2");
        /* this.groundBottom = this.physics.add.staticSprite(0, 600, 'terrenoInferiorNivel1').setOrigin(0, 1); */
        this.groundBottom = this.physics.add
          .sprite(0, this.physics.world.bounds.height, "terrenoInferiorNivel2")
          .setOrigin(0, 1)
          .setImmovable(true);
        this.groundTop = this.physics.add
          .sprite(0, 0, "terrenoSuperiorNivel2")
          .setOrigin(0, 0)
          .setImmovable(true);
        //Establecemos sus propiedades
        this.groundBottom.body.allowGravity = false;
        this.groundTop.body.allowGravity = false;
        break;
      case 3:
        this.add.image(500, 300, "fondoNivel3");
        this.groundBottom = this.physics.add
          .sprite(0, this.physics.world.bounds.height, "terrenoInferiorNivel3")
          .setOrigin(0, 1)
          .setImmovable(true);
        this.groundTop = this.physics.add
          .sprite(0, 0, "terrenoSuperiorNivel3")
          .setOrigin(0, 0)
          .setImmovable(true);
        this.groundBottom.body.allowGravity = false;
        this.groundTop.body.allowGravity = false;
        break;
    }
  }

  //Mètodo para crear al jugador con sus configuraciòn inicial y animaciones
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
      key: "jugadorSaltar",
      frames: this.anims.generateFrameNumbers("jugador", { frames: [8] }),
      frameRate: 20,
      repeat: 1,
    });
  }

  /* Método para crear los obstáculos en cada nivel */
  crearObstaculos(nivel, listaPinchos, spritePincho, origenX, origenY) {
    switch (nivel) {
      case 1:
        //Creamos los pinchos arriba y abajo
        if (spritePincho != "pinchoLado1") {
          for (const pincho of listaPinchos) {
            let posicionX = 0;
            /* creamos la variable cadena y le asignamos un numero aleatorio que representa la cantidad de obstaculos pegados*/
            let cadena = Math.floor(Math.random() * (pincho.maxSpikes - 4) + 1);
            /* creamos las diferentes cadenas de obtaculos */
            for (let index = 0; index < cadena; index++) {
              let pinchoAux = this.pinchos
                .create(
                  pincho.seconds * this.config.velocidadX + posicionX,
                  pincho.y,
                  spritePincho
                )
                .setOrigin(origenX, origenY)
                .setScale(1.25);
              posicionX += pinchoAux.width;
            }
          }
        } else {
          //creamos los pinchos laterales
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
                .setScale(0.15);
              posicionY += pinchoAux.height * 0.15;
            }
          }
        }
        break;
      case 2:
        if (spritePincho == "pinchoAbajo2" || spritePincho == "pinchoArriba2") {
          for (const pincho of listaPinchos) {
            let posicionX = 0;
            /* creamos la variable cadena y le asignamos un numero aleatorio que representa la cantidad de obstaculos pegados*/
            let cadena = Math.floor(Math.random() * (pincho.maxSpikes - 4) + 1);
            /* creamos las diferentes cadenas de obtaculos */
            for (let index = 0; index < cadena; index++) {
              let pinchoAux = this.pinchos
                .create(
                  pincho.seconds * this.config.velocidadX + posicionX,
                  pincho.y,
                  spritePincho
                )
                .setOrigin(origenX, origenY)
                .setScale(1.25);
              posicionX += pinchoAux.width;
            }
          }
        }
        if (spritePincho == "pinchoLado2") {
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
                .setScale(0.15);
              posicionY += pinchoAux.height * 0.15;
            }
          }
        }
        break;
      case 3:
        if (spritePincho != "pinchoLado3") {
          for (const pincho of listaPinchos) {
            let posicionX = 0;
            /* creamos la variable cadena y le asignamos un numero aleatorio que representa la cantidad de obstaculos pegados*/
            let cadena = Math.floor(Math.random() * (pincho.maxSpikes - 4) + 1);
            /* creamos las diferentes cadenas de obtaculos */
            for (let index = 0; index < cadena; index++) {
              let pinchoAux = this.pinchos
                .create(
                  pincho.seconds * this.config.velocidadX + posicionX,
                  pincho.y,
                  spritePincho
                )
                .setOrigin(origenX, origenY)
                .setScale(1.25);
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
                .setScale(0.15);
              posicionY += pinchoAux.height * 0.15;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  //Creación de los diferentes tipos de portales para ubicarlos en el escenario
  //Portales de vuelo (cambia a nave)
  crearPortalesFlap(listaPortales, spritePortal) {
    listaPortales.map((portal) => {
      if (spritePortal == portal.type) {
        this.portalesFlap
          .create(
            portal.seconds * this.config.velocidadX,
            portal.y,
            spritePortal
          )
          .setOrigin(0);
      }
    });
  }

  //Portales de inversión de gravedad
  crearPortalesGravity(listaPortales, spritePortal) {
    listaPortales.map((portal) => {
      if (portal.type == spritePortal) {
        this.portalesGravity
          .create(
            portal.seconds * this.config.velocidadX,
            portal.y,
            spritePortal
          )
          .setOrigin(0);
      }
    });
  }

  //Portales de velocidad
  /* if (portal.type == "velocity") {
      this.portales
      .create(portal.seconds * this.config.velocidadX, portal.y, spritePortalVelocity)
        .setOrigin(0);
      } */

  //Portales de fin de nivel
  crearPortalesExit(listaPortales, spritePortal) {
    listaPortales.map((portal) => {
      if (spritePortal == portal.type) {
        this.portalesExit
          .create(
            portal.seconds * this.config.velocidadX,
            portal.y,
            spritePortal
          )
          .setOrigin(0);
      }
    });
  }

  //Acción que ocurre al atravesar los diferentes portales
  //Efecto portal volar
  cambiarNave(jugador, portales) {
    if (!this.isModoNave) {
      portales.disableBody(true, true);
      this.jugador.body.gravity.y = this.config.gravedad / 2;
      this.fuerzaSalto += 100;
      jugador.stop(null, true);
      jugador.setTexture("nave").setScale(0.2);
      this.tweens.add({
        targets: this.jugador, //your image that must spin
        angle: 360, //rotation value must be radian
        duration: 200,
        ease: "Linear",
      });
      this.isModoNave = true;
      return;
    } else {
      portales.disableBody(true, true);
      this.jugador.body.gravity.y = this.config.gravedad;
      this.fuerzaSalto -= 100;
      jugador.setTexture("jugador").setScale(0.25);
      this.isModoNave = false;
    }
  }

  //Efecto portal inversor de gravedad
  invertirGravedad(jugador, portales) {
    if (this.isGravedadInvertida){
      this.isGravedadInvertida=false;
      this.jugador.body.gravity=this.config.gravedad;
    }else{
      this.isGravedadInvertida=true;
      this.jugador.body.gravity=-this.config.gravedad;
    }
    // this.isGravedadInvertida = true;
    // this.config.gravedad *= -1;
    // portales.disableBody(true, true);
    // this.rotar(180);
  }

  //Efecto portal velocidad

  //Efecto portal de fin de nivel
  portalExit(jugador, portales) {
    /* condicion if para que nivel no supere el nivel 3 */
    portales.disableBody(true, true);
    switch (this.auxNivel) {
      case 1:
        this.scene.start("Play", 2);
        break;
      case 2:
        this.scene.start("Play", 3);
        break;
      case 3:
        this.scene.start("menu");
        break;
    }
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

  //Para hacer una animación de giro al suceder un efecto como cambiar a modo nave o invertirse la gravedad
  rotar(angulo) {
    if (!this.animarRotacion) {
      this.animarRotacion = this.tweens.add({
        targets: this.jugador, //your image that must spin
        angle: angulo, //rotation value must be radian
        duration: 400, //duration in miliseconds
        ease: "Linear",
      });
    } else {
      this.animarRotacion.play();
    }
  }

  //Mètodos invocados
  //Lo que hará cuando se presione la tecla arriba o el click izquierdo del mouse
  accion() {
    //Si está en modo nave, la acción será en una gravedad más suave
    if (this.isModoNave) {
      this.isGravedadInvertida
        ? (this.jugador.body.velocity.y = this.config.gravedad / 4)
        : (this.jugador.body.velocity.y = -this.config.gravedad / 4);
      return;
    }
    //Si no está en modo nave, está en modo jugador, que puede ser normal o runner y no puede dar más de 2 saltos seguidos
    if (this.contadorSaltos >= 2) {
      return;
    }
    //Si no está en modo nave y salta, incremento el contador de saltos
    this.contadorSaltos++;
    //Si no está en modo nave y salta, tengo que darle sentido a ese salto según la gravedad esté invertida o no
    if (this.isGravedadInvertida) {
      this.jugador.body.velocity.y = -this.fuerzaSalto; //this.config.gravedad;
      rotate(-180);
    } else {
      this.jugador.body.velocity.y = this.fuerzaSalto; //-this.config.gravedad;
      this.rotar(180);
    }
  }

  //Resetear el contador de saltos para poder saltar nuevamente
  resetearContadorSaltos() {
    this.contadorSaltos = 0;
  }

  perderVida(jugador, pinchos) {
    let gameNotFinished = this.liveCounter.perderVida();
    /* this.soundPerder.play(); */
    if (!gameNotFinished) {
      //this.liveLostSample.play();
      /* this.setInitialState(); */
      this.physics.pause();
      pinchos.disableBody(true, true);
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          this.physics.resume();
          //Mostrar texto de chocaste obstaculo
        },
        // callback: () => {
        //   this.scene.restart();
        //   this.isModoNave = false;
        // },
        loop: false,
      });
    }
  }

  setInitialState() {
    this.jugador.x = this.config.posicionInicial.x;
    this.jugador.y = this.config.posicionInicial.y;
    /* this.openingText.setVisible(true); */
  }

  endGame(completed) {
    if (!completed) {
      this.isModoNave = false;
      this.estadoNave = false;
      //this.gameOverSample.play();
      this.scene.start("gameover");
      this.score = 0;
    } else {
      //this.winSample.play();
      this.scene.start("congratulations");
    }
  }

/* incrementarPuntos(puntos) {
    this.score += puntos;
    this.scoreText.setText("PUNTOS: " + this.score);
  }
  */

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
  
}

export default Play;

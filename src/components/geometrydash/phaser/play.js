import Phaser from "phaser";
import { LiveCounter } from "./liveCounter";
import { LevelCreator } from "./levelCreator";
/* import { Obstaculos} from "../../../json/obstaculos" */

class Play extends Phaser.Scene {
  constructor(config) {
    super({ key: "Play" });

    this.config = config;
    this.player = null;
    this.sonido = null;
    this.score = 0;
    this.openingText = null;
    this.liveCounter = new LiveCounter(this, 3);
    this.levelCreator= new LevelCreator(this);
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
    //this.crearObstaculos(nivel);


    //this.crearPortales(nivel);

    //agregando texto
    this.crearTextoInicio();

    //agregando sonido
    //this.crearSonido();

    this.physics.add.collider(this.jugador, this.groundBottom);
    //impacto bola-jugador
    /* this.physics.add.collider(
      this.bola,
      this.jugador,
      this.impactoNave,
      null,
      this
    );

    //impacto bloque-bola
    this.physics.add.collider(
      this.bola,
      this.bloque,
      this.impactoBloque,
      null,
      this
    );*/

    //Texto score
    this.scoreText = this.add.text(16, 16, "PUNTOS: 0", {
      fontSize: "20px",
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    });
    //this.impactoNaveSample = this.sound.add('impactoNaveSample');
    this.setInitialState();
  }

  crearFondo(nivel) {
    switch (nivel){
      case 1:
        this.add.image(0, 0, "fondoNivel1");
        this.groundBottom = this.physics.add.staticSprite(500, 550, 'terrenoInferiorNivel1');
        break;
        default:
          break;
    }
    
  }

  crearJugador() {
    this.jugador = this.physics.add.sprite(400, 500, "jugador").setScale(0.25);
    this.jugador.body.allowGravity = true;
    this.jugador.setCollideWorldBounds(true);
    //animación del jugador
    this.anims.create({
      key: "jugadorCaminar",
      frames: this.anims.generateFrameNumbers("jugador",{start:0,end:12}),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "jugadorQuieto",
      frames: this.anims.generateFrameNumbers("jugador",{frames:[0]}),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "jugadorSaltar",
      frames: this.anims.generateFrameNumbers("jugador",{frames:[9]}),
      frameRate: 20,
      repeat: 1,
    });
  }

  crearObstaculos(nivel) {
    /* Obstaculos.map( (spike) => ({
      this.createObstacles(spike, 'spikeBottom', 0, 1)
    })) */
  }

  crearPortales(nivel){
    /* spikeBottomList.map( (spike) => ({ this.createObstacles(spike, 'spikeBottom', 0, 1);}) */
  }

  crearTextoInicio() {
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
  }

  crearSonido() {
    this.sonido = this.sound.add("musica");
    this.soundChoqueBarra = this.sound.add("choqueBarra");
    this.soundChoqueObstaculos = this.sound.add("choqueObstaculos");
    this.soundPerder = this.sound.add("perder");
    const soundConfig = {
      volume: 0.2,
      loop: true,
    };
    // this.sonido.play(soundConfig);

    if (!this.sound.locked) {
      // already unlocked so play
      this.sonido.play(soundConfig);
    } else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.sonido.play(soundConfig);
      });
    }
  }

  update() {
    //mover la plataforma
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(200);
    } else {
      this.jugador.setVelocityX(0);
    }
    if(this.cursors.up.isDown && this.jugador.body.touching.down){
      this.jugador.setVelocityY(-450);
    }
    //Animaciones del Jugador
    if(this.jugador.body.touching.down){
      if(this.jugador.body.velocity.x!=0){
        this.jugador.play("jugadorCaminar",true);
      }else{
        this.jugador.play("jugadorCaminar",false);
      }
    }else{
      this.jugador.play("jugadorSaltar",true);
    }
    //Perdimos?
    /* if (this.bola.y > 500 && this.bola.active) {
      let gameNotFinished = this.liveCounter.perderVida();
      this.soundPerder.play();
      if (!gameNotFinished) {
        //this.liveLostSample.play();
        this.setInitialState();
      }
    }*/

    //disparo inicial
    /* if (this.cursors.up.isDown) {
      if (this.bola.getData("glue")) {
        //this.startGameSample.play();
        this.bola.setVelocity(-60, -300);
        this.bola.setData("glue", false);
        this.openingText.setVisible(false);
        this.bola.setBounce(1);
      }
    }*/
  }

  //metodos invocados

  animarJugador(){
  }

  impactoNave(bola, jugador) {
    let relativeImpact = bola.x - jugador.x;
    this.soundChoqueBarra.play();
    if (relativeImpact > 0) {
      bola.setVelocityX(8 * relativeImpact);
    } else if (relativeImpact < 0) {
      bola.setVelocityX(8 * relativeImpact);
    } else {
      bola.setVelocityX(Phaser.Math.Between(-10, 10));
    }
  }

  incrementarPuntos(puntos) {
    this.score += puntos;
    this.scoreText.setText("PUNTOS: " + this.score);
  }

  impactoBloque(bola, bloque) {
    bloque.disableBody(true, true);
    this.incrementarPuntos(10);
    this.soundChoqueObstaculos.play();
    if (this.bloque.countActive() === 0) {
      this.endGame(true);
    }
  }

  setInitialState() {
    this.jugador.x = 50;
    this.jugador.y = 400;
    this.openingText.setVisible(true);
  }

  endGame(completed) {
    if (!completed) {
      //this.gameOverSample.play();
      this.scene.start("gameover");
      this.score = 0;
    } else {
      //this.winSample.play();
      console.log("entrando a Congratulations");
      this.scene.start("congratulations");
    }
  }
}

export default Play;

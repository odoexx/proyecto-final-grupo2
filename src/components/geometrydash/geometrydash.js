import "./geometrydash.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Phaser from 'phaser';
import Preload from './phaser/preload';
import Menu from './phaser/menu';
import Play from './phaser/play';
import GameOver from './phaser/gameOver';
import Congratulations from './phaser/congratulations';

function GeometryDash() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const CONFIGURACION = {
        scale: {
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 1000,
            height: 600,
            backgroundColor: "#03e3fc"
        },
        /* posicionInicialNave: { x: 400, y: 460 },
        posicionInicialBola:{ x: 385, y: 430 },
        velocidadInicial: 0, */
    };

    const Escenas = [Preload, Menu, Play, GameOver, Congratulations];
    const crearEscena = Scene => new Scene(CONFIGURACION);
    const iniciarEscena = () => Escenas.map(crearEscena);

    var config = {
      type: Phaser.AUTO,
      parent: 'game',
      ...CONFIGURACION,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 100 },
          debug: false,
        },
      },
      scene: iniciarEscena(),
    };

    var game = new Phaser.Game(config);

    game.events.on("LISTO", setListo);

    return () => {
      setListo(false);
      game.destroy(true);
    };
  }, [listo]);
}

export default GeometryDash;

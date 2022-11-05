import "./memotest.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Cartas from "../../json/memotest/parejas.json";
import Vidas from "../../json/memotest/otros.json";

const Memotest = () => {
  const [nivel, setNivel] = useState(0);
  const [comenzarHabilitado, setComenzarHabilitado] = useState(false);
  const [habilitarCartas, setHabilitarCartas] = useState(false);
  let arrayCartas = [];
  const [vida, setVida] = useState(Vidas[0].img);
  const [contVida, setContVida] = useState(2);
  const [ocultar, setOcultar] = useState();
  const [score, setScore] = useState(0);

  /* Tiene que elegir nivel para repartir la mano */
  const elegirNivel = (nivel) => {
    setNivel(nivel);
    setComenzarHabilitado(true);
  };

  const repartirCartas= () =>{
      for (let x = 0; x < 10; x++) {
        <Button
          id={Cartas[x].id}
          key={Cartas[x].id}
          disable= {!habilitarCartas}
          /* onClick={() => elegirCarta(Cartas[x].id)} */
        >
          {Cartas[x].id}
        </Button>;
      }
  }

  const iniciarJugada = () => {
    setHabilitarCartas(true);
  };

  return (
    <>
      {/* Barra vida y score */}
      <header className="game-status">
        <div className="game-status lives"><img src={vida} alt='vidas'/><img src={vida} alt='vidas'/></div>
        <div className="game-status score">score: {score}</div>
      </header>

      {/* Área de juego */}
      <section className="game-area">
        <div className="game-area play">{repartirCartas()}</div>
        <div className="game-area hints">pistas</div>
      </section>

      {/* Área de controles */}
      <footer className="game-controls">
        <Button
          className="button-nivel"
          variant="primary"
          onClick={() => elegirNivel(1)}
        >
          Nivel 1
        </Button>
        <Button
          className="button-nivel"
          variant="primary"
          onClick={() => elegirNivel(2)}
        >
          Nivel 2
        </Button>
        <Button
          className="button-iniciar"
          variant="secondary"
          id="btnIniciar"
          disabled={!comenzarHabilitado}
          onClick={() => iniciarJugada()}
        >
          Repartir
        </Button>
      </footer>
    </>
  );
};

export default Memotest;

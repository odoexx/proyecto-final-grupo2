import "./memotest.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Cartas from "../../json/memotest/parejas.json";
import Trampas from "../../json/memotest/trampas.json";
import Vidas from "../../json/memotest/otros.json";

const Memotest = () => {
  const [nivel, setNivel] = useState(0);
  const [comenzarHabilitado, setComenzarHabilitado] = useState(false);
  const [habilitarCartas, setHabilitarCartas] = useState(false);
  const [vida, setVida] = useState(Vidas[0].img);
  const [contVida, setContVida] = useState(1);
  const [ocultar, setOcultar] = useState();
  const [score, setScore] = useState(0);
  const [ponerCartas, setPonerCartas] = useState(false);
  const [arrayCartas, setArrayCartas] = useState([...Cartas]);

  const parejasMazoNivel1 = 9;
  const parejasMazoNivel2 = 8;
  const trampasPorNivel = 2;


  /* Tiene que elegir nivel para repartir la mano */
  const elegirNivel = (nivel) => {
    setNivel(nivel);
    setComenzarHabilitado(true);
  };

  /* Dar vuelta carta elegida */
  const elegirCarta = (cartaElegida, i) => {
    let contadorVida = contVida;
    /* detecto si clickeo una carta trampa */
    if(cartaElegida.type=="trampa"){
      /* console.log("pierde vida"); */
      contadorVida--;
      setContVida(contadorVida);
      console.log(contVida);
    }else{
      /* console.log("espera a que clickie otra carta para ver si encuetra el par"); */
    }
    return (document.getElementById("img" + i).src = cartaElegida.img);
  };

  /* Volteamos todas las cartas para la nueva partida */
  const voltearCartas = () => {
    return arrayCartas.map((carta, i) => {
      return (document.getElementById("img" + i).src = carta.reverso);
    });
  };

  /* Repartimos las cartas */
  const repartirCartas = () => {
    return arrayCartas.map((carta, i) => {
      return (
        <Button
          className="button-carta"
          id={i}
          key={i}
          disabled={!habilitarCartas}
          variant="secundary"
          onClick={() => elegirCarta(carta, i)}
        >
          <img src={carta.reverso} id={"img" + i}></img>
        </Button>
      );
    });
  };

  useEffect(() => {
    repartirCartas();
    voltearCartas();
  }, [ponerCartas]);

  /* Armamos el mazo según el nivel */
  const iniciarJugada = () => {
    setHabilitarCartas(true);
    let arrayCartasAux = [];
    switch (nivel) {
      case 1:
        /* Cargamos las parejas de cartas */
        for (let x = 0; x < parejasMazoNivel1; x++) {
          arrayCartasAux[x] = Cartas[x];
        }
        arrayCartasAux = [...arrayCartasAux, ...arrayCartasAux];
        /* Cargamos las cartas trampa */
        for (let x = 0; x < trampasPorNivel * nivel; x++) {
          arrayCartasAux[parejasMazoNivel1 * 2 + x] = Trampas[x];
        }
        break;
      case 2:
        /* Cargamos las cartas */
        for (let x = 0; x < parejasMazoNivel2; x++) {
          arrayCartasAux[x] = Cartas[x];
        }
        /* Duplicamos las cartas para tener las parejas */
        arrayCartasAux = [...arrayCartasAux, ...arrayCartasAux];
        /* Cargamos las cartas trampa */
        for (let x = 0; x < trampasPorNivel * nivel; x++) {
          arrayCartasAux[parejasMazoNivel2 * 2 + x] = Trampas[x];
        }
        break;
      default:
        break;
    }
    /* Mezclar mazo */
    for (let i = arrayCartasAux.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCartasAux[i], arrayCartasAux[j]] = [
        arrayCartasAux[j],
        arrayCartasAux[i],
      ];
    }
    setArrayCartas(arrayCartasAux);
    setPonerCartas(!ponerCartas);
  };

  return (
    <>
      {/* Barra vida y score */}
      <header className="game-status">
        <div className="game-status lives">
          <img src={vida} alt="vidas" />
          <img src={vida} alt="vidas" />
        </div>
        <div className="game-status score">score: {score}</div>
      </header>

      {/* Área de juego */}
      <section className="game-area">
        <div className="game-area play">{repartirCartas()}</div>
        <aside className="game-area hints">
          <h1>Seleccionaste el nivel: {nivel} </h1>
          <br></br>
          <h2>Click en "REPARTIR" para comenzar</h2>
        </aside>
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

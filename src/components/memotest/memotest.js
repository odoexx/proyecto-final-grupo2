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
  const [arrayCartasActivas, setArrayCartasActivas] = useState([]);
  const [cartasActivas, setCartasActivas] = useState(0);
  const [cartaElegida, setCartaElegida] = useState(false);
  const [mostrandoCarta, setMostrandoCarta] = useState(false);

  const parejasMazoNivel1 = 9;
  const parejasMazoNivel2 = 8;
  const trampasPorNivel = 2;

  useEffect(() => {
    repartirCartas();
    voltearCartas();
  }, [ponerCartas]);

  useEffect(() => {
    let contCartasActivas = cartasActivas;

    contCartasActivas++;
    if (contCartasActivas > 2) {
      setArrayCartasActivas([]);
      contCartasActivas = 1;
    }
    setCartasActivas(contCartasActivas);
  }, [cartaElegida]);

  /* Tiene que elegir nivel para repartir la mano */
  const elegirNivel = (nivel) => {
    setNivel(nivel);
    setComenzarHabilitado(true);
  };

  /* Dar vuelta carta elegida */
  const elegirCarta = (carta, i) => {
    let contadorVida = contVida;
    let arrayCartasActivasAux = arrayCartasActivas;

    if (!mostrandoCarta){

      /* detecto si clickeo una carta trampa */
      if (carta.type == "trampa") {
        /* console.log("pierde vida"); */
        contadorVida--;
        setContVida(contadorVida);
        console.log(contVida);
      } else {
        /* console.log("espera a que clickie otra carta para ver si encuetra el par"); */
        setCartaElegida(!cartaElegida);
        arrayCartasActivasAux.push(carta);
        setArrayCartasActivas(arrayCartasActivasAux);
      }

      document.getElementById("img" + i).src = carta.img;
      
      if (arrayCartasActivas.length == 2){
        if(arrayCartasActivas[0].id == arrayCartasActivas[1].id){
          setScore(score + 10);
        }
        else{
          setMostrandoCarta(true);
          setTimeout( () => {
            document.getElementById("img" + i).src = carta.reverso;
            setMostrandoCarta(false);
          }, 1500);
        }
      }
    }
    /* return (
        document.getElementById("img" + i).src = carta.img
    ); */
  };

  /* Volteamos todas las cartas para la nueva partida */
  const voltearCartas = () => {
    return arrayCartas.map((carta, i) => {
      /* A través del id identificamos las cartas en la mesa y mostramos su reverso */
      return (document.getElementById("img" + i).src = carta.reverso);
    });
  };

  /* Repartimos las cartas */
  const repartirCartas = () => {
    return arrayCartas.map((carta, i) => {
      return (
        /* Creamos el botón con las propiedades necesarias */
        <Button
          className="button-carta"
          id={i}
          key={i}
          disabled={!habilitarCartas}
          variant="secundary"
          onClick={() => elegirCarta(carta, i)}
        >
          {/* Mostramos la carta ocultando la figura, o sea, mostramos el reverso  y creamos un id para referenciarlo cuando la demos vuelta*/}
          <img src={carta.reverso} id={"img" + i}></img>
        </Button>
      );
    });
  };

  /* Armamos el mazo según el nivel */
  const iniciarJugada = () => {
    let arrayCartasAux = [];
    switch (nivel) {
      /* Nivel 1 */
      case 1:
        /* Cargamos las cartas */
        for (let x = 0; x < parejasMazoNivel1; x++) {
          arrayCartasAux[x] = Cartas[x];
        }
        /* Duplicamos las cartas para tener las parejas */
        arrayCartasAux = [...arrayCartasAux, ...arrayCartasAux];
        /* Cargamos las cartas trampa */
        for (let x = 0; x < trampasPorNivel * nivel; x++) {
          arrayCartasAux[parejasMazoNivel1 * 2 + x] = Trampas[x];
        }
        break;
      /* Nivel 2 */
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
    /* Mezclar mazo aleatoriamente */
    for (let i = arrayCartasAux.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCartasAux[i], arrayCartasAux[j]] = [
        arrayCartasAux[j],
        arrayCartasAux[i],
      ];
    }
    /* Actualizamos el array de cartas para que renderice */
    setArrayCartas(arrayCartasAux);
    /* Habilitamos las cartas para poder clickearlas */
    setHabilitarCartas(true);
    /* Ponemos las cartas en el área de juego */
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

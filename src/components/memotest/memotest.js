import "./memotest.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Cartas from "../../json/memotest/parejas.json";
import Trampas from "../../json/memotest/trampas.json";
import Otros from "../../json/memotest/otros.json";

const Memotest = () => {
  const [nivel, setNivel] = useState(0);
  const [comenzarHabilitado, setComenzarHabilitado] = useState(false);
  const [contVidas, setContVidas] = useState(0);
  const [score, setScore] = useState(0);
  const [ponerCartas, setPonerCartas] = useState(false);
  const [arrayCartas, setArrayCartas] = useState([...Cartas]);
  const [arrayCartasActivas, setArrayCartasActivas] = useState([]);
  const [cartasActivas, setCartasActivas] = useState(0);
  const [cartaElegida, setCartaElegida] = useState(false);
  const [mostrandoCarta, setMostrandoCarta] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [estadoJuego, setEstadoJuego] = useState();
  const [contParejas, setContParejas] = useState(0);
  const [clickComenzar, setClickComenzar] = useState("Click en REPARTIR para jugar");

  const parejasMazoNivel1 = 9;
  const parejasMazoNivel2 = 8;
  const trampasPorNivel = 2;
  const imgVida = Otros[0].img;
  
  //Sonidos
  const sonidoClic = new Audio("/assets/sounds/memotest/click.wav");
  const sonidoInicioPartida = new Audio("/assets/sounds/memotest/iniciar_memotest.wav");
  const sonidoMuerte = new Audio("/assets/sounds/memotest/muerte.wav");
  const sonidoVictoria = new Audio("/assets/sounds/memotest/victoria_memotest.wav");


  /* Se dispara cuando juegoTerminado cambia de valor */
  /* Ponemos todas las cartas boca arriba y las desactivamos */
  useEffect(() => {
    arrayCartas.map((carta, i) => {
      /* A través del id identificamos las cartas en la mesa y las deshabilitamos */
      document.getElementById("img" + i).src = carta.img;
      document.getElementById(i).disabled = juegoTerminado;
    });
  }, [juegoTerminado]);

  /* Se dispara cuando distribuimos las cartas para empezar a jugar luego de elegir nivel */
  /* Distribuimos las cartas según el nivel y las ponemos boca abajo */
  useEffect(() => {
    repartirCartas();
    voltearCartas();
  }, [ponerCartas]);

  /* Se dispara cuando elegimos/hacemos click en una carta */
  /* Cargamos hasta 2 cartas en un vector para poder comparar sus valores */
  useEffect(() => {
    let contCartasActivas = cartasActivas;

    contCartasActivas++;
    if (contCartasActivas > 2) {
      setArrayCartasActivas([]);
      contCartasActivas = 1;
    }
    setCartasActivas(contCartasActivas);
  }, [cartaElegida]);

  /* Se dispara cada vez que cambia el contador de vidas y la cantidad de parejas */
  /* Si no nos quedan vidas o terminamos las parejas, termina el juego */
  useEffect(() => {
    if (contVidas <= 0) {
      setJuegoTerminado(true);
      setEstadoJuego(Otros[3].img);
      //sonido perder
    }
    if (contParejas <= 0) {
      setJuegoTerminado(true);
      setEstadoJuego(Otros[2].img);
      //sonido ganar
      setClickComenzar("Click en REPARTIR para jugar");
    }
  }, [contVidas, contParejas]);

  /* Tiene que elegir nivel para repartir la mano */
  const elegirNivel = (nivel) => {
    setNivel(nivel);
    setComenzarHabilitado(true);
    //sonido click
    sonidoClic.play();

  };

  /* Mostramos la cantidad de vidas restantes */
  const mostrarVidas = (vidas) => {
    let arrayVidas = [];

    /* Cargamos en el vector las imágenes para representar las vidas */
    for (let x = 0; x < vidas; x++) {
      arrayVidas.push(
        <img
          src={imgVida}
          id={"imgVida" + x}
          key={"imgVida" + x}
          alt={"vida " + x}
        />
      );
    }
    /* Regresamos el vector cargado, de modo que tendremos tantas vidas como imágenes hayamos cargado */
    /* Importante envolver la respuesta en <></> porque tendremos varios elementos regresados */
    return <>{arrayVidas}</>;
  };

  /* Dar vuelta carta elegida */
  const elegirCarta = (carta, i) => {
    let arrayCartasActivasAux = arrayCartasActivas;
    //sonido click 
    sonidoClic.play();

    /* Si no estamos mostrando/animando otra carta, podemos clickear en una nueva */
    if (!mostrandoCarta) {
      /* muestro la carta elegida */
      document.getElementById("img" + i).src = carta.img;
      /* detecto si clickeo una carta trampa */
      if (carta.type == "trampa") {
        /* Si es carta trampa resto vida y la desactivo */
        setContVidas(contVidas - 1);
        document.getElementById(i).disabled = true;
        sonidoMuerte.play();
      } else {
        /* Controlamos si ya hay alguna carta activa */
        if (arrayCartasActivas.length > 0) {
          /* Evitamos el doble click en la misma carta */
          if (arrayCartasActivas[0].i != i) {
            /* Si no es carta trampa pongo la carta en el array de cartas activas para compararla cuando tenga 2 */
            setCartaElegida(!cartaElegida);
            arrayCartasActivasAux.push({ carta, i });
            setArrayCartasActivas(arrayCartasActivasAux);
          }
        } else {
          /* Si no es carta trampa y no hay cartas activas pongo la carta en el array de cartas activas para compararla cuando tenga 2 */
          setCartaElegida(!cartaElegida);
          arrayCartasActivasAux.push({ carta, i });
          setArrayCartasActivas(arrayCartasActivasAux);
        }
      }
      /* Si tengo 2 cartas activas, las comparo para saber si son pareja */
      if (arrayCartasActivas.length == 2) {
        /* Si las cartas son iguales aumento el score y desactivo la pareja de cartas */
        if (arrayCartasActivas[0].carta.id == arrayCartasActivas[1].carta.id) {
          setScore(score + 10);
          setContParejas(contParejas - 1);
          document.getElementById(arrayCartasActivas[0].i).disabled = true;
          document.getElementById(arrayCartasActivas[1].i).disabled = true;
          sonidoVictoria.play();
        } else {
          /* Si no son iguales espero un tiempo y pongo boca abajo ambas cartas */
          setMostrandoCarta(true);
          setTimeout(() => {
            document.getElementById("img" + arrayCartasActivas[0].i).src =
              carta.reverso;
            document.getElementById("img" + arrayCartasActivas[1].i).src =
              carta.reverso;
            setMostrandoCarta(false);
          }, 1000);
        }
      }
    }
  };

  /* Volteamos todas las cartas para la nueva partida */
  const voltearCartas = () => {
    return arrayCartas.map((carta, i) => {
      /* Obtenemos el id de las cartas del arrayCartas y la habilitamos */
      document.getElementById(i).disabled=false;
      /* A través del id identificamos las cartas en la mesa y mostramos su reverso */
      document.getElementById("img" + i).src = carta.reverso;
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
          disabled={juegoTerminado}
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
    /* Inicializamos los estados de una mano nueva */
    let arrayCartasAux = [];
    setContVidas(2);
    setArrayCartas(arrayCartasAux);
    setJuegoTerminado(false);
    setEstadoJuego(Otros[1].img);
    setScore(0);
    setClickComenzar("");
    sonidoInicioPartida.play();

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
        /* Establecemos la cantidad de parejas para ganar en nivel 1 */
        setContParejas(parejasMazoNivel1);
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
        /* Establecemos la cantidad de parejas para ganar en nivel 2 */
        setContParejas(parejasMazoNivel2);
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
    /* Ponemos las cartas en el área de juego */
    setPonerCartas(!ponerCartas);
  };

  return (
    <>
      {/* Barra vida y score */}
      <header className="game-status">
        <div className="game-status lives">{mostrarVidas(contVidas)}</div>
        <div className="game-status score">score: {score}</div>
      </header>

      {/* Área de juego */}
      <section className="game-area">
        <div className="game-area play">{repartirCartas()}</div>
        <aside className="game-area hints">
          <h1>Seleccionaste el nivel: {nivel} </h1>
          <br></br>
          <h2>{clickComenzar}</h2>
          <br></br>
          <img src={estadoJuego} alt="Estado del juego"></img> {/* estado de juego */}
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

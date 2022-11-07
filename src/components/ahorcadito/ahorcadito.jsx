import "./ahorcadito.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alfabeto from "../../json/alfabeto.json";
import Diccionario from "../../json/diccionario.json";
import Vidas from "../../json/vidas.json";

const Juego = () => {
  const [palabraElegida, setPalabraElegida] = useState("");
  const [palabraEnmascarada, setPalabraEnmascarada] = useState("");
  const [pista, setPista] = useState(
    'Haz click en "Obtener palabra" para empezar'
  );
  const [tecladoDeshabillitado, setTecladoDeshabilitado] = useState(true);
  const [contadorErrores, setContadorErrores] = useState(0);
  const [vidasRestantes, setVidasRestantes] = useState(Vidas[0].img);
  const [finJuego, setFinJuego] = useState(false);
  const sonidoCorrecto=new Audio("/assets/ahorcadito/sounds/correcto.wav");
  const sonidoError=new Audio("/assets/ahorcadito/sounds/error.wav");
  const sonidoVictoria=new Audio("/assets/ahorcadito/sounds/victoria.wav");
  const sonidoClic=new Audio("/assets/ahorcadito/sounds/click.wav");
  /* Habilitar / Deshabilitar botones dependiendo si es fin de juego */
  useEffect(() => {
    Alfabeto.map((letra) => {
      document.getElementById(letra).disabled = finJuego;
    });
  }, [finJuego]);

  /* Generar botones abecedario */
  const botones = () => {
    return Alfabeto.map((letra) => {
      return (
        <Button
          id={letra}
          key={letra}
          disabled={tecladoDeshabillitado}
          onClick={() => presionarTecla(letra)}
        >
          {letra}
        </Button>
      );
    });
  };

  /* Iniciar la jugada */
  const iniciarJugada = () => {
    let indPalabra = Math.floor(Math.random() * Diccionario.length);
    let arrayPalabra = Array.from(Diccionario[indPalabra].palabra);
    let arrayPalabraEnmascarada = Array(arrayPalabra.length).fill("_");
    sonidoClic.play();
    setPalabraElegida(arrayPalabra);
    setPista(Diccionario[indPalabra].pista);
    setPalabraEnmascarada(arrayPalabraEnmascarada);
    setTecladoDeshabilitado(false);
    setContadorErrores(0);
    setVidasRestantes(Vidas[0].img);
    setFinJuego(false);
    Alfabeto.map((letra) => {
      document.getElementById(letra).disabled = false;
    });
  };

  /* Añadir letra presionada a una variable */
  const presionarTecla = (letra) => {
    let banderaError = true;
    let contErrores = contadorErrores;
    /* construyo una variable con el contenido de palabraEnmascarada para poder actualizar su estado más adelante */
    let palabraActualizada = palabraEnmascarada.map((l) => l);
    /* Deshabilitar teclas presionadas */
    document.getElementById(letra).disabled = true;

    /* Controlar si la letra está en la palabra y mostramos todas sus ocurrencias */
    for (let i = 0; i < palabraElegida.length; i++) {
      if (letra === palabraElegida[i]) {
        palabraActualizada[i] = letra;
        setPalabraEnmascarada(palabraActualizada);
        banderaError = false;
        //sonido de acierto
        sonidoCorrecto.play();//sonido correcto
      } else {
        //sonido error//sonido error
      }
    }

    /* Controlar si la letra no está en la palabra e incrementar el contador de errores en ese caso*/
    if (banderaError) {
      contErrores++;
      sonidoError.play();
      /* Mientras tenga vidas disponibles, incrementeo el contador de errores y actualizo la imagen del ahoracado */
      if (contErrores <= Vidas.length - 1) {
        setContadorErrores(contErrores);
        setVidasRestantes(Vidas[contErrores].img);
      } else {
        /* Si no tiene vidas, pierde */
        setVidasRestantes("/assets/ahorcadito/images/game-over-1.png");
        setFinJuego(true);
      }
    }

    /* Controlar si el contenido de ambos arrays son iguales, para saber si ganó el jugador */
    if (
      palabraActualizada.every(
        (value, index) => value === palabraElegida[index]
      )
    ) {
      //sonido de victoria
      setVidasRestantes("/assets/ahorcadito/images/you win.png");
      setFinJuego(true);
      sonidoVictoria.play();//sonido ganar
    }
  };

  return (
    <div className="full-game-area">
      <section className="sup-game-area">
        <article className="left-game-area">
          <div className="pistas-area">
            <p> {pista} </p>
          </div>
          <div className="palabra-area">
            <p> {palabraEnmascarada} </p>
          </div>
        </article>
        <article className="right-game-area">
          <img src={vidasRestantes} alt="imágen ahorcado"></img>
        </article>
      </section>
      <footer className="inf-game-area">
        <div className="teclado"> {botones()} </div>
        <div className="controles">
          <Button
            className="button-iniciar"
            variant="secondary"
            onClick={() => iniciarJugada()}
          >
            Obtener palabra
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Juego;
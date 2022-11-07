import Button from "react-bootstrap/Button";
import "./ppt.css";
import { useEffect, useState } from "react";

const Juego=()=> {
  const [jugador, setJugador] = useState("/assets/piedrapapeltijeras/logo2.png");
  const [jugada, setJugada] = useState("/assets/piedrapapeltijeras/SignoPregunta.png");
  const [jugadorCPU, setJugadorCPU] = useState("/assets/piedrapapeltijeras/logo2.png");
  const [jugadaCPU, setJugadaCPU] = useState("/assets/piedrapapeltijeras/SignoPregunta.png");
  const [puntaje, setPuntaje] = useState(0);
  const [puntajeCPU, setPuntajeCPU] = useState(0);
  const [resultado, setResultado] = useState("Haz una jugada...");

  const hacerJugada = (srcJugador, srcJugada, eleccion) => {
    setJugador(srcJugador);
    setJugada(srcJugada);
    let enemigo = Math.floor(Math.random() * 4);
    let ataque = Math.floor(Math.random() * 3);

    console.log("CPU: " + puntajeCPU + " - Jugador: " + puntaje);

    switch (enemigo) {
      case 0:
        setJugadorCPU("/assets/piedrapapeltijeras/Charizard.png");
        setJugadaCPU("/assets/piedrapapeltijeras/FireType.png");
        ataque = 0;
        break;
      case 1:
        setJugadorCPU("/assets/piedrapapeltijeras/Feraligatr.png");
        setJugadaCPU("/assets/piedrapapeltijeras/WaterType.png");
        ataque = 1;
        break;
      case 2:
        setJugadorCPU("/assets/piedrapapeltijeras/Sceptile.png");
        setJugadaCPU("/assets/piedrapapeltijeras/GrassType.png");
        ataque = 2;
        break;
      case 3:
        setJugadorCPU("/assets/piedrapapeltijeras/Mew.png");
        if (ataque === 0) {
          setJugadaCPU("/assets/piedrapapeltijeras/FireType.png");
        } else if (ataque === 1) {
          setJugadaCPU("/assets/piedrapapeltijeras/WaterType.png");
        } else {
          setJugadaCPU("/assets/piedrapapeltijeras/GrassType.png");
        }
        break;
    }

    if (
      (eleccion === 0 && ataque === 2) ||
      (eleccion === 1 && ataque === 0) ||
      (eleccion === 2 && ataque === 1)
    ) {
      setPuntaje(puntaje + 1);
      setResultado("GANASTE!!!");
    } else if (eleccion === ataque) {
      setResultado("EMPATE!!!");
    } else {
      setPuntajeCPU(puntajeCPU + 1);
      setResultado("PERDISTE :(");
    }
  };

  return (
    <div>
      <section id="juego" className="gameContent">
        <div className="full-gameArea">
          {/* Área izquierda */}
          <aside className="area">
            <div className="img-jugada-cpu">
              <img src={jugadaCPU} alt="imagen jugada cpu"></img>
            </div>
            <div className="img-jugador">
              <h2>PUNTAJE CPU: {puntajeCPU}</h2>
              <img src={jugador} alt="imagen jugador"></img>
            </div>
          </aside>

          {/* Área derecha */}
          <aside className="area">
            <div className="img-cpu">
              <img src={jugadorCPU} alt="imagen cpu"></img>
            </div>
            <h2>PUNTAJE JUGADOR: {puntaje}</h2>
            <div className="img-jugada-jugador">
              <img src={jugada} alt="imagen jugada jugador"></img>
            </div>
          </aside>
        </div>

        {/*Area central*/}
        <div className="resultado-area">
          <h1>{resultado}</h1>
        </div>

        {/* Àrea de elecciòn de jugada */}
        <footer className="choosing-area">
          <Button
            className="type-button"
            variant="primary"
            onClick={() =>
              hacerJugada(
                "/assets/piedrapapeltijeras/CharizardBack.png",
                "/assets/piedrapapeltijeras/FireType.png",
                0
              )
            }
          >
            <img src="/assets/piedrapapeltijeras/FireType.png" alt="fuego"></img>
          </Button>
          <Button
            className="type-button"
            variant="primary"
            onClick={() =>
              hacerJugada(
                "/assets/piedrapapeltijeras/FeraligatrBack.png",
                "/assets/piedrapapeltijeras/WaterType.png",
                1
              )
            }
          >
            <img src="/assets/piedrapapeltijeras/WaterType.png" alt="agua"></img>
          </Button>
          <Button
            className="type-button"
            variant="primary"
            onClick={() =>
              hacerJugada(
                "/assets/piedrapapeltijeras/SceptileBack.png",
                "/assets/piedrapapeltijeras/GrassType.png",
                2
              )
            }
          >
            <img src="/assets/piedrapapeltijeras/GrassType.png" alt="hoja"></img>
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default Juego;
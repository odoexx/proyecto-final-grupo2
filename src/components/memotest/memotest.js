import "./memotest.css";
import Button from "react-bootstrap/Button";

const Memotest = () => {
  return (
    <>
      {/* Barra vida y score */}
      <header className="game-status">
        <div className="game-status lives">vidas</div>
        <div className="game-status score">score: 000</div>
      </header>

      {/* Área de juego */}
      <section className="game-area">
        <div className="game-area play">cartas</div>
        <div className="game-area hints">pistas</div>
      </section>

      {/* Área de controles */}
      <footer className="game-controls">
        <Button
          className="button-nivel"
          variant="primary"
          /* onClick={() => iniciarJugada()} */
        >
          Nivel 1
        </Button>
        <Button
          className="button-nivel"
          variant="primary"
          /* onClick={() => iniciarJugada()} */
        >
          Nivel 2
        </Button>
        <Button
          className="button-iniciar"
          variant="secondary"
          /* onClick={() => iniciarJugada()} */
        >
          Comenzar
        </Button>
      </footer>
    </>
  );
};

export default Memotest;

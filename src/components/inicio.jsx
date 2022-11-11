import "./inicio.css";
import Button from "react-bootstrap/Button";

function Inicio() {
  const sonidoClic=new Audio("/assets/sounds/click.wav");
  return (
    <>
      <section className="parrafoinicio">
        <h3 id="inicio-titulo">
          Fundamentos de Programacion Web.
          </h3>
        <p id="inicio-texto1">
          Bienvenidos al juego Arkanoid realizado por el Grupo 2.
        </p>
      </section>
      <section className="contenedor">
        <Button
          className="boton-inicio"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./juego"}
        />
      </section>
    </>
  );
}

export default Inicio;

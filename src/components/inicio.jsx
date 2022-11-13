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
          Bienvenidos al Proyecto Final realizado por el Grupo 2.
        </p>
      </section>
      <section className="contenedor">
      <h3 id="inicio-titulo">
          Ahorcadito
          </h3>
        <Button
          className="boton-inicio"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./ahorcadito"}
        />
      </section>
      <section className="contenedor">
      <h3 id="inicio-titulo">
          Arkanoid
          </h3>
        <Button
          className="boton-inicio2"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./arkanoid"}
        />
      </section>
      <section className="contenedor">
      <h3 id="inicio-titulo">
          Geometry Dash
          </h3>
        <Button
          className="boton-inicio3"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./geometrydash"}
        />
      </section>
      <section className="contenedor">
      <h3 id="inicio-titulo">
          MemoTest
          </h3>
        <Button
          className="boton-inicio4"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./memotest"}
        />
      </section>
      <section className="contenedor">
      <h3 id="inicio-titulo">
          Piedra, Papel o Tijeras
          </h3>
        <Button
          className="boton-inicio5"
          variant="primary"
          size="lg"
          border="ligth"
          onClick={()=>sonidoClic.play()}
          href={"./PPT"}
        />
      </section>
    </>
  );
}

export default Inicio;

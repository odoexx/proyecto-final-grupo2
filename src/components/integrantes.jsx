import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListaIntegrantes from "../json/integrantes.json";
import "./integrantes.css";

function Integrantes() {
  const sonidoClic=new Audio("/assets/sounds/click.wav");
  return (
    <div className="integrantes">
      {ListaIntegrantes.map((lista) => (
        <Card className="card-full" bg="dark" key={lista.id}>
          <Card.Img className="card-img" variant="top" src={lista.img} />
          <Card.Body>
            <Card.Title>{lista.nombre}</Card.Title>
            <Card.Text>
              <Button variant="outline-light" border="success" onClick={()=>sonidoClic.play()} href={lista.github}>
                {lista.usuario}
              </Button>
              <hr className="linea-central-tarjeta" />
              Edad: {lista.edad} años<br></br>
              Intereses: {lista.intereses}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Integrantes;

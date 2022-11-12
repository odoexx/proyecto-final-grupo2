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
            <Card.Title>{lista.nombre}<br/>{lista.apellido}</Card.Title>
            <Card.Text>
              <Button variant="outline-light" border="success" onClick={()=>sonidoClic.play()} href={lista.github}>
                {lista.usuario}
              </Button><br/><br/>
              Edad: {lista.edad} años<br/><br/>Intereses:<br/>{lista.intereses}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Integrantes;

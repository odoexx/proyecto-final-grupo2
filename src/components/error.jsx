import "./error.css";
import Button from 'react-bootstrap/Button';

function Error(){
    const sonidoClic=new Audio("/assets/sounds/click.wav");
    return(
        <>
        <div className="Error">
          <h3 id="titulo-error">Error404</h3>
          <img src='/assets/images/ErrorIcono.png' alt="Imagen Error"></img>
          <p id="error-texto1">No se pudo encontrar la pagina o URL deseada.</p>
          <ul id="error-texto2">Para volver haga click en el boton "Inicio".</ul>
        </div>
        <div className="Boton-Error">
        <Button className="boton-error" variant="primary" size="lg" onClick={()=>sonidoClic.play()} border href={"./"}>Inicio</Button>{' '}
        </div>
        </>

    )
}
export default Error;
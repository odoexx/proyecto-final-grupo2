import "./despedida.css";
import Button from 'react-bootstrap/Button';

function Despedida(){
    const sonidoClic=new Audio("/assets/sounds/click.wav");
    return(
         <>
        <div className='Parrafo'>
            <h3 id='despedida-titulo'>Fundamentos de Programacion Web.</h3>
            <p id='despedida-texto1'>Espereramos que les haya divertido nuestro juego y muchas gracias por jugarlo.</p>
        </div>
        <div className='Despedida'>
            <img src='/assets/images/ImagenDeDespedida.png' alt="Imagen Despedida"></img>
            <p id="despedida-texto3">Para volver, haga click en el siguiente boton.</p>
            <Button className="boton-despedida" variant="primary" size="lg" onClick={()=>sonidoClic.play()} border href={"./"}>Volver a Inicio</Button>{' '}
        </div></>
    )
}

export default Despedida;

export class LiveCounter {
  constructor(escena, vidas) {
    this.relatedScene = escena;
    this.vidasIniciales = vidas;
  }

  create() {
    let desplazamiento = 45;
    let posicionPrimero = (this.vidasIniciales - 3) * desplazamiento;
    this.imagenVida = this.relatedScene.physics.add.staticGroup({
      setScale: { x: 0.25, y: 0.25 },
      key: "jugador",
      frameQuantity: this.vidasIniciales - 1,
      gridAlign: {
        width: this.vidasIniciales - 1,
        height: 10,
        cellWidth: desplazamiento,
        cellHeight: 100,
        x: posicionPrimero,
        y: 10,
      },
    });
  }

  perderVida() {
    if (this.imagenVida.countActive() == 0) {
      this.relatedScene.endGame();
      return true;
    }
    let vidaPerdida = this.imagenVida.getFirstAlive();
    vidaPerdida.disableBody(true, true); //disableBody([disable Game Object], [hide Game Object])
    return false;
  }
}

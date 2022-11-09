import Phaser from "phaser";

export class LevelCreator extends Phaser.Scene{
    constructor(scene){
        super({key:"levelCreator"});
        this.relatedScene=scene;
        this.bloques=null;
    }

    crearNivel(nivel){
        switch(nivel){
            case 1:{
                this.bloques=this.relatedScene.physics.add.staticGroup({
                    key: [
                      "bloque7",
                      "bloque6",
                      "bloque5",
                    ],
                    frameQuantity: 13,
                    gridAlign: {
                      width: 13,
                      height: 7,
                      cellWidth: 60,
                      cellHeight: 37,
                      x: 43,
                      y: 70,
                    },
                  });
                break;
            }
            case 2:{
                this.bloques=this.relatedScene.physics.add.staticGroup({
                    key: [
                      "bloque7",
                      "bloque6",
                      "bloque5",
                      "bloque4",
                      "bloque3",
                      "bloque2",
                      "bloque1",
                    ],
                    frameQuantity: 13,
                    gridAlign: {
                      width: 13,
                      height: 7,
                      cellWidth: 60,
                      cellHeight: 37,
                      x: 43,
                      y: 70,
                    },
                  });
                break;
            }
        }
        return this.bloques;
    }
}
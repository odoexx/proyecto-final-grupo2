import Phaser from "phaser";
import { LevelButtons } from "./levelButtons";

class Menu extends Phaser.Scene{
    constructor(config){
        super({ key: 'menu' });
        this.nivelButton1 = new LevelButtons(this);
        this.nivelButton2 = new LevelButtons(this);
    }

    preload() {
        this.nivelButton1.preload();
        this.nivelButton2.preload();
    }

    create(){
        this.add.image(410, 250, 'fondo');
        this.nivelButton1.create(1);
        this.nivelButton2.create(2);

    }
}

export default Menu;
import Phaser from "phaser";
import { RestartButton } from "./restartButton";

class Congratulations extends Phaser.Scene {
    
    constructor() {
        super({ key: 'congratulations' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('congratulations', '/assets/images/arkanoid/congratulations.png');
        this.restartButton.preload();
    }
    
    create() {
        this.add.image(410, 250, 'fondo');
        this.restartButton.create();
        this.gameoverImage = this.add.image(400, 90, 'congratulations');
    }
}

export default Congratulations;
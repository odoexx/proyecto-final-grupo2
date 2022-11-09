import Phaser from "phaser";
import { RestartButton } from "./restartButton";

class GameOver extends Phaser.Scene {
    
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('gameover', '/assets/arkanoid/images/arkanoid/gameover.png');
        this.restartButton.preload();
    }
    
    create() {
        this.add.image(410, 250, 'fondo');
        this.restartButton.create();
        this.gameoverImage = this.add.image(400, 90, 'gameover');
    }
}

export default GameOver;
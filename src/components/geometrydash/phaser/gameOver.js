import Phaser from "phaser";
import { RestartButton } from "./restartButton";

class GameOver extends Phaser.Scene {
    
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('gameover', '/assets/images/geometrydash/others/gameover.png');
        this.restartButton.preload();
    }
    
    create() {
        this.add.image(500, 300, 'fondoNivel1');
        this.restartButton.create();
        this.gameoverImage = this.add.image(500, 180, 'gameover');
    }
}

export default GameOver;
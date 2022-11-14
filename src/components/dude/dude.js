import Phaser from "phaser";
import { useEffect, useState } from "react";
import './dude.css';

function Dude(){
    const [listo,setListo]=useState(false);

    useEffect(()=>{
        var config = {
            parent: "game",
            type: Phaser.AUTO,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 800,
            height: 600,
            physics:{default:"arcade",
                arcade:{
                    gravity:{y:300},
                    debug:false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };
        var game = new Phaser.Game(config);
        return()=>{
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);

    var cursors;
    var platform;
    var player;
    var stars;
    var bombs;
    var score=0;
    var scoreText;
    var gameOver=false;

    function preload (){
        this.load.image("sky","/assets/images/dude/sky.png");
        this.load.image("platform","/assets/images/dude/platform.png");
        this.load.image("bomb","/assets/images/dude/bomb.png");
        this.load.image("star","/assets/images/dude/star.png");
        this.load.spritesheet("dude","/assets/images/dude/dude.png",{frameWidth:32,frameHeight:48});
    }

    function create (){
        cursors=this.input.keyboard.createCursorKeys();
        this.add.image(400,300,"sky");
        platform=this.physics.add.staticGroup();
        platform.create(400,570,"platform").setScale(2).refreshBody();
        platform.create(0,250,"platform");
        platform.create(100,400,"platform");
        platform.create(800,250,"platform");
        platform.create(700,400,"platform");
        player=this.physics.add.sprite(100,450,"dude");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key:"left",
            frames:this.anims.generateFrameNumbers("dude",{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:"turn",
            frames:[{key:"dude",frame:4}],
            frameRate:20
        });
        this.anims.create({
            key:"right",
            frames:this.anims.generateFrameNumbers("dude",{start:5,end:8}),
            frameRate:10,
            repeat:-1
        });
        stars=this.physics.add.group({
            key:"star",
            repeat:11,
            setXY:{x:12,y:0,stepX:70}
        });
        stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
        });
        bombs=this.physics.add.group();
        scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#000"});
        this.physics.add.collider(player,platform);
        this.physics.add.collider(stars,platform);
        this.physics.add.collider(bombs,platform);
        this.physics.add.overlap(player,stars,collectStar,null,this);
        this.physics.add.collider(player,bombs,hitBomb,null,this);
    }

    function update (){
        if(gameOver){
            return;
        }
        if(cursors.left.isDown){
            player.setVelocityX(-160);
            player.anims.play("left",true);
        }
        else if(cursors.right.isDown){
            player.setVelocityX(160);
            player.anims.play("right",true);
        }else{
            player.setVelocityX(0);
            player.anims.play("turn");
        }
        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }

    function collectStar(player,star){
        star.disableBody(true,true);
        score+=10;
        scoreText.setText("Score: "+score);
        if(stars.countActive(true)==0){
            stars.children.iterate(function(child){
                child.enableBody(true,child.x,0,true,true)
            });
            var x=(player.x<400)? Phaser.Math.Between(400,800):Phaser.Math.Between(0,400);
            var bomb=bombs.create(x,16,"bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200,200),20);
            bomb.allowGravity=false;
        }
    }

    function hitBomb(player,bombs){
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        gameOver=true;
    }
}
export default Dude;
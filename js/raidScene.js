let raidScene = new Phaser.Scene('Raid');

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [bootScene, loadingScene, homeScene, gameScene, raidScene],
  title: 'Raid',
  pixelArt: false, //Use anti-aliasing
  backgroundColor: '#ffffff', // white background by default
  physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: {y: 200}
      }
  }
};


let cursors;
let score = 0;
let player;
let ball;
let blocks = [];

raidScene.init = function(){
    console.log("Started Scene: Raid");
     let playerSpeed = 3
     let enemySpeed = 2
};

raidScene.preload = function(){
        this.load.image("player", "assets/images/rubber_duck.png");
        this.load.image("enemy", "assets/images/red-ball-md.png");
        this.load.image("supplies", "assets/images/female NA.jpg");
        this.load.image("obstacle", "assets/images/text/male.png");
};

raidScene.create = function(){
    player = this.physics.add.sprite(50, config.height/2, "player");
    paddle.setCollideWorldBounds(true);
    paddle.body.allowGravity = false;
    paddle.setImmovable();

    player = this.physics.add.sprite(config.width-50, config.height/2, "enemy");
    paddle.setCollideWorldBounds(true);
    paddle.body.allowGravity = false;
    paddle.setImmovable();
};

raidScene.update = function(time, delta){
    
};
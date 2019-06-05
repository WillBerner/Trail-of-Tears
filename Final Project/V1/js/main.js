// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [bootScene, loadingScene, homeScene, gameScene, menuScene],
  title: 'Phaser3 Project',
  pixelArt: false, //Use anti-aliasing
  backgroundColor: '#ffffff', // white background by default
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        }
    }
};

gameScene.gameData = {
    startX: 465,
    startY: 430,
    endX: 100,
    endY: 400,
    playerPosX: 465,
    playerPosY: 430,
    timeProgressed: 0,
}
// create the game, and pass it the configuration
let game = new Phaser.Game(config);

// a simple set of states that the game can assume.
let GAMESTATE = {
    MENU: 0,
    READY: 1,
    PAUSED: 2,
    GAMEOVER: 3
};

let day = 0;
let character = {
    name: "",
    health: 100,
    water: 100,
    food: 100,
    tribe: "",
    gender:""
}

// some parameters for our scene
gameScene.init = function() {
    // log we are now in "Game Scene"
    console.log("Started Scene: Game");
    this.state = GAMESTATE.READY;
};

gameScene.preload = function () {
    // log we are now in "Boot Scene"
    console.log("Loading Scene: Game");

    this.load.image('map', 'assets/images/1830 america .jpg');
    this.load.image('avatar', 'assets/images/rubber_duck.png');
    this.load.image('ball', 'assets/images/red-ball-md.png');
};

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'map');
    this.background.setOrigin(0,0);
    this.background.depth = -10; // what is depth?
    this.background.displayWidth = config.width;
    this.background.displayHeight = config.height;

    player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'avatar')
    player.setScale(.2);
    player.body.allowGravity = false;


    destination = this.add.sprite(this.gameData.endX, this.gameData.endY, 'ball')
    destination.setScale(.03)

    start = this.add.sprite(this.gameData.startX, this.gameData.startY, 'ball')
    start.setScale(.03)

    this.textContainer = gameScene.add.container(10, 0);
    this.dayText = this.add.text(16, 15, 'Day: 0', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.liveNumText = this.add.text(16, 30, 'Living: 800', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.deadNumText = this.add.text(16, 45, 'Dead: 0', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.rationText = this.add.text(16, 60, 'Rations: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.medicineText = this.add.text(16, 90, 'Medicine: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.waterText = this.add.text(16, 75, 'Water: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });

    this.textContainer.setScale(1.5);this.textContainer.add(this.dayText);
    this.textContainer.add(this.liveNumText);
    this.textContainer.add(this.deadNumText);
    this.textContainer.add(this.rationText);
    this.textContainer.add(this.medicineText);
    this.textContainer.add(this.waterText);


    //trail = new Phaser.Geom.Line(this.gameData.playerPosX, this.gameData.playerPosY, start.x, start.y);
    trail = new Phaser.Geom.Line(destination.x, destination.y, start.x, start.y);
    graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
    graphics.strokeLineShape(trail);

    trailLength = this.gameData.startX - this.gameData.endX;
    dayLength = trailLength / 120;

};

gameScene.update = function (time, delta) {
    if (player.x != destination.x) {
    this.physics.moveToObject(player, destination, 10);
    }
    this.gameData.playerPosX = player.x;
    this.gameData.playerPosY = player.y;
    //graphics.strokeLineShape(trail);
    day = parseInt((start.x - player.x) / dayLength);
    gameScene.dayText.setText('Day: ' + day);

};

gameScene.gameOver = function(){
    this.state = GAMESTATE.GAMEOVER;
    this.time.addEvent({
        delay: 2000,
        callbackScope: this,
        callback: function(){
            this.scene.start('Home');
        }
    }, this);

trailEvent = function() {
    this.gameData.playerPosX = player.x
    this.gameData.playerPosY = player.y
    this.scene.start('Trail Event')
}
};

    // TODO: decrement water & rations everyday
    // add background to text container

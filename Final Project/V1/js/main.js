// this is the main game scene. Here we do most of the games logic while playing.

let left = true;
let right = false;
let lastDay = 0;
let mostRecentResult = "";
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
            debug: false,
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
    rations: 100,
    tribe: "",
    gender:"",
    living: 800,
    dead: 0
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

};

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'map');
    this.background.setOrigin(0,0);
    this.background.depth = -10; // what is depth?
    this.background.displayWidth = config.width;
    this.background.displayHeight = config.height;



    if(character.gender == "male"){
        chief = this.add.sprite(config.width - 75, 100, 'maleChar')
        player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'maleSprite')
        player.setScale(0.1);
        player.body.allowGravity = false;
    }
    if (character.gender == "female") {
        chief = this.add.sprite(config.width - 75, 100, 'femaleChar')
        player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'femaleSprite')
        player.setScale(0.1);
        player.body.allowGravity = false;
    }
    if (character.gender == 'non-Binary') {
        chief = this.add.sprite(config.width - 75, 100, 'nonBinaryChar')
        player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'nonBinarySprite')
        player.setScale(0.1);
        player.body.allowGravity = false;
        chief.displayWidth = 150;
        chief.displayHeight = 200;
    }
        chief.displayWidth = 150;
        chief.displayHeight = 200;



    destination = this.add.sprite(this.gameData.endX, this.gameData.endY, 'ball')
    destination.setScale(.03)

    start = this.add.sprite(this.gameData.startX, this.gameData.startY, 'ball')
    start.setScale(.03)

    trail = new Phaser.Geom.Line(destination.x, destination.y, start.x, start.y);
    //border = new Phaser.Geom.Rect(50, 50, 100, 100);

    graphics = this.add.graphics({
        lineStyle: { width: 4, color: 0x89d3ff },
        fillStyle: { color: 0x89d3ff, alpha: 1.0},
        //fillRect: {x: border.x, y: border.y, width: border.width, height: border.height}
    });


    this.textContainer = gameScene.add.container(10, 0);
    this.dayText = this.add.text(16, 15, 'Day: 0', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.liveNumText = this.add.text(16, 30, 'Living: ' + character.living, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.deadNumText = this.add.text(16, 45, 'Dead: ' + character.dead, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.rationText = this.add.text(16, 60, 'Rations: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.medicineText = this.add.text(16, 90, 'Medicine: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
    this.waterText = this.add.text(16, 75, 'Water: 100', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });

    this.textContainer.setScale(1.5);
    this.textContainer.add(this.dayText);
    this.textContainer.add(this.liveNumText);
    this.textContainer.add(this.deadNumText);
    this.textContainer.add(this.rationText);
    this.textContainer.add(this.medicineText);
    this.textContainer.add(this.waterText);

    graphics.strokeLineShape(trail);
    graphics.fillRect(0, 0, 150, 200);

    trailLength = this.gameData.startX - this.gameData.endX;
    dayLength = trailLength / 120;

};

gameScene.update = function (time, delta) {
  if ((GAMESTATE === 2)) {
    this.physics.moveToObject(player, destination, 0);
  } else {
    if (player.x != destination.x) {
      this.physics.moveToObject(player, destination, 8);

      // MAKING CHARACTER "WALK"
      if (left && !right) {
        player.angle +=2;
        if (player.angle >= 20) {
          left = false;
          right = true;
        }
      } else if (right && !left) {
        player.angle -=2;
        if (player.angle <= -20) {
          left = true;
          right = false;
        }
      }
    }

    // MAKING PLAYER MOVE
    if (this.gameData.playerPosX - player.x >= dayLength
        && character.water > 0
        && character.rations > 0){
        this.gameData.playerPosX = player.x;
        this.gameData.playerPosY = player.y;
        character.rations -= 1
        character.water -= 1
        updateStats();
        }

    // CHANGING DAY
    day = parseInt((start.x - player.x) / dayLength);
    if (day > 118) {
      day = 120;
    }
    gameScene.dayText.setText('Day: ' + day);

    // KILL OFF RANDOM PEOPLE EVERY SO OFTEN
    if (Phaser.Math.Between(1,1000) < 30) {
      character.dead++;
      character.living--;
    }

    // CREATE QUASI-RANDOM EVENTS
    if (Phaser.Math.Between(1, 3000) < 20) {
      randomEvent();
      GAMESTATE = 2;
    }
  }
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

// Saving player's positional data for after event

trailEvent = function() {
    this.gameData.playerPosX = player.x
    this.gameData.playerPosY = player.y
    this.scene.start('Trail Event')
}
};

function updateStats() {
  gameScene.rationText.setText('Rations: ' + character.rations);
  gameScene.waterText.setText('Water: ' + character.water);
  gameScene.liveNumText.setText('Living: ' + character.living);
  gameScene.deadNumText.setText('Dead: ' + character.dead);
}

function randomEvent() {
  let eventIndex = Phaser.Math.Between(0, 2);
  eventIndex = Math.round(eventIndex);
  let currentEvent = events[eventIndex];
  currentEvent = events[eventIndex];

  let description = currentEvent.description;
  let question = currentEvent.question;

  let choices = currentEvent.choices;
  let box = gameScene.add.sprite((gameWidth / 2), (gameHeight / 3) - 50, 'textBox');
  box.setScale(0.7);

  let descriptionText = gameScene.add.text(210, 150, description, {color: 'black'});
  let questionText = gameScene.add.text(210, 230, question, {color: 'black'});

  let choice1Text = gameScene.add.text(215, 265, choices.choice1, {color:'black'})
  let choice2Text = gameScene.add.text(215, 285, choices.choice2, {color:'black'})
  textInteractive(choice1Text);
  textInteractive(choice2Text);
  let toDestroy = [box, descriptionText, questionText, choice1Text, choice2Text ];

  // DISPLAY TEXTUAL RESULT OF CHOICE AND CALCULATE RESULT
  choice1Text.on('pointerdown', function() {
    mostRecentResult = choices.result1;
    choices.calculate(choices.choice1);
    setUpChoices(choice1Text, toDestroy);
    updateStats();
  });
  choice2Text.on('pointerdown', function() {
    mostRecentResult = choices.result2;
    choices.calculate(choices.choice2);
    setUpChoices(choice2Text, toDestroy);
    updateStats();
    });

}

function setUpChoices(choice, toDelete) {
  let resultText = gameScene.add.text(215, 330, mostRecentResult, {color:'black'});
  let okButton = gameScene.add.text(gameWidth / 2, 375, "OK", {color:'black'});
  textInteractive(okButton);
  toDelete[toDelete.length] = resultText;
  toDelete[toDelete.length] = okButton;
  okButton.on('pointerdown', function() {
    GAMESTATE = 1;
    deleteItems(toDelete);
  });
}

// TO DELETE AN ARRAY OF ITEMS
function deleteItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].destroy();
  }
}

// TO SET CHOICES TO HAVE INTERACTIVE BUTTONS
function textInteractive(textChoice) {
  textChoice.setInteractive();
  textChoice.on('pointerover', function() {
    textChoice.onClickTween = gameScene.tweens.add({
      targets: textChoice,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeIn',
    });
    textChoice.setColor('Red');
  });

  textChoice.on('pointerout', function() {
    textChoice.onClickTween = gameScene.tweens.add({
      targets: textChoice,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeIn',
    });
    textChoice.setColor('black');
  });


}

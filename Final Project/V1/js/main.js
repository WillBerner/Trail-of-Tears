// GLOBAL VARIABLES
let left = true;
let right = false;
let lastDay = 0;
let mostRecentResult = "";
let day = 0;

// CREATING GAME SCENE
let gameScene = new Phaser.Scene('Game');

// GAME CONFIGURATION
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

// GAME DATA FOR TRACKING GAME STATE
gameScene.gameData = {
  startX: 465,
  startY: 430,
  endX: 100,
  endY: 400,
  playerPosX: 465,
  playerPosY: 400,
  timeProgressed: 0,
}

// CREATE GAME USING CONFIG
let game = new Phaser.Game(config);

// USED TO PAUSE FOR RANDOM EVENTS
let GAMESTATE = {
  MENU: 0,
  READY: 1,
  PAUSED: 2,
  GAMEOVER: 3
};

// PLAYER INFORMATION
let character = {
  name: "",
  medicine: 100,
  water: 100,
  rations: 100,
  tribe: "",
  gender: "",
  living: 800,
  dead: 0
}

// START GAME
gameScene.init = function () {
  console.log("Started Scene: Game");
};
gameScene.preload = function () {
  console.log("Loading Scene: Game");
  this.state = GAMESTATE.READY;
};

// SETUP SCREEN
gameScene.create = function () {

  // SETTING UP BACKGROUND
  this.background = this.add.sprite(0, 0, 'map');
  this.background.setOrigin(0, 0);
  this.background.depth = -10; // what is depth?
  this.background.displayWidth = config.width;
  this.background.displayHeight = config.height;

  // CREATING PLAYER SPRITES
  if (character.gender == "male") {
    chief = this.add.sprite(config.width - 75, 100, 'maleChar')
    player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'maleSprite')
    player.setScale(0.1);
    player.body.allowGravity = false;
  } else if (character.gender == "female") {
    chief = this.add.sprite(config.width - 75, 100, 'femaleChar')
    player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'femaleSprite')
    player.setScale(0.1);
    player.body.allowGravity = false;
  } else if (character.gender == 'non-Binary') {
    chief = this.add.sprite(config.width - 75, 100, 'nonBinaryChar')
    player = this.physics.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, 'nonBinarySprite')
    player.setScale(0.1);
    player.body.allowGravity = false;
    chief.displayWidth = 150;
    chief.displayHeight = 200;
  }
  chief.displayWidth = 150;
  chief.displayHeight = 200;


  // TRAIL VISUAL SETUP
  destination = this.add.sprite(this.gameData.endX, this.gameData.endY, 'enemy')
  destination.setScale(.03)
  start = this.add.sprite(this.gameData.startX, this.gameData.startY, 'enemy')
  start.setScale(.03)
  trail = new Phaser.Geom.Line(destination.x, destination.y, start.x, start.y);
  graphics = this.add.graphics({
    lineStyle: { width: 4, color: 0x89d3ff },
    fillStyle: { color: 0x89d3ff, alpha: 1.0 },
  });


  // SETTING UP STATS VISUALIZATION
  this.textContainer = gameScene.add.container(10, 0);
  this.dayText = this.add.text(16, 15, 'Day: 0', { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
  this.liveNumText = this.add.text(16, 30, 'Living: ' + character.living, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
  this.deadNumText = this.add.text(16, 45, 'Dead: ' + character.dead, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
  this.rationText = this.add.text(16, 60, 'Rations: ' + character.rations, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
  this.medicineText = this.add.text(16, 90, 'Medicine: ' + character.medicine, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });
  this.waterText = this.add.text(16, 75, 'Water: ' + character.water, { fontSize: '200px', fontStyle: 'Roboto', color: 'black' });

  this.textContainer.setScale(1.5);
  this.textContainer.add(this.dayText);
  this.textContainer.add(this.liveNumText);
  this.textContainer.add(this.deadNumText);
  this.textContainer.add(this.rationText);
  this.textContainer.add(this.medicineText);
  this.textContainer.add(this.waterText);
  graphics.strokeLineShape(trail);
  graphics.fillRect(0, 0, 150, 200);

  // CALCULATE DAY LENGTH BASED ON DISTANCE
  trailLength = this.gameData.startX - this.gameData.endX;
  dayLength = trailLength / 120;
  // TLM: mg stands for minigame and its a boolean to determine if the minigame has been played
  this.mg = true
};

// UPDATE PLAYER POSITION, STATS, DAY, ETC
gameScene.update = function (time, delta) {
  if ((GAMESTATE === 2)) {
    // GAME PAUSED
    this.physics.moveToObject(player, destination, 0);
  } else {
    // GAME RUNNING
    if (player.x != destination.x) {
      this.physics.moveToObject(player, destination, 8);

      // MAKING CHARACTER "WALK"
      if (left && !right) {
        player.angle += 2;
        if (player.angle >= 20) {
          left = false;
          right = true;
        }
      } else if (right && !left) {
        player.angle -= 2;
        if (player.angle <= -20) {
          left = true;
          right = false;
        }
      }
    }

    // MAKING PLAYER SPRITE MOVE
    if (this.gameData.playerPosX - player.x >= dayLength
      && character.water > 0
      && character.rations > 0) {
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

    // TLM: Testing minigame as a function
    if (day > 0 && this.mg) {
      miniGame();
      console.log("minigame exited")
    }

    gameScene.dayText.setText('Day: ' + day);

    // KILL OFF RANDOM PEOPLE EVERY SO OFTEN
    if (Phaser.Math.Between(1, 1000) < 30) {
      character.dead++;
      character.living--;
    } else if (character.rations < 1 && Phaser.Math.Between(1, 100) < 30) {
      character.living--;
      character.dead++;
    }

    // CREATE QUASI-RANDOM EVENTS
    if (Phaser.Math.Between(1, 3000) < 20 && day > 10) {
      randomEvent();
      GAMESTATE = 2;
    }

    // UPDATE PLAYER STATS VISUALIZATION
    updateStats();
  }
};

// NOT USED (YET)...
gameScene.gameOver = function () {
  this.state = GAMESTATE.GAMEOVER;
  this.time.addEvent({
    delay: 2000,
    callbackScope: this,
    callback: function () {
      this.scene.start('Home');
    }
  }, this);
};

// UPDATE VISUALS WITH NEW VALUES
function updateStats() {
  if (character.rations <= 0) {
    character.rations = 0;
  }
  gameScene.rationText.setText('Rations: ' + character.rations);
  gameScene.waterText.setText('Water: ' + character.water);
  gameScene.liveNumText.setText('Living: ' + character.living);
  gameScene.deadNumText.setText('Dead: ' + character.dead);
  gameScene.medicineText.setText('Medicine: ' + character.medicine);
}

// LOAD AND SHOW A RANDOM EVENT FROM EVENTS FILE
function randomEvent() {

  // GET RANDOM EVENT OBJECT
  let eventIndex = Phaser.Math.Between(0, events.length - 1);
  eventIndex = Math.floor(eventIndex);
  let currentEvent = events[eventIndex];
  currentEvent = events[eventIndex];

  // GET EVENT'S PROPERTIES
  let description = currentEvent.description;
  let question = currentEvent.question;
  let choices = currentEvent.choices;

  // SHOW EVENT AND CHOICES TO PLAYER
  let box = gameScene.add.sprite((gameWidth / 2), (gameHeight / 3) - 50, 'textBox');
  box.setScale(0.7);
  let descriptionText = gameScene.add.text(210, 150, description, { color: 'black' });
  let questionText = gameScene.add.text(210, 230, question, { color: 'black' });
  let choice1Text = gameScene.add.text(215, 265, choices.choice1, { color: 'black' })
  let choice2Text = gameScene.add.text(215, 285, choices.choice2, { color: 'black' })
  textInteractive(choice1Text);
  textInteractive(choice2Text);
  let toDestroy = [box, descriptionText, questionText, choice1Text, choice2Text];

  // DISPLAY TEXTUAL RESULT OF CHOICE AND CALCULATE RESULT
  choice1Text.on('pointerdown', function () {
    mostRecentResult = choices.result1;
    choices.calculate(choices.choice1);
    setUpChoices(choice1Text, toDestroy);
    updateStats();
  });
  choice2Text.on('pointerdown', function () {
    mostRecentResult = choices.result2;
    choices.calculate(choices.choice2);
    setUpChoices(choice2Text, toDestroy);
    updateStats();
  });

}

// DISPLAYS CHOICES OF AN EVENT AND RESUME WHEN DONE
function setUpChoices(choice, toDelete) {
  let resultText = gameScene.add.text(215, 330, mostRecentResult, { color: 'black' });
  let okButton = gameScene.add.text(gameWidth / 2, 375, "OK", { color: 'black' });
  textInteractive(okButton);
  toDelete[toDelete.length] = resultText;
  toDelete[toDelete.length] = okButton;
  okButton.on('pointerdown', function () {
    GAMESTATE = 1;
    deleteItems(toDelete);
  });
}

// TO DELETE AN ARRAY OF TEXT/SPRITE ITEMS
function deleteItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].destroy();
  }
}

// TO SET CHOICES TO HAVE INTERACTIVE BUTTONS
function textInteractive(textChoice) {
  textChoice.setInteractive();
  textChoice.on('pointerover', function () {
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

  textChoice.on('pointerout', function () {
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

function miniGame() {

  // TLM: pausing game
  GAMESTATE = 2;

  gameScene.mg = false

  let toDestroy = []

  let miniBackGround = gameScene.add.sprite(config.width, config.height, 'sandy');
  miniBackGround.setScale(0.7);
  miniBackGround.setOrigin(0, 0);
  toDestroy.push(miniBackGround)

  console.log("minigame creating")
  let fire = gameScene.physics.add.staticGroup();

  fire.create(400, 568, 'fire').setScale(2).refreshBody();

  //  Now let's create some ledges
  for (let i = 0; i < 5; i++) {
    fireX = Phaser.Math.FloatBetween(0, config.width);
    fireY = Phaser.Math.FloatBetween(0, config.height);
    fire.create(fireX, fireY, 'fire');
  }
  toDestroy.push(fire)

  //  Input Events
  let cursors = gameScene.input.keyboard.createCursorKeys();
  // The player and its settings
  let player = new Player(gameScene, 100, 450, cursors);
  player.setScale(.03);
  toDestroy.push(player)

  // TLM: adding enemies
  let enemies = [];
  for (let i = 0; i < 12; i++) {
    let enemy = gameScene.add.existing(new Ball(gameScene, 0, 0));
    let veloX = Phaser.Math.FloatBetween(50, 300);
    enemy.setVelocity(0, 0);
    enemy.setScale(.05);
    enemies.push(enemy)
    toDestroy.push(enemy)
  }
  //this.enemy = this.add.existing(new enemy(this, 0, 0));
  //  Some rations to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  let rations = [];
  for (let i = 0; i < 12; i++) {
    // first ration gets dropped on top of enemies, prompting the release of the first enemy
    let starX = 0
    let starY = 0
    if (i != 0) {
      starX = Phaser.Math.FloatBetween(0, config.width);
      starY = Phaser.Math.FloatBetween(0, config.height);
    }
    let ration = gameScene.physics.add.sprite(starX, starY, 'food');
    ration.setScale(.05)
    ration.body.allowGravity = false;
    rations.push(ration);
    toDestroy.push(ration)
  }

  //  The score
  let foodText = gameScene.add.text(16, 16, 'Food: -100', { fontSize: '32px', fill: '#000' });
  let waterText = gameScene.add.text(16, 40, 'Water: -100', { fontSize: '32px', fill: '#000' });
  let medicineText = gameScene.add.text(16, 64, 'Medicine: -100', { fontSize: '32px', fill: '#000' });
  toDestroy.push(foodText, waterText, medicineText)

  //  Collide the player and the rations with the fire
  gameScene.physics.add.collider(player, fire);
  gameScene.physics.add.collider(rations, fire);
  gameScene.physics.add.collider(enemies, fire);

  //  Checks to see if the player overlaps with any of the rations, if he does call the collectStar function
  gameScene.physics.add.overlap(player, rations, collectStar, null, gameScene);
  gameScene.physics.add.overlap(enemies, rations, collectStar, null, gameScene);
  // Items to destroy
  //let toDestroy = [miniBackground];
  console.log("minigame created")

  function collectStar(player, ration) {
    ration.disableBody(true, true);
    //  Add and update the score
    food += 10;
    foodText.setText('Food: ' + food);

    // TLM: releasing a enemy
    if (enemies.length > 0) {
      let i = enemies.length - 1
      enemy = enemies[i]
      let veloX = Phaser.Math.FloatBetween(50, 300);
      enemy.setVelocity(veloX, 200);
      gameScene.physics.add.collider(enemy, fire);
      gameScene.physics.add.collider(enemy, player);

      gameScene.physics.add.overlap(enemy, rations, collectStar, null, gameScene);
    }

    let hasActiveRations = false;
    rations.forEach(function (ration) {
      if (ration.active) {
       hasActiveRations = true;
      }
    });

    if (!hasActiveRations) {
      //  A new batch of rations to collect
      deleteItems(toDestroy)
      GAMESTATE = 1;
    }
  }

  function destroyStar(enemy, ration) {
    ration.disableBody(true, true);
    // check if all rations are collected
    let hasActiveRations = false;
    this.rations.forEach(function (ration) {
      if (ration.active) {
       hasActiveRations = true;
      }
    });

    if (!hasActiveRations) {
      deleteItems(toDestroy)
      GAMESTATE = 1;
    }
  }
};



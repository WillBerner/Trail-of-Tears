// create a new scene
let menuScene = new Phaser.Scene('Menu');

let gameWidth;
let gameHeight;
let name = "";
let playerName, nameText;
let updateSpeed = 0;

menuScene.preload = function() {

  console.log("Started Scene: Menu");

  let background = this.add.sprite(0,0,'background');
  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;

  // Setting up for user text input
  playerName = this.add.text((gameWidth / 2) - 150, 300, "");
  setupKeys();

}

////////////////////////////////////////////////

menuScene.create = function() {

  // Storing the width and height for easy access
  let width = this.sys.game.config.width;
  let height = this.sys.game.config.height;
  gameWidth = width;
  gameHeight = height;

  // SETTING UP BACKGROUND
  let background = this.add.sprite(gameWidth / 2, 300, 'menuBackground');
  background.setScale(1.2);

  // ASK PLAYER FOR THEIR TRIBE
  tribeQuestion();

  // AFTER tribeQuestion, genderQuestion WILL RUN

}

////////////////////////////////////////////////

menuScene.update = function (time, delta) {
  updateName();
};

// Asking for tribe
function tribeQuestion() {
  // CHOOSING TRIBE OUT OF 3 AND DESTROYING BUTTONS
  let tribeChoice = menuScene.add.sprite(gameWidth / 2, 220, 'tribeText');
  tribeChoice.setScale(1);

  let cherokee = menuScene.add.sprite(gameWidth / 2, 300, 'cherokeeText');
  interactive(cherokee);
  cherokee.on('pointerdown', function() {
    character.tribe = "Cherokee";
    tribeChoice.destroy();
    choctaw.destroy();
    cherokee.destroy();
    muskogee.destroy();
    genderQuestion();
  });

  let choctaw = menuScene.add.sprite(gameWidth / 2, 350, 'choctawText');
  interactive(choctaw);
  choctaw.on('pointerdown', function() {
    character.tribe = "Choctaw";
    tribeChoice.destroy();
    choctaw.destroy();
    cherokee.destroy();
    muskogee.destroy();
    genderQuestion();
  });

  let muskogee = menuScene.add.sprite(gameWidth / 2, 400, 'muskogeeText');
  interactive(muskogee);
  muskogee.on('pointerdown', function() {
    character.tribe = "Muskogee";
    tribeChoice.destroy();
    choctaw.destroy();
    cherokee.destroy();
    muskogee.destroy();
    genderQuestion();
  });


}

////////////////////////////////////////////////

// Asking for gender of player
function genderQuestion() {
  let genderText = menuScene.add.sprite(gameWidth / 2, 220, 'genderText');

  let male = menuScene.add.sprite(gameWidth / 2, 300, 'male');
  interactive(male);
  male.on('pointerdown', function() {
    character.gender = "male";
    genderText.destroy();
    male.destroy();
    female.destroy();
    nonBinary.destroy();
    nameQuestion();
  });

  let female = menuScene.add.sprite(gameWidth / 2, 350, 'female');
  interactive(female);
  female.on('pointerdown', function() {
    character.gender = "female";
    genderText.destroy();
    male.destroy();
    female.destroy();
    nonBinary.destroy();
    nameQuestion();
  });

  let nonBinary = menuScene.add.sprite(gameWidth / 2, 400, 'nonBinary');
  interactive(nonBinary);
  nonBinary.on('pointerdown', function() {
    character.gender = "non-Binary";
    genderText.destroy();
    male.destroy();
    female.destroy();
    nonBinary.destroy();
    nameQuestion();
  });

}

////////////////////////////////////////////////

// Asking for name of plater
function nameQuestion() {

playerName = menuScene.add.text(gameWidth / 2 - 50, 260, "");
playerName.setScale(1.8);
nameText = menuScene.add.sprite((gameWidth / 2) - 100, 275, 'name');
nameText.setScale(0.5);

let saveButton = menuScene.add.sprite(gameWidth / 2, 400, 'save');
interactive(saveButton);
saveButton.on('pointerdown', function() {
  character.name = name;
  menuScene.scene.start('Game');
 console.log("entered name");
})



}

////////////////////////////////////////////////
// Ugly functions to get user keyboard input
////////////////////////////////////////////////

function setupKeys() {
  aKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  bKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  cKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
  dKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  eKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  fKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  gKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
  hKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
  iKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
  jKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
  kKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  lKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  mKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  nKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  oKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
  pKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  qKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  rKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  sKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  tKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
  uKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
  vKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
  wKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  xKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  yKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
  zKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  deleteKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
  enterKey = menuScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

}

////////////////////////////////////////////////

function updateName() {
  if (updateSpeed > 6) {
    if (aKey.isDown) {
      name += "A";
    } else if (bKey.isDown) {
      name += "B";
    } else if (cKey.isDown) {
      name += "C";
    } else if (dKey.isDown) {
      name += "D";
    } else if (eKey.isDown) {
      name += "E";
    } else if (fKey.isDown) {
      name += "F";
    } else if (gKey.isDown) {
      name += "G";
    } else if (hKey.isDown) {
      name += "H";
    } else if (iKey.isDown) {
      name += "I";
    } else if (jKey.isDown) {
      name += "J";
    } else if (kKey.isDown) {
      name += "K";
    } else if (lKey.isDown) {
      name += "L";
    } else if (mKey.isDown) {
      name += "M";
    } else if (nKey.isDown) {
      name += "N";
    } else if (oKey.isDown) {
      name += "O";
    } else if (pKey.isDown) {
      name += "P";
    } else if (qKey.isDown) {
      name += "Q";
    } else if (rKey.isDown) {
      name += "R";
    } else if (sKey.isDown) {
      name += "S";
    } else if (tKey.isDown) {
      name += "T";
    } else if (uKey.isDown) {
      name += "U";
    } else if (vKey.isDown) {
      name += "V";
    } else if (wKey.isDown) {
      name += "W";
    } else if (xKey.isDown) {
      name += "X";
    } else if (yKey.isDown) {
      name += "Y";
    } else if (zKey.isDown) {
      name += "Z";
    } else if (deleteKey.isDown) {
      name = name.substring(0, name.length - 1)
    } else if (enterKey.isDown) {
      menuScene.scene.start('Game');
    }
    updateSpeed = 0;

    playerName.setText(name);
  }
  updateSpeed++;
}

/////////////////////////////////////////////////

// To make a sprite interactive
function interactive(button) {
  button.setInteractive();
  button.setScale(0.5);

  button.on('pointerover', function() {
    button.onClickTween = menuScene.tweens.add({
      targets: button,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 200,
      yoyo: true,
      ease: 'Quad.easeIn'
    });
  });

  button.on('pointerout', function() {
    button.onClickTween = menuScene.tweens.add({
      targets: button,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 200,
      yoyo: true,
      ease: 'Quad.easeIn'
    });
  });
}

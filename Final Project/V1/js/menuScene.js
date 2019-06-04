// create a new scene
let menuScene = new Phaser.Scene('Menu');

let gameWidth;
let gameHeight;

menuScene.preload = function() {

  console.log("Started Scene: Menu");

  let background = this.add.sprite(0,0,'background');
  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;
}

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

  // AFTER, genderQuestion WILL RUN

}

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

function genderQuestion() {
  let male = menuScene.add.sprite(gameWidth / 2, 300, 'male');
  interactive(male);

  let female = menuScene.add.sprite(gameWidth / 2, 350, 'female');
  interactive(female);

  let nonBinary = menuScene.add.sprite(gameWidth / 2, 400, 'nonBinary');
  interactive(nonBinary);

}

function interactive(button) {
  button.setInteractive();
  button.setScale(0.5);

  button.on('pointerover', function() {
    button.onClickTween = menuScene.tweens.add({
      targets: button,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeIn',
      // onStart: function(){
      //   button.setScale(0.8, 0.8);
      // }
    });
  });

  button.on('pointerout', function() {
    button.onClickTween = menuScene.tweens.add({
      targets: button,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeIn',
      // onStart: function(){
      //   button.setScale(0.5, 0.5);
      // }
    });
  });
}

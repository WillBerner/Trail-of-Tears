// create a new scene
let menuScene = new Phaser.Scene('Menu');

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
  let gameWidth = this.sys.game.config.width;
  let gameHeight = this.sys.game.config.height;

  // Setting up menu
  let background = this.add.sprite(gameWidth / 2, 300, 'menuBackground');
  background.setScale(1.2);
  let tribeChoice = this.add.sprite(gameWidth / 2, 220, 'tribeText');
  tribeChoice.setScale(1);

  let cherokee = this.add.sprite(gameWidth / 2, 300, 'cherokeeText');
  cherokee.setScale(0.5);
  interactive(cherokee);
  cherokee.on('pointerdown', function() {
    character.tribe = "Cherokee";
    console.log(character);
  });

  let choctaw = this.add.sprite(gameWidth / 2, 350, 'choctawText');
  choctaw.setScale(0.5);
  interactive(choctaw);
  choctaw.on('pointerdown', function() {
    character.tribe = "Choctaw";
  });


  let muskogee = this.add.sprite(gameWidth / 2, 400, 'muskogeeText');
  muskogee.setScale(0.5);
  interactive(muskogee);
  muskogee.on('pointerdown', function() {
    character.tribe = "Muskogee";
  });

}


function interactive(button) {
  button.setInteractive();

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

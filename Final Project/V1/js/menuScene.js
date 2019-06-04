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

  let background = this.add.sprite(gameWidth / 2, 300, 'menuBackground');



}

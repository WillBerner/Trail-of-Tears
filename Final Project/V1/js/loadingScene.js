// the loading scene file. Here we declare and set up the loading scene. In the loading scene
// all assets, images, sounds and other, should be loaded.

let loadingScene = new Phaser.Scene('Loading');

// load asset files for our game
loadingScene.preload = function() {

    // log we are now in "Loading Scene"
    console.log("Started Scene: Loading");

    // store width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    // add logo on loading screen, could be any image of the game or removed if you want
    // we are adding things to the scene in preload, usually that has to happen in create
    // but because the scene will transition immediately to "home" when done loading, we only get to create
    // at the very end of its live time.
    this.add.sprite(gameWidth/2, gameHeight/2, 'logo');

    // set up loading bar using Phaser3 graphics (easy way to draw simple shapes)
    let loadingBarWidth = 150;
    let loadingBarHeight = 30;

    let loadingBarBackground = this.add.graphics();
    loadingBarBackground.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
    loadingBarBackground.fillStyle("#000000", 0.2);
    loadingBarBackground.fillRect(0, 0, loadingBarWidth, loadingBarHeight);

    let loadingBar = this.add.graphics();
    loadingBar.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
    loadingBar.fillStyle("#222222", 1);
    loadingBar.fillRect(0, 0, 0, loadingBarHeight);

    // to update the loading bar, we will add an eventlistener to the 'progress' event of the load manager from
    // our loading scene. This is fired every time an asset is loaded and has a value of 0-1 (% of assets loaded)
    this.load.on('progress', function(value){
        // clear progress bar
        loadingBar.clear();
        loadingBar.fillStyle("#222222", 1);
        // draw new progress bar, scaled according to value (% of assets loaded)
        loadingBar.fillRect(0, 0, value * loadingBarWidth, loadingBarHeight);
    }, this);

    // LOAD ALL ASSETS HERE
    // currently that's of course only the background
    for(let i = 0; i < 10000; i++) {
      this.load.image('background', 'assets/images/western-background.jpg');
    }
    this.load.image('background', 'assets/images/western-background.jpg');
    this.load.image('title', 'assets/images/titleButton.png');
    this.load.image('start', 'assets/images/startButton.png');
    this.load.image('indian', 'assets/images/indian.jpeg');
    this.load.image('menuBackground', "assets/images/menuBackground.jpg");
    this.load.image('tribeText', 'assets/images/tribeText.png');
    this.load.image('cherokeeText', 'assets/images/cherokeeText.png');
    this.load.image('choctawText', 'assets/images/choctawText.png');
    this.load.image('muskogeeText', 'assets/images/muskogeeText.png');

    this.load.image('male', 'assets/images/male.png');
    this.load.image('female', 'assets/images/female.png');
    this.load.image('genderText', 'assets/images/genderText.png');
    this.load.image('nonBinary', 'assets/images/nonBinary.png');
    this.load.image('name', 'assets/images/name.png');

};

loadingScene.create = function() {
    this.scene.start('Home');
};

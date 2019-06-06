let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {

    console.log("Started Scene: Loading");

    // store width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

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
    this.load.on('progress', function(value){
        loadingBar.clear();
        loadingBar.fillStyle("#222222", 1);
        loadingBar.fillRect(0, 0, value * loadingBarWidth, loadingBarHeight);
    }, this);


////////////////////////////////////////////////////////////////
/////// LOAD ALL ASSETS HERE ///////////////////////////////////
////////////////////////////////////////////////////////////////

    // LOADING TEXT IMAGES
    this.load.image('title', 'assets/images/text/titleButton.png');
    this.load.image('start', 'assets/images/text/startButton.png');
    this.load.image('tribeText', 'assets/images/text/tribeText.png');
    this.load.image('cherokeeText', 'assets/images/text/cherokeeText.png');
    this.load.image('choctawText', 'assets/images/text/choctawText.png');
    this.load.image('muskogeeText', 'assets/images/text/muskogeeText.png');
    this.load.image('male', 'assets/images/text/male.png');
    this.load.image('female', 'assets/images/text/female.png');
    this.load.image('nonBinary', 'assets/images/text/nonBinary.png');
    this.load.image('genderText', 'assets/images/text/genderText.png');
    this.load.image('name', 'assets/images/text/name.png');
    this.load.image('save', 'assets/images/text/save.png');


    // LOADING OTHER IMAGES
    this.load.image('background', 'assets/images/western-background.jpg');
    this.load.image('menuBackground', "assets/images/menuBackground.jpg");
    this.load.image('map', 'assets/images/1830 america .jpg');
    this.load.image('avatar', 'assets/images/rubber_duck.png');
    this.load.image('ball', 'assets/images/red-ball-md.png');
    this.load.image('tearsMap', 'assets/images/tearsMap.jpg');
    this.load.image('maleChar', "assets/images/indian.jpg")
    this.load.image('maleSprite', "assets/images/maleIndian.png");
    this.load.image('femaleChar', 'assets/images/female NA.jpg');
    this.load.image('femaleSprite', 'assets/images/femaleIndian.png');
    this.load.image('nonBinaryChar', 'assets/images/nonBinaryChar.png');
    this.load.image('nonBinarySprite', 'assets/images/nonBinarySprite.png');

};

loadingScene.create = function() {
    this.scene.start('Home');
};

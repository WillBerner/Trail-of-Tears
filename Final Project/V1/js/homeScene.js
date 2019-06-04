let homeScene = new Phaser.Scene('Home');

// Home does not have a preload
homeScene.create = function() {

    console.log("Started Scene: Home");

    // Storing the width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    let background = this.add.sprite(0,0,'background');
    background.setOrigin(0,0);
    background.depth = -10;
    background.width = config.width;
    background.height = config.height;

    // Creating title and start button
    let logo = this.add.sprite(400, 100, 'title');
    let startButton = this.add.sprite(400, 500, 'start');

    startButton.setOrigin(0.5, 0.5);
    startButton.depth = 10;
    startButton.setInteractive();
    startButton.on('pointerdown', function(){
        this.scene.start('Menu');
    }, this);
    makeInteractive(startButton);
};

// this is called up to 60 times per second
homeScene.update = function (time, delta) {

};

function makeInteractive(item){
    item.setInteractive();
    item.on('pointerdown', function(pointer){
        item.onClickTween = homeScene.tweens.add({
            targets: item,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 200,
            yoyo: true,
            ease: 'Quad.easeIn',
            onStart: function(){
                item.setScale(1.2, 1.2);
            }
        });
    });
    item.on('pointerover', function(pointer){
        item.hoverTweenIn = homeScene.tweens.add({
            targets: item,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 1,
            duration: 200,
        });
    });
    item.on('pointerout', function(pointer){
        item.hoverTweenOut = homeScene.tweens.add({
            targets: item,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 200,
            onUpdate: function() {
            }
        });
    });
}

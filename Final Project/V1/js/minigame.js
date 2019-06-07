let gameScene = new Phaser.Scene("Game");

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: gameScene
};

let score = 0;
let gameOver = false;

let game = new Phaser.Game(config);

gameScene.preload = function ()
{
    this.load.image('background', 'assets/sandy.png');
    this.load.image('ground', 'assets/flame.png');
    this.load.image('star', 'assets/SAKURA MOCHI WITH TOOTHPICK.png');
    //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 41, frameHeight: 21 });
    this.load.image('dude', 'assets/miniMale.jpg');
    this.load.image('ball', 'assets/raider.png');
};

gameScene.create = function ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    //  Input Events
    let cursors = this.input.keyboard.createCursorKeys();
    // The player and its settings
    this.player = new Player(this,100, 450, cursors);
    this.player.setScale(.03);

    // TLM: adding empty arrays to later add released stars and balls
    this.releasedBalls = []
    this.releasedStars = []
    // TLM: adding balls
    this.balls = [];
    for (let i = 0; i < 12; i++) {
        let ball = this.add.existing(new Ball(this, 0, 0));
        let veloX = Phaser.Math.FloatBetween(50, 300);
        ball.setVelocity(0, 0);
        ball.setScale(.05);
        this.balls.push(ball)
    }
    //this.ball = this.add.existing(new Ball(this, 0, 0));
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = [];
    for(let i = 0; i < 12; i++){
        let starX = 0
        let starY = 0
        if (i = !0) {
            starX = Phaser.Math.FloatBetween(0, config.width);
            starY = Phaser.Math.FloatBetween(0, config.height);
        }
        let star = this.physics.add.sprite(starX, starY, 'star');
        let bounciness = Phaser.Math.FloatBetween(0.4, 0.8);
        star.setBounceY(bounciness);
        star.body.allowGravity = false;
        this.stars.push(star);
        
    }

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.balls, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    this.physics.add.overlap(this.balls, this.stars, collectStar, null, this);

};

gameScene.update = function ()
{
    if (gameOver)
    {
        return;
    }
    this.player.update();
};

function collectStar (player, star)
{
    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    this.scoreText.setText('Score: ' + score);

    // TLM: releasing a ball
    if (this.balls.length > 0) {
        let i = this.balls.length - 1
        ball = this.balls[i]
        let veloX = Phaser.Math.FloatBetween(50, 300);
        ball.setVelocity(veloX, 200);
        this.physics.add.collider(ball, this.platforms);
        this.physics.add.collider(ball, this.player);

        this.physics.add.overlap(ball, this.stars, collectStar, null, this);
        this.physics.add.overlap(ball, this.releasedStars, collectStar, null, this);

        this.releasedBalls.push(star)
    }
    // TLM: releasing a star
    // if (this.stars.length > 0) {
    //     let i = this.stars.length - 1
    //     star = this.stars[i]

    //     star.x = Phaser.Math.FloatBetween(50, 300);
    //     star.y = Phaser.Math.FloatBetween(50, 300);
    //     star.body.allowGravity = false;

    //     this.physics.add.overlap(this.player, star, collectStar, null, this);
    //     this.physics.add.overlap(this.balls, star, collectStar, null, this);
    //     this.physics.add.overlap(this.releasedStars, star, collectStar, null, this);

    //     this.releasedStars.push(star)
    // }

    // check if all stars are collected
    let hasActiveStars = false;
    this.stars.forEach(function(star){
       if(star.active){
           hasActiveStars = true;
       }
    });

    if (!hasActiveStars)
    {
        //  A new batch of stars to collect
        this.stars.forEach(function(star){
            star.enableBody(true, star.x, 0, true, true);
        });


    }
}

function destroyStar(enemy, star) {
    star.disableBody(true, true);
    // check if all stars are collected
    let hasActiveStars = false;
    this.stars.forEach(function (star) {
        if (star.active) {
            hasActiveStars = true;
        }
    });

    if (!hasActiveStars) {
        //  A new batch of stars to collect
        this.stars.forEach(function (star) {
            star.enableBody(true, star.x, 0, true, true);
        });
        addEnemy();

    }
}

// function releaseBall() {
//     if (this.balls.length > 0) {
//         let i = this.balls.length - 1
//         ball = this.balls[i]
//         let veloX = Phaser.Math.FloatBetween(50, 300);
//         ball.setVelocity(veloX, 200);
//         this.physics.add.collider(ball, this.platforms);
//         this.physics.add.collider(ball, this.player);

//         this.physics.add.overlap(ball, this.stars, collectStar, null, this);

//     }
// }
class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'soldier');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        this.setVelocity(200,-200);
        this.setBounce(1,1);
        this.body.setCircle(this.width/2);
    }

    update(time, delta){
        if(this.body.velocity.y < 0){
            this.setVelocityY(-300);
        }
        else {
            this.setVelocityY(300);
        }
    }
}
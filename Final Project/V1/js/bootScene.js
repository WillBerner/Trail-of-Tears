// file for the boot scene, here we only start up the whole phaser3 application and
// load the loading screen.
let bootScene = new Phaser.Scene('Boot');

// only load the logo to show when loading the loading scene
bootScene.preload = function() {
    // log we are now in "Boot Scene"
    console.log("Started Scene: Boot");

    this.load.image('logo', 'assets/images/loading.png');
};

// change to loading screen directly in create, after preload is done
bootScene.create = function() {
    this.scene.start('Loading');
};

function State() {
}

State.prototype = {
  preload: function () {
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);
  },
  create: function () {
    game.add.sprite(X*0.4, Y*0.4, 'dog');
    game.add.sprite(X*0.6, Y*0.6, 'dog');

    game.world.setBounds(0, 0, 1920, 1200);//Mandatory for camera
    var tween = game.add.tween(game.camera)
      .to({x: X*0.1,y: Y*0.1}, 2000)
      .easing(Phaser.Easing.Bounce.Out)      
      .loop()
      .start();

    var tween2 = game.add.tween(game.camera.scale)
      .to({x: 1.5,y: 1.5}, 2000)
      .easing(Phaser.Easing.Bounce.Out)
      .loop()
      .start();

    StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
    //begin update
    
  },
  shutdown: function(){}
};

module.exports = State;
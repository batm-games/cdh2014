function State() {
}

State.prototype = {
  preload: function () {
    game.load.spritesheet('dog', './images/sprites/baddie.png', 32, 32);
    game.load.atlas('atlas1', './images/spritesheets/atlas1.png', './images/spritesheets/atlas1.json');
  },
  create: function () {
    button = game.add.sprite(halfX,halfY,'atlas1','button_a');
    button.scale.set(0.5,0.5);
    button.animations.add('anim',['button_a','button_b'],1,true);
    button.animations.play('anim');

    var dog = game.add.sprite(0,0, 'dog');
    dog.tint = 0xff0000;
    dog.scale.x = -1;
    var tween = game.add.tween(dog)
      .to({x: X*0.5,y: Y*0.5,alpha: 0.3}, 2000)
      .easing(Phaser.Easing.Bounce.Out)      
      .start();
    tween.onComplete.add(function(ctx){console.log('Finished Tween' + dog.position);},dog)

    this.dog = dog;
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
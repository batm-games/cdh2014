function State() {
}

State.prototype = {
  preload: function () {
    game.load.spritesheet('pedro', './images/sprites/pedro_sin_tea.png',64,192);
    game.load.spritesheet('torch', './images/sprites/torch_8bit.png');
  },
  create: function () {
    var player = game.add.sprite(X*2.5,Y*2.5, 'pedro');
    player.anchor.set(0.5,0.5);
    player.scale.set(5,5);

    game.world.setBounds(0,0, 5*X, 5*Y);

    player.animations.add('normal',[0],1,true);
    player.animations.add('teaUp' ,[1],1,true);
    player.animations.play('teaUp');

    var torch = game.add.sprite(X*2.40,Y*1,'torch');
    torch.scale.set(5,5);
    torch.anchor.set(0.5,0.5);
    var tween = game.add.tween(torch).to(
      {y:-Y*0.47 + Y*2.5}
      ,5000
    )
    .easing(Phaser.Easing.Exponential.Out)      
    .start();

    tween.onComplete.add(
      function(){
        var text = "Click to start\ngame!";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(X*2.0,Y*2.0, text, style);
      }
    );

    game.camera.follow(torch);
    // StateUtils.createDemoHomeButton();
  },
  update: function (event) {
    game.stats.update();
    var delta = event.time.elapsed / 1000.0;
    //begin update
    
  },
  shutdown: function(){}
};

module.exports = State;
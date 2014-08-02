var Fire = require('../characters/Fire');

function State() {
}

State.prototype = {
  preload: function () {
    game.load.spritesheet('pedro', './images/sprites/pedro_sin_tea.png',64,192);
    game.load.spritesheet('torch', './images/sprites/torch_8bit.png');
    game.load.spritesheet('bg', './images/sprites/bg_illimani.png');
  },
  create: function () {
    var bg = game.add.sprite(X*2.3,Y*2.0,'bg');
    bg.scale.set(1.5,1.5);
    bg.anchor.set(0.5,0.5);


    game.TOPVIEW_LEVEL = 1;

    var player = game.add.sprite(X*2.5,Y*2.5, 'pedro');
    player.anchor.set(0.5,0.5);
    player.scale.set(5,5);

    game.world.setBounds(0,0, 5*X, 5*Y);

    player.animations.add('normal',[0],1,true);
    player.animations.add('teaUp' ,[1],1,true);
    player.animations.play('teaUp');

    var torch = game.add.sprite(X*2.40,Y*1.5,'torch');
    torch.scale.set(5,5);
    torch.anchor.set(0.5,0.5);
    var tween = game.add.tween(torch).to(
      {y:-Y*0.47 + Y*2.5}
      ,12000
      // ,1000
    )
    .easing(Phaser.Easing.Exponential.Out)
    .start();

    tween.onComplete.add(
      function() {
        var text = "Click to start\ngame!";
        var style = { font: "65px Arial", fill: "#00ff00", align: "center" };

        var fire = new Fire(torch);
        fire.setFrames([{ x: 0, y: 0 }]);
        fire.setIntensity(100);
        var k = 50;
        fire.emitter.gravity = -1500;

        fire.emitter.setScale(3, 0, 3, 0, 3000);
//        fire.emitter.gravity = -1000;
        fire.emitter.minParticleSpeed.x = -k;
        fire.emitter.maxParticleSpeed.x = k;
        fire.emitter.x = torch.x;
        fire.emitter.y = torch.y;
        fire.emitter.start(false, 2000, 50);

        var emitter = game.add.emitter(0, 0, 400);
        emitter.blendMode = PIXI.blendModes.ADD;
        emitter.minParticleAlpha = 0.3;
        emitter.maxParticleAlpha = 1;
        emitter.minParticleSpeed.y = 0;
        emitter.maxParticleSpeed.y = -5;
        emitter.minParticleSpeed.x = -10;
        emitter.maxParticleSpeed.x = 10;
        emitter.makeParticles(['laser']);

        emitter.x = torch.x;
        emitter.y = torch.y;
        emitter.gravity = 10;
        emitter.setScale(50, 70, 1, 1, 3000);
        emitter.setAlpha(1, 0, 2000);
        emitter.start(false, 2000, 200);

//        var lightMask = new LightMask(this.fire);
//        var tween = game.add.tween(torch).to(
//            {y:-Y*0.47 + Y*2.5}
//            ,15000
//        );

        var t = game.add.text(X*2.0,Y*2.0, text, style);
        t.inputEnabled = true;
        t.events.onInputDown.add(function(){game.state.start('Level1')},this);//(func,context)
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
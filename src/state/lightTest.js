/* global game: false */

var emitter, pedro;
var Fire = require('../characters/Fire');
function State() {
}

State.prototype = {
    preload: function () {
        game.load.image('fire', './images/fireParticle.png', 32, 32);
        game.load.image('laser', './images/laser05.png', 32, 32);
        game.load.image('pedro', './images/pedrito.png', 64, 128);
    },
    create: function () {
        var game = this.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        pedro = game.add.sprite(halfX, halfY, 'pedro', 0);

        // emitter example
        emitter = game.add.emitter(halfX, halfY, 400);
        emitter.blendMode = PIXI.blendModes.ADD;
        emitter.minParticleAlpha = 0;
        emitter.maxParticleAlpha = 0.0001;
        emitter.minParticleSpeed.y = 0;
        emitter.maxParticleSpeed.y = -5;
        emitter.minParticleSpeed.x = -10;
        emitter.maxParticleSpeed.x = 10;
        emitter.makeParticles(['fire']);

        emitter.gravity = -100;
        emitter.setAlpha(1, 0, 5000);
        emitter.setScale(1, 0, 1, 0, 3000);

        emitter.start(false, 2000, 10);

        // blender.add example
//        for (var i  = 0; i < 40; i += 1) {
//            light = game.add.sprite(X * 0.5, Y * 0.5, 'light');
//            light.blendMode = PIXI.blendModes.ADD;
//            light.anchor.x = light.anchor.y = 0.5;
//
//            light.scale.x = 20;
//            light.scale.y = 0.8 + Math.random() * 0.3;
//
//            light.position.x = Math.random() * X;
//            light.position.y = Math.random() * Y;
//            lights.push(light);
//        }
//
        game.world.setBounds(0, 0, 1920, 1200);

        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ]);
    },
    update: function (event) {
        game.stats.update();
        var delta = event.time.elapsed / 1000.0 * 55;

        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            pedro.x -= delta;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            pedro.x += delta;
        }
        emitter.x = pedro.x + 7;
        emitter.y = pedro.y + 33;
    },

    // This function should return true when the player activates the "go left" control
    // In this case, either holding the right arrow or tapping or clicking on the left
    // side of the screen.
    leftInputIsActive: function() {
        var game = this.game;
        return game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    },

    // This function should return true when the player activates the "go right" control
    // In this case, either holding the right arrow or tapping or clicking on the right
    // side of the screen.
    rightInputIsActive: function() {
        var game = this.game;
        return game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    }
};

module.exports = State;
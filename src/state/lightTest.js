/* global game: false */

var fire, pedro;
var Fire = require('../characters/Fire');
function State() {
}

State.prototype = {
    preload: function () {
    },
    create: function () {
        var game = this.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        pedro = game.add.sprite(halfX, halfY, 'pedro', 0);

        fire = new Fire();
        fire.setFrames([{ x: 7, y: 40 }]);

        game.world.setBounds(0, 0, 1920, 1200);

        // TODO: uncomment
//        game.input.keyboard.addKeyCapture([
//            Phaser.Keyboard.LEFT,
//            Phaser.Keyboard.RIGHT,
//            Phaser.Keyboard.UP,
//            Phaser.Keyboard.DOWN
//        ]);
    },
    update: function (event) {
        var game = this.game;
        game.stats.update();
        var delta = event.time.elapsed / 1000.0,
            moveDiff = delta * 55;

        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            pedro.x -= moveDiff;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            pedro.x += moveDiff;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            fire.setIntensityDelta(2);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            fire.setIntensityDelta(-2);
        }

        fire.update(pedro, 0);
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
/**
 * Created by tlatif on 8/1/2014.
 */
var Player = function (game, config) {
    this.speed = config.speed || Player.DEFAULT_SPEED;
    this.jumpPower = config.jumpPower || Player.DEFAULT_JUMP_POWER;
    var sprite = config.sprite || Player.DEFAULT_SPRITE;
    var x = config.x || Player.DEFAULT_X;
    var y = config.y || Player.DEFAULT_Y;

    this.game = game;
    this.player = game.add.sprite(x, y, sprite);
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 500;
    this.player.collideWorldBounds = true;
    this.createControls(config.controls);
};
Player.prototype.createControls = function (controls) {
    this.controls = this.game.input.keyboard.createCursorKeys();
};
Player.prototype.movePlayer = function (dx, dy) {
    this.player.body.velocity.x = dx * this.speed;
    if (typeof dy === 'number') {
        this.player.body.velocity.y = dy * this.jumpPower;
    }
};
Player.prototype.stopMoving = function (onY) {
    this.player.body.velocity.x = 0;
    if (onY) {
        this.player.body.velocity.y = 0;
    }
};
Player.prototype.jump = function (doubleJump) {
    if (this.player.body.onFloor() || doubleJump) {
        this.movePlayer(0, -1);
    }
};
Player.prototype.controlPlayer = function () {
    if (this.controls.left.isDown) {
        this.movePlayer(-1, 0);
    } else if (this.controls.right.isDown) {
        this.movePlayer(1, 0);
    } else {
        this.stopMoving();
    }

    if (this.controls.up.isDown && this.player.body.onFloor()) {
        this.jump();
    }
};
Player.prototype.getPhaserInstance = function () {
    return this.player;
};
Player.DEFAULT_SPEED = 100;
Player.DEFAULT_JUMP_POWER = 300;
Player.DEFAULT_SPRITE = 'pedro';
Player.DEFAULT_X = 50;
Player.DEFAULT_Y = 50;


module.exports = Player;
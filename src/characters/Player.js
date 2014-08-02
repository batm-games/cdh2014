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
    this.sprite = game.add.sprite(x, y, sprite);
    this.sprite.animations.add('run', [1, 2, 3, 4, 5, 6, 7, 8]);

    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.3, 0.3);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 500;
    this.sprite.collideWorldBounds = true;
    this.createControls(config.controls);
};
Player.prototype.createControls = function (controls) {
    this.controls = this.game.input.keyboard.createCursorKeys();
};
Player.prototype.movePlayer = function (dx, dy) {
    this.sprite.body.velocity.x = dx * this.speed;

    if (typeof dy === 'number') {
        this.sprite.body.velocity.y = dy * this.jumpPower;
    }
};
Player.prototype.stopMoving = function (onY) {
    this.sprite.body.velocity.x = 0;
    if (onY) {
        this.sprite.body.velocity.y = 0;
    }
};
Player.prototype.jump = function (doubleJump) {
    if (this.sprite.body.onFloor() || doubleJump) {
        this.movePlayer(0, -1);
    }
};
Player.prototype.controlPlayer = function () {
    if (!this.sprite.inWorld) {
        this.killPlayer();
        return;
    }

    if (this.controls.left.isDown) {
        this.sprite.animations.play('run', 7, true);
        this.sprite.scale.x = -1;
        this.movePlayer(-1);
    } else if (this.controls.right.isDown) {
        this.sprite.animations.play('run', 7, true);
        this.sprite.scale.x = 1;
        this.movePlayer(1);
    } else {
        this.sprite.animations.stop();
        this.sprite.frame = 0;
        this.stopMoving();
    }

    if (this.controls.up.isDown && this.sprite.body.onFloor()) {
        this.jump();
    }
};
Player.prototype.getSprite = function () {
    return this.sprite;
};
Player.prototype.killPlayer = function () {
    this.sprite.kill();
};
Player.prototype.recruit = function (player, citizen) {
    this.people += 1
    if (!citizen.recruited) {
        citizen.recruited = true;
        console.log('recruited');
    }
};
Player.DEFAULT_SPEED = 500;
Player.DEFAULT_JUMP_POWER = 350;
Player.DEFAULT_SPRITE = 'pedross';
Player.DEFAULT_X = 50;
Player.DEFAULT_Y = 500;


module.exports = Player;
/**
 * Created by tlatif on 8/1/2014.
 */
var Fire = require('./Fire');
var LightMask = require('./LightMask');

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
    this.sprite.body.gravity.y = 1000;
    this.sprite.collideWorldBounds = true;

    // player controls
    this.createControls(config.controls);

    // fire
    this.fire = new Fire(this);
    this.fire.setFrames([{ x: 0, y: -30 }]);
    this.lightMask = new LightMask(this.fire);
    this.dead = false;
    this.typeOfDead = 'fallen';
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
Player.prototype.update = function (delta) {
    if (!this.sprite.inWorld && this.sprite.x > 0 && this.sprite.y > 0) {
        this.kill();
        this.dead = true;
    }
    if (this.fire.intensity <= 1) {
        this.kill();
        this.dead = true;
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

    // fire + light mask update
    // params: frame
    this.fire.update(delta, 0);
    this.lightMask.update(delta);
};

Player.prototype.getSprite = function () {
    return this.sprite;
};
Player.prototype.getX = function() {
    return this.sprite.x;
};
Player.prototype.kill = function () {
    this.sprite.kill();
};
Player.prototype.recruit = function (player, citizen) {
    this.people += 1;
    if (!citizen.recruited) {
        citizen.recruited = true;
        this.fire.setIntensityDelta(Statics.zebraBonus);
        console.log(this.fire.intensity);
    }
};
Player.DEFAULT_SPEED = 500;
Player.DEFAULT_JUMP_POWER = 600;
Player.DEFAULT_SPRITE = 'pedross';
Player.DEFAULT_X = 50;
Player.DEFAULT_Y = 500;


module.exports = Player;
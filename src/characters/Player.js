/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var Fire = require('./Fire');
var LightMask = require('./LightMask');

var LIFE_SCALE = 5;
var cpStats;

var Player = function (game, config) {
//    console.log(cpStats);
    this.speed = config.speed || Player.DEFAULT_SPEED;
    this.jumpPower = config.jumpPower || Player.DEFAULT_JUMP_POWER;
    var sprite = config.sprite || Player.DEFAULT_SPRITE;
    var x = config.x || Player.DEFAULT_X;
    var y = config.y || Player.DEFAULT_Y;

    this.game = game;
    this.sprite = game.add.sprite(x, y, sprite);
    this.sprite.animations.add('run', [1, 2, 3, 4, 5, 6, 7, 8]);

    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(this.sprite.width/410.0, this.sprite.height/410.0);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 1000;
    this.sprite.collideWorldBounds = true;

    // life
    var lifebar = this.lifebar =
        game.add.sprite(
            halfX,
            halfY,
            'lifeBar'
        );
    lifebar.anchor.set(0.5, -2.5);
    lifebar.scale.set(LIFE_SCALE, LIFE_SCALE);

    // player controls
    this.createControls(config.controls);

    // fire
    this.fire = new Fire(this);
    this.fire.setFrames([{ x: 0, y: -30 }]);
    this.lightMask = new LightMask(this.fire);

//    this.ck = game.add.sprite(
//        100, 500, 'laPaz'
//    );

    this.dead = false;
    this.typeOfDead = 'fallen';
    this.life = 100;
    this.people = 0;

    if (cpStats) {
        this.sprite.x = cpStats.sprite.x;
        this.sprite.y = cpStats.sprite.y;
        this.life = cpStats.life;
        this.people = cpStats.people;
//        _.merge(this, cpStats);
    }
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
        if (this.sprite.alive) {
            this.sprite.animations.stop();
            this.sprite.frame = 0;
            this.stopMoving();
        }
    }

    if (this.controls.up.isDown && this.sprite.body.onFloor()) {
        this.jump();
    }
    if (this.controls.down.isDown) {
        this.sprite.body.gravity.y = 4000;
    } else {
        this.sprite.body.gravity.y = 1000;
    }

//    // lifebar
    this.lifebar.x = this.sprite.x;
    this.lifebar.y = this.sprite.y;
    this.lifebar.scale.x = this.life / 100 * LIFE_SCALE;
    this.lifebar.alpha = this.life / 100;

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
//    this.sprite.kill();
};
Player.prototype.checkPoint = function () {
    // saving stats
    cpStats = {};
    _.merge(cpStats, {
        sprite: {
            x: this.sprite.x,
            y: this.sprite.y
        },
        life: this.life,
        people: this.people
    });
};
Player.prototype.recruit = function (player, citizen) {
    this.people += 1;
    if (!citizen.recruited) {
        citizen.recruited = true;
        this.fire.setIntensityDelta(Statics.zebraBonus * Player.TORCH_FACTOR);
        this.life += Player.LIFE_INCREASE_FACTOR * Statics.zebraBonus;
        if (this.life > 100) {
            this.life = 100;
        }
        console.log('citizen recruited!');
    }


    ExtraUtils.showCebron(this.game, this.game.camera.x + X*0.75, this.game.camera.y + Y);
};
Player.prototype.moveCameraDamage = function() {
    this.stopMoving();
    this.game.camera.follow(null);
    //this.game.world.setBounds(-10, 0, this.game.width + 20, this.game.height);

    var tween = this.game.add.tween(this.game.camera)
        .to({ x: this.game.camera.x - 10 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
        .start();

    tween.onComplete.add(function() {
        console.log("onComplete X");
        // this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.game.camera.follow(this.sprite);
    }, this);
};
Player.prototype.receiveEvilZebraDamage = function () {
    if (this.fire.intensity < 12) {
        this.life -= Player.LIFE_TAKE_FACTOR * Statics.evilZebraDamage;
    }
    if (this.life <= 0) {
        this.kill();
        this.dead = true;
    }
    this.moveCameraDamage();
};
Player.DEFAULT_SPEED = 500;
Player.DEFAULT_JUMP_POWER = 600;
Player.DEFAULT_SPRITE = 'pedross';
Player.DEFAULT_X = 50;
Player.DEFAULT_Y = 500;
Player.LIFE_INCREASE_FACTOR = 5;
Player.LIFE_TAKE_FACTOR = 7;
Player.TORCH_FACTOR = 1.3;


module.exports = Player;
module.exports.hasCheckpointStats = function () {
    return cpStats;
};
module.exports.restore = function (player) {
//    setTimeout(function () {
//        _.merge(player, cpStats || {});
//    }, 100);
};

/**
 * Created by tlatif on 8/2/2014.
 */
/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');
var Background = require('../../world/Background');

var Level2 = function () {
    AbstractLevel.call(this, 'world3', 20);
};
Level2.prototype = Object.create(AbstractLevel.prototype);
_.merge(Level2.prototype, {
    preload: function () {
        //game.load.audio('bgsound00','./sounds/bgsound00.ogg');
        game.load.audio('bgsound',['./sounds/bkgMusic.mp3']);
    },
    create: function () {
        var bgmusic = this.bgmusic = game.add.audio('bgsound',1,true);
        bgmusic.play('',0,1,true);

        this.bg = game.add.sprite(-100, -100, 'gradient');
        this.bg.width = X + 200;
        this.bg.height = Y + 200;

        game.time.deltaCap = 1 / 70;
        this.timeEnd = moment().add('seconds', 60);
        this.backgrounds = [];
        this.createBackground({
            w: X - 500,
            a: 0.1,
            v: 1,
            sprite: 'city2'
        });
        this.createBackground({
            w: X - 300,
            a: 0.3,
            v: 2
        });
        this.createBackground({
            a: 1,
            v: 5
        });
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            },
            {
                name: 'Tile Layer 2',
                collisionTiles: [2]
            },
            {
                name: 'Tile Layer 3',
                collisionTiles: [3]
            }
        ]);

        this.createCK();
        this.winButton = game.input.keyboard.addKey(Phaser.Keyboard.U);
        this.createPlayer({
            x: 50,
            y: 1200
        });
        this.createDoor(this.world.width - 100, this.world.height - 200);
        game.camera.follow(this.player.getSprite());
    },
    createCK: function () {
        var me = this, ck;
        // checkpoint
        this.cks = [];

        [{x: 2848, y: 1056}, {x: 6272, y: 1024}, {x: 8992, y: 1024}].forEach(function (v) {
            ck = game.add.sprite(
                100, 500, 'laPaz'
            );
            ck.width = 30;
            ck.height = 20;
            ck.x = v.x;
            ck.y = v.y;
            game.physics.arcade.enable(ck);
            me.cks.push(ck);
        });
    },
    createBackground: function(config) {
        var background = new Background(game, config || {});
        this.backgrounds.push(background);
    },
    update: function (event) {
        var me = this;

        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.door, this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.door, this.goToNextLevel, null, this);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[1], this.foundZebra, null, this);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[2], this.zebraDamagePlayer, null, this);
        if (this.winButton.isDown) {
            this.goToNextLevel();
        }
        this.cks.forEach(function (v) {
            game.physics.arcade.overlap(
                me.player.getSprite(),
                v,
                function () {
                    me.player.checkPoint();
                }
            );
        });
        game.stats.update();
        var delta = event.time.elapsed / 1000.0;
        this.player.update(delta);

        this.bg.x = game.camera.x - 100;
        this.bg.y = game.camera.y - 100;

        var now = moment();
        var left = this.timeEnd.diff(now);
//        game.debug.text(moment(left).format('mm:ss'), halfX, 50);

        this.backgrounds.forEach(function (v) {
            v.update(me.player);
        });

        if (this.player.dead) {
            this.bgmusic.stop();
            game.state.start('Level2');
        }

//        this.layers[0].alpha = this.player.fire.intensity / 10;
//        this.layers[1].alpha = this.player.fire.intensity / 10;
//        this.layers[2].alpha = this.player.fire.intensity / 10 / 2;
    },
    goToNextLevel: function () {
        game.state.start('hackTopView');
    }
});

module.exports = Level2;
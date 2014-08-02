/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');
var Background = require('../../world/Background');

var Level1 = function () {
    AbstractLevel.call(this, 'world2', 4);
};
Level1.prototype = Object.create(AbstractLevel.prototype);
_.merge(Level1.prototype, {
    preload: function () {},
    create: function () {
        game.time.deltaCap = 1 / 40;
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
        this.createPlayer();
        this.createLife();
        this.createDoor();
        game.camera.follow(this.player.getSprite());
    },
    createLife: function () {

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
        game.stats.update();
        var delta = event.time.elapsed / 1000.0;
        this.player.update(delta);

        var now = moment();
        var left = this.timeEnd.diff(now);
//        game.debug.text(moment(left).format('mm:ss'), halfX, 50);

        this.backgrounds.forEach(function (v) {
            v.update(me.player);
        });

        if (this.player.dead ||
                left < 100) {
            game.state.start('Level1');
        }

//        this.layers[0].alpha = this.player.fire.intensity / 10;
//        this.layers[1].alpha = this.player.fire.intensity / 10;
//        this.layers[2].alpha = this.player.fire.intensity / 10 / 2;
    },
    goToNextLevel: function () {
        if (this.player.people >= this.minimumZebras) {
            game.state.start('Level1');
        } else {
            this.door.body.velocity.x -= this.door.body.velocity.x * 2;
        }
    }
});

module.exports = Level1;
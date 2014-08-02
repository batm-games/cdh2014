/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');
var Background = require('../../world/Background');

Level1 = function () {
    AbstractLevel.call(this, 'world2');
};
Level1.prototype = Object.create(AbstractLevel.prototype);
_.merge(Level1.prototype, {
    preload: function () {},
    create: function () {
        game.time.deltaCap = 1 / 60;
        this.timeEnd = moment().add('seconds', 60);
        this.backgrounds = [];
//        this.createBackground({
//            w: X - 500,
//            a: 0.1,
//            v: -5
//        });
//        this.createBackground({
//            w: X - 300,
//            a: 0.3,
//            v: -2
//        });
        this.createBackground({
            a: 1,
            v: -2
        });
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            },
            {
                name: 'Tile Layer 2',
                collisionTiles: [2]
            }
        ]);
        this.createPlayer();
        this.door = game.add.sprite(this.world.width - 300, this.world.height - 60, 'door');
        game.physics.arcade.enable(this.door);
        game.camera.follow(this.player.getSprite());
    },
    createBackground: function(config) {
        var background = new Background(game, config || {});
        this.backgrounds.push(background);
    },
    update: function (event) {
        var me = this;

        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.collide(this.player.getSprite(), this.door, this.goToNextLevel);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[1], this.player.recruit, null, this.player);
        game.stats.update();
        var delta = event.time.elapsed / 1000.0;
        this.player.update(delta);

        var now = moment();
        var left = this.timeEnd.diff(now);
        game.debug.text(moment(left).format('mm:ss'), halfX, 50);

        if (this.player.dead ||
                left < 100) {
            game.state.start('Level1');
        }
        this.backgrounds.forEach(function (v) {
            v.update(me.player);
        });
    },
    goToNextLevel: function () {
        game.state.start('Level1');
    }
});

module.exports = Level1;
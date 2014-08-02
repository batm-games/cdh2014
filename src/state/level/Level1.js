/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');

Level1 = function () {
    AbstractLevel.call(this, 'world2');
};
Level1.prototype = Object.create(AbstractLevel.prototype);
_.merge(Level1.prototype, {
    preload: function () {},
    create: function () {
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            },
            {
                name: 'Tile Layer 2',
                collisionTiles: [1],
                collision: false
            }
        ]);
        this.createPlayer();
        game.camera.follow(this.player.getSprite());
    },
    update: function (event) {
        var delta = event.time.elapsed / 1000.0;
        game.stats.update();
        game.physics.arcade.collide(this.player.getSprite(), this.layers[0]);
        game.physics.arcade.overlap(this.player.getSprite(), this.layers[1], this.player.recruit, null, this.player);
        this.player.update(delta);
        if (!this.player.getSprite().inWorld) {
            game.state.start('Level1');
        }
    }
});

module.exports = Level1;
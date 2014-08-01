/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');
var Fire = require('../../characters/Fire');

var Level0 = function () {
    AbstractLevel.call(this, 'world1');
};

Level0.prototype = Object.create(AbstractLevel.prototype);

_.merge(Level0.prototype, {
    preload: function () {
    },
    createFire: function () {
        this.fire = new Fire(this.player);
        this.fire.setFrames([{ x: -25, y: -30 }]);
    },
    create: function () {
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            }
        ]);
        this.createPlayer();
        this.createFire();
        game.camera.follow(this.player.getSprite());
    },
    update: function () {
        game.stats.update();
        game.physics.arcade.collide(
            this.player.getSprite(),
            this.layers[0]
        );
        this.player.controlPlayer();
        this.fire.update(0);
    }

});
module.exports = Level0;
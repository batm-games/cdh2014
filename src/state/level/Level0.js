/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');

var Level0 = function () {
    AbstractLevel.call(this, 'world1');
};

Level0.prototype = Object.create(AbstractLevel.prototype);

_.merge(Level0.prototype, {
    preload: function () {
    },
    create: function () {
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            }
        ]);
        this.createPlayer();
    },
    update: function () {
        game.physics.arcade.collide(this.player.getPhaserInstance(), this.layers[0]);
        this.player.controlPlayer();
    }

});
module.exports = Level0;
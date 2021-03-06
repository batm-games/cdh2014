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
        this.createBackground();

        this.start = new Date();
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            }
        ]);

        this.createPlayer();
        this.createFire();
        this.createMask();
        game.camera.follow(this.player.getSprite());
        this.background.setInitialX(this.player.getX());
    },
    update: function (event) {
        var delta = event.time.elapsed / 1000.0;
        game.stats.update();
        game.physics.arcade.collide(
            this.player.getSprite(),
            this.layers[0]
        );
        this.player.update(delta);
        this.background.update(this.player.getX());
    }

});
module.exports = Level0;
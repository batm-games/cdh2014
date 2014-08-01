/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AbstractLevel = require('./AbstractLevel');

var Level0 = function () {
    AbstractLevel.call(this, 'world1');
};

Level0.prototype = Object.create(AbstractLevel);

_.merge(Level0.prototype, {
    preload: function () {
        AssetManager.loadWorldAssets(this.worldName);
    },
    create: function () {
        this.initWorld([
            {
                name: 'Tile Layer 1',
                collisionTiles: [1]
            }
        ]);
    }

});
module.exports = Level0;
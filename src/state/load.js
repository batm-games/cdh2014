/**
 * Created by mauricio on 8/1/14.
 */
var assetManager = require('../utils/AssetManager');
module.exports = {
    preload: function () {
        assetManager.loadImages();
        assetManager.loadWorldAssets('world1');
    },
    create: function () {
        game.state.start('Level0');
    }
};
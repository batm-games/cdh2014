/**
 * Created by mauricio on 8/1/14.
 */
var assetManager = require('../utils/AssetManager');
module.exports = {
    preload: function () {
        assetManager.loadImages();
        assetManager.loadWorldAssets('world1');
        assetManager.loadWorldAssets('world2');
    },
    create: function () {
        // game.state.start('Level1');
      game.state.start('hackTopView');
    }
};
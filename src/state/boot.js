/**
 * Created by mauricio on 8/1/14.
 */
var assetManager = require('../utils/AssetManager');
module.exports = {
    preload: function () {
        assetManager.loadImages();
    },
    create: function () {
        game.state.start('Light');
    }
};
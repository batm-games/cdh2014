/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AssetManager = {
    assetMap: {
        world1: {
            map: {
                id: 'map',
                url: './assets/tilemaps/world-map0.json'
            },
            tileset: {
                id: 'tileset',
                url: './assets/tilemaps/tileset.png'
            },
            width: 2000,
            height: 640
        },

        // created before the states are added
        images: {
            fire: './images/fire01.png',
            pedro: './images/pedrito.png',
            mask: './images/mask.png',
            maskInverse: './images/mask-inverse.png'
        }
    },
    loadWorldAssets: function (world) {
        var worldAssets = this.assetMap[world];
        game.load.image(worldAssets.tileset.id, worldAssets.tileset.url);
        game.load.tilemap(worldAssets.map.id, worldAssets.map.url, null, Phaser.Tilemap.TILED_JSON);
    },
    getConfig: function (name) {
        return this.assetMap[name];
    },
    loadImages: function () {
        _.forOwn(this.assetMap.images, function (v, k) {
             game.load.image(k, v);
        });
    }
};
window.AssetManager = AssetManager;
module.exports = AssetManager;
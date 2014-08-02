/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var AssetManager = {
    tileSetLoaded: false,
    assetMap: {
        world1: {
            map: {
                id: 'map',
                url: './assets/tilemaps/world-map0.json'
            },
            tileset: {
                id: 'tileset',
                url: './assets/tilemaps/tileset.png'
            }
        },
        world2: {
            map: {
                id: 'worldmap1',
                url: './assets/tilemaps/world-map1.json'
            },
            tileset: {
                id: 'tileset32',
                url: './assets/tilemaps/tileset32.png'
            }
        },

        // created before the states are added
        images: {
            fire: './images/fire01.png',
            pedro: './images/pedrito.png',
            door: './images/sprites/door.png',
            mask: './images/mask.png',
            maskInverse: './images/mask-inverse.png',
            maskInverseFlat: './images/mask-inverse_flat.png',
            background: './images/backgroundA.jpg',
            city: './images/city.png',
            city2: './images/city2.png',
            lifeBar: './images/sprites/bar.png'
        },

        spritesheets: {
            laPaz: './images/la_paz_flag.gif',
            gradient: './images/gradient.png'
        }
    },
    loadWorldAssets: function (world) {
        var worldAssets = this.assetMap[world];
//        if (!this.tileSetLoaded) {
        game.load.image(worldAssets.tileset.id, worldAssets.tileset.url);
        this.tileSetLoaded = true;
//        }
        game.load.tilemap(worldAssets.map.id, worldAssets.map.url, null, Phaser.Tilemap.TILED_JSON);
    },
    getConfig: function (name) {
        return this.assetMap[name];
    },
    loadImages: function () {
        _.forOwn(this.assetMap.images, function (v, k) {
             game.load.image(k, v);
        });
        _.forOwn(this.assetMap.spritesheets, function (v, k) {
            game.load.spritesheet(k, v);
        });
        game.load.atlasJSONHash('pedross', './images/sprites/pedross.png', './images/spritesheets/pedross.json');
    }
};
window.AssetManager = AssetManager;
module.exports = AssetManager;
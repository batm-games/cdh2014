/**
 * Created by tlatif on 8/1/2014.
 */
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
            }

        }
    },
    loadWorldAssets: function (world) {
        var worldAssets = this.assetMap[world];
        game.load.image(worldAssets.tileset.id, worldAssets.tileset.url);
        game.load.tilemap(worldAssets.map.id, worldAssets.map.url, null, Phaser.Tilemap.TILED_JSON);
    },
    getConfig: function (name) {
        return this.assetMap[name];
    }
};
window.AssetManager = AssetManager;
module.exports = AssetManager;
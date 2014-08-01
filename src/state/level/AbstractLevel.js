/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
require ('../../world/BaseWorld');

var AbstractLevel = function (worldName) {
    this.worldName = worldName;
    this.initWorld = function (layerConfig) {
        var worldIds = AssetManager.getConfig(this.worldName);
        var mapId = worldIds.map.id;
        var tilesetId = worldIds.tileset.id;
        var world = new BaseWorld(game, mapId, tilesetId, layerConfig);
        var instances = world.createWorld();
        this.map = instances.map;
        this.layers = instances.layers;
    };
};

module.exports = AbstractLevel;
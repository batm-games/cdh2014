/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var BaseWorld = require ('../../world/BaseWorld');
var Player = require('../../characters/Player');
var AbstractLevel = function (worldName) {
    this.worldName = worldName;
};

AbstractLevel.prototype = {
    initWorld: function (layerConfig) {
        var worldIds = AssetManager.getConfig(this.worldName);
        var mapId = worldIds.map.id;
        var tilesetId = worldIds.tileset.id;
        var world = new BaseWorld({
            map: mapId,
            tileset: tilesetId,
            layers: layerConfig,
            width: worldIds.width,
            height: worldIds.height
        });
        game.world.setBounds(0, 0, world.width, world.height);
        var instances = world.createWorld();
        this.map = instances.map;
        this.layers = instances.layers;
    },
    createPlayer: function (config) {
        var conf = config || {};
        this.player = new Player(game, conf);
    }
};

module.exports = AbstractLevel;
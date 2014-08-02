/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var BaseWorld = require ('../../world/BaseWorld');
var Player = require('../../characters/Player');
var Citizen = require('../../characters/Citizen');
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
            layers: layerConfig
        });
        var instances = world.createWorld();
        game.world.setBounds(0, 0, world.width, world.height);
        this.map = instances.map;
        this.layers = instances.layers;
    },
    createPlayer: function (config) {
        var conf = config || {};
        this.player = new Player(game, conf);
    },
    createCitizensGroup: function (citizensConfigs) {
        var citizen,
            i;
        this.citizens = game.add.group();
        for (i = 0; i < citizensConfigs.length; i += 1) {
            citizen = new Citizen(citizensConfigs[i]);
            this.citizens.add(citizen.sprite);
        }
        return this.citizens;
    }
};

module.exports = AbstractLevel;
/**
 * Created by tlatif on 8/1/2014.
 */
var _ = require('lodash');
var BaseWorld = require ('../../world/BaseWorld');
var Player = require('../../characters/Player');
var AbstractLevel = function (worldName, minimumZebras) {
    this.worldName = worldName;
    this.minimumZebras = minimumZebras;
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
        this.world = world;
    },
    createPlayer: function (config) {
        var conf = config || {};
        this.player = new Player(game, conf);
    },
    foundZebra: function (playerSprite, zebra) {
        if (!zebra.recruited) {
            this.player.recruit(playerSprite, zebra);
            zebra.recruited = true;
            this.map.removeTile(zebra.x, zebra.y, 1);
        }
    },
    zebraDamagePlayer: function (playerSprite, evilZebra) {
        if (!evilZebra.hit) {
            this.player.receiveEvilZebraDamage();
            evilZebra.hit = true;
            this.map.removeTile(evilZebra.x, evilZebra.y, 2);
        }
    },
    createDoor: function () {
        this.door = game.add.sprite(this.world.width - 300, this.world.height - 60, 'door');
        game.physics.arcade.enable(this.door);
        this.door.body.gravity.y = 200;
        this.door.body.immovable = true;
    }
};

module.exports = AbstractLevel;
/**
 * Created by tlatif on 8/1/2014.
 */
/**
 * Base constructor
 * @param game {object} the game object
 * @param map {string} the id of the map
 * @param tileset {string} an array of tilesets
 * @param layers {array} an array of layer configs
 * {
 *  name: nameOfTheLayer,
 *  collisionTiles: [1, 2, 6]// tiles that should be considered on collision
 *  }
 * @constructor
 */
var _ = require('lodash');
function BaseWorld (config) {
    _.merge(this, config);
}
BaseWorld.prototype.createWorld = function () {
    var map = game.add.tilemap(this.map);
    map.addTilesetImage(this.tileset);
    this.width = map.width * Statics.tileWidth;
    this.height = map.height * Statics.tileHeight;
    var layers = [],
        layer,
        collision = true,
        i;
    for(i = 0; i < this.layers.length; i += 1) {
        layer = map.createLayer(this.layers[i].name);
//        layer.alpha = 0.4;
//        layer.blendMode = PIXI.blendModes.ADD;
//        layer.tint = 0x222222;
        if (layer.collision === false) {
            collision = false;
        }
        map.setCollision(this.layers[i].collisionTiles, true, layer);
        layers.push(layer);
    }
    return {
        map: map,
        layers: layers
    };
};
module.exports = BaseWorld;

var LifeUtils = {
    giveLife : function(person,life){
        person.life = life;
        person.receiveDamage = function(damage){
            person.life -= damage;
            console.log(person.life);
        };
    }
};

module.exports = LifeUtils;
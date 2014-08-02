
var LifeUtils = {
    giveLife : function(person,life){
        person.life = life;
        person.receiveDamage = function(damage){
            person.life -= damage;
//            console.log(person.life);

            if(person.life <= 0){
                person.kill();
            }
        };
    }
};

module.exports = LifeUtils;
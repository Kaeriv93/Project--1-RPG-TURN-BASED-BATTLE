
// Hero and Villain Class
class Heroes{
    constructor(name,health,mana,strength,block,magicdmg,items){
        this.name = name;
        this.health = health
        this.mana = mana;
        this.strength= strength;
        this.block = block;
        this.magicdmg = magicdmg;
        this.items= items;
    }
     attack(target) {
        
        target.health -= this.strength
    }
     redPotion(target){
        if(target.health > 0){
            target.health += 100
            
        } 
     }
     bluePotion(target){
         target.mana += 50
     }
     magic(target){
         target.health -= this.magicdmg
     } 
}






const cloud = new Heroes('Cloud', 200, 100, 50, 25,60,'items');
const tifa = new Heroes('Tifa', 150, 200, 35, 20, 75, 'items')
console.log(cloud);
console.log(tifa)

cloud.attack(tifa)
cloud.attack(tifa)
cloud.attack(tifa)
tifa.magic(cloud)
console.log(tifa)
console.log(cloud)
cloud.bluePotion(tifa)
console.log(tifa)


let $musictest = $('button.musictest');

console.log($musictest)

$musictest.click(()=>{
    const battleMusic = new Audio("./music/battle.mp3");
    battleMusic.play();
})




// Hero and Villain Class
class Heroes{
    constructor(name,health,maxHealth,mana,maxMana,minStr,maxStr,minMag,maxMag,block){
        this.name = name;
        this.health = health;
        this.maxhealth = maxHealth
        this.mana = mana;
        this.maxMana = maxMana
        this.minStr = minStr;
        this.maxStr = maxStr;
        this.minMag = minMag;
        this.maxMag = maxMag;
        this.block = block;
    }
     attack(target) {
        let damage = Math.floor(Math.random()*(this.maxStr-this.minStr + 1)+this.minStr);
        target.health -= damage
        hit.play();
        console.log(`${target.name} receieved amount of ${damage} damage!`)
    }
     redPotion(target){
        if(target.health > 0 ){
            target.health += 100
            console.log(`${target.name} recovered 100 hp! `)
            
        } 
    }
    bluePotion(target){
        if (this.bluePotion > target.maxMana){
            return false
        }
        target.mana += 50
    }
    magic(target){
        target.health -= this.magicdmg
        this.mana -= 70
    } 
}

// Heroes and Villains

const sephiroth = new Heroes('Sephiroth',2000,2000,400,400,10,50,30,70,20);

const cloud = new Heroes('Cloud', 200, 200, 100, 100, 20,50,30,80,40);

const tifa = new Heroes('Tifa', 150, 150,200,200,12,35,60,120,30);

// END OF CLASS OBJECT


// Variables
let $cloud = $('.cloud');
let $cloudattack = $('.cloud-attack');
let $heal = $('.heal')
console.log($heal)
let currentTurn = 0;


// SoundEffects

const hit = new Audio('./music/soundfx/hit.wav')





//Cloud Attacks
const cloudAttack =() =>{
    cloud.attack(sephiroth);   
    $cloud.attr('src', './images/Cloud/cloud-attack.gif')
}
const cloudHeal = () =>{
    cloud.redPotion(sephiroth);
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
}

$cloudattack.click(()=>{
    cloudAttack();   
})




console.log(cloud);
console.log(tifa)
console.log(sephiroth)
























// MUSIC AND SOUND EFFECTS
let $musictest = $('button.musictest');

console.log($musictest)

$musictest.click(()=>{
    const battleMusic = new Audio("./music/battle.mp3");
    battleMusic.play();
    
})



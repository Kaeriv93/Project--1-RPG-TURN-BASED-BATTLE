
// Hero and Villain Class
class Heroes{
    constructor(name,health,maxHealth,mana,maxMana,minStr,maxStr,minMag,maxMag,potions,manapotions){
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth
        this.mana = mana;
        this.maxMana = maxMana
        this.minStr = minStr;
        this.maxStr = maxStr;
        this.minMag = minMag;
        this.maxMag = maxMag;
        this.potions = potions;
        this.manapotions = manapotions
    }
     attack(target) {
        let damage = Math.floor(Math.random()*(this.maxStr-this.minStr + 1)+this.minStr);
        target.health -= damage
        hit.play();
        console.log(`${target.name} receieved amount of ${damage} damage!`)
    }
     redPotion(target){
              
             if(target.health > 0 && this.potions > 0 && target.health < target.maxHealth ){
                 target.health += 100
                 if(target.health >= target.maxHealth){
                     target.health =  target.maxHealth
                 }
                 console.log(`${target.name} recovered health points! `)
                 
             } 
          this.potions--
        //  console.log("No more potions!")

    } 
    bluePotion(target){
        if(this.manapotions > 0 && target.mana < target.maxMana ){
            target.mana += 50
         if(target.mana < target.maxMana){
             target.mana = target.maxMana
         }   

        } 
        this.manapotions-- 
        console.log(`${target} recovered mana points!`)
    }  

    magicAttack(target){
        if(this.mana>= 70){

            let magicalDamage = Math.floor(Math.random()*(this.maxMag-this.minMag + 1)+this.minMag);
            target.health -= magicalDamage
            console.log(`${target.name} received amount of ${magicalDamage} damage!`)
            this.mana -= 70

        } else{
            console.log(`${this.name} doesn't have enough mana points!`)
        }
    } 
   
}

// Heroes and Villains

const sephiroth = new Heroes('Sephiroth',2000,2000,400,400,10,50,30,70,5,5);

const cloud = new Heroes('Cloud', 200, 200, 100, 100, 20,50,30,80,5,5);

const tifa = new Heroes('Tifa', 150, 150,200,200,12,35,60,120,5,5);

// END OF CLASS OBJECT


// Variables
let $cloud = $('.cloud');
let $cloudattack = $('.cloud-attack');
let $heal = $('.heal')
console.log($heal)
let currentTurn = 0;



// SoundEffects

const hit = new Audio('./music/soundfx/hit.wav')





//Cloud Attacks && Status
const cloudAttack =() =>{
    cloud.attack(sephiroth);   
    $cloud.attr('src', './images/Cloud/cloud-attack.gif')
}
const cloudHeal = () =>{
    cloud.redPotion(target);
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
}

const cloudMagic = () =>{
    cloud.magic(sephiroth);
    $cloud.attr('src', './images/Cloud/cloud-magic.gif')
}

const cloudIdle = ()=>{
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
}


//Cloud Related Buttons
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




let currentTurn = 0;
let isActive = true;

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
        if(target.health < 0){
            target.health = 0
        }
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
            console.log(`${target.name} received amount of ${magicalDamage} magic damage!`)
            this.mana -= 70
            if(target.health < 0){
                target.health = 0
            }
            
        } else{
            console.log(`${this.name} doesn't have enough mana points!`)
        }
        magicSFX.play();
    } 
    
} 




//Checking Turns
const checkTurn = ()=>{
    if(currentTurn === 0 && cloud.health > 0){
        $cloudMenu.removeClass('hidden')
        console.log("Its Cloud's turn!")
        
    } else if (currentTurn === 1 && tifa.health > 0){
        $tifaMenu.removeClass('hidden')
        $cloudMenu.addClass('hidden')
        console.log("It's Tifa's turn")
  
    } else if(currentTurn ===2 || tifa.health === 0){
        $sephirothMenu.removeClass('hidden')
        $tifaMenu.addClass('hidden')
        console.log('It`s Sephiroth`s turn')
    }
}
// Heroes and Villains

const sephiroth = new Heroes('Sephiroth',2000,2000,400,400,10,50,30,70,5,5);

const cloud = new Heroes('Cloud', 200, 200, 100, 100, 20,50,30,80,5,5);

const tifa = new Heroes('Tifa', 150, 150,200,200,12,35,60,120,5,5);

// END OF CLASS OBJECT


// Cloud Variables
let $cloud = $('.cloud'); //Clouds Character Model

let $cloudAttack = $('.cloud-attack'); //Clouds Attack Button

let $cloudMagic = $('.cloud-magic'); // Clouds Magic Attack Button

let $cloudMenu = $('.cloud-menu')

let $cloudHitbox = $('li.cloud.hit-box')





// Global Variables
// let currentTurn = 0;
// let isActive = true;
checkTurn();



// Tifa Variables
let $tifa = $('.tifa');//Tifas Character Model

let $tifaAttack = $('.tifa-attack') //Tifas Attack Button

let $tifaMagic = $('.tifa-magic') // Tifas Magic Attack

let $tifaItems = $('.tifa-items') //Tifas Items

let $tifaMenu = $('.tifa-menu') //Tifas Battle Menu







// SoundEffects

const hit = new Audio('./music/soundfx/hit.wav')

const magicSFX = new Audio('./music/soundfx/magic.wav')



//Cloud Attacks && Status
const cloudAttack =() =>{
    cloud.attack(sephiroth);   
    $cloud.attr('src', './images/Cloud/cloud-attack.gif');
    setTimeout(function(){
        cloudIdle()
    }, 1500);
    currentTurn++
    
    checkTurn();

    
}
/////
const cloudHeal = () =>{
    cloud.redPotion(target);
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
    setTimeout(function(){
        cloudIdle()
    }, 1000);
    currentTurn++
    checkTurn();
}
//////
const cloudMagic = () =>{
    cloud.magicAttack(sephiroth);
    $cloud.attr('src', './images/Cloud/cloud-magic.gif')
    setTimeout(function(){
        cloudIdle()
    }, 1500);
    currentTurn++
    checkTurn();
    
}

///
// setTimeout(function(){
//     cloudIdle()
// }, 1000);

const cloudIdle = ()=>{
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
}


const checkCloud = ()=>{
    if(cloud.health === 0){
        $cloud.attr('src', './images/Cloud/cloud-dead.gif')
        isActive = false;
        $cloudMenu.addClass('hidden')
        currentTurn = 1
        console.log("Cloud is dead!")
    } 
    // let displayHit = cloud.maxHealth - cloud.health
    // $cloudHitbox[0].innerText = displayHit
    

}



//Cloud Related Buttons
$cloudAttack.click(()=>{
    cloudAttack();
    checkSephiroth();   
})
/////
$cloudMagic.click(()=>{
    cloudMagic();
    checkSephiroth();
})


//Tifa Attacks and Status
const tifaAttack = () =>{
    tifa.attack(sephiroth);
    $tifa.attr('src', './images/Tifa/tifa-attack.gif')
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    currentTurn++
    checkTurn();
    
}
////
const tifaMagicAttack = ()=>{
    tifa.magicAttack(sephiroth);
    $tifa.attr('src', './images/Tifa/tifa-magic.gif')
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    currentTurn++
    checkTurn();
}
////
const tifaHeal =() =>{
    tifa.redPotion(target);
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    currentTurn++
    checkTurn();
}
////
const tifaIdle = () =>{
    $tifa.attr('src', './images/Tifa/tifa-idle.gif')
}
////
const checkTifa =() =>{
    if(tifa.health === 0){
        $tifa.attr('src', './images/Tifa/tifa-dead.gif')
        isActive = false;
        $tifaMenu.addClass('hidden')
        console.log("Tifa is dead!")
    } 
}

//Tifa Related Buttons
$tifaAttack.click(()=>{
    tifaAttack();
    checkSephiroth();
})
/////
$tifaMagic.click(()=>{
    tifaMagicAttack();
    checkSephiroth();
})
////
$tifaItems.click(()=>{
    tifaHeal();
})


//Sephiroth Variables
let $sephiroth = $('.sephiroth') //Sephiroths Character
let $sephirothAttack =$('.sephiroth-attack') //Sephiroths Attack
let $sephirothHeal = $('.sephiroth-heal') //Sephiroth Heals
let $sephirothMagicAttack = $('.sephiroth-magic') //Sephiroth Magic Attack
let $sephirothMenu = $('.sephiroth-menu')



//Sephiroth Attacks & Status
const sephirothAttacksAll = ()=>{
    sephiroth.attack(tifa)
    sephiroth.attack(cloud)
    $sephiroth.attr('src', './images/Sephiroth/sephiroth-attack.gif')
    // const sephirothSFX = new Audio('./music/soundfx/sword.wav')
    // sephirothSFX.play();
    // hit.pause();
    checkCloud();
    checkTifa();
    currentTurn = 0;
    checkTurn();
    setTimeout(function(){
        sephirothIdle()
    }, 1500);
    $sephirothMenu.addClass('hidden')
    
  
   

}

/////
const sephirothMagicAttack = () =>{
    sephiroth.magicAttack(tifa);
    $sephiroth.attr('src', './images/Sephiroth/sephiroth-magic.gif');
    checkCloud();
    checkTifa();
    currentTurn = 0;
    checkTurn();
    setTimeout(function(){
        sephirothIdle()
    }, 1500);
    $sephirothMenu.addClass('hidden')


    
}
//////
const sephirothIdle = () =>{
    $sephiroth.attr('src', './images/Sephiroth/sephiroth-idle.gif')
}
/////
const checkSephiroth = ()=>{
    if(sephiroth.health === 0){
        $sephiroth.attr('src', './images/Sephiroth/sephiroth-dead.gif')
        isActive = false;
        console.log("Sephiroth is defeated!")
    } 
}
/////
//Sephiroth Test Buttons
$sephirothAttack.click(()=>{
    sephirothAttacksAll();

})
/////
$sephirothHeal.click(()=>{
    sephiroth.redPotion(sephiroth)
    checkCloud();
    checkTifa();
    currentTurn = 0;
    checkTurn();
    setTimeout(function(){
        sephirothIdle()
    }, 1500);
    $sephirothMenu.addClass('hidden')


})
/////
$sephirothMagicAttack.click(()=>{
    sephirothMagicAttack();
})



//Test Console Logs
// console.log(cloud);
// console.log(tifa)
// console.log(sephiroth)
























// MUSIC AND SOUND EFFECTS
let $musictest = $('button.musictest');



$musictest.click(()=>{
    const battleMusic = new Audio("./music/battle.mp3");
    battleMusic.play();
    
})



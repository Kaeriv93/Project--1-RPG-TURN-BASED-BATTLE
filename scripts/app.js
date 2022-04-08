//Current Turn
let currentTurn = 0;



//Intro Audio
const heal = new Audio('./music/soundfx/heal.ogg')
const gameOver = new Audio('./music/gameover.mp3')
const battleMusic = new Audio("./music/battle.mp3");
const victory = new Audio('./music/victory.mp3')

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
        console.log(`${target.name} receieved ${damage} amount of damage!`)
    }
     redPotion(target){
              
             if(target.health > 0 && this.potions > 0 && target.health < target.maxHealth ){
                 target.health += 100
                 if(target.health >= target.maxHealth){
                     target.health =  target.maxHealth
                 }
                 console.log(`${target.name} recovered health points! `)
                 heal.play();
                 tifasStatus();
                 cloudStatus();
                 
             } 
          this.potions--
        //  console.log("No more potions!")

    } 
    bluePotion(target){
        if(this.manapotions > 0 && target.mana < target.maxMana ){
            target.mana += 50
         if(target.mana > target.maxMana){
             target.mana = target.maxMana
         }   

        } 
        heal.play();
        this.manapotions-- 
        console.log(`${target.name} recovered mana points!`)
        tifasStatus();
        cloudStatus();
    }  

    magicAttack(target){
        if(this.mana>= 70){
            let magicalDamage = Math.floor(Math.random()*(this.maxMag-this.minMag + 1)+this.minMag);
            target.health -= magicalDamage
            console.log(`${target.name} received ${magicalDamage} amount of magic damage!`)
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
        console.log('It`s Cloud`s Turn')
    }else if(cloud.health === 0 && currentTurn === 0){
        currentTurn = 1;
        console.log(`Cloud cannot make a turn`)
    } if(currentTurn === 1 && tifa.health > 0){
        $tifaMenu.removeClass('hidden')
        $cloudMenu.addClass('hidden')
        console.log(`It's Tifa's Turn`)
    } else if(currentTurn === 1 && tifa.health === 0){
        currentTurn = 2;
        console.log(`It's Sephiroth's Turn`)
    } if(currentTurn === 2 && cloud.health === 0 && tifa.health === 0){
        alert('YOU LOSE')
        battleMusic.pause();
        gameOver.play();
    } else if(currentTurn === 0 && sephiroth.health === 0 || currentTurn === 1 && sephiroth.health === 0 || currentTurn === 2 && sephiroth.health === 0){
        alert(`YOU WIN!`)
        battleMusic.pause();
        victory.play();
    } else if(currentTurn === 2 && sephiroth.health > 0){
        $tifaMenu.addClass('hidden')
        console.log(`It's Sephiroth's Turn`)
        setTimeout(() => {
            sephirothsMove();
        }, 1500);
        currentTurn = 0;
    }
}

// Heroes and Villains

const sephiroth = new Heroes('Sephiroth',2000,2000,4000,4000,10,50,30,70,15,);

const cloud = new Heroes('Cloud', 200, 200, 100, 100, 50,90,60,130,5,5);

const tifa = new Heroes('Tifa', 150, 150,200,200,25,60,120,220,5,5);

// END OF CLASS OBJECT


//Skills
let $skills = $('.skills')
let $blast1 = $('.blast1')
let $blast2 = $('.blast2')



const cloudsFireBall = () =>{

        const fireBall = new Audio('/music/soundfx/explode.ogg')
        fireBall.play();
        $skills.removeClass('hidden')
        $skills.attr('src', './images/animations/explosion.gif')
        setTimeout(()=>{
            $skills.addClass('hidden');
        }, 1000);    
        
    }        
    
    
    const tifasLightning = ()=>{
        const lightning = new Audio('/music/soundfx/tifa-magic.ogg')
        lightning.play();
        $skills.removeClass('hidden')
        $skills.attr('src', './images/animations/tifas-magic.gif')
        setTimeout(()=>{
            $skills.addClass('hidden');
        }, 1000);    
    }    
    
    
    const sephirothBlast1 = ()=>{
        const blast = new Audio('/music/soundfx/sephiroth-magic.ogg')
        blast.play();
        $blast1.removeClass('hidden')
    setTimeout(()=>{
            $blast1.addClass('hidden');
        }, 1200);
    }
    

const sephirothBlast2 = ()=>{
    const blast = new Audio('/music/soundfx/sephiroth-magic.ogg')
    blast.play();
    $blast2.removeClass('hidden')
    setTimeout(()=>{
            $blast2.addClass('hidden');
        }, 1200);
    }
    
    // Cloud Variables
    let $cloud = $('.cloud'); //Clouds Character Model
    
    let $cloudAttack = $('.cloud-attack'); //Clouds Attack Button
    
    let $cloudMagic = $('.cloud-magic'); // Clouds Magic Attack Button
    
    let $cloudMenu = $('.cloud-menu') //Clouds Menu
    
    let $cloudHitbox = $('li.cloud.hit-box')
    
    let $cloudHP = $('li.cloud-hp') 
    
    let $cloudMP = $('li.cloud-mp')
    
    //Displaying Clouds Health and Mana
    
    const cloudStatus= ()=>{
        
        $cloudHP[0].innerText = `HP:${cloud.health}/200`
        $cloudMP[0].innerText = `MP:${cloud.mana}/100`
    }
    
    
    
    
    
    


// Starts Game By Checking Turns
checkTurn();




// Tifa Variables
let $tifa = $('.tifa');//Tifas Character Model

let $tifaAttack = $('.tifa-attack') //Tifas Attack Button

let $tifaMagic = $('.tifa-magic') // Tifas Magic Attack

let $tifaItems = $('.tifa-items') //Tifas Items

let $tifaMenu = $('.tifa-menu') //Tifas Battle Menu

let $tifasHP = $('li.tifas-hp') //Tifas HP

let $tifasMP = $('li.tifas-mp') //Tifas MP

//Displaying Tifas Health and Mana

const tifasStatus= ()=>{
   
$tifasHP[0].innerText = `HP:${tifa.health}/150`
$tifasMP[0].innerText = `MP:${tifa.mana}/200`
}
////////////////////////////////////////////////////






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
    cloudStatus();
    tifasStatus();
    currentTurn++
    checkTurn();
}
//////
const cloudMagic = () =>{
    cloud.magicAttack(sephiroth);
    $cloud.attr('src', './images/Cloud/cloud-magic.gif')
    
    cloudsFireBall();
    setTimeout(function(){
        cloudIdle()
    }, 1500);
    cloudStatus();
    currentTurn++
    checkTurn();
    
}



const cloudIdle = ()=>{
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
}


const checkCloud = ()=>{
    if(cloud.health === 0){
        $cloud.attr('src', './images/Cloud/cloud-dead.gif')
        $cloudMenu.addClass('hidden')
        currentTurn = 1
        console.log("Cloud is dead!")
    } 

    $cloudHP[0].innerText = `HP:${cloud.health}/200`

 

}



//Cloud Related Buttons
$cloudAttack.click(()=>{
    cloudAttack();
    checkSephiroth();   
})
/////

$cloudMagic.click(()=>{
    if(cloud.mana>=70){
        cloudMagic();

    }else if(cloud.mana <70){
        console.log("Not enough mana!")
    }
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
    tifasLightning();
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    tifasStatus();
    currentTurn++
    checkTurn();
}
////
const tifaHeal =() =>{
    tifa.redPotion(target);
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    tifasStatus();
    cloudStatus();
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
        $tifaMenu.addClass('hidden')
        console.log("Tifa is dead!")
    } 
    $tifasHP[0].innerText = `HP:${tifa.health}/150`
}

//Tifa Related Buttons
$tifaAttack.click(()=>{
    tifaAttack();
    checkSephiroth();
})
/////
$tifaMagic.click(()=>{

    if(tifa.mana>=70){
        tifaMagicAttack();

    }else if(tifa.mana <70){
        console.log("Not enough mana!")
    }
   
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
// console.log(sephirothChoices)
// console.log(randomNumber)





//Sephiroth Attacks & Status



const sephirothAttacksAll = ()=>{
    sephiroth.attack(tifa)
    sephiroth.attack(cloud)
    $sephiroth.attr('src', './images/Sephiroth/sephiroth-attack.gif')
    hit.pause();
    const sephirothSFX = new Audio('./music/soundfx/slash.ogg')
    sephirothSFX.play();
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
    let randomNumber = Math.floor(Math.random()*2);
    if(randomNumber===0 && cloud.health > 0){
        sephiroth.magicAttack(cloud);
        sephirothBlast1();
    }else if(randomNumber===0 && cloud.health === 0){
        sephiroth.magicAttack(tifa)
        sephirothBlast2();
    }if(randomNumber === 1 && tifa.health > 0){
        sephiroth.magicAttack(tifa)
        sephirothBlast2();
    }else if(randomNumber === 1 && tifa.health ===0){
        sephiroth.magicAttack(cloud)
        sephirothBlast1();
    }
  
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

const sephirothsMove =()=>{
    let randomNumber = Math.floor(Math.random()*3);
    if(randomNumber===0){
        sephirothAttacksAll();
    } else if (randomNumber===1){
        sephirothMagicAttack();
    }else if (randomNumber===2){
        sephiroth.redPotion(sephiroth)
        $sephiroth.attr('src', './images/Sephiroth/sephiroth-item.gif')
        setTimeout(function(){
            sephirothIdle()
        }, 1500);
        
    }
    checkTurn();
    checkCloud();
    checkTifa();
}


























// MUSIC AND SOUND EFFECTS
let $musictest = $('button.musictest');




$musictest.click(()=>{
    battleMusic.play();
    
})





//Current Turn
let currentTurn = 0;
let $status = $('.gamestatus')
let $hitbox = $('.sephiroth-hitbox')
let $battlelog =$('p.battlelog')
let $restart =$('.restart')


//Reset Button
$restart.click(()=>{
    location.reload();
})

//Sephiroth Fadeout Animation when hit
const getHit = ()=>{
        $sephiroth.fadeOut(200);
        $sephiroth.fadeIn(200);
}


//Heroes Fadeout Animation when hit
const hurt =()=>{
    $cloud.fadeOut(200);
    $cloud.fadeIn(200);
    $tifa.fadeOut(200);
    $tifa.fadeIn(200);

}


const victoryPose = ()=>{
    $cloud.attr('src', './images/Cloud/cloud-win.gif');
    $tifa.attr('src', './images/Tifa/tifa-win.gif');
}


//Intro Audio
const heal = new Audio('./music/soundfx/heal.ogg')
const gameOver = new Audio('./music/gameover.mp3')
const battleMusic = new Audio("./music/battle.mp3");
const victory = new Audio('./music/victory.mp3')

// Hero and Villain Class
class Heroes{
    constructor(name,health,maxHealth,mana,maxMana,minStr,maxStr,minMag,maxMag,heals,charges){
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth
        this.mana = mana;
        this.maxMana = maxMana
        this.minStr = minStr;
        this.maxStr = maxStr;
        this.minMag = minMag;
        this.maxMag = maxMag;
        this.heals = heals;
        this.charges = charges;
    }
     attack(target) {
        let luckyChance = Math.floor(Math.random()*10)
        let damage = Math.floor(Math.random()*(this.maxStr-this.minStr + 1)+this.minStr);
        if(luckyChance <= 1){
            damage = Math.floor(damage *1.5)
            const criticalHit = new Audio('./music/soundfx/criticalHit.ogg')
            console.log("Critical Hit!")
            criticalHit.play();
            hit.pause();
            
        } 
        target.health -= damage
        hit.play();
        if(target.name === 'Sephiroth'){
            $hitbox[0].innerText = damage
            setTimeout(()=>{
                $hitbox[0].innerText =""
            },1000)
            if(sephiroth.health < 0){
                sephiroth.health = 0
            }
        }
        else if(target.health < 0){
            target.health = 0
        }
        console.log(`${target.name} receieved ${damage} amount of damage!`)
        $battlelog[0].innerText= `${target.name} receieved ${damage} amount of damage!`
    }

    
     healing(target){
              
             if(target.health > 0 && this.heals > 0 && target.health < target.maxHealth ){
                 target.health += 100
                 if(target.health >= target.maxHealth){
                     target.health =  target.maxHealth
                 }
                 console.log(`${target.name} recovered health points! `)
                 $battlelog[0].innerText= `${target.name} recovered health points! `
                 heal.play();
                 tifasStatus();
                 cloudStatus();
                 
             } 
          this.heals--


    } 
    charging(target){
        if(this.charges > 0 && target.mana < target.maxMana ){
            target.mana += 50
         if(target.mana > target.maxMana){
             target.mana = target.maxMana
         }   

        } 
        magicSFX.play();
        this.charges-- 
        console.log(`${target.name} recovered mana points!`)
        $battlelog[0].innerText= `${target.name} recovered mana points!`
        tifasStatus();
        cloudStatus();
    }  

    magicAttack(target){
            let magicalDamage = Math.floor(Math.random()*(this.maxMag-this.minMag + 1)+this.minMag);
            target.health -= magicalDamage
            console.log(`${target.name} received ${magicalDamage} amount of magic damage!`)
            $battlelog[0].innerText= `${target.name} received ${magicalDamage} amount of magic damage!`
            magicSFX.play();
            this.mana -= 70
            
            
            if(target.name === 'Sephiroth'){
                $hitbox[0].innerText = magicalDamage
                setTimeout(()=>{
                    $hitbox[0].innerText =" ";
                },1000)
                if(sephiroth.health < 0){
                    sephiroth.health = 0
                }
            }
            else if(target.health < 0){
                target.health = 0
            }
            
    } 
   
    
} 




//Checking Turns
const checkTurn = ()=>{
    if(currentTurn === 0 && cloud.health > 0){
        $cloudMenu.removeClass('hidden')
        $status[0].innerText =  `It's Cloud's turn!`
    }else if(cloud.health === 0 && currentTurn === 0){
        currentTurn = 1;
        $status[0].innerText =  `It's Tifa's turn!`
    } if(currentTurn === 1 && tifa.health > 0){
        $tifaMenu.removeClass('hidden')
        $cloudMenu.addClass('hidden')
        $status[0].innerText =  `It's Tifas's turn!`
    } else if(currentTurn === 1 && tifa.health === 0){
        currentTurn = 2;
        $status[0].innerText =  `It's Sephiroth's turn!`
    } if(currentTurn === 2 && cloud.health === 0 && tifa.health === 0){
        $status[0].innerText = "GAME OVER!!!";
        $status.addClass('lose')
        battleMusic.pause();
        $restart.removeClass('hidden')
        gameOver.play();
    } else if(currentTurn === 0 && sephiroth.health === 0 || currentTurn === 1 && sephiroth.health === 0 || currentTurn === 2 && sephiroth.health === 0){
        $status[0].innerText = "Victory!!!!";
        $status.addClass('win')
        $restart.removeClass('hidden')
        battleMusic.pause();
        victory.play();
        setInterval(()=>{
            
            victoryPose();
        }, 2000);
        $cloudMenu.addClass('hidden')
        $tifaMenu.addClass('hidden')
    } else if(currentTurn === 2 && sephiroth.health > 0){
        $tifaMenu.addClass('hidden')
        $status[0].innerText =  `It's Sephiroth's turn!`
        setTimeout(() => {
            sephirothsMove();
        }, 1500);
        currentTurn = 0;
    }
}

// Heroes and Villains

const sephiroth = new Heroes('Sephiroth',2500,2500,4000,4000,10,50,30,70,15);

const cloud = new Heroes('Cloud', 200, 200, 100, 100, 50,90,130,220,3,99);

const tifa = new Heroes('Tifa', 150, 150,200,200,25,60,180,280,3,99);

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
    
    let $cloudHP = $('li.cloud-hp') 
    
    let $cloudMP = $('li.cloud-mp')

    let $cloudHeal = $('button.cloud-items')

    let $cloudCharge =$('.cloud-menu li button.charge')

    console.log($cloudCharge)

   

   
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

let $tifaItems = $('button.tifa-items') //Tifas Items

let $tifaMenu = $('.tifa-menu') //Tifas Battle Menu

let $tifasHP = $('li.tifas-hp') //Tifas HP

let $tifasMP = $('li.tifas-mp') //Tifas MP

let $tifaCharge = $('.tifa-menu li button.charge')



//Displaying Tifas Health and Mana

const tifasStatus= ()=>{
   
$tifasHP[0].innerText = `HP:${tifa.health}/150`
$tifasMP[0].innerText = `MP:${tifa.mana}/200`
}







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
    getHit();
    currentTurn++
    checkTurn();

    
}

const cloudHeal = (target) =>{
    cloud.healing(target);
    $cloud.attr('src', './images/Cloud/cloud-idle.gif')
    setTimeout(function(){
        cloudIdle()
    }, 1000);
    cloudStatus();
    currentTurn++
    checkTurn();
}


const cloudCharge =(cloud)=>{
    cloud.charging(cloud);
    $cloud.attr('src', './images/Cloud/cloud-charge.gif')
    setTimeout(function(){
        cloudIdle()
    }, 2000);
    cloudStatus();
    currentTurn++
    checkTurn();
}

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


$cloudMagic.click(()=>{
    if(cloud.mana>=70){
        cloudMagic();

    }else if(cloud.mana <70){
        console.log("Not enough mana!")
    }
    checkSephiroth();
})


$cloudHeal.click(()=>{
    if(cloud.heals > 0){

        cloudHeal(cloud)

    } if(cloud.heals === 0){
        $cloudHeal.css("background-color", "red");
    }
    console.log("No more potions!")
})

$cloudCharge.click(()=>{
    if(cloud.charges > 0){
        cloudCharge(cloud)
    }
})




//Tifa Attacks and Status
const tifaAttack = () =>{
    tifa.attack(sephiroth);
    $tifa.attr('src', './images/Tifa/tifa-attack.gif')
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    getHit();
    currentTurn++
    checkTurn();
    
}

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

const tifaHeal =() =>{
    tifa.healing(tifa);
    setTimeout(function(){
        tifaIdle()
    }, 1500);
    tifasStatus();
    currentTurn++
    checkTurn();
}



const tifaCharge =() =>{
    tifa.charging(tifa);
    $tifa.attr('src', './images/Tifa/tifa-charge.gif')
    setTimeout(function(){
        tifaIdle()
    }, 2000);
    tifasStatus();
    currentTurn++
    checkTurn();
}



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

$tifaMagic.click(()=>{

    if(tifa.mana>=70){
        tifaMagicAttack();

    }else if(tifa.mana <70){
        console.log("Not enough mana!")
    }
   
    checkSephiroth();
})




$tifaItems.click(()=>{
    if(tifa.heals>0){
        tifaHeal(tifa);
    } 
    if(tifa.heals === 0){
        $tifaItems.css("background-color", "red");
    } else{
        console.log("No more heals")
    }
   
})

$tifaCharge.click(()=>{
    if(tifa.charges>0){
        tifaCharge(tifa);
    }else{
        console.log("Can't charge")
    }
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
    hurt();
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

const sephirothIdle = () =>{
    $sephiroth.attr('src', './images/Sephiroth/sephiroth-idle.gif')
}

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
        sephiroth.healing(sephiroth)
        $sephiroth.attr('src', './images/Sephiroth/sephiroth-item.gif')
        setTimeout(function(){
            sephirothIdle()
        }, 1500);
        
    }
    checkTurn();
    checkCloud();
    checkTifa();
}















// Get the modal
let modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];


$(window).on("load",()=>{
    modal.style.display="block";
})


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  battleMusic.play();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    battleMusic.play();
  }
}










// MUSIC AND SOUND EFFECTS
let $musictest = $('button.musictest');




$musictest.click(()=>{
    battleMusic.play();
    
})



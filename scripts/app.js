class Heroes{
    constructor(name,health,mana,attack,block,magic,items){
        this.name = name;
        this.health = health
        this.mana = mana;
        this.attack = attack;
        this.block = block;
        this.magic = magic;
        this.items= items;
    }
}

const cloud = new Heroes('Cloud', 200, 100, 50,25,'magic','items');
console.log(cloud);

let $musictest = $('button.musictest');

console.log($musictest)

$musictest.click(()=>{
    const battleMusic = new Audio("./music/battle.mp3");
    battleMusic.play();
})



let $musictest = $('button.musictest');

console.log($musictest)

$musictest.click(()=>{
    const battleMusic = new Audio("./music/battle.mp3");
    battleMusic.play();
})
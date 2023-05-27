// constants and variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
const moveSund = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score= 0;
// let hscore = 0;
let newScore = document.getElementById('score');
// let highScore = document.getElementById('hscore');
newScore.innerHTML = score;
// highScore.innerHTML = hscore;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};
// functions
function main(ctime){
window.requestAnimationFrame(main);
if((ctime - lastPaintTime)/1000 < 1/speed){
// console.log(ctime);
return;
}
lastPaintTime = ctime;
gameEngine();
}
function isCollide(snake){
// if you bite youself
for( let i = 1; i < snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
    // if you go out of wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0){
        return true;
    }
}
}
function gameEngine(){
    // part 1 updating the snake array and food
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game over, Press any key to restart");
        snakeArr = [
            {x: 13, y: 15}
        ];
        musicSound.play();
        score = 0;
        newScore.innerHTML = score;
    }

    // if you have eaten the food increment the score  and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=1;
        if(score > hiscoreval){
            hiscoreval  = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hscore.innerHTML = hiscoreval;
        }
        newScore.innerHTML = score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+ (b-a)* Math.random()), y:Math.round(a+ (b-a)* Math.random())};
    }

    // moving the snake
    for( let i = snakeArr.length -2; i >= 0; i-- ){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // part 2 display snake and food------

    let board = document.getElementById('board');
    board.innerHTML = "";

    // displaying the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

     // displaying the snake
         foodElement = document.createElement('div');
         foodElement.style.gridRowStart = food.y;
         foodElement.style.gridColumnStart = food.x;
         foodElement.classList.add('food');
         board.appendChild(foodElement);
}


// logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hscore.innerHTML = hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0 ,y:1} //start the game
    musicSound.play();
    moveSund.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x = 0;
            inputDir.y = -1;
        break;
        
        case "ArrowDown":
            console.log("Arrow down");
            inputDir.x = 0;
            inputDir.y = 1;
        break;

        case "ArrowLeft":
            console.log("Arrow left");
            inputDir.x = -1;
            inputDir.y = 0;
        break;

        case "ArrowRight":
            console.log("Arrow right");
            inputDir.x = 1;
            inputDir.y = 0;
        break;
    }
})

// controls for mobile
let control = document.querySelector('.controls');
control.addEventListener('click', function(){
    musicSound.play();
})
up.addEventListener("click",()=>{
    moveSund.play();
    inputDir.x = 0;
            inputDir.y = -1;
})
right.addEventListener("click",()=>{
    moveSund.play();
    inputDir.x = 1;
            inputDir.y = 0;
})
left.addEventListener("click",()=>{
    moveSund.play();
    inputDir.x = -1;
            inputDir.y = 0;
})
down.addEventListener("click",()=>{
    moveSund.play();
    inputDir.x = 0;
            inputDir.y = 1;
})

let gameSeq = [];
let userSeq = [];

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

// step 1
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

// step 2
function levelUp(){
    userSeq = [];

    level++;
    h3.innerText = `Level ${level}`;

    // random button choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`); // class name / accesing class

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);

    gameSeq.push(randColor);
    console.log("game's random color:");
    console.log(gameSeq);

    gameFlash(randbtn); //function call
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User's color:");
    console.log(userSeq);
}

// step 3 
function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function checkAns(idx){
    console.log(`current level: ${level}`);

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h3.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        resetGame();
    }
}

function resetGame(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
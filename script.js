function controller(event) {
    if (event.key == "Enter") {
        if (runWorker == 0) {
            document.getElementById("pop-up").style.display = "none";
            run();
            runSound.play();
            moveBackground();
            updateScore();
            flameLocation.forEach(generateFlames);
        }
    } else if (event.key == " ") {
        if (jumpWorker == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                jump();
                runSound.pause();
                jumpSound.play();
            }
        }
    }
}

var runImage = 1;
var runWorker = 0;

function run() {
    runWorker = setInterval(() => {
        runImage = runImage + 1;
        if (runImage == 9) {
            runImage = 1;
        }
        document.getElementById("boy").src = "assets/run" + runImage + ".png";
    }, 150);
}

var jumpImage = 1;
var jumpWorker = 0;
var boyMarginTop = 540;

function jump() {
    jumpWorker = setInterval(() => {
        jumpImage = jumpImage + 1;
        if (jumpImage < 8) {
            boyMarginTop = boyMarginTop - 15;
        }
        if (jumpImage > 7) {
            boyMarginTop = boyMarginTop + 15;
        }
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        if (jumpImage == 13) {
            jumpImage = 1;
            clearInterval(jumpWorker);
            run();
            runSound.play();
            jumpWorker = 0;
        }
        document.getElementById("boy").src = "assets/jump" + jumpImage + ".png";
    }, 150);
}

var backgroundWorker = 0;
var backgroundPosition = 0;

function moveBackground() {
    backgroundWorker = setInterval(() => {
        backgroundPosition = backgroundPosition - 20;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
    }, 150);
}

var scoreWorker = 0;
var score = 0;

function updateScore() {
    scoreWorker = setInterval(() => {
        if (score == 1400) {
            alert("You Won\nClick OK to Restart Game!");
            window.location.reload();
        }
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    }, 150);
}

var deadImage = 0;
var deadWorker = 0;

function dead() {
    deadWorker = setInterval(() => {
        deadImage = deadImage + 1;
        if (deadImage == 11) {
            deadImage = 1;
            alert("Game Over!\nClick OK to Restart Game!");
            window.location.reload();
        }
        document.getElementById("boy").src = "assets/dead" + deadImage + ".png";
    }, 150);
}

var flameLocation = [500, 1000, 2000];
var flameWorker = 0;

function generateFlames(x) {
    var flame = document.createElement("img");
    flame.className = "flame";
    flame.src = "assets/flame.gif";
    flame.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(flame);

    flameWorker = setInterval(() => {
        if (flameWorker != 0) {
            x = x - 10;
            flame.style.marginLeft = x + "px";
        }
        if (x == 170) {
            if (jumpWorker == 0) {
                clearInterval(runWorker);
                runSound.pause();
                clearInterval(jumpWorker);
                clearInterval(backgroundWorker);
                clearInterval(scoreWorker);
                clearInterval(flameWorker);
                flameWorker = 0;
                dead();
                deadSound.play();
            }
        }
    }, 100);
}

var runSound = new Audio("assets/run.mp3");
runSound.loop = true;
var jumpSound = new Audio("assets/jump.mp3");
var deadSound = new Audio("assets/dead.mp3");
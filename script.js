// ** VARIABLES  ** //
    // canvas
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

    // game screen settings
var gameScreen = {
    x: 0,
    y: 0,
    width: 600,
    height: 600,
    color: "lightgrey"
};

    // player
var player = {
    x: 450,
    y: 450,
    width: 30,
    height: 30,
    life: 100
};

    // blast
var blast = {
    blastPower: 20,
    blastSpeed: 5,
    blastNumber: 1,
    blastSize: 3,
    blastColor: "yellow",
    blastX: 450,
    blastY: 480
}

    // frame per second
var framePerSec = 10;

// ** FUNCTIONS ** //

    // game start function
function setGame() {
        // draw game screen
    ctx.fillStyle = gameScreen.color;
    ctx.fillRect(gameScreen.x, gameScreen.y, gameScreen.width, gameScreen.height);
    
        // draw player
    var spaceship = new Image();
    spaceship.src = '/images/nightraiderfixed.png';
    ctx.drawImage(spaceship,player.x,player.y,player.width,player.height);
    
    blaster();
    
        // shoot blast
    if (blast.blastY>0) {
        blast.blastY-=blast.blastSpeed;
    }
    if (blast.blastY<=0) {
        blast.blastY = player.y;
    }
};

    // blast function
function blaster() {
    ctx.fillStyle = blast.blastColor;
    ctx.beginPath();
    ctx.arc(player.x+15, blast.blastY, blast.blastSize, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

    // plyaer move
function playerControl() {    
    player.handleInput = function (inputKey) {
        
        if (inputKey == 'up') {
            this.y += 10;
        }
        if (inputKey == 'right') {
            this.x += 10;
        }
        if (inputKey == 'down') {
            this.y -= 10;
        }
        if (inputKey == 'left') {
            this.x -= 10;
        }
        if (inputKey == 'spacebar') {
            
        }
    }

    document.addEventListener('keydown', function(e) {
        var allowKeys = {
            37: 'left',
            40: 'up',
            39: 'right',
            38: 'down',
            32: 'spacebar'
        };
        player.handleInput(allowKeys[e.keyCode]);
    });
}

    // disable scrolling with arrow keys
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

    // start game
function startGame() {
    setInterval(setGame, framePerSec);
    playerControl();
}

startGame();
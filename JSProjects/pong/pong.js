var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");


window.addEventListener(
    "resize",
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
)


window.addEventListener(
    "keydown",
    function(event){
        switch(event.keyCode){

            case 87:    // W
                links.moveup = true;
                break;

            case 83:    // S
                links.movedown = true;
                break;

            case 38:    // ArrowUp
                rechts.moveup = true;
                break;

            case 40:    // ArrowDown
                rechts.movedown = true;
                break;
            
            case 32:
                pAuSe();
                break;

            default:
                break;
        }
    }
)

window.addEventListener(
    "keyup",
    function(event){      
        switch(event.keyCode){

            case 87:    // W
                links.moveup = false;
                break;
            
            case 83:    // S
                links.movedown = false;
                break;

            case 38:    // ArrowUp
                rechts.moveup = false;
                break;

            case 40:    // ArrowDown
                rechts.movedown = false;
                break;

            default:
                break;
        }
    }
)


var schlaegerhoehe = 200;
var schlaegerbreite = 10;
var schlaegerspeed = 4;

var pause = false;
var ballx = undefined;
var bally = undefined;
var ballfarbe = "white";
var speedmodifier = 1;


function getranddirection(){
    if(Math.random() <= 0.5){
        return -4;
    }
    else{
        return 4;
    }
}

function pAuSe(){
    if(pause == false){
        pause = true;
        ballfarbe = "red";
        ballx = ball.vx;
        bally = ball.vy;
        ball.vy = 0;
        ball.vx = 0;
    }
    else{
        pause = false;
        ballfarbe = "white";
        ball.vy = bally;
        ball.vx = ballx;
    }
}

function Element(height, width, x){

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = innerHeight / 2;
    this.moveup = false;
    this.movedown = false;
    this.vy = 0;

    this.draw = function(){
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "white";
        c.stroke();
        c.fillStyle = "white";
        c.fill();
    }

    this.update = function(){
        
        if(this.movedown == true){
            this.vy = schlaegerspeed;
        }
        else if(this.moveup == true){
            this.vy = -schlaegerspeed;
        }
        else{
            this.vy = 0;
        }
        

        this.y += this.vy;

        this.draw();
    }
}

var links = new Element(schlaegerhoehe, schlaegerbreite, 30);
var rechts = new Element(schlaegerhoehe, schlaegerbreite, innerWidth - (30 + schlaegerbreite));

var ball = {
    h: 20,
    w: 20,
    x: innerWidth / 2,
    y: innerHeight / 2,
    vx: getranddirection(),
    vy: (Math.random() - 0.1) * 2,

    draw: function(){
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.h);
        c.strokeStyle = ballfarbe;
        c.stroke();
        c.fillStyle = ballfarbe;
        c.fill();
    },

    update: function(){
        //Bounce of bottom and top
        if(this.y < 0 || this.y + this.h > innerHeight){
            this.vy = -this.vy;
        }

        //Player 1 and 2 hit detection
        if(this.x <= links.x + links.width && this.y + this.h >= links.y && this.y <= links.y + links.height){
            this.vx = -this.vx;
            console.log(this.vy);
            if(this.vy < 0.55 && this.vy > -0.55){
                this.vy += getranddirection() / 4;    
            }
        }
        else if(this.x + this.w >= rechts.x && this.y + this.h >= rechts.y && this.y <= rechts.y + rechts.height){
            this.vx = -this.vx;
            console.log(this.vy);
            if(this.vy < 0.55 && this.vy > -0.55){
                this.vy += getranddirection() / 4;    
            }
        }
        else if(this.x <= 0){
            score_rechts.punkte += 1;

            speedmodifier = 1;
            this.x = innerWidth / 2;
            this.y = innerHeight / 2;

            this.vx = getranddirection();
            this.vy = (Math.random() - 0.1) * 2;
        }
        else if(this.x >= innerWidth){
            score_links.punkte += 1;

            speedmodifier = 1;
            this.x = innerWidth / 2;
            this.y = innerHeight / 2;

            this.vx = getranddirection();
            this.vy = (Math.random() - 0.1) * 2;
        }

        this.y += this.vy * speedmodifier;
        this.x += this.vx * speedmodifier;

        this.draw();
    },

    recursion: function(){
        if(pause != true){
            speedmodifier += 0.2;
        }

        setTimeout(
            ball.recursion,
            5000
        );
    }
}

function score(tag, x){
    this.tag = tag;
    this.x = x;
    this.punkte = 0;
    
    this.draw = function(){
        c.font = "30px Arial";
        c.fillStyle = "white";
        c.fillText(this.punkte, x, 50); 
    }

    this.update = function(){
        this.draw();
    }
}

var score_links = new score("l", 30);
var score_rechts = new score("r", innerWidth - 40);


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    links.update();
    rechts.update();
    ball.update();
    
    score_links.update();
    score_rechts.update(); 

}

animate();
ball.recursion();
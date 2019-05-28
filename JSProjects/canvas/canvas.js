var canvas = document.querySelector("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

/*
//random numbers
var r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
var g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
var b = Math.floor(Math.random() * (255 - 0 + 1) + 0);

c.fillStyle = "rgb(" +r+ ", " +g+ ", " +b+ ")"
c.fillRect(100, 100, 150, 150);

console.log(canvas);


//Line
c.beginPath();
c.moveTo(250, 50);
c.lineTo(300, 200);
c.lineTo(400, 210);
c.strokeStyle = "blue";
c.stroke(); 
*/
//Arc / Circle
/* c.beginPath();
c.arc(400, 300, 60, 0, Math.PI*2, true);
c.strokeStyle = "red";
c.stroke();
 */

/*
var z = 20;
var lol = 300;

for(var i = 0; i <= 50; i++){
    c.beginPath();
    c.arc(400, lol, z, 0, Math.PI*2, true);
    c.strokeStyle = "green";
    c.stroke();
    z += 2;
    lol += 4;
}
*/
var mouse = {
    x: undefined,
    y: undefined
}

var cursordistance = 90;
var maxRad = 75;

var colorArray = [
    "#4E6E58",
    "#4C8577",
    "#7ADFBB",
    "#A6ECE0",
];

window.addEventListener("mousemove", 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener("resize", 
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        init();
    }
)


function Circle(x, y, vx, vy, rad){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = rad;
    this.originalrad = rad;
    this.color = c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.vx = -this.vx;
        }

        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;

        // interactivity
        if(mouse.x - this.x < cursordistance && mouse.x - this.x > -cursordistance && mouse.y - this.y < cursordistance && mouse.y - this.y > -cursordistance && this.radius < maxRad){
            this.radius += 1;
        }
        else if(this.radius > this.originalrad){
            this.radius -= 1;
        }
        
        this.draw();
    }
}

var circleArray = [];

function init(){

    circleArray = [];

    for(var i = 0; i <= 800; i++){
        var radius = Math.random() * 10 + 5;
        var vx = (Math.random() - 0.5) * 2;
        var vy = (Math.random() - 0.5) * 2;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        circleArray.push(new Circle(x, y, vx, vy, radius))
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init()
animate();



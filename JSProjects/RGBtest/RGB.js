var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var currentX = 15;
var currentY = 75;

//text
c.font = "20px Arial";
c.fillText("rgb(x, x, y); ", currentX, currentY);

var x;
var y;

for(var i = 0; i < 90; i++){
    x = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    y = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    c.fillStyle = "rgb(" +x+ ", " +x+ ", " +y+ ")"
    c.fillRect(currentX, currentY+20, 10, 20);
    currentX += 10;
}

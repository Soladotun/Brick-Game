// Created by Soladotun 

//constants
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth-20;
canvas.height = (window.innerHeight)/2;
canvas.style.backgroundColor = "black";


//ball variables
var x = canvas.width/2;
var y = canvas.height-20;
var r = canvas.height/40;
var dx = 2;//ball speed
var dy = -2;//ball speed

//plank variables
var pw = canvas.width/4;
var ph = canvas.height/25;
var px = (canvas.width-pw)/2;
var py = canvas.height-ph;
var pdx = 40;

//blocks variables
var br = 5;
var bc = 3;
var bw = pw/1.7;
var bh = ph;
var bp = ph;
var bt = canvas.height/15;
var bl = canvas.height/14;
var b = [];

//score variable
var score = 0; 




//drawing the ball
function drawBall(){

    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();    
}
//moving the ball
function moveBall(){
    x+=dx;
    y+=dy;   
    //detecting collision
 if(x+dx>=canvas.width || x+dx<r){dx=-dx;}//right side
 if(x+dx<=0){dx=-dx;}//left side
 if(y+dy<=0){dy=-dy;}//top
 //detecting collision with top of the plank
 if(y+dy>=py && x+dx<px+pw && x+dx>px){dy=-dy;}
 //detecting collision with edge of the plank
 if(x+dx>=px && y+dy >=py && x+dx <= px+pw && y+dy>=py){dy=-dy; dx=-dx;}
 
 //function lose
 if(y-(2*r)>canvas.height && score<(br*bc)){
     alert("You Lose!");
     clearInterval(interval);
    document.location.reload(true);
 }
 
} 
 

//drawing the plank
function drawPlank(){
    ctx.fillStyle = "orange";
    ctx.fillRect(px,py,pw,ph);        
}

//moving the plank
function left(){
    px-=pdx;
    //detecting collision with left wall
    if(px<=0){px=0;}
}
function right(){
    px+=pdx;
    //detecting collision with right wall
    if(px >= canvas.width || px+pw>=canvas.width){px=canvas.width-pw;}
}

//writing score
function drawScore(){
    ctx.font = "14px monospace";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score,canvas.width-(canvas.width/5),canvas.height/16);
} 
 
 //drawing the blocks
for(c=0; c<bc; c++){
    b[c] = [];
    for(r=0; r<br; r++){
    b[c][r] = {x:0, y:0, status:1};
    }
}

function drawBlocks(){
    for(c=0; c<bc; c++){
        for(r=0; r<br; r++){
            if(b[c][r].status == 1){
                var bx = (r*(bw+bp)) + bl;
                var by = (c*(bh+bp)) + bt;
                b[c][r].x = bx;
                b[c][r].y = by;
                ctx.fillStyle = "red";
                ctx.fillRect(bx,by,bw,bh);
            }
        }
    }
}
//blocks detection
function detectBlock(){
    for(c=0; c<bc; c++){
        for(r=0; r<br; r++){
            var a = b[c][r];
            if(a.status ==1){
                if(x>a.x && x <a.x+bw && y>a.y && y<a.y+bh){
                    dy=-dy   
                    score++;//increasing score
                    a.status=0;
                    if(score == br*bc){//win
                        alert("YOU WIN!");
                        document.location.reload(true);
                    }
                }
            }
        }
    }
}  

function calling(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    moveBall();
    drawScore();
    drawPlank();
    left();
    right();
    drawBlocks();
    detectBlock();    
}

window.onload=()=>{
    document.body.appendChild(canvas);
    interval = setInterval(calling,10);
    
    
}

//created by Soladotun 























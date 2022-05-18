const canvas= document.querySelector("canvas");
const contx= canvas.getContext('2d');
const gforce= 0.5;
var tID;
var sr;
var sr2;
let cara = "ferrari004.png";
var temporisador = 0;
var pontuacao = -1;
var pontos= 0;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const pontosBest = JSON.parse(this.responseText);
  document.getElementById("highscoreBest").innerHTML = pontosBest[0];
};
xmlhttp.open("GET", "highscr.txt", true);
xmlhttp.send();

var pontosLocal = localStorage.getItem("score"); 
var pontosBest1 = pontosBest[0];


function score() {
        if (temporisador === pontuacao){
                document.getElementById("score").innerHTML = "SCORE :" + " " + " " + pontos;
            }
        else  {
                document.getElementById("time").innerHTML = "TEMPO :" + " " + temporisador + "s";
                document.getElementById("score").innerHTML = "SCORE :" + " " + " " + pontos;
                return pontos = pontos + 125;
            }
}
canvas.width= 500;
canvas.height= 500;

contx.fillRect(0, 0, canvas.width, canvas.height);

setInterval(spawnRate, 1000);
function spawnRate() {
    sr= Math.floor(Math.random() * 11);
    return sr;
}


setInterval(spawnRate2, 2000);
function spawnRate2() {
    sr2= Math.floor(Math.random() * 6);
    return sr2;
}



function spawnRate3() {
    temporisador ++ ;
    score();
        
    return temporisador;
}


function movsMobileLeft(){
    
        player1.velo.x= -30; 
        if (player1.position.x === 0) {
         player1.velo.x= 30;
         
         }
         
     }
     

function movsMobileRight(){
    
     
         player1.velo.x= 30; 
         if (player1.position.x === (canvas.width - player1.width)) {
             player1.velo.x= -30;
         }
         
     
    
}
function movsMobileUp(){
  
     if (player1.position.y >50) {
        player1.velo.y= -5;
    }
}

class  Personagem{
    constructor({position, velo, framesMax =1,imageSrc}){
        this.position = position;
        this.velo = velo;
        this.width= 50;
        this.height= 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        
        
    }
    

    drw() {
        
            contx.drawImage(
              this.image,
              this.framesCurrent * (this.image.width / this.framesMax),
              0,
              this.image.width / this.framesMax,
              this.image.height,
              this.position.x,
              this.position.y,
              this.image.width / this.framesMax,
              this.image.height
            )
          }
        
        
    
    animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    
    update() {
        
        this.drw()
        this.animateFrames()
        
        this.position.x += this.velo.x;
        this.position.y += this.velo.y;

        
        

        if(this.position.y + this.height + this.velo.y >= canvas.height){
            this.velo.y = 0;
            
        }
        
        else if(player1.position.y + player1.height + player1.velo.y >= (canvas.height - 100)){
            player1.velo.y = -1;
        } {
            this.velo.y += gforce;
            
         }
        
    }
}

class  Personagem2{
    constructor({position, velo, framesMax =1,imageSrc}){
        this.position = position;
        this.velo = velo;
        this.width= 100;
        this.height= 500;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        
        
    }
    

    drw() {
        
            contx.drawImage(
              this.image,
              this.framesCurrent * (this.image.width / this.framesMax),
              0,
              this.image.width / this.framesMax,
              this.image.height,
              this.position.x,
              this.position.y,
              this.image.width / this.framesMax,
              this.image.height
            )
          }
        
        
    
    animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }

    perdeu(){
        if ( (player1.position.y) >= canvas.height ) {
            player1.velo.y = 0;
            
            temporisador = pontuacao
            console.log("oi")
            document.getElementById("score").innerHTML= pontos;
            document.getElementById("gameover").style= "display: flex;"
            document.getElementById("highscoreLocal").innerHTML= "Your Best:" + pontosLocal;
            document.getElementById("highscoreBest").innerHTML= "All Time Best:" + pontosBest1;
            if (temporisador === pontuacao){
                document.getElementById("score").innerHTML= "SCORE :" + " " + " " + pontos;
                if (pontos > pontosLocal) {
                    pontosLocal = pontos;
                    localStorage.setItem("score", pontosLocal);
                }
                
                
                
            }
            return;
        }
    } 
    
    update() {
        
        this.drw()
        this.animateFrames()
       

        this.position.x += this.velo.x;
        this.position.y += this.velo.y;

        this.perdeu()

        if(this.position.y + this.height + this.velo.y >= canvas.height){
            this.velo.y = 0;
        }else {
            this.velo.y += (gforce);
            
         }
        
    }
}


const leftLane = new Personagem2({
    position:{
    x: 60,
    y: 0
},
    velo:{
    x:0,
    y:0
},

imageSrc : "zebra002.png",
framesMax: 4,



})

const rigthLane = new Personagem2({
    position:{
    x: 400,
    y: 0
},
    velo:{
    x:0,
    y:0
},

imageSrc : "zebra002.png",
framesMax: 4,



})

const groundback = new Personagem2({
    position:{
    x: 0,
    y: 0
},
    velo:{
    x:0,
    y:0
},

imageSrc : "road002.png",
framesMax: 4,



})

const player1 = new Personagem({
    position:{
    x: 200,
    y: 400
},
    velo:{
    x:0,
    y:0
},

imageSrc : cara,
framesMax: 4,



})


const player11 = new Personagem({
    position: player1.position,
    
    velo:{
    x:player1.velo.x,
    y: player1.velo.y
},
imageSrc : "explos.png",
framesMax: 4
})

const player2 = new Personagem({
    position:{
    x: (sr * 30) + 200,
    y: 0
},
    velo:{
    x:0,
    y:0
},
imageSrc : "ferrari004blue.png",
framesMax: 4
})

const player3 = new Personagem({
    position:{
    x: sr2 * 50,
    y: 0
},
    velo:{
    x:0,
    y:0
},
imageSrc : "ferrari004green.png",
framesMax: 4
})


const keys = {
    l: {
        pressed: false
    },
    r: {
        pressed: false
    },
    u: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastkey

var pla = 0;


function playb(){
    pla ++;
    
    document.getElementById("playb").style= "display: none;"
    setInterval(spawnRate3, 1000);
    document.getElementById("reset").style= "display: block;"
    return pla;
    player2

}


  
    

function anim(){
    
        
    
    window.requestAnimationFrame(anim);
    contx.fillStyle= "black";
    contx.fillRect(0, 0, canvas.width, canvas.height);
    if (pla === 1 || pla === 2) {
    
    
    groundback.update();
    leftLane.update();
    rigthLane.update();
    player1.update();
    player2.update();
    player3.update();
    
   
    
    

    player1.velo.x= 0;
    
    if (player1.position.x < player2.position.x + 25 &&
        player1.position.x + 25 > player2.position.x &&
        player1.position.y < player2.position.y + 25 &&
        player1.position.y + 25 > player2.position.y) {
        
       
        pontuacao = temporisador + 1;
        console.log("hit")
        player11.update();
        
        player1.velo.x= player2.velo.x;
        player1.velo.y= player2.velo.y + gforce;
        document.getElementById("botao2").style= "visibility: hidden;"
        
        return
    }
    if (player1.position.x < player3.position.x + 25 &&
        player1.position.x + 25 > player3.position.x &&
        player1.position.y < player3.position.y + 25 &&
        player1.position.y + 25 > player3.position.y) {
        
       
        pontuacao = temporisador + 1;
        console.log("hit")
        player11.update();
        
        player1.velo.x= player3.velo.x;
        player1.velo.y= player3.velo.y + gforce;
        document.getElementById("botao2").style= "visibility: hidden;"
        
        return
    }

    if (keys.l.pressed && lastkey === "Arrowleft") {
       player1.velo.x= -5; 
       if (player1.position.x === 0) {
        player1.velo.x= 5;
        
        }
        
    }
    else if (keys.r.pressed && lastkey === "ArrowRight") {
        player1.velo.x= 5; 
        if (player1.position.x === (canvas.width - player1.width)) {
            player1.velo.x= -5;
        }
        
    }
    
    if (player2.position.y === (canvas.height - player2.height)) {
        
        player2.position.y = -50;
        player2.position.x = (sr *30) + 80;
       
    }
    if (player3.position.y === (canvas.height - player3.height)) {
        
        player3.position.y = -100;
        player3.position.x = (sr2 *30) + 80;
       
    }
    
    
    
}
}

anim()


window.addEventListener("keydown" , (event) => {
    switch (event.key) {
        case "ArrowRight":
            keys.r.pressed = true;
            lastkey= "ArrowRight";
            break;
        
        case "ArrowLeft":
            keys.l.pressed = true;
            lastkey= "Arrowleft";
            break;
        
        case "ArrowDown":
            if ((player1.position.y === player2.position.y) && 
            (player1.position.x === player2.position.x)) {
        
        
        
                keys.d.pressed = false;
                lastkey= "ArrowDown";
                return
            }
            if (player1.position.y >50) {
                player1.velo.y= 5;
            }
            
            keys.d.pressed = true;
            
            break;
            
            case "ArrowUp":
                if ((player1.position.y === player2.position.y) && 
                (player1.position.x === player2.position.x)) {
            
            
            
                    event.key = false;
                  
                    return
                }
                if (player1.position.y >50) {
                    player1.velo.y= -5;
                }
                
                keys.u.pressed = true;
                
                break;

        case "Enter":
            setInterval(spawnRate3, 1000);
            pla++;
            document.getElementById("playb").style= "display: none;"
            document.getElementById("reset").style= "display: block;"
            if (pla===2) {
                location.reload();
                
            }
            
            break;
       
    }
})

window.addEventListener("keyup" , (event) => {
    switch (event.key) {
        case "ArrowRight":
            keys.r.pressed = false;
            break;
        case "ArrowLeft":
            keys.l.pressed = false;
            break;
        case "ArrowUp":
            keys.u.pressed = false;
             break;
   
    }
})



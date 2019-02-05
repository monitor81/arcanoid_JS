var ballX=300,
	ballY=330,
	radius=10,
	color="#000",
	intX=1,
	intY=1;
var platformX1=270,
	platformY1=360,
	platformW=60,
	platformH=5;
var timer = 0, game,
	points = 0;

function drawBall (X,Y,R,C){
	ct.fillStyle=C;
	ct.beginPath();
	ct.arc(X,Y,R,0,Math.PI*2);
	ct.fill();
	ct.closePath();
}

function drawPlatform(X1,Y1, W,H, C){
	ct.fillStyle=C;
	ct.fillRect (X1,Y1,W,H);
}

function move(){
	ballY+=intY;
	ballX+=intX;
	if (ballY + radius==canvas.height) game = false; 
	if (ballX < 0 || ballX+radius > canvas.width) intX*=-1;
	if (ballY <0 || ballY+radius >canvas.height) intY*=-1;
	var platformX2=platformX1+platformW;
	var platformY2=platformY1+platformH;
	if((ballX + radius > platformX1) && (ballY + radius > platformY1) && (ballX < platformX2) && (ballY < platformY2)){
						intY*=-1;
						points ++;
						}
}

function clearBg(){
	ct.clearRect(0, 0, canvas.width, canvas.height);
}

function show_time (){
	time.innerHTML = "Время: " + timer.toFixed(2);
}

 function show_poins(){
	 point.innerHTML = "Ваш счет: " + points;
}

function animat (){
	game = true;
	var sessionID = setInterval (function(){
		show_time();
		show_poins();
		move(game);	
		if (game == false) {
			clearInterval(sessionID);
			endgame.style.display = 'block';
			} 
						else {
								clearBg();
								drawBall(ballX,ballY,radius,color);
								drawPlatform(platformX1, platformY1, platformW, platformH, color);
								timer+=0.01;
							}

	},10);
}
function changeplatform (event){
	 	if (event.keyCode==37) {platformX1+=-10; 
	 							if (platformX1 <= 0)  platformX1=1;
	 					    	}
 		if (event.keyCode==39) {platformX1+=10; 
 								if (platformX1+platformW >= canvas.width) platformX1 = canvas.width-platformW-1;
 							}
 		
 }
	

window.addEventListener ('load',function init(){
		canvas = document.getElementById('mycanvas');
		ct=canvas.getContext("2d");
		canvas.width=600;
		canvas.height=400;
		animat ();
		window.addEventListener('keydown',changeplatform);
}, false);

var canvas = document.getElementById('game');
var context = canvas.getContext ('2d');


let aster =[];
let heart = [{x:400, y:0}, {x:450, y:0}, {x:500, y:0} ];
let expl = [];
let timer=0;
let ship = [{x:300, y:300, del:0}];
let fire = [];
let count=0;
let countAster=0;
var requestId;
var level = {a:2, b:4, c:6, d:8};




 var heartimg = new Image();
 heartimg.src = 'img/heart.png';

 var asterimg = new Image();
 asterimg.src = 'img/astero.png';

 var shipimg = new Image();
 shipimg.src = 'img/ship.png';

 var fireimg = new Image();
 fireimg.src = 'img/fire.png';

 var explimg = new Image();
 explimg.src = 'img/expl.png';

 var endimg = new Image();
 endimg.src = 'img/end.png';

 var fonimg = new Image();
 fonimg.src = 'img/fon.png';





canvas.addEventListener ("mousemove", function (event) {
ship[0].x=event.offsetX-25;
ship[0].y=event.offsetY-13;
});






 fonimg.onload = function () {
 game();	
 }

//основной цикл игры


function game() {

update();
render();
if (count < 4) {
	requestId = requestAnimFrame(game);  
} else {
	clearAnimation (requestId);
}
	
}


//}



function update () {
//физика
timer++;
//появление астероидов

	if (countAster<20) { 
	    if (timer%20===0) {
	    aster.push({
		x:Math.random()*550, 
		y:-50, 
		dx:Math.random()*2-2, 
		dy:(Math.random()+1)*level.a,
		del:0});}
	} else if (countAster=>20 && countAster<40) {
		if (timer%17===0) {
		aster.push({
		x:Math.random()*550, 
		y:-50, 
		dx:Math.random()*6-3, 
		dy:(Math.random()+1)*level.b,
		del:0}); }
	} else if (countAster=>40 && countAster<60){
		if (timer%14===0) {
		aster.push({
		x:Math.random()*550, 
		y:-50, 
		dx:Math.random()*8-4, 
		dy:(Math.random()+1)*level.c,
		del:0}); }
	} else {
		if (timer%10===0) {
		aster.push({
		x:Math.random()*550, 
		y:-50, 
		dx:Math.random()*10-5, 
		dy:(Math.random()+1)*level.d,
		del:0}); }
	} 


//появление выстрелов
if (timer%30==0) {
	fire.push({ x:ship[0].x+15, y:ship[0].y, dx:0, dy:-5.2});
	fire.push({ x:ship[0].x+15, y:ship[0].y, dx:-1, dy:-5});
	fire.push({ x:ship[0].x+15, y:ship[0].y, dx:1, dy:-5});
}
//появление серии взрывов
for (i in expl) {
	expl[i].animx = expl[i].animx+0.5;
	if (expl[i].animx>7) {expl[i].animy++; expl[i].animx=0;}
	if (expl[i].animy>7) {expl.splice(i,1);}
}



//движение астероидов
for (i in aster) { 
aster[i].x=aster[i].x+aster[i].dx;	 
aster[i].y=aster[i].y+aster[i].dy;	


//границы астероидов
if (aster[i].x>=550 || aster[i].x<0) {aster[i].dx=-aster[i].dx;}
if (aster[i].y>=550) {
	count++;
	heart.splice(0,1);
	aster.splice(i,1);}

if (Math.abs(aster[i].x+25-ship[0].x+25)<50 && Math.abs(aster[i].y-ship[0].y)<25) {
            count=4;
            break;
}



	for (j in fire) {
		if (Math.abs(aster[i].x+25-fire[j].x+15)<50 && Math.abs(aster[i].y-fire[j].y)<25) {
//взрыв
			expl.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0});
			countAster++;

//удаляем выстрел
			aster[i].del=1;
			fire.splice(j,1); break;

//удаляем астероид
			
		}
	}


if (aster[i].del==1) {aster.splice(i,1);}; 

}



//движение выстрелов
for (i in fire) { 
fire[i].x=fire[i].x+fire[i].dx;	 
fire[i].y=fire[i].y+fire[i].dy;


if (fire[i].y<0) {fire.splice(i,1);}
}
}



 function render () {
 	 context.drawImage (fonimg, 0, 0, 600, 600);
 	 context.drawImage (shipimg, ship[0].x, ship[0].y, 50, 26);
 	 context.drawImage (asterimg, 20, 0, 50, 50);
 	 context.font = "26px Verdana ";
 	 context.fillStyle ="#ffffff";
 	 context.fillText (countAster, 80, 30);

	for (i in heart) {
 	 context.drawImage (heartimg, heart[i].x, heart[i].y, 50, 50);}

     for (i in fire) { 
     context.drawImage (fireimg, fire[i].x, fire[i].y, 30, 30); }

 	 for (i in aster) { 
     context.drawImage (asterimg, aster[i].x, aster[i].y, 50, 50); }

     for (i in expl) { 
     context.drawImage (explimg, 128*Math.floor(expl[i].animx), 128*Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100); }

     if (count >=4) {
     context.drawImage (endimg, 200,150, 200, 200);	
     context.fillStyle ="#000000";
     context.fillText ("Вы сбили "+countAster+" астероида", 170, 400);
     }

 }
 

 //совместимость с браузерами
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 20);
        };
})();

var clearAnimation = (function() {
	return window.cancelRequestAnimationFrame || 
	window.webkitCancelRequestAnimationFrame|| 
	window.mozCancelRequestAnimationFrame || 
	window.oCancelRequestAnimationFrame || 
	window.msCancelRequestAnimationFrame ||
	function(callback){
		window.clearTimeout(callback)
	};
})();


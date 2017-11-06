canvasHeight = 700;
canvasWidth = 900;

sunX = 450;
sunY = -100;

raysLevel = 0;
rays = [];

boxSize = 50;

redness = 0;  //amount of heat on the object

itsMelting = false;
melting = [];

flowersList = [];

particles = [];

//brush = []; //rainbow brush

//source : https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == 'Y_AXIS') {  // Top to bottom gradient
	for (var i = y; i <= y+h; i++) {
	  var inter = map(i, y, y+h, 0, 1);
	  var c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(x, i, x+w, i);
	}
  }  
  else if (axis == 'X_AXIS') {  // Left to right gradient
	for (var i = x; i <= x+w; i++) {
	  var inter = map(i, x, x+w, 0, 1);
	  var c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(i, y, i, y+h);
	}
  }
}


function setup(){
	createCanvas(canvasWidth, canvasHeight);
	//create light effect
	for(var i = 0; i< 30; i++){
		var arr = [];
		for(var j = 0; j< 50; j++){
			arr.push(random(50, i*500));
		}
		rays[i] = arr;
	}

	//set 252, 255, 130
	f1 = new Flower(random(500,700), 700, 0, random(5), color(252, 255, 130));
	f2 = new Flower(random(500,700), 700, 0, random(15), color(252, 255, 130));
	f3 = new Flower(random(100,300), 700, 0, random(15), color(252, 255, 130));
	f4 = new Flower(random(100,300), 700, 0, random(10), color(252, 255, 130));
	f5 = new Flower(random(500,700), 700, 0, random(10), color(252, 255, 130));
	f6 = new Flower(random(100,300), 700, 0, random(5), color(252, 255, 130));
	flowersList.push(f1);
	flowersList.push(f2);
	flowersList.push(f3);
	flowersList.push(f4);
	flowersList.push(f5);
	flowersList.push(f6);

	//particles in brownian motion
	//p1 = new Particle(random(canvasWidth), canvasHeight, 5, color(253, 255, 191));

	for(var i = 0; i< 10; i++){
		particles.push(new Particle(random(canvasWidth), canvasHeight, 5, color(253, 255, 191,100)));
	}

	
}

function draw(){
	c1 = color(0);
	c2 = color(0);
	// setGradient(0, 0, canvasWidth, canvasHeight, c1, c2, 'Y_AXIS');
	background(0);

	//rays
	frameRate(10);
	drawRays();

	//rainbow brush
	// drawRainbow();


	//frameRate(10);
	//mouse follower
	if(mouseX > 350 && mouseX < 480 && mouseY > 400){  //under the light
		if(redness < 200)
			redness+= 10;  //speed of heating
		else{
			//melting
			// if(mouseX != pmouseX)
			melt(mouseX-boxSize/2,mouseY+boxSize/2);
		}
	}   
	else{
		if(redness > 0)
			redness-=10;   //speed of cooling
		itsMelting = false;  //to avoid unnecessary looping
		melting = [];
	}
	c1.levels[0] = redness;
	setGradient(mouseX-boxSize/2, mouseY-boxSize/2, boxSize, boxSize, c1, c2, 'Y_AXIS');
	noStroke();
	rect(mouseX-boxSize/2, mouseY-boxSize/2, boxSize, boxSize);

	if(itsMelting){
		showDrops();
	}

	//draw flowers
	flowersList.forEach(function(element) {
		element.drawFlower();
		//console.log(element.position.y);
		if(element.position.y > 0){
			element.position = element.position.sub(element.velocity);
			// element.color.levels[1]+=20;
			// element.color.levels[2]-=2;
			element.color.levels[1]--;
			element.color.levels[2]--;
		}
		else{
			element.position.y = 700;
			element.velocity.y = random(10);
			element.color = color(252, 255, 130);
		}
	});

	//brownian motion
	particles.forEach(function(element){
		element.drawParticle();
	});

	// //draw rainbow brush
	// if(mouseIsPressed){
	// 	//brush.push([mouseX, mouseY]);
	// }
	
}

function drawRays(){
	push();
		translate(sunX, sunY);
		stroke(206, 204, 107, random(20,80));
		strokeWeight(2);
		rotate(-0.1);
		
		for(var j = 0; j< rays[raysLevel].length; j++){
			line(0, 0, 0, rays[raysLevel][j]);
			rotate(0.005);
		}

	pop();
	if(raysLevel < 4)
		raysLevel++;
	//fill(206, 204, 107, 100);
	//triangle(sunX, sunY, 200, raysLevel-100, 550, raysLevel-100);
}

function melt(x, y){
	//alert("hii");
	itsMelting = true;
	for(var i = 0; i<=boxSize; i+=10)
		melting.push([x+i, y]);
}

function showDrops(){
	for(var i = 0; i< melting.length; i++){
		fill(200, 0, 0);
		ellipse(melting[i][0], melting[i][1], 2, 2);
		if(melting[i][1] < 700)
			melting[i][1]+=random(5,20);
	}
}

class Flower{
	constructor(x, y, velX, velY, c){
		//this.x = x;
		//this.y = y;
		this.position = createVector(x,y);
		this.velocity = createVector(velX, velY);
		this.color = c;
		//console.log(this.color);
	}

	drawFlower(){
		push();
			translate(this.position.x, this.position.y);
			noStroke();
			fill(this.color);
			var center = random(10,15);
			for (var i = 0; i < 10; i ++) {
				ellipse(0, center, 5, 20);
				rotate(PI/5);
			}
		pop();
	}
}

class Particle{
	constructor(x, y, r, color){
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.trail = [[this.x,this.y]];
	}

	drawParticle(){
		fill(this.color);
		var r = this.r;
		// this.trail.forEach(function(element){
		//  ellipse(element[0], element[1], r, r);
		// });
		ellipse(this.x, this.y, this.r, this.r);
		
		if(this.y > 500){
			//console.log(this.x, this.y);
			this.y -= random(10);
			this.x += random(-5,5);
		}
		else{
			this.y = canvasHeight;
		}
		this.trail.push([this.x, this.y]);
	}
}

// function drawRainbow(){
// 	for(var i = 1; i < brush.length; i++){
// 		//stroke(255);
// 		//line(brush[i][0], brush[i][1], brush[i-1][0], brush[i-1][1]);
// 		fill(255);
// 		ellipse
// 	}
// }
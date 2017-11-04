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
}

function draw(){
	c1 = color(0);
  	c2 = color(0);
	// setGradient(0, 0, canvasWidth, canvasHeight, c1, c2, 'Y_AXIS');
	background(0);

	//rays
	frameRate(5);
	drawRays();

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

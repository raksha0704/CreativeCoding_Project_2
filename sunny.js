canvasHeight = 700;
canvasWidth = 900;

//lamp
lampX = 450;
cordLength = 30;

//window
widthWindow = 550;
heightWindow = 450;

morning = true;

//sun position
sunX = 450;
sunY = 250;
sunRadius = 75;

bulbColor = [255, 255, 255];

//buildings 
buildingsColor = [
	[50,50,50],
	[150,150,150],
	[85,85,85],
	[57,33,0],
	[40,40,40],
	[200,200,200],
	[87,33,0]
];
buildingsHeight = [50, 100, 150, 50, 70, 110, 80]
buildingsWidth = 50;

//plant
positionY = 568;

//radiating leaves
leavesDistances = [10, 20, 30, 40, 30, 20, 10, 40, 50, 20];
//leavesDistancesOriginal = [10, 20, 30, 40, 30, 20, 10, 40, 50, 20];  //cannot assign to the first array directly because only reference is copied
leaves = [];

transition = false;

darkness = 0;

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

function mousePressed(argument) {
	transition = true;
}

function setup(){
	createCanvas(canvasWidth, canvasHeight);
}

function draw(){
	//the scene of a window in a room

	//the wall
	wall();

	drawWindow();

	//draw leaves
	for(var i = 0; i < leavesDistances.length; i++){
		leaves.push(new leaf(leavesDistances[i]));
	}

	if(transition){
		//console.log(sunY);
		if(morning)
			sunset();
		else
			sunrise();
	}

	if(morning || transition){
		sun();
		if(sunY < 450){
			drawLeaves();
			rays();
		}
		
	}

	//buildings();

	drawFrame();

	blinds();

	// new Plant(225, 100, [102,200,170]).drawPlant();
	// new Plant(325, 70, [102,200,170]).drawPlant();
	// new Plant(425, 70, [102,200,170]).drawPlant();
	// new Plant(525, 100, [102,200,170]).drawPlant();
	// new Plant(625, 100, [102,200,170]).drawPlant();
	// new Plant(725, 100, [102,200,170]).drawPlant();

	// for(var i = 0; i < 10; i++){
	// 	new Plant(random(225, 700), 100, positionY, [102,200,170]).drawPlant();
	// }
	new Bush(188, [20,30,40,30,20], 20).drawBush();
	new Bush(550, [20,30,40,30,20], 20).drawBush();
	new Bush(250, [20,30,40,30,20], 20).drawBush();
	new Bush(350, [20,30,40,30,20], 20).drawBush();
	new Bush(450, [20,30,40,30,20], 20).drawBush();
	new Bush(655, [20,30,40,30,20], 20).drawBush();

	new Bush(500, [10,20,30,20,10], 20).drawBush();
	new Bush(200, [10,20,30,20,10], 20).drawBush();
	new Bush(300, [10,20,30,20,10], 20).drawBush();
	new Bush(400, [10,20,30,20,10], 20).drawBush();
	new Bush(600, [10,20,30,20,10], 20).drawBush();


	background(25,25,112,darkness);

	console.log(darkness);

	lamp();
	
	
}

function wall(){
	c1 = color(255, 230, 201);
  	c2 = color(226, 178, 122);
	setGradient(0, 0, canvasWidth, canvasHeight, c1, c2, 'Y_AXIS');
}

function lamp(){
	//cord
	stroke(0);
	strokeWeight(2);
	line(lampX, 0, lampX, cordLength);

	//holder
	fill(109, 59, 0);
	noStroke();
	triangle(lampX, cordLength, lampX - 50, cordLength + 30, lampX + 50, cordLength + 30);
	fill(201, 165, 122);
	ellipse(lampX, cordLength + 30, 96, 10);

	//bulb
	fill(bulbColor[0], bulbColor[0], bulbColor[0]);
	ellipse(lampX, cordLength + 35, 20, 20);
}

function drawWindow(){
	fill(255);
	rect(175, 120, widthWindow, heightWindow);
}

function sun(){
	fill(255, 221, 0);
	noStroke();
	ellipse(sunX, sunY, sunRadius, sunRadius);
}

function buildings() {
	for(var i = 0; i < 7; i++){
		fill(buildingsColor[i][0], buildingsColor[i][1], buildingsColor[i][2]);
		rect(178 + buildingsWidth*i, 118 + heightWindow - buildingsHeight[i], buildingsWidth, buildingsHeight[i]);
	}
}

function drawFrame(){
	strokeWeight(5);
	noFill();
	stroke(196, 163, 123);
	rect(175, 120, widthWindow, heightWindow);
}

function rays(){
	stroke(255, 227, 109, 150);
	strokeWeight(2);
	push();
		translate(sunX, sunY);
		frameRate(3);
		for(var i = 0; i < 50; i++){
			line(0, random(50, 200), 0, random(100, 300));
			rotate(0.5);
		}
	pop();
}

function blinds(){
	//bar
	fill(200);
	noStroke();
	rect(160, 110, 580, 20);
}

class Plant{
	constructor(positionX, height, color){
		this.positionX = positionX;
		this.height = height;
		this.color = color;
	}
	drawPlant(){
		console.log(positionY - this.height/4);
		push();
			translate(this.positionX, positionY - 3*this.height/4);
			for(var i = 0; i <200; i++){
				rotate(0.1)
				fill(0, random(70,120), 10, 150);
				ellipse(random(0, this.height/4), random(0, this.height/4), 10, 10);
			}
		pop();
		push();	
			translate(this.positionX, positionY - this.height/4);
			for(var i = 0; i <300; i++){
				rotate(0.1)
				fill(0, random(70,120), 10, 200);
				ellipse(random(0, this.height/4), random(0, this.height/4 + 20), 10, 10);
			}
		pop();
	}

}	


class Bush{
	constructor(startX, peaks, peakRadius){
		this.startX = startX;
		this.peaks = peaks;
		this.peakRadius = peakRadius;
	}

	drawBush(){
		fill(118, 184, 0);
		for(var i = 0; i<this.peaks.length; i++){
			stroke(51,153,0);
			ellipse(this.startX + i * 15, positionY - this.peaks[i], this.peakRadius, this.peakRadius);
			//console.log(this.startX + i * 30);
			noStroke();
			rect(this.startX+ i*15 - this.peakRadius /2, positionY - this.peaks[i], this.peakRadius, this.peaks[i]);
		}
		stroke(51,153,0);
		strokeWeight(3);
		line(this.startX - this.peakRadius /2, positionY, this.startX - this.peakRadius /2 , positionY- this.peaks[0]);
		line(this.startX - this.peakRadius /2 + (this.peaks.length  - 1)* this.peakRadius, positionY, this.startX - this.peakRadius /2 + (this.peaks.length - 1) * this.peakRadius, positionY- this.peaks[this.peaks.length - 1]);
	}
}

function drawLeaves(){
	stroke(51,153,0);
	strokeWeight(2);
	push();
		translate(sunX, sunY);
		rotate(250);
		frameRate(3);
		for(var i = 0; i <leavesDistances.length; i++){   //leavesDistances.length
			//line(40, leavesDistances[i], 40,leavesDistances[i] + 10 );
			leaves[i].drawLeaf();
			if(leaves[i].distance < 200)
				leaves[i].distance += 30;
			else
				leaves[i].distance = leavesDistances[i];
			rotate(0.4);
		}
	pop();
}

class leaf{
	constructor(distance){ 
		this.distance = distance;  //distance form the sun/center
		this.length = 20;
	}

	drawLeaf(){
		noStroke();
		fill(51,153,0);
		arc(this.distance + 20, this.distance + 40, 50, 50, HALF_PI, PI, OPEN);
		//fill(51,123,0);
		//arc(this.distance - 20, this.distance + 50, 50, 50, 3*PI/2, 2*PI , OPEN);  //3*PI/2, 2*PI
	}
}

function sunset(){
	if(sunY < 500)
		sunY+=20;
	else{
		morning = false;
		transition = false;
		bulbColor = [255, 255, 76];
	}
	darkness += 5;
}

function sunrise(){
	if(sunY > 250)
		sunY-=20;
	else{
		morning =true;
		transition = false;
		bulbColor = [255, 255, 255];
	}
	darkness -= 5;
}





canvasHeight = 700;
canvasWidth = 700;

//lamp
lampX = 350;
cordLength = 30;

//window
widthWindow = 350;
heightWindow = 450;

//sun position
sunX = 350;
sunY = 250;
sunRadius = 75;

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
}

function draw(){
	//the scene of a window in a room

	//the wall
	wall();

	lamp();

	drawWindow();

	sun();

	buildings();

	drawFrame();

	rays();

	blinds();
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
	fill(255);
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
	stroke(255, 227, 109);
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

}





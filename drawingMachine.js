canvasHeight = 700;
canvasWidth = 900;

path = [];

counter = 0;

newCounter = counter;

listOfStrokes = [];

function setup(){
	createCanvas(canvasWidth, canvasHeight);
}

function mouseDragged() {
	path.push([mouseX, mouseY]);
}

function mouseReleased(){
	counter = newCounter+1;
}

function draw(){
	//background(255);
	drawMainLine();

}

function drawMainLine(){
	//draw path
	//counter will cut the path and also avoid unnecessary iterations
	for(var i = counter +1; i < path.length; i++){
		//console.log(path[i-1]);
		line(path[i-1][0], path[i-1][1], path[i][0], path[i][1]);
		newCounter = i;
		//console.log(counter, newCounter);
	}
}

function drawPattern(){

}

class oneStroke{
	constructor(){
		this.path = [];
	}
}
canvasHeight = 700;
canvasWidth = 1200;

path = [];

counter = 0;

newCounter = counter;

listOfStrokes = [];

currentStroke = 0;

var c = 0;

function setup(){
	createCanvas(canvasWidth, canvasHeight);
	listOfStrokes.push(new OneStroke());
// 	c = color(123,2,3);
// 	console.log(c[0]);
}

function mouseDragged() {
	listOfStrokes[listOfStrokes.length - 1].path.push([mouseX, mouseY]);
}

function mouseReleased(){
	listOfStrokes[listOfStrokes.length - 1].calculateSmallPath();
	listOfStrokes.push(new OneStroke());
	//counter = newCounter+1;
}

function draw(){
	//background(255);
	for(var i = 0; i<listOfStrokes.length ; i++){
		listOfStrokes[i].drawMainLine();
		//console.log();
		if(listOfStrokes[i].path.length > 0 && listOfStrokes[i].smallPathDone)
			listOfStrokes[i].drawPattern();
	}
	frameRate(20);
}


class OneStroke{
	constructor(){
		this.path = [];
		this.pathCovered = 0;
		this.smallPath = [];
		this.smallPathDone = false;
		this.ringSize = 20;
		this.strokeColor = color(0,0,0);
	}

	drawMainLine(){
		//draw path
		//counter will cut the path and also avoid unnecessary iterations
		for(var i = 1; i < this.path.length; i++){
			//console.log(path[i-1]);
			line(this.path[i-1][0], this.path[i-1][1], this.path[i][0], this.path[i][1]);
			//newCounter = i;
			//console.log(counter, newCounter);
		}
	}

	drawPattern(){
		//console.log(this.pathCovered, this.path.length);
		if(this.path.length > this.pathCovered){
			push();
				translate(this.path[this.pathCovered][0],this.path[this.pathCovered][1]);
				for(var i = 0; i < 10; i++){
					//line(0,0,10,10);
					//draw the small pattern here
					for(var j = 1; j < this.smallPath.length; j++){
						//this.strokeColor.levels[]++;
						stroke(this.strokeColor);
						//console.log(this.strokeColor);
						line(this.smallPath[j-1][0], this.smallPath[j-1][1], this.smallPath[j][0], this.smallPath[j][1]);
					}
					rotate(0.5);
				}
			pop();
		}
		if(this.pathCovered < this.path.length)
			this.pathCovered++;		
	}

	calculateSmallPath(){
		var maxX = 0;
		var maxY = 0;
		var minX = this.path[0][0];
		var minY = this.path[0][1];
		for(var i = 0; i < this.path.length; i++){
			maxX = max(maxX, this.path[i][0]);
			maxY = max(maxY, this.path[i][1]);
			minX = min(minX, this.path[i][0]);
			minY = min(minY, this.path[i][1]);
		}
		//console.log(maxX, minY);
		//map(mouseX, 0, width, 0, 100, true)
		for(var i = 0; i < this.path.length; i++){
			var x = map(this.path[i][0], minX, maxX, 0, 10, true);
			var y = map(this.path[i][1], minY, maxY, 0, 30, true);
			this.smallPath.push([x,y]);
			this.ringSize++;
		}
		console.log(this.smallPath);
		this.smallPathDone = true;

	}
}
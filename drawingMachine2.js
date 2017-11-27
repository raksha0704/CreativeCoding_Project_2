canvasHeight = 700;
canvasWidth = 1200;

counter = 0;

newCounter = counter;

listOfStrokes = [];

currentStroke = 0;

c = 0;

erase = false;

eraseCount = 0;

function setup(){
	createCanvas(canvasWidth, canvasHeight);
	listOfStrokes.push(new OneStroke());
// 	c = color(123,2,3);
// 	console.log(c[0]);
	//background(0);
}

function mouseDragged() {
	listOfStrokes[listOfStrokes.length - 1].path.push([mouseX, mouseY]);
}

function mouseReleased(){
	listOfStrokes[listOfStrokes.length - 1].calculateSmallPath();
	listOfStrokes.push(new OneStroke());
	//counter = newCounter+1;
	//erase by passing last index
}

function keyPressed(){
	erase = true;
	listOfStrokes.splice(0,listOfStrokes.length-1);

}

function eraseScreen(){
	background(255, 255, 255, 50);
	console.log("er");
}

function draw(){
	//background(255);
	for(var i = 0; i<listOfStrokes.length ; i++){
		listOfStrokes[i].drawMainLine();
		//console.log();
		if(listOfStrokes[i].path.length > 0 && listOfStrokes[i].smallPathDone && !erase){
			listOfStrokes[i].drawPattern();
			listOfStrokes[i].drawBranches();
		}
	}
	frameRate(20);

	if(erase){
		if(eraseCount < 20){
			eraseScreen();
			eraseCount++;
		}
		else{
			eraseCount = 0;
			erase = false;
		}
	}
}


class OneStroke{
	constructor(){
		this.path = [];  //points on the main stroke
		this.pathCovered = 0;  //to draw the stroke slowly and not in one draw loop
		this.smallPath = [];  //refers to the small replicated path around the main stroke
		this.smallPathDone = false;  //are you done calculting the small path? then start drawing
		this.ringSize = 10;  //how big is the pattern
		this.strokeColor = color(0,0,0);
		this.mainOpacity = 1;
		this.branchPathCovered = 0;  //to draw pattern sequentially 
		// random points for the branch
		this.r1 = random(-100,100);
		this.r2 = random(-50,50);
		this.r3 = random(-50,50);
		this.r4 = random(-100,100);
		this.r5 = random(-150,150);
		this.r6 = random(-120,120);
		this.erased = false;
	}

	drawMainLine(){
		//draw path
		//counter will cut the path and also avoid unnecessary iterations
		for(var i = 1; i < this.path.length; i++){
			//console.log(path[i-1]);
			noStroke();
			//stroke(255-0.5*i, 255-0.5*i, 255-0.5*i,this.mainOpacity);
			line(this.path[i-1][0], this.path[i-1][1], this.path[i][0], this.path[i][1]);
			//newCounter = i;
			//stroke(0);
			//console.log(counter, newCounter);
		}
	}

	drawPattern(){
		//console.log(this.pathCovered, this.path.length);
		strokeWeight(1);
		if(this.path.length > this.pathCovered){  //cover the path in multiple loops and not in one go
			
			push();
				translate(this.path[this.pathCovered][0],this.path[this.pathCovered][1]);
				for(var i = 0; i < 15; i++){
					if(this.strokeColor.levels[0]<75)
						this.strokeColor.levels[0]+=0.5;
					//line(0,0,10,10);
					//draw the small pattern here
					// if(this.strokeColor.levels[0]>=255 && this.strokeColor.levels[1]<200)
					// 	this.strokeColor.levels[1]++;
					 // if(this.strokeColor.levels[1]<=255)
					 // 	this.strokeColor.levels[2]++;
					//console.log(this.strokeColor);
					for(var j = 1; j < this.smallPath.length; j++){
						stroke(this.strokeColor);
						line(this.smallPath[j-1][0], this.smallPath[j-1][1], this.smallPath[j][0], this.smallPath[j][1] + this.ringSize);
					}
					rotate(0.7);
				}
				if(this.ringSize < this.path.length)
					this.ringSize-=0.4;	
				stroke(130, 82, 40, 100);
				line(0,0,10*this.ringSize,0);
				line(0,0,-10*this.ringSize,0);
				line(0,5,10*this.ringSize,5);
				line(0,5,-10*this.ringSize,5);
			pop();
		}
		if(this.pathCovered < this.path.length)
			this.pathCovered++;	

		// for(var i = 0; i< this.path.length; i++){
		// 	push();
		// 		translate(this.path[i][0], this.path[i][1]);
		// 		stroke(200);
		// 		line(0,0,10*this.ringSize,0);
		// 		line(0,0,-10*this.ringSize,0);
		// 		line(0,5,10*this.ringSize,5);
		// 		line(0,5,-10*this.ringSize,5);
		// 	pop();	
		// }		
	}

	calculateSmallPath(){  //the path for the tiny patterns around the main stroke
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
			var x = map(this.path[i][0], minX, maxX, 0, 5, true);
			var y = map(this.path[i][1], minY, maxY, 0, 20, true);
			this.smallPath.push([x,y]);

		}
		console.log(this.smallPath);
		this.smallPathDone = true;

	}

	drawBranches(){
		noFill();
		stroke(87,33,0,10);
		strokeWeight(2);
		var x1 = this.path[0][0];
		var y1 = this.path[0][1];
		// var x2 = this.path[this.path.length-1][0];
		// var y2 = this.path[this.path.length-1][1];
		var x2 = this.path[this.branchPathCovered][0];
		var y2 = this.path[this.branchPathCovered][1];
		// var midpointX = (x1+x2)/2;
		// var midpointY = (y1+y2)/2;
		var midpointX = this.path[parseInt(this.path.length/2)][0];
		var midpointY = this.path[parseInt(this.path.length/2)][1];
		bezier(x1, y1, midpointX + this.r1, midpointY + this.r1, midpointX + 2*this.r1, midpointY+ 2*this.r1, x2, y2);
		bezier(x1, y1, midpointX + this.r2, midpointY + this.r2, midpointX + 2*this.r2, midpointY + 2*this.r2, x2, y2);
		bezier(x1, y1, midpointX + this.r3, midpointY + this.r3, midpointX + 2*this.r3, midpointY + 2*this.r3, x2, y2);
		bezier(x1, y1, midpointX + this.r4, midpointY + this.r4, midpointX + 2*this.r4, midpointY + 2*this.r4, x2, y2);


		//bezier(x1, y1, midpointX + this.r5, midpointY + this.r5, midpointX + 2*this.r5, midpointY + 2*this.r5, x2, y2);
		//bezier(x1, y1, midpointX + this.r6, midpointY + this.r6, midpointX + 2*this.r6, midpointY + 2*this.r6, x2, y2);
		if(this.branchPathCovered < this.path.length-1)
			this.branchPathCovered++;
	}

}
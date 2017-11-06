var clouds=[]; ///array clouds
cnt = 0
mult = 60
diff = 0.02

function setup() 
  {
      createCanvas(windowWidth, windowHeight); 

 
       WW = windowWidth/500;
       WH = windowHeight/10;

////q,p,r,s,t,w are objects of class wave, which are orange waves 
      q = new Wave(100,110,100,100); 
      p = new Wave(200,400,400,200);
      r = new Wave (400,200,300,150);
      s = new Wave (700,350,400,200);
      t = new Wave (900,100,160,75);
      w = new Wave (600,400,1200,800);

   } 

function draw() 
{
 
    background(109,167,255); 
    everything();
    console.log("hfff"+p.ypos);
////this instigates movement of the objects 
  
    q.ypos+=random(-20,20);
    p.ypos+=random(-20,30);
    r.ypos+=random (-20,30);
    s.ypos+=random(-20,20);
    t.ypos+=random(-20,30);
    w.ypos+=random (-20,30);
    q.xpos+= random(-20,20);
    p.xpos+=random(-20,30);
    r.xpos+=random (-20,30);
    s.xpos+= random(-20,20);
    t.xpos+=random(-20,30);
    w.xpos+=random (-20,30);


///calling method of the class using objects 
  console.log("hhh"+q.xpos);
  q.spiral();
  p.spiral();
  r.spiral();
  s.spiral();
  t.spiral();
  w.spiral();
  q.burst();
  p.burst();
  r.burst();
//b1.spiral(clouds[0]);
}

function everything()
{

  noStroke();
  fill(43,36,59,255,200);

  beginShape();
  for(var i=0; i<600; i++)
  {
   ///this produces the waves 
    vertex(WW*i, sin(cnt-mult*i)*diff+WH); 
  }
   /// produces waves according to the screen 
    vertex(WH*100, WW*0);
   /// produces waves according to the screen 
    vertex(WH*0, WW*400);
    endShape(CLOSE);
    frameRate(0.7);
  if(diff=10)
    mult = mult + 15
  if ( diff=400)
    mult = mult - 10
  }
/// this controls the height, width, x & y positions of the orange arcs 
class Wave 
{
  constructor(x,y,h,w) 
{

  this.xpos=x;
  this.ypos=y;
  this.hgt=h;
  this.wdth=w;
  
  //console.log("jjjjj");

}
 /////this produces the rising sun arcs  
spiral()
  {

   noStroke();
 
   console.log("hhhhhhhhhhhhhhhh"+this.ypos);
  if (keyIsPressed ==true) {
  background(71,1,99,100); ///changing the opacity, keeps the wavy effect in background

  fill (255,66,60,100);
 // rotate(PI/5.0);
  arc (this.xpos, this.ypos, random(10,this.hgt),  random(10,this.wdth), PI, PI);  
  arc (this.xpos+30, this.ypos, random(20,this.hgt),random(20,this.wdth), PI, TWO_PI);
  arc (this.xpos-20,this.ypos, random(30,this.hgt), random(30, this.wdth), PI, TWO_PI);
  arc (this.xpos, this.ypos, random(10,this.hgt),  random(10,this.wdth), PI, PI);
  arc (this.xpos+30, this.ypos, random(20,this.hgt),random(20,this.wdth), PI, TWO_PI);
//  translate(this.xpos+100, this.ypos+10);
 rotate(PI/0.5);
 push();
  arc (this.xpos-20,this.ypos, random(30,this.hgt), random(30, this.wdth), PI, TWO_PI);
  pop();
  }
}
///this brings the windy effect 
burst()
{
  if (mouseIsPressed ==true) 
{
  background(0,135,79,100);
  console.log("hhhhhhhhhhhhhhhh");
   for(var i = 0;  i<= mouseX; i+=20)
{
    for(var j = 0; j <= mouseY; j+=20)
{
push();
  //applyMatrix(1, 10, 10, 100, 40, 50);
translate(width*0.1,height*0.1);
rotate(frameCount/10.0);
//rotate(PI/2.0);
if (this.ypos<200) {
fill (255,189,46);
ellipse(i,j,50,5);

}
else if (this.ypos<500)
{
   translate(width*0.1,height*0.1);
rotate(frameCount/10.0);
  fill (255,18,145); 
  push();
ellipse(i,j,5,50);
pop();

            }
          }
       }
     }
  }
}
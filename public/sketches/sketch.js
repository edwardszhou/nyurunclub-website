let k = 0.03;
let restLength = 0;
let springs = [];
let axis;

class Spring {
  constructor(bob, anchor, angle) {
    this.angle = angle;
    this.bob = bob;
    this.anchor = anchor;
    this.velocity = createVector(0,0);
    this.force = createVector(0,0);
    this.visualAngle = axis.angleBetween(this.anchor);
  }
  
  update() {
    
    this.force = p5.Vector.sub(this.bob, this.anchor);
    let diff = this.force.mag() - restLength;
    this.force.normalize();
    this.force.mult(-1 * k * diff);
    
    this.velocity.add(this.force);
    this.bob.add(this.velocity);
    this.velocity.mult(0.99);
  }
  
  show() {
    strokeWeight(4);
    stroke(197, 167, 215);
    fill(255);
    
    push();
    translate(this.anchor.x, this.anchor.y);
    rotate(this.visualAngle);
    line(0, 0, this.bob.x-this.anchor.x, this.bob.x-this.anchor.x);
    circle(0, 0, 16);
    circle(this.bob.x-this.anchor.x, this.bob.x-this.anchor.x, 16);
    pop();
  }
  
}

function setup() {
  createCanvas(windowWidth * 0.4, windowHeight * 0.8);
  axis = createVector(width/2, height/2);
  
  for(let i = 0; i < 100; i++) {
    let theta = map(i, 0, 100, 0, 2*PI);
    let r = (sin(theta)*sqrt(abs(cos(theta))))/(sin(theta)+7/5)-2*sin(theta)+2;
    let x = map(r*cos(theta), -4, 4, 0, width);
    let y = map(r*sin(theta), -6, 2, height, 0);
    springs[i] = new Spring(createVector(x, y), createVector(x, y), 0);
  }
  
  
}

function draw() {
  background(88, 8, 139, 100);
  if(mouseIsPressed) {
    for(let i = 0; i < springs.length; i++) {
      springs[i].bob.add(createVector(1, 1));
      springs[i].show();
    }
  } else {
    for(let i = 0; i < springs.length; i++) {
      
      // let visualAngle = axis.angleBetween(springs[i].anchor);
      // push();
      // translate(springs[i].anchor.x, springs[i].anchor.y);
      // rotate(visualAngle);
      // springs[i].update();
      // springs[i].show();
      // pop();
      
      springs[i].update();
      springs[i].show();
    }
  }

}
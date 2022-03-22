
const LIB_VER = "1.3.2"

console.log("%c Loaded Library %cVer: %c" + LIB_VER,'background: #222; color: #bada55','background: #222','color: #0210d1; background:#222')

function LIB_TEST()
{
	

console.log("%c Loaded Library %cVer: %c" + LIB_VER,'background: #222; color: #bada55','background: #222','color: #0210d1; background:#222')
}

class AVG
{
  
  
  constructor(size)
  {
    this.size = size;  
    this.arr = [];
  }
  add(value)
  {
    if (this.arr.length < this.size)
    {
      this.arr.push(value);
    } 
    else
    {
      this.arr.splice(0,1);  
      this.arr.push(value);
    }
  }
  get()
  {
    var val = 0;
    for (var i = 0; i < this.arr.length; i++)
    {
      val+=this.arr[i];
    }
    return val/this.arr.length;
  }
}

function squareCanvas()
{
  var windowSize;
  if (windowWidth>windowHeight)
  {
    windowSize = windowHeight
  }else
  {
    windowSize = windowWidth;
  }
  createCanvas(windowSize,windowSize)
  return windowSize;
}

var prevFrames
var prevFramesMax = 50;
var FPSstart = false;
//gets frames per second, the smooth parameter will return avg of past 5 frames
function getFps(smooth = false)
{
  if (!FPSstart)
  {
    prevFrames = new AVG(prevFramesMax);
    FPSstart = true;
  }
  if (!smooth){
    return round((1000/deltaTime).toFixed(1));
  }else
  {
    prevFrames.add(getFps())
  }
  if (prevFrames.get() == Infinity)
  {
    return getFps();
  }
  return round(prevFrames.get());
}

//returns center of canvas
function getCenter()
{
  return createVector(width/2,height/2)
}

function getMousePos()
{
  return createVector(mouseX,mouseY)
}
//alias
function mousePos()
{
  return getMousePos();
}

//func for testing if 2 lines intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

  // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)
    
    return [x, y]
}

//intersect function but with vectors
function vIntersect(p1,p2,p3,p4)
{
  return intersect(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y)
}

//dist with vectors
function vDist(p1,p2)
{
  return distance(p1.x,p1.y,p2.x,p2.y)
}


function perp(px,py,x1,y1,x2,y2)
{
  let slope = atan2(y2-y1,x2-x1);
  let perpSlope = slope+radians(90);
  let perpSlope2 = slope-radians(90);
  let int1 = intersect(px,py,px+cos(perpSlope)*1000,py+sin(perpSlope)*1000,x1,y1,x2,y2)
  
  let int2 = intersect(px,py,px+cos(perpSlope2)*1000,py+sin(perpSlope2)*1000,x1,y1,x2,y2)
 
 
  if (int1 != false)
  {
    return int1;
  }else if (int2 != false)
  {
    return int2;
  }else
  {
    if (distance(px,py,x1,y1) > distance(px,py,x2,y2))
    {
      return [x2,y2];
    }else
    {
      return [x1,y1]
    }
  }
  //https://monkeyproofsolutions.nl/wordpress/how-to-calculate-the-shortest-distance-between-a-point-and-a-line/
}

function vPerp(p,c1,c2)
{
  return perp(p.x,p.y,c1.x,c1.y,c2.x,c2.y)
}

function distance(x1,y1,x2,y2)
{
  return sqrt(sq(y2-y1)+sq(x2-x1));
}

function midpoint(x1,y1,x2,y2)
{ //finds midpoint of 2 points
  //input 2 arrays or all 4 values
  var mid
  if (x2 == undefined && y2 == undefined){
    var rx2 = y1[0]
    var ry2 = y1[1]
    var rx1 = x1[0]
    var ry1 = x1[1]

    //console.log("Point1: (" + rx1 + ", " + ry1 + ")")
    //console.log("Point2: (" + rx2 + ", " + ry2 + ")")
    mid = [(rx1+rx2)/2, (ry1 + ry2)/2]
    //console.log("Midpoint: (" + mid[0] + ", " + mid[1] + ")")
    return mid
  }
  mid = [(x1+x2)/2, (y1 + y2)/2]
  return mid 
}


function vMidpoint(p1,p2)
{
  return midPoint(p1.x,p1.y,p2.x,p2.y)
}


function hpBar(x,y,wi,he,hp)
{
  var hpColors = [color('green'),color('red')]
  x -=wi/2;
  hp = constrain(hp,0,1)
  push();
  noStroke()
  fill(100);
  rect(x,y,wi,he)
  var w = map(hp,0,1,0,wi-(wi/80)*2)
  fill(50)
  rect(x+wi/80,y+he/10,wi-(wi/80)*2,he-he/10*2)
  fill(lerpColor(hpColors[0],hpColors[1],hp))
  rect(x+wi/80,y+he/10,w,he-he/10*2)
  pop();
}

function rotate_and_draw_image(img,img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

//used to calculate new hitboxes from an array of vectors
function rotateMatrix(verts,cx,cy,ang)
{
  var newVerts = []
  for (var i = 0; i < verts.length; i++)
  {
    var angle = atan2(verts[i].y-cy,verts[i].x-cx)
    angle+=ang;
    var d = distance(verts[i].x,verts[i].y,cx,cy)
    newVerts.push(createVector(cx+cos(angle)*d,cy+sin(angle)*d));
  }
  
  return newVerts;
  
}

function keyCodeDown(k)
{
  
  return keyIsDown(k)
}



function keyDown(k){
  if (key == k)
  {
    return keyIsDown(keyCode)
  }else
  {
    key = NaN;
    return false;
  }
}


var keySwitch = false;
function keyPress(k)
{
  if (key == k)
  {
    key = NaN;
    keySwitch = !keySwitch;
    return (keySwitch)
  }else
  {
    return false;
  }
}
var keySwitch2 = false;
function keyCodePress(k)
{
  if (keyCode == k)
  {
    keyCode = NaN;
    keySwitch2 = !keySwitch2;
    return (keySwitch2)
  }else
  {
    return false;
  }
}

//function to only allow a key press every n millis
var globalKeyDelay = 0
function keyDownDelay(k, delay)
{
  if (keyDown(k)&& millis() > globalKeyDelay)
  {
    globalKeyDelay = millis() + delay;
    return true;
  }else
  {
    return false;
  }
}

function keyCodeDownDelay(k, delay)
{
  if(keyIsDown(k))
  {
    return keyDownDelay(key,delay);
  }else
  {
    return false;
  }
}

//func to only allow a key press every n millis WITHOUT holding

function keyPressDelay(k,delay)
{
  if (keyPress(k)&& millis() > globalKeyDelay)
  {
    globalKeyDelay = millis() + delay;
    return true;
  }else
  {
    return false;
  }
}

function keyCodePressDelay(k,delay)
{
  if (keyCodePress(k)&& millis() > globalKeyDelay)
  {
    globalKeyDelay = millis() + delay;
    return true;
  }else
  {
    return false;
  }
}

//func that only returns true if the key is held for the entire delay

//the reset parameter when true will only return true once before having to release the key
var globalKeyHoldTimer = 0
var globalKeySuccess = false
function keyHoldDelay(k,delay,reset = false)
{
  if (keyDown(k) && globalKeySuccess)
  {
    return false;
  }
  if (keyDown(k))
  {
    if (millis() > globalKeyHoldTimer)
    {
      
      if (reset)
      {
        globalKeyHoldTimer = millis()+delay;
        globalKeySuccess = true;
      }
      return true;
    }
    return false;
    
  }else
  {
    globalKeySuccess = false;
    globalKeyHoldTimer = millis()+delay;
  }
  return false;
}


function closestObj(m,other)
{
  var closest = other[0]
  for (var i = 0; i < other.length; i++)
  {
    if (m == other[i])
    {
      continue;
    }
    if (vDist(m,other[i]) < vDist(m,closest))
    {
      closest = other[i];
    }
  }
  return closest;
}

function vGetAngle(p1,p2)
{
  return atan2(p2.y-p1.y,p2.x-p1.x);
}

function getAngle(x1,y1,x2,y2)
{
  return atan2(y2-y1,x2-x1);
}


//draw 3d line
function drawLine(x1, y1, z1, x2,y2, z2){
  beginShape();
  vertex(x1,y1,z1);
  vertex(x2,y2,z2);  
  endShape();
}

function vLine(p1,p2)
{
  line(p1.x,p1.y,p2.x,p2.y);
}
function drawRay(p1,ang,length = 50)
{
  line(p1.x,p1.y,p1.x+cos(ang)*length,p1.y+sin(ang)*length)
  return createVector(p1.x+cos(ang)*length,p1.y+sin(ang)*length)
}

function clamp(value, min, max)
{
  return constrain(value,min,max)
}

function mouseSpeed()
{
  return dist(mouseX,mouseY,pmouseX,pmouseY)
}

function date()
{
  
  return (month() + "/" + day() + "/" + year() + ", " + hour() + ":" +minute() + ":"+second());
}



function normNoise(grid)
{
  var gridSize = grid.length;
  var low = grid[0][0]
  var high = grid[0][0];
  for (var y = 0; y < gridSize; y++)
  {
    for (var x = 0; x < gridSize; x++)
    {
      if (grid[y][x] < low)
      {
        low = grid[y][x]
      }
      if (grid[y][x] > high)
      {
        high = grid[y][x];
      }
    }
  }
  return [low,high]
}


function lerpVector(c1,c2,amount)
{
  var x = (c1.x + c2.x) * amount;
  var y = (c1.y + c2.y) * amount;
  return createVector(x,y)
}

//draws an array of vectors
function drawPoly(poly, close = false)
{
  beginShape();
  for (var i = 0; i < poly.length; i++)
  {
    vertex(poly[i].x,poly[i].y)
  }
  if (close)
    endShape(CLOSE);
  else
    endShape()
}

//converts a array of vectors to an array of lines (2 vector arrays)
function vertsToLines(poly)
{
  var out = [];
  for (var i = 0; i < poly.length-1; i++)
  {
    out.push([poly[i],poly[i+1]])
  }
  out.push([poly[poly.length-1],poly[0]])
  return out;
}

//returns the closest point on a polygon to a point
function closestEdge(p,poly)
{
  
  var lines = vertsToLines(poly)
  var close = [-9999999,-9999999] //crazy far point
  for (var i = 0; i < lines.length; i++)
  {
    var po = perp(p.x,p.y,lines[i][0].x,lines[i][0].y,lines[i][1].x,lines[i][1].y)
    
    if (dist(p.x,p.y,po[0],po[1]) < dist(close[0],close[1],p.x,p.y))
    {
      close = po;
    }
  }
  return createVector(close[0],close[1]);
}


//function to find closest point on a circle to another point
//c is circle pos, size is radius
function closestEdgeCircle(p,c,size)
{
  var a = vGetAngle(c,p);
  return createVector(cos(a)*size,sin(a)*size)
}

//draws a circle
function drawCircle(p,size)
{
  circle(p.x,p.y,size)  
}

//draws a point
function drawPoint(p)
{
  point(p.x,p.y)
}


/*
Repo: https://github.com/bmoren/p5.collide2D/
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
Version v0.7.3 | June 22, 2020
CC BY-NC-SA 4.0
*/


p5.prototype._collideDebug = false;

p5.prototype.collideDebug = function(debugMode){
    _collideDebug = debugMode;
}

/*~++~+~+~++~+~++~++~+~+~ 2D ~+~+~++~+~++~+~+~+~+~+~+~+~+~+~+*/

p5.prototype.collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
};

// p5.vector version of collideRectRect
p5.prototype.collideRectRectVector = function(p1, sz, p2, sz2){
  return p5.prototype.collideRectRect(p1.x, p1.y, sz.x, sz.y, p2.x, p2.y, sz2.x,sz2.y)
}


p5.prototype.collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){         testX = rx       // left edge
  }else if (cx > rx+rw){ testX = rx+rw  }   // right edge

  if (cy < ry){         testY = ry       // top edge
  }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx,cy,testX,testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter/2) {
    return true;
  }
  return false;
};

// p5.vector version of collideRectCircle
p5.prototype.collideRectCircleVector = function(r, sz, c, diameter){
  return p5.prototype.collideRectCircle(r.x,r.y, sz.x,sz.y, c.x,c.y, diameter)
}

p5.prototype.collideCircleCircle = function (x, y,d, x2, y2, d2) {
//2d
  if( this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};


// p5.vector version of collideCircleCircle
p5.prototype.collideCircleCircleVector = function(p1,d, p2, d2){
  return p5.prototype.collideCircleCircle(p1.x,p1.y,  d, p2.x,p2.y, d2)
}


p5.prototype.collidePointCircle = function (x, y, cx, cy, d) {
//2d
if( this.dist(x,y,cx,cy) <= d/2 ){
  return true;
}
return false;
};

// p5.vector version of collidePointCircle
p5.prototype.collidePointCircleVector = function(p, c, d){
  return p5.prototype.collidePointCircle(p.x,p.y,c.x,c.y,  d)
}

p5.prototype.collidePointEllipse = function (x, y, cx, cy, dx, dy) {
  //2d
  var rx = dx/2, ry = dy/2;
  // Discarding the points outside the bounding box
  if (x > cx + rx || x < cx - rx ||y > cy + ry || y < cy - ry) {
		return false;
  }
  // Compare the point to its equivalent on the ellipse
  var xx = x - cx, yy = y - cy;
  var eyy = ry * this.sqrt(this.abs(rx * rx - xx * xx)) / rx;
  return yy <= eyy && yy >= -eyy;
};

// p5.vector version of collidePointEllipse
p5.prototype.collidePointEllipseVector = function(p, c, d){
  return p5.prototype.collidePointEllipse(p.x,p.y,c.x,c.y,d.x,d.y);
}

p5.prototype.collidePointRect = function (pointX, pointY, x, y, xW, yW) {
//2d
if (pointX >= x &&         // right of the left edge AND
    pointX <= x + xW &&    // left of the right edge AND
    pointY >= y &&         // below the top AND
    pointY <= y + yW) {    // above the bottom
        return true;
}
return false;
};

// p5.vector version of collidePointRect
p5.prototype.collidePointRectVector = function(point, p1, sz){
  return p5.prototype.collidePointRect(point.x, point.y, p1.x, p1.y, sz.x, sz.y);
}

p5.prototype.collidePointLine = function(px,py,x1,y1,x2,y2, buffer){
  // get distance from the point to the two ends of the line
var d1 = this.dist(px,py, x1,y1);
var d2 = this.dist(px,py, x2,y2);

// get the length of the line
var lineLen = this.dist(x1,y1, x2,y2);

// since floats are so minutely accurate, add a little buffer zone that will give collision
if (buffer === undefined){ buffer = 0.1; }   // higher # = less accurate

// if the two distances are equal to the line's length, the point is on the line!
// note we use the buffer here to give a range, rather than one #
if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
  return true;
}
return false;
}

// p5.vector version of collidePointLine
p5.prototype.collidePointLineVector = function(point,p1,p2, buffer){
  return p5.prototype.collidePointLine(point.x,point.y, p1.x,p1.y, p2.x,p2.y, buffer);
}

p5.prototype.collideLineCircle = function( x1,  y1,  x2,  y2,  cx,  cy,  diameter) {
  // is either end INSIDE the circle?
  // if so, return true immediately
  var inside1 = this.collidePointCircle(x1,y1, cx,cy,diameter);
  var inside2 = this.collidePointCircle(x2,y2, cx,cy,diameter);
  if (inside1 || inside2) return true;

  // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = this.sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / this.pow(len,2);

  // find the closest point on the line
  var closestX = x1 + (dot * (x2-x1));
  var closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = this.collidePointLine(closestX,closestY,x1,y1,x2,y2);
  if (!onSegment) return false;

  // draw a debug circle at the closest point on the line
  if(this._collideDebug){
    this.ellipse(closestX, closestY,10,10);
  }

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = this.sqrt( (distX*distX) + (distY*distY) );

  if (distance <= diameter/2) {
    return true;
  }
  return false;
}

// p5.vector version of collideLineCircle
p5.prototype.collideLineCircleVector = function( p1,  p2,  c,  diameter){
  return p5.prototype.collideLineCircle( p1.x,  p1.y,  p2.x,  p2.y,  c.x,  c.y,  diameter);
}
p5.prototype.collideLineLine = function(x1, y1, x2, y2, x3, y3, x4, y4,calcIntersection) {

  var intersection;

  // calculate the distance to intersection point
  var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    if(this._collideDebug || calcIntersection){
      // calc the point where the lines meet
      var intersectionX = x1 + (uA * (x2-x1));
      var intersectionY = y1 + (uA * (y2-y1));
    }

    if(this._collideDebug){
      this.ellipse(intersectionX,intersectionY,10,10);
    }

    if(calcIntersection){
      intersection = {
        "x":intersectionX,
        "y":intersectionY
      }
      return intersection;
    }else{
      return true;
    }
  }
  if(calcIntersection){
    intersection = {
      "x":false,
      "y":false
    }
    return intersection;
  }
  return false;
}


// p5.vector version of collideLineLine
p5.prototype.collideLineLineVector = function(p1, p2, p3, p4, calcIntersection){
  return p5.prototype.collideLineLine(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, calcIntersection);
}

p5.prototype.collideLineRect = function(x1, y1, x2, y2, rx, ry, rw, rh, calcIntersection) {

  // check if the line has hit any of the rectangle's sides. uses the collideLineLine function above
  var left, right, top, bottom, intersection;

  if(calcIntersection){
     left =   this.collideLineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh,true);
     right =  this.collideLineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh,true);
     top =    this.collideLineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry,true);
     bottom = this.collideLineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh,true);
     intersection = {
        "left" : left,
        "right" : right,
        "top" : top,
        "bottom" : bottom
    }
  }else{
    //return booleans
     left =   this.collideLineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
     right =  this.collideLineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
     top =    this.collideLineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
     bottom = this.collideLineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  }

  // if ANY of the above are true, the line has hit the rectangle
  if (left || right || top || bottom) {
    if(calcIntersection){
      return intersection;
    }
    return true;
  }
  return false;
}

// p5.vector version of collideLineRect
p5.prototype.collideLineRectVector = function(p1, p2, r, rsz, calcIntersection){
  return p5.prototype.collideLineRect(p1.x, p1.y, p2.x, p2.y, r.x, r.y, rsz.x, rsz.y, calcIntersection);
}

p5.prototype.collidePointPoly = function(px, py, vertices) {
  var collision = false;

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable back and forth
    if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}

// p5.vector version of collidePointPoly
p5.prototype.collidePointPolyVector = function(p1, vertices){
  return p5.prototype.collidePointPoly(p1.x, p1.y, vertices);
}

// POLYGON/CIRCLE
p5.prototype.collideCirclePoly = function(cx, cy, diameter, vertices, interior) {

  if (interior === undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // check for collision between the circle and a line formed between the two vertices
    var collision = this.collideLineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,diameter);
    if (collision) return true;
  }

  // test if the center of the circle is inside the polygon
  if(interior === true){
    var centerInside = this.collidePointPoly(cx,cy, vertices);
    if (centerInside) return true;
  }

  // otherwise, after all that, return false
  return false;
}

// p5.vector version of collideCirclePoly
p5.prototype.collideCirclePolyVector = function(c, diameter, vertices, interior){
  return p5.prototype.collideCirclePoly(c.x, c.y, diameter, vertices, interior);
}

p5.prototype.collideRectPoly = function( rx, ry, rw, rh, vertices, interior) {
  if (interior == undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = vertices[current];    // c for "current"
    var vn = vertices[next];       // n for "next"

    // check against all four sides of the rectangle
    var collision = this.collideLineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh);
    if (collision) return true;

    // optional: test if the rectangle is INSIDE the polygon note that this iterates all sides of the polygon again, so only use this if you need to
    if(interior === true){
      var inside = this.collidePointPoly(rx,ry, vertices);
      if (inside) return true;
    }
  }

  return false;
}

// p5.vector version of collideRectPoly
p5.prototype.collideRectPolyVector = function(r, rsz, vertices, interior){
  return p5.prototype.collideRectPoly(r.x, r.y, rsz.x, rsz.y, vertices, interior);
}

p5.prototype.collideLinePoly = function(x1, y1, x2, y2, vertices) {

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<vertices.length; current++) {

    // get next vertex in list if we've hit the end, wrap around to 0
    next = current+1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position extract X/Y coordinates from each
    var x3 = vertices[current].x;
    var y3 = vertices[current].y;
    var x4 = vertices[next].x;
    var y4 = vertices[next].y;

    // do a Line/Line comparison if true, return 'true' immediately and stop testing (faster)
    var hit = this.collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true;
    }
  }
  // never got a hit
  return false;
}


// p5.vector version of collideLinePoly
p5.prototype.collideLinePolyVector = function(p1, p2, vertice){
  return p5.prototype.collideLinePoly(p1.x, p1.y, p2.x, p2.y, vertice);
}

p5.prototype.collidePolyPoly = function(p1, p2, interior) {
  if (interior === undefined){
    interior = false;
  }

  // go through each of the vertices, plus the next vertex in the list
  var next = 0;
  for (var current=0; current<p1.length; current++) {

    // get next vertex in list, if we've hit the end, wrap around to 0
    next = current+1;
    if (next === p1.length) next = 0;

    // get the PVectors at our current position this makes our if statement a little cleaner
    var vc = p1[current];    // c for "current"
    var vn = p1[next];       // n for "next"

    //use these two points (a line) to compare to the other polygon's vertices using polyLine()
    var collision = this.collideLinePoly(vc.x,vc.y,vn.x,vn.y,p2);
    if (collision) return true;

    //check if the either polygon is INSIDE the other
    if(interior === true){
      collision = this.collidePointPoly(p2[0].x, p2[0].y, p1);
      if (collision) return true;
      collision = this.collidePointPoly(p1[0].x, p1[0].y, p2);
      if (collision) return true;
    }
  }

  return false;
}

p5.prototype.collidePolyPolyVector = function(p1, p2, interior) {
  return p5.prototype.collidePolyPoly(p1, p2, interior);
}

p5.prototype.collidePointTriangle = function(px, py, x1, y1, x2, y2, x3, y3) {

  // get the area of the triangle
  var areaOrig = this.abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

  // get the area of 3 triangles made between the point and the corners of the triangle
  var area1 =    this.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
  var area2 =    this.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
  var area3 =    this.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

  // if the sum of the three areas equals the original, we're inside the triangle!
  if (area1 + area2 + area3 === areaOrig) {
    return true;
  }
  return false;
}

// p5.vector version of collidePointTriangle
p5.prototype.collidePointTriangleVector = function(p, p1, p2, p3){
  return p5.prototype.collidePointTriangle(p.x, p.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

p5.prototype.collidePointPoint = function (x,y,x2,y2, buffer) {
    if(buffer === undefined){
      buffer = 0;
    }

    if(this.dist(x,y,x2,y2) <= buffer){
      return true;
    }

  return false;
};

// p5.vector version of collidePointPoint
p5.prototype.collidePointPointVector = function(p1, p2, buffer){
  return p5.prototype.collidePointPoint(p1.x,p1.y,p2.x,p2.y, buffer);
}

p5.prototype.collidePointArc = function(px, py, ax, ay, arcRadius, arcHeading, arcAngle, buffer) {

  if (buffer === undefined) {
    buffer = 0;
  }
  // point
  var point = this.createVector(px, py);
  // arc center point
  var arcPos = this.createVector(ax, ay);
  // arc radius vector
  var radius = this.createVector(arcRadius, 0).rotate(arcHeading);

  var pointToArc = point.copy().sub(arcPos);

  if (point.dist(arcPos) <= (arcRadius + buffer)) {
    var dot = radius.dot(pointToArc);
    var angle = radius.angleBetween(pointToArc);
    if (dot > 0 && angle <= arcAngle / 2 && angle >= -arcAngle / 2) {
      return true;
    }
  }
  return false;
}

// p5.vector version of collidePointArc
p5.prototype.collidePointArcVector = function(p1, a, arcRadius, arcHeading, arcAngle, buffer){
  return p5.prototype.collidePointArc(p1.x, p1.y, a.x, a.y, arcRadius, arcHeading, arcAngle, buffer);
}

//Every Css color
var cssColors = ['AliceBlue',
'AntiqueWhite',
'Aqua',
'Aquamarine',
'Azure',
'Beige',
'Bisque',
'Black',
'BlanchedAlmond',
'Blue',
'BlueViolet',
'Brown',
'BurlyWood',
'CadetBlue',
'Chartreuse',
'Chocolate',
'Coral',
'CornflowerBlue',
'Cornsilk',
'Crimson',
'Cyan',
'DarkBlue',
'DarkCyan',
'DarkGoldenRod',
'DarkGray',
'DarkGrey',
'DarkGreen',
'DarkKhaki',
'DarkMagenta',
'DarkOliveGreen',
'DarkOrange',
'DarkOrchid',
'DarkRed',
'DarkSalmon',
'DarkSeaGreen',
'DarkSlateBlue',
'DarkSlateGray',
'DarkSlateGrey',
'DarkTurquoise',
'DarkViolet',
'DeepPink',
'DeepSkyBlue',
'DimGray',
'DimGrey',
'DodgerBlue',
'FireBrick',
'FloralWhite',
'ForestGreen',
'Fuchsia',
'Gainsboro',
'GhostWhite',
'Gold',
'GoldenRod',
'Gray',
'Grey',
'Green',
'GreenYellow',
'HoneyDew',
'HotPink',
'IndianRed',
'Indigo',
'Ivory',
'Khaki',
'Lavender',
'LavenderBlush',
'LawnGreen',
'LemonChiffon',
'LightBlue',
'LightCoral',
'LightCyan',
'LightGoldenRodYellow',
'LightGray',
'LightGrey',
'LightGreen',
'LightPink',
'LightSalmon',
'LightSeaGreen',
'LightSkyBlue',
'LightSlateGray',
'LightSlateGrey',
'LightSteelBlue',
'LightYellow',
'Lime',
'LimeGreen',
'Linen',
'Magenta',
'Maroon',
'MediumAquaMarine',
'MediumBlue',
'MediumOrchid',
'MediumPurple',
'MediumSeaGreen',
'MediumSlateBlue',
'MediumSpringGreen',
'MediumTurquoise',
'MediumVioletRed',
'MidnightBlue',
'MintCream',
'MistyRose',
'Moccasin',
'NavajoWhite',
'Navy',
'OldLace',
'Olive',
'OliveDrab',
'Orange',
'OrangeRed',
'Orchid',
'PaleGoldenRod',
'PaleGreen',
'PaleTurquoise',
'PaleVioletRed',
'PapayaWhip',
'PeachPuff',
'Peru',
'Pink',
'Plum',
'PowderBlue',
'Purple',
'RebeccaPurple',
'Red',
'RosyBrown',
'RoyalBlue',
'SaddleBrown',
'Salmon',
'SandyBrown',
'SeaGreen',
'SeaShell',
'Sienna',
'Silver',
'SkyBlue',
'SlateBlue',
'SlateGray',
'SlateGrey',
'Snow',
'SpringGreen',
'SteelBlue',
'Tan',
'Teal',
'Thistle',
'Tomato',
'Turquoise',
'Violet',
'Wheat',
'White',
'WhiteSmoke',
'Yellow',
'YellowGreen',
]

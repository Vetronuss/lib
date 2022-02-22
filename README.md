# lib
A p5.js library comprising of a ton of functions i use (also includes collide2d.js)
'''<script src="https://cdn.jsdelivr.net/gh/Vetronuss/lib/lib.js"></script>'''
### squareCanvas()
Creates a square canvas based on window size
### getFps([smooth])
Gets the framerate of the canvas, the smooth parameter will average past framerates
### intersect(x1, y1, x2, y2, x3, y3, x4, y4)
Returns point of intersection between 2 lines, will return false otherwise
- vIntersect(p1,p2,p3,p4) //four vectors
### perp(px,py,x1,y1,x2,y2)
Returns the closest point on a line to (px,py)
### distance(x1,y1,x2,y2)
Returns distance between 2 points
- vDist(p1,p2) //2 vectors
### midpoint(x1,y1,x2,y2)
Returns the midpoint between 2 points
- vMidpoint(p1,p2) //2 vectors
### rotateMatrix(verts,cx,cy,ang)
rotates a array of vectors
### closestObj(n, objs)
returns the closest vector to n
### getAngle(x1,y1,x2,y2)
returns the angle from (x1,y1) to (x2,y2)
- vGetAngle(p1,p2) //2 vectors
### date()
returns the date
### normNoise(grid)
returns lowest value and highest value in 2d array
### lerpVector(c1,c2,amount)
returns a vector in between c1 and c2, amount param is how far (amount = 0.5: halfway. amount = 1: c2)
### clamp(value, min, max)
returns value within min and max
## drawing functions
### hpBar(x,y,width,height,health)
Displays a colored health bar, health param should be normalized 0-1
### rotate_and_draw_image(img,img_x, img_y, img_width, img_height, img_angle)
Displays a rotated image
### drawLine(x1, y1, z1, x2, y2, z2)
draws a 3d line
- vLine(p1,p2) //2 3d vectors
### drawRay(p1,ang,[length])
draws a ray from the vector p1 in the direction of ang
## KeyBinds and stuff
### mouseSpeed()
returns mouse speed
### function keyDown(k)
returns true if key is held down
- keyCodeDown(key) //for keycode
### keyPress(k)
returns true once when key is pressed
- keyCodePress(k) //for keycode
### keyDownDelay(key, delay)
function to only allow a key press every n millis, will repeat when held
- keyCodeDownDelay(key, delay) //for keycodes
### keyPressDelay(k,delay)
function to only allow a key press every n millis WITHOUT holding
- keyCodePressDelay(k,delay) //for keycode
### keyHoldDelay(k,delay,reset = false)
function that only returns true if the key is held for the entire delay
the reset parameter when true will only return true once before having to release the key
## Other
### cssColors
an array with every css color name
### collide2d
Includes the collide2d library and functions
---

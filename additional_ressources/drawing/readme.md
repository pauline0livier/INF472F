# Drawing part

* the Example folder lets you preview the drawing mode
* the utilsDrawing.js and mouseEvents.js files allow you to retrieve the drawing functionality.

Drawing on surfaces or volumes can be useful for creating a unique shape.
In this section, the ___OrbitControls.js___ library has been modified to use the left mouse click for drawing and the right mouse click for moving the camera.

## Principle

### Reminder part 2 - Raycasting subpart 
A ray-tracing approach is used to determine the intersection of an object with a ray. For each (x,y) coordinate selected on the screen, the ray-caster creates a ray whose origin is the camera position and whose direction is the ray passing through the camera and projected at (x,y) onto the screen image plane. In this way, the user has the impression of drawing directly on the first object on which the ray is projected.

### Algorithm

A polyline is a continuous line made up of one or more segments.

Initialization: polyLine = null;

From the beginning to the end of the user's drawing gesture,

   * (xMouse, yMouse) = mouse coordinates on screen
   
   * Create a ray that passes through the camera and is projected at (xMouse, yMouse) onto the screen image plane. 
   
   * Use this ray to determine the point Pi(x,y,z): the intersection of the ray and the first intersected object. 
   
   * Add Pi to the polyline + display updated polyline


To note: the user's line is not modified by the system.


### Complementary information

* Modify line thickness
Add "linewidth:value" attribute to polyline appearance

### Explanations of the various elements of the drawingData dictionary
* drawingObjects: list containing all elements used as drawing supports 
* selectedObject: current support selected for drawing 
* line: line created by the drawing 
* drawing3DPoints: list containing the coordinates of 3D points retrieved during ray casting

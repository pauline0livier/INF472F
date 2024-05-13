# Animation

2 solutions for animating a scene:
* a call to the render() function each time the display needs updating
* an animation loop called continuously and the display is updated every dt (~25ms)

## Call the render() function
function + screen update only if needed
- need to add function call whenever scene is modified (usually after an event)

## Animation loop

```javascript

animationLoop();

function animationLoop() {

    // Javascript animation management function
    // The "animate" parameter within the requestAnimationFrame function specifies the function to be called regularly.
    requestAnimationFrame( animate );
}

// The animate function itself
//  Fonction called from requestAnimationFrame, takes as argyment the elapsed time (en ms).
function animate(time) {

    //time in seconds
    const t = time/1000;

    // Actions to perform

    // Scene rendering
    render();

    // Relaunches the animation loop
    animationLoop();
}
```
or 

``` javascript 
requestAnimationFrame( computeFrame );


function computeFrame( time ) {

    const t = time/1000;
    
    // Actions to perform

    // Scene rendering
    render();

    // Call for the next frame
    requestAnimationFrame( computeFrame );

}
```

+ no need to call the function
- continuous display update even when not needed

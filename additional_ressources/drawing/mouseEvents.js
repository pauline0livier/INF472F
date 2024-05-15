"use strict";

const mouseEvents = (function() {

  return {

    /**
     * action to perform during mouse down event
     * @param {dictionary} event 
     * @param {scene} scene 
     * @param {camera} camera 
     * @param {raycaster} raycaster 
     * @param {dictionary} screenSize .w and .h, respectively for width and height
     * @param {dictionary} drawingData 
     */
    onMouseDown: function(event, scene, camera, raycaster, screenSize, drawingData) {

      if (event.button == 0) { // activation if left click of mouse activated
        
        // Mouse coordinates on the screen
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData, scene, true);
        drawingData.enableDrawing = true;
      }

    },

    /**
     * action to perform during mouse move event
     * @param {dictionary} event 
     * @param {scene} scene 
     * @param {camera} camera 
     * @param {raycaster} raycaster 
     * @param {dictionary} screenSize 
     * @param {dictionary} drawingData 
     */
    onMouseMove: function( event, scene, camera, raycaster, screenSize, drawingData){
      
      // Mouse coordinates on the screen
      const xPixel = event.clientX;
      const yPixel = event.clientY;

      const x =  2*xPixel/screenSize.w-1;
      const y = -2*yPixel/screenSize.h+1;

      // check if drawing has been enabled
      if (drawingData.enableDrawing == true) {
        utilsDrawing.find3DPoint(raycaster, camera, x ,y, drawingData,scene, false);
      }

    },

    /**
     * action to perform during mouse up event
     * @param {event} event 
     * @param {scene} scene 
     * @param {dictionary} drawingData 
     */
    onMouseUp: function(event, scene, drawingData) {
      drawingData.enableDrawing = false;

      // check if 3D points has been recorded 
      if (drawingData.drawing3DPoints.length > 0){
        
        drawingData.selectedObject.updateMatrix();
        const matrice = drawingData.selectedObject.matrix;
        matrice.getInverse(matrice);
        drawingData.line.applyMatrix(matrice);

        // remove the scene from the scene to attach it to the plane
        scene.remove(drawingData.line);
        drawingData.selectedObject.add(drawingData.line);
        drawingData.drawing3DPoints = [];
      }

    },

  };
})();

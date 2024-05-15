"use strict";

const utilsDrawing = (function() {

  return {

    /**
     * retrieve 3D point on selected support object from the mouse coordinates
     * using raycasting on the closest objects 
     * @param {raycaster} raycaster 
     * @param {camera} camera 
     * @param {number} xPosition 
     * @param {number} yPosition 
     * @param {dictionary} drawingData 
     * @param {scene} scene 
     * @param {bool} down 
     * @returns 
     */
    find3DPoint: function(raycaster, camera, xPosition, yPosition,
        drawingData, scene, down){

      raycaster.setFromCamera(new THREE.Vector2(xPosition, yPosition), camera);

      const intersects = raycaster.intersectObjects( drawingData.drawingObjects );
      const numberOfIntersection = intersects.length;
      if( numberOfIntersection > 0.0) {

        let intersection = intersects[0];

        // differentiate between mouse down event when the selected object is set 
        // and mouse move when we continue drawing on the selected object
        if (down){

          drawingData.selectedObject = intersection.object; // selected object

        } else {

          if (intersection.object != drawingData.selectedObject){

            return;

          } 

        }

        drawingData.drawing3DPoints.push(intersection.point.clone());

        // remove the current line before recreating it 
        if (down == false && drawingData.line.is_ob){
          scene.remove(drawingData.line);
        }

        // Creation of the line following the mouse's path 
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = drawingData.drawing3DPoints;
        const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
        drawingData.line = new THREE.Line( lineGeometry, lineMaterial );
        drawingData.line.is_ob = true;
        scene.add(drawingData.line);
      }

    },


  };
})();

"use strict";

main();

function main(){

  const sceneThreeJs = {
    sceneGraph: null,
    camera: null,
    renderer: null,
    controls: null
  };

  // Drawing data
  const drawingData = {
    drawingObjects: [],
    selectedObject: null,
    enableDrawing: false,
    drawing3DPoints:[],
    line: null,
  };

  initEmptyScene(sceneThreeJs);
  init3DObjects(sceneThreeJs.sceneGraph, drawingData);

  const screenSize = {
    w:sceneThreeJs.renderer.domElement.clientWidth,
    h:sceneThreeJs.renderer.domElement.clientHeight
  };

  const raycaster = new THREE.Raycaster();

  ///////////// Mouse Events ////////////////////////////////////////////////////////////
  const wrapperMouseDown = function(event) { mouseEvents.onMouseDown(event,sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData); };
  document.addEventListener( 'mousedown', wrapperMouseDown );
 
  const wrapperMouseMove = function(event) { mouseEvents.onMouseMove(event, sceneThreeJs.sceneGraph, sceneThreeJs.camera, raycaster, screenSize, drawingData) };
  document.addEventListener( 'mousemove', wrapperMouseMove );

  const wrapperMouseUp = function(event) { mouseEvents.onMouseUp(event, sceneThreeJs.sceneGraph, drawingData); };
  document.addEventListener( 'mouseup', wrapperMouseUp );

  // launch animation 
  animationLoop(sceneThreeJs);
}

/**
 * Initialize the plane composing the scene
 * @param {sceneGraph} sceneGraph 
 * @param {dictionary} drawingData 
 */
function init3DObjects(sceneGraph, drawingData) {

  const planeGeometry = primitiveGeometry.getQuadrangleGeometry
    (new THREE.Vector3(-100.0, -50.0, 0.0), new THREE.Vector3(-100.0, 50.0, 0.0),
    new THREE.Vector3(100.0, 50.0, 0.0), new THREE.Vector3(100.0, -50.0, 0.0));
  const materialGround = new THREE.MeshLambertMaterial(
    { color: 0xC0C0C0, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeGeometry, materialGround);
  plane.name="plane";
  plane.receiveShadow = true;
  drawingData.drawingObjects.push(plane);
  sceneGraph.add(plane);

}

/**
 * Initialize the environment
 * @param {sceneThreeJs} sceneThreeJs 
 */
function initEmptyScene(sceneThreeJs) {
  sceneThreeJs.sceneGraph = new THREE.Scene();
  sceneThreeJs.sceneGraph.background = new THREE.Color(0xB0E0E6);

  sceneThreeJs.camera = sceneInit.createCamera(0.47, 0.68, 138); 

  sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);

  const spotLight1 = sceneInit.insertLight(sceneThreeJs.sceneGraph, 
      sceneThreeJs.camera.position);

  console.log(spotLight1)
  spotLight1.name = "spotLight1";

  const spotLight2 = sceneInit.insertLight(sceneThreeJs.sceneGraph, 
      new THREE.Vector3(3+sceneThreeJs.camera.position.x, 
        100+sceneThreeJs.camera.position.y, sceneThreeJs.camera.position.z));
  spotLight2.name = "spotLight2";

  sceneThreeJs.renderer = sceneInit.createRenderer();
  sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

  sceneThreeJs.controls = new THREE.OrbitControls(sceneThreeJs.camera,
    sceneThreeJs.renderer.domElement);

  window.addEventListener('resize', function(event){onResize(sceneThreeJs);}, true);
}

/**
 * called when the window is resized
 * @param {sceneThreeJs} sceneThreeJs 
 */
function onResize(sceneThreeJs) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  sceneThreeJs.camera.aspect = width / height;
  sceneThreeJs.camera.updateProjectionMatrix();

  sceneThreeJs.renderer.setSize(width, height);
}

/**
 * call the render of the scene
 * @param {sceneThreeJs} sceneThreeJs 
 */
function render(sceneThreeJs) {
  sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

/**
 * animate function that calls the update of rendering
 * @param {sceneThreeJs} sceneThreeJs 
 * @param {*} time 
 */
function animate(sceneThreeJs, time) {

  //time in second
  const t = time/1000;

  render(sceneThreeJs);
}

// Animation loop management
function animationLoop(sceneThreeJs) {
  
  requestAnimationFrame(

    // Callback function takes the elapsed time as argument
    function(timeStamp){

      // call the animate function
      animate(sceneThreeJs,timeStamp); 

      // relaunch a new request of update
      animationLoop(sceneThreeJs); 
    }

  );

}

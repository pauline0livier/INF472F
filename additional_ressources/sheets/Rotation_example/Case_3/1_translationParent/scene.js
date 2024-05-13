"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };

    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);


    animationLoop(sceneThreeJs);
}

/**
 * initialize the objects composing the scene
 * @param {sceneGraph} sceneGraph 
 */
function init3DObjects(sceneGraph) {

    // the plane under the animated objects
    const Lp = 8;
    const planeGeometry = primitiveGeometry.getQuadrangleGeometry(
        Vector3(-Lp, -2.0, -Lp), Vector3(-Lp, -2.0, Lp),
        Vector3(Lp, -2.0, Lp), Vector3(Lp, -2.0, -Lp)
    );

    const plane = new THREE.Mesh( planeGeometry, MaterialRGB(0.8, 0.8, 0.8) );
    plane.name = "plane";
    plane.receiveShadow = true;
    sceneGraph.add(plane);

    const bodyGeometry = new THREE.BoxGeometry(2.0, 5.0, 2.0);
    const body = new THREE.Mesh(bodyGeometry, MaterialRGB(0.2, 0.6, 0.8));
    body.position.set(-4.0, 0.5, 4.0);
    body.name = "body";
    body.castShadow = true;
    body.receiveShadow = true;
    sceneGraph.add(body);

    const sphereGeometry = primitiveGeometry.getSphereGeometry
        (new THREE.Vector3(0.0, 1.0, 1.25), 0.5);
    const sphere = new THREE.Mesh(sphereGeometry, MaterialRGB(0.3, 0.3, 0.3));
    sphere.name = "sphere";
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    body.add(sphere);

    const armGeometry = primitiveGeometry.getCylinderGeometry
    (Vector3(0.0, 1.0, 1.25), Vector3(0.0, 4.0, 1.25), 0.2);
    const arm = new THREE.Mesh( armGeometry, MaterialRGB(0.9, 0.5, 0.9));
    arm.name = "arm";
    arm.castShadow = true;
    arm.receiveShadow = true;
    sphere.add(arm);
}

/**
 * call the render of the scene
 * @param {scene} sceneThreeJs 
 */
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

/**
 * launch the animation
 * @param {scene} sceneThreeJs 
 * @param {number} time 
 */
function animate(sceneThreeJs, time) {

    // time in second
    const t = time/1000;

    const body = sceneThreeJs.sceneGraph.getObjectByName("body");
    const sphere = sceneThreeJs.sceneGraph.getObjectByName("sphere");

    // translation parent
    body.position.set(-4.0 + Math.sin(3.0*t), 0.5, 4);

    // Rotation of the object's center around a dynamic object
    const Tinv_sphere = new THREE.Matrix4().makeTranslation(0.0, -1.0, -1.25);
    const R_sphere = new THREE.Matrix4().makeRotationAxis(
        new Vector3(0.0,0.0,1.0), -0.01);
    const T_sphere = new THREE.Matrix4().makeTranslation(0.0, 1.0, 1.25);

    const M_sphere = new THREE.Matrix4().multiply(T_sphere)
        .multiply(R_sphere).multiply(Tinv_sphere);

    sphere.applyMatrix(M_sphere);

    render(sceneThreeJs);
}

/**
 * initializes the 3D scene without objects 
 * Creates a scene graph and addition of a camera and light 
 * Creates a render engine and link it to the HTML document
 * sets the scene control to OrbitControls
 * @param {sceneThreeJs} sceneThreeJs 
 */
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(-13,9,21);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(-3,5,10));

    const spotLight2 = new THREE.SpotLight(0xffffff,0.4);
    spotLight2.position.copy(sceneThreeJs.camera.position);

    spotLight2.castShadow = true;
    spotLight2.shadow.mapSize.width = 2048;
    spotLight2.shadow.mapSize.height = 2048;

    sceneThreeJs.sceneGraph.add(spotLight2);


    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    window.addEventListener('resize', function(event){onResize(sceneThreeJs);} );
}


/**
 * deals with the animation loop 
 * @param {sceneThreeJs} sceneThreeJs 
 */
function animationLoop(sceneThreeJs) {

    requestAnimationFrame(

        // The callback function has the elapsed time as argument 
        function(timeStamp){

            // call the animate function 
            animate(sceneThreeJs,timeStamp); 

            // relaunch a new request of update
            animationLoop(sceneThreeJs); 
        }

     );

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
 * shortens THREE.Vector3 by Vector3 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @returns THREE.Vector3(x,y,z)
 */
function Vector3(x,y,z) {
    return new THREE.Vector3(x,y,z);
}

/**
 * creates a default MeshLambertMaterial with color as argument
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns the THREE.MeshLambertMaterial of color (r,g,b)
 */
function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
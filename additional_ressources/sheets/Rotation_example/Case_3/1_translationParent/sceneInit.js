"use strict";


const sceneInit = (function () {

    return {

        /**
         * creates a basic spotlight, sets its position at p
         * and adds it to the sceneGraph
         * @param {sceneGraph} sceneGraph 
         * @param {Vector3} p 
         */
        insertLight: function (sceneGraph, p) {
            const spotLight = new THREE.SpotLight(0xffffff, 0.8);
            spotLight.position.copy(p);

            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 2048;
            spotLight.shadow.mapSize.height = 2048;

            sceneGraph.add(spotLight);
        },

        /**
         * creates a basic ambient light and adds it to the sceneGraph
         * @param {sceneGraph} sceneGraph 
         */
        insertAmbientLight: function (sceneGraph) {
            const ambient = new THREE.AmbientLight(0xffffff, 0.2);
            sceneGraph.add(ambient);
        },

        /**
         * creates a perspective camera, sets it to (x,y,z)
         * @param {number} x 
         * @param {number} y 
         * @param {number} z 
         * @returns perspective camera sets to (x,y,z)
         */
        createCamera: function (x, y, z) {
            const camera = new THREE.PerspectiveCamera(45, 
                window.innerWidth / window.innerHeight, 0.1, 500);
            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);

            return camera;
        },

        /**
         * creates the WebGLRenderer and setos to default parameters
         * @returns the resulting renderer
         */
        createRenderer: function () {
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff, 1.0);
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.Type = THREE.PCFSoftShadowMap;

            return renderer;
        },


        /**
         * linked the domElement to the corresponding htmlTag 
         * @param {domElement} domElement 
         */
        insertRenderInHtml: function (domElement) {
            const htmlTag = document.querySelector("#3DSceneDisplay");
            htmlTag.appendChild(domElement);
        },

    };

})();

"use strict";

// Calculate and return the rotation between two axes v1 and v2
// Assuming v1 and v2 are normalized:
// - Axis of rotation given by: v1 x v2 / || v1 x v2 ||
// - Angle of rotation given by: acos( <v1,v2> )
// Remark: vectors v1 and v2 are normalized in the function
// v1: start axis [Vector3]
// v2: starting axis [Vector3]
function RotationBetweenTwoAxes(v1, v2) {
    const v1n = v1.clone().normalize();
    const v2n = v2.clone().normalize();

    const axis = v1n.clone().cross(v2n).normalize();
    const angle = Math.acos( v1n.dot(v2n) );

    return new THREE.Matrix4().makeRotationAxis(axis,angle);
}

const primitiveGeometry = (function() {

    return {

        /**
         * creates the geometry of a cube of side L and sets its position to p
         * @param {Vector3} p center of the cube
         * @param {number} L side of the cube
         * @returns the cube's geometry
         */
        getCubeGeometry: function(p, L) {
            const geometry = new THREE.BoxGeometry(L, L, L);
            geometry.translate(p.x,p.y,p.z);
            return geometry;
        },

        /**
         * Creates the geometry of a revolution cylinder's of starting point p0
         * arrival point p1 and radius around the axis r
         * @param {Vector3} p0 starting point (on the cylinder's axis) 
         * @param {Vector3} p1 arrival point
         * @param {number} r radius around the axis
         * @returns the cylinder's geometry
         */
        getCylinderGeometry: function(p0, p1, r) {
            // cylinder's axis
            const u = p1.clone().sub(p0); 

            // cylinder's length
            const L = u.length(); 
            const geometry = new THREE.CylinderGeometry(r, r, L, 20);

            // default cylinder's axis vector 
            const u0 = new THREE.Vector3(0, 1, 0); 

            // rotation matrix between u0 and u
            const R = RotationBetweenTwoAxes(u0, u); 

            // Translation of the cylinder to put its base at the origin 
            // (by default, the cylinder is centered)
            geometry.translate(0, L/2, 0); 

            // Apply the rotation to the geometry
            geometry.applyMatrix(R); 

            // Translate to the starting point
            geometry.translate(p0.x, p0.y, p0.z); 

            return geometry;
        },

        /**
         * Creates the geometry of a cone of basis center p0, peak p1
         * and basis's radius r
         * @param {Vector3} p0 
         * @param {Vector3} p1 
         * @param {number} r 
         * @returns the cone's geometry
         */
        getConeGeometry: function(p0, p1, r) {

            // cone's axis
            const u = p1.clone().sub(p0); 

            // cone's length
            const L = u.length(); 
            let geometry = new THREE.ConeGeometry(r, L, 20);

            // default cone's axis
            const u0 = new THREE.Vector3(0, 1, 0); 

            // rotation matrix between u0 and u
            const R = RotationBetweenTwoAxes(u0, u); 

            // Translation of the cone to put its base at the origin 
            // (by default, the cone is centered)
            geometry.translate(0, L/2, 0); 

            // Apply the rotation to the geometry
            geometry.applyMatrix(R); 

            // Translate to the basis's center point
            geometry.translate(p0.x, p0.y, p0.z) 

            return geometry;
        },

        /**
         * Creates an arrow's geometry, that is the combinaison of 
         * a cylinder's geometry with a cone's geometry 
         * @param {Vector3} p0 starting point
         * @param {Vector3} p1 arrival point
         * @param {number} cylinderRadius  
         * @param {number} coneRadius 
         * @param {number} alpha 
         * @returns the arrow's geometry
         */
        getArrowGeometry: function(p0, p1, cylinderRadius, coneRadius, alpha) {

            // Vector p0p1
            const p01 = p1.clone().sub(p0); 

            // length of vector p0p1
            const L   = p01.length(); 

            // position of end of cylinder
            //   pi = p0 + (1-alpha) (p1-p0)
            const pi  = p0.clone().add(p01.clone().multiplyScalar(1-alpha) );

            const geometry = primitiveGeometry
                .getCylinderGeometry(p0, pi, cylinderRadius);

            geometry.merge( primitiveGeometry
                .getConeGeometry(pi, p1, coneRadius) );

            return geometry;
        },

        /**
         * Creates the geometry of a sphere defined by its center and radius
         * @param {Vector3} center
         * @param {number} radius
         * @returns the sphere's geometry
         */
        getSphereGeometry: function(center, radius) {
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            geometry.translate(center.x, center.y, center.z);

            return geometry;
        },

        /**
         * creates the geometry of a triangle defined by three points
         * @param {Vector3} p0 
         * @param {Vector3} p1 
         * @param {Vector3} p2 
         * @returns the triangle's geometry
         */
        getTriangleGeometry: function(p0, p1, p2) {

            // compute the triangle's normal
            const n = new THREE.Triangle(p0,p1,p2).normal();

            // regroup the points in an array
            const vertices = new Float32Array([
                p0.x,p0.y,p0.z,
                p1.x,p1.y,p1.z,
                p2.x,p2.y,p2.z
            ]);

            // same normal for every point, regrouped in an array
            const normal = new Float32Array([
                n.x,n.y,n.z,
                n.x,n.y,n.z,
                n.x,n.y,n.z,
            ]);

            // creates the geometry and defines the positions and normals
            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
            geometry.addAttribute('normal',new THREE.BufferAttribute(normal,3));
            return geometry;
        },


        /**
         * create the geometry of a quadrangle (plane) defined by four points
         * combines the two triangles composing the quadrangle
         * @param {Vector3} p0 
         * @param {Vector3} p1 
         * @param {Vector3} p2 
         * @param {Vector3} p3 
         * @returns the quadrangle's geometry
         */
        getQuadrangleGeometry: function(p0, p1, p2, p3) {

            const n1 = new THREE.Triangle(p0,p1,p2).normal();
            const n2 = new THREE.Triangle(p0,p2,p3).normal();

            const vertices = new Float32Array([
                p0.x, p0.y, p0.z,
                p1.x, p1.y, p1.z,
                p2.x, p2.y, p2.z,

                p0.x, p0.y, p0.z,
                p2.x, p2.y, p2.z,
                p3.x, p3.y, p3.z,
            ]);

            const normal = new Float32Array([
                n1.x, n1.y, n1.z,
                n1.x, n1.y, n1.z,
                n1.x, n1.y, n1.z,

                n2.x, n2.y, n2.z,
                n2.x, n2.y, n2.z,
                n2.x, n2.y, n2.z,
            ]);

            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
            geometry.addAttribute('normal',new THREE.BufferAttribute(normal,3));

            return geometry;
        }


    };

})();

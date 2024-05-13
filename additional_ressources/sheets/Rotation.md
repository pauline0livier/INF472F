# Local or global rotation

The position of an object is defined as the position of its center.

## Case 1: Object attached to the Scene
By default, the rotation is performed according to the object's center. 

```javascript

  objet.rotation.axe += 0.1;
```

## Object attached to a static element

### Wrong Rotation
```javascript

  objet.rotation.axe += 0.1;
```
Consequence: the object rotates around the center of the parent translating on the axis to be in the same plane as the child.

### Good Rotation
As explained in session 2, we perform a first translation to place the object at the center of its parent, then we perform the rotation and finally we translate back the object to its initial position.

```javascript
// Translation inverse
const Tinv = new THREE.Matrix4().makeTranslation(0,-1,-1.25);

//Rotation
const R = new THREE.Matrix4().makeRotationAxis(new Vector3(0,0,1), -0.01);

// Translation pour replacer l'objet à sa position initiale
const T = new THREE.Matrix4().makeTranslation( 0, 1, 1.25);

const M_objet = new THREE.Matrix4().multiply(T).multiply(R).multiply(Tinv);

objet.applyMatrix(M_objet);

```
## Case 3: Object attached to a dynamic element

### Translated parent
Here, we applied the same approach as above, but with the added requirement to translate to the parent's center, rotate the object, and return it to its initial position.

```javascript
// Object position = Vector3(0,1,1.25)
// Inverse translation
const Tinv = new THREE.Matrix4().makeTranslation(0,-1,-1.25);

//Rotation
const R = new THREE.Matrix4().makeRotationAxis(new Vector3(0,0,1), -0.01);

// Translation pour replacer l'objet à sa position initiale
const T = new THREE.Matrix4().makeTranslation( 0, 1, 1.25);

const M_objet = new THREE.Matrix4().multiply(T).multiply(R).multiply(Tinv);

objet.applyMatrix(M_objet);

```

### Rotating parent
Choice of the center of rotation of the parent at one end E, translation of the parent to -E, rotation of the parent, and inverse translation to E

```javascript
// end position to be used as center of rotation E = Vector3(-2,-2,-2)
// Green cylinder transformation
const Tinv_green = new THREE.Matrix4().makeTranslation(-2,-2,-2);
const R_green = new THREE.Matrix4().makeRotationAxis(new Vector3(1,0,0), 0.01);
const T_green = new THREE.Matrix4().makeTranslation( 2, 2, 2);

const M_green = new THREE.Matrix4().multiply(T_green).multiply(R_green).multiply(Tinv_green);

cylinder.applyMatrix(M_green);

// red cylinder position = Vector3(2,6,2)
// Red cylinder transformation
const Tinv_red = new THREE.Matrix4().makeTranslation(-2,-6,-2);
const R_red = new THREE.Matrix4().makeRotationAxis(new Vector3(0,1,0), 0.2);
const T_red = new THREE.Matrix4().makeTranslation( 2, 6, 2);

const M_red = new THREE.Matrix4().multiply(T_red).multiply(R_red).multiply(Tinv_red);
cylinderSon.applyMatrix(M_red);
```

## Sum up
Choice of rotation center :
  * object center :
      1) (parent = Scene) => classic translation and rotation (Case 1)
      2) (parent != Scene) => need to translate object from -centre, rotation, inverse translation to return to initial position (Cases 2 and 3)

  * other position P(x,y,z) :
    translation to -P, rotation then translation to P (e.g.: green cylinder rotation for Case 3 part 2)

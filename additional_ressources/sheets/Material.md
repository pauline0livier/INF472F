# Material 
A 3D object is described by a geometry (vertices, faces, normals, etc.) and a material (color, transparency, etc.). 

## Some class attributes 

### Color 

Initialization : 

```javascript
{color:c} // c en hexa ou string ou r,g,b
```

ou 

```javascript
function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
```

Ongoing change :

 ```javascript
 material.color.set(c); // c en hexa ou string
 ```
 ou 
 
 ```javascript
 material.color.setHex(c); // c en hexa
 ```
 ou 
 
 ```javascript
 material.color.setRGB(c); // c en rgb
```

### Transparency && opacity 
opacity entre 0 (invisible) et 1 (opaque) 

Initialization : 

```javascript
{transparent: true, opacity:0.5} 
```

Ongoing change:

```javascript
material.opacity = newValue; 
```

### Side

define which face sides to render (front, back or both), default on THREE.FrontSide

Initialization : 

```javascript
{side: THREE.DoubleSide}
```

Ongoing change:

```javascript
material.side = THREE.BackSide
```

### Visible 

make the object visible or not, default on true

Initialization : 

```javascript
{visible: false}
```

Ongoing change:

```javascript
material.visible = true; 
```

## Remarks 

In the absence of an animation loop, need to call "material.needsUpdate" if Material attributes change

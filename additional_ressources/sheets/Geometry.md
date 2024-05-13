# Sum up - Geometry types

There are 2 geometry families: Geometry and BufferGeometry. 

## Type 1: Geometry 

- Easy to handle

- More costly in terms of memory + performance (not very visible for small projects)

- Data stored as instances of classes (Vector3, Vector2, Face3..etc)
so you can use the specific features of these classes

- Example: Storing vertices v0, v1, v2, v3

```javascript
verticesArray = Array[v0,v1,v2, v3]; 
console.log(verticesArray.length); //3  
```

- Conversion BufferGeometry -> Geometry 

```javascript
const geometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );
```

### Vertex modification at index 5

geometry.vertices[5] is a THREE.Vector3 so we can directly use THREE.Vector3 methods.

```javascript
geometry.vertices[5].add(new THREE.Vector3(1,2,3)); 
geometry.verticesNeedUpdate(); 
```

## Type 2: Buffer Geometry

- Difficult to handle 

- Reduces the cost of sending data 

- Data stored as vectors with sizes defined by itemSize
(e.g. itemSize = 2 for THREE.Vector2, itemSize = 3 for THREE.Vector3)

- Useful for certain transformations (spline, extrusion, etc.) 

- Example: Storing vertices v0, v1, v2, v3

```javascript
verticesArray = Float32Array[v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z]; 
console.log(verticesArray.length); // 12 (itemSize*nbVertices = 3*4); 
``` 

- Conversion Geometry -> BufferGeometry

```javascript
const bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
```

### Vertex modification at index 5

```javascript
const offset = 5 * 3 // index * itemSize
bufferGeometry.attributes.position.array[offset] += 1; 
bufferGeometry.attributes.position.array[offset+1] += 2; 
bufferGeometry.attributes.position.array[offset+2] += 3; 
bufferGeometry.attributes.position.needsUpdate = true;
```

or 

```javascript
const index = 5; 
const attribute = myGeometry.attributes.position
const v3add = new THREE.Vector3(1,2,3)

attribute.setXYZ( 
  index, 
  attribute.getX(index) + v3add.x,
  attribute.getY(index) + v3add.y,
  attribute.getZ(index) + v3add.z
)

bufferGeometry.attributes.position.needsUpdate = true;
```




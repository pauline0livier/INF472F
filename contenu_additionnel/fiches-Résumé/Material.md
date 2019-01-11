# Material 
Un objet 3D est décrit par une geométrie (vertices, faces, normales..etc) et un matériau (couleur, transparence..etc). 

## Quelques attributs de la classe 

### Color 

-> initialisation : {color:0x......}  ou 

```javascript
function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
```

-> changement en cours

 material.color.set(c); // c en hexa ou string

 material.color.setHex(c); // c en hexa

 material.color.setRGB(c); // c en rgb


### Transparent && opacity 

-> initialisation : {transparent: true, opacity:0.5} 
opacity entre 0 (invisible) et 1 (opaque) 

-> changement en cours 

material.opacity = newValue; 

### Side && ShadowSide

défini le côté des faces à rendre (front, back ou les deux), défaut sur THREE.FrontSide

-> initialisation : {side: THREE.DoubleSide}

-> changement en cours 

material.side = THREE.BackSide

### Visible 

rendre l'objet visible ou non, défaut sur true

-> initialisation : {visible: false}

-> changement en cours 

material.visible = true; 


## Remarques 

En absence de boucle d'animation, besoin d'appeler "material.needsUpdate" en cas de changement dans les attributs de Material

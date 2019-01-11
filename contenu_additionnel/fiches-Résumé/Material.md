# Material 
Un objet 3D est décrit par une geométrie (vertices, faces, normales..etc) et un matériau (couleur, transparence..etc). 

## Quelques attributs de la classe 

### Color 

Initialisation : 

{color:0x......}  ou 

```javascript
function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
```

Changement en cours :

 material.color.set(c); // c en hexa ou string

 material.color.setHex(c); // c en hexa

 material.color.setRGB(c); // c en rgb


### Transparent && opacity 
opacity entre 0 (invisible) et 1 (opaque) 

Initialisation : 
{transparent: true, opacity:0.5} 

Changement en cours :

material.opacity = newValue; 

### Side && ShadowSide

défini le côté des faces à rendre (front, back ou les deux), défaut sur THREE.FrontSide

Initialisation : 

{side: THREE.DoubleSide}

Changement en cours :

material.side = THREE.BackSide

### Visible 

rendre l'objet visible ou non, défaut sur true

Initialisation : 

{visible: false}

Changement en cours :

material.visible = true; 


## Remarques 

En absence de boucle d'animation, besoin d'appeler "material.needsUpdate" en cas de changement dans les attributs de Material

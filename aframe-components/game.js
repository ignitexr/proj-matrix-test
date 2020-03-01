

AFRAME.registerComponent('initialize-game', {
  dependencies: ['bounds'],
  init() {  
    // get the camera bounds component for positioning
    var bounds = document.querySelector('[bounds]').components.bounds;
    this.bounds = bounds; 
    this.generate_grid()    

    XR.addCameraPipelineModule({
      name: 'screenorientation',
      onDeviceOrientationChange: ({ GLctx, videoWidth, videoHeight, orientation }) => {
        const rotateScreen = document.getElementById('rotateScreen')
        if (orientation != 0) {
          rotateScreen.style.visibility = 'visible';
        }
        else {
          rotateScreen.style.visibility = 'hidden';
        }
      }
    })

    
  },    
  

  generate_grid: function()
  {
    var cameraElement = document.getElementById('camera')
    var zPos = -3

    var pos = new THREE.Vector3()
    pos = this.bounds.getTopLeft(zPos)
    // to position object at edges, multiply by scale
    var scale = .5
    pos.x += .5 * scale
    pos.y -= .5 * scale   
    console.log('top-left position from function call: ', pos)

    var tlGrid = document.createElement('a-entity');
    tlGrid.setAttribute('gltf-model', '#texGrid')
    tlGrid.setAttribute('scale', { x: scale, y: scale, z: 1})
    tlGrid.object3D.position.copy(pos)
    cameraElement.appendChild(tlGrid);
    var bbox = new THREE.Box3().setFromObject(tlGrid.object3D);

    pos = this.bounds.getTopRight(zPos)
    var trGrid = document.createElement('a-entity');
    trGrid.setAttribute('gltf-model', '#texGrid')
    trGrid.object3D.position.copy(pos)
    cameraElement.appendChild(trGrid);

    pos = this.bounds.getBotLeft(zPos)
    var blGrid = document.createElement('a-entity');
    blGrid.setAttribute('gltf-model', '#texGrid')
    blGrid.object3D.position.copy(pos)
    cameraElement.appendChild(blGrid);

    pos = this.bounds.getBotRight(zPos)
    var brGrid = document.createElement('a-entity');
    brGrid.setAttribute('gltf-model', '#texGrid')
    brGrid.object3D.position.copy(pos)
    cameraElement.appendChild(brGrid);


  },
})

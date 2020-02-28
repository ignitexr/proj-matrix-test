var TOP = 0
var LEFT = 0
var RIGHT = 0
var DEPTH = 0
var BOTTOM = 0

AFRAME.registerComponent('initialize-game', {
  init() {
    this.camera = this.el.sceneEl.camera
    if (!this.el.sceneEl || !this.el.sceneEl.camera) {
      console.log('skipping')
      return
    }
    this.getTopLeftDir = () => {      
      this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)

      var direction = new THREE.Vector3(-1, 1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      TOP = direction.y
      LEFT = direction.x
      DEPTH = direction.z
    }
    this.getTopRightDir = () => {
      this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)

      var direction = new THREE.Vector3(1, 1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      TOP = direction.y
      RIGHT = direction.x
      DEPTH = direction.z
    }
    this.getBotLeftDir = () => {      
      this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)

      var direction = new THREE.Vector3(-1, -1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      BOTTOM = direction.y
      LEFT = direction.x
      DEPTH = direction.z
    }
    this.getBotRightDir = () => {      
      this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)

      var direction = new THREE.Vector3(1, -1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      BOTTOM = direction.y
      RIGHT = direction.x
      DEPTH = direction.z
    }

    this.handleChange = () => {
      console.log('got change')
      setTimeout(() => {
        console.log('doing')
        this.getTopLeftDir()
        this.getTopRightDir()
        this.getBotLeftDir()
        this.getBotRightDir()
        this.generate_grid()
      }, 300)
    }

    this.el.sceneEl.addEventListener('loaded', this.handleChange)
    this.el.sceneEl.addEventListener('realityready', this.handleChange)
    window.addEventListener('resize', this.handleChange)

    
  },
  remove() {
    this.el.sceneEl.removeEventListener('loaded', this.handleChange)
    this.el.sceneEl.removeEventListener('realityready', this.handleChange)
    window.removeEventListener('resize', this.handleChange)
  },
  getTopLeft: function(zpos) {
    const position = new THREE.Vector3(LEFT / DEPTH * zpos , TOP / DEPTH * zpos, zpos)      
    return position
  },
  getTopRight: function(zpos) {
    const position = new THREE.Vector3(RIGHT / DEPTH * zpos , TOP / DEPTH * zpos, zpos)      
    return position
  },
  getBotLeft: function(zpos) {
    const position = new THREE.Vector3(LEFT / DEPTH * zpos , BOTTOM / DEPTH * zpos, zpos)      
    return position
  },
  getBotRight: function(zpos) {
    const position = new THREE.Vector3(RIGHT / DEPTH * zpos , BOTTOM / DEPTH * zpos, zpos)      
    return position
  },

  generate_grid: function()
  {
    var cameraElement = document.getElementById('camera')
    var zPos = -3

    var pos = new THREE.Vector3()
    pos = this.getTopLeft(zPos)    
    console.log('top-left position from function call: ', pos)

    var tlGrid = document.createElement('a-entity');
    tlGrid.setAttribute('gltf-model', '#texGrid')
    tlGrid.object3D.position.copy(pos)
    cameraElement.appendChild(tlGrid);

    pos = this.getTopRight(zPos)
    var trGrid = document.createElement('a-entity');
    trGrid.setAttribute('gltf-model', '#texGrid')
    trGrid.object3D.position.copy(pos)
    cameraElement.appendChild(trGrid);

    pos = this.getBotLeft(zPos)
    var blGrid = document.createElement('a-entity');
    blGrid.setAttribute('gltf-model', '#texGrid')
    blGrid.object3D.position.copy(pos)
    cameraElement.appendChild(blGrid);

    pos = this.getBotRight(zPos)
    var brGrid = document.createElement('a-entity');
    brGrid.setAttribute('gltf-model', '#texGrid')
    brGrid.object3D.position.copy(pos)
    cameraElement.appendChild(brGrid);
  },
})
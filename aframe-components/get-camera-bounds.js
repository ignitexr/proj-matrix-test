// this component uses the camera projection matrix to find the dimensions of the viewport
// the functions set the direction of the corners, which can then be used later to get the 
// relative positions of corners based on the z-position desired

AFRAME.registerComponent('bounds', {
  init() {
    this.camera = this.el.sceneEl.camera
    if (!this.el.sceneEl || !this.el.sceneEl.camera) {
      console.log('skipping')
      return
    }
    this.getBoundingDirs = () => { 
      // get the camera projection matrix inverse to calculate the direction
      // the direction vectors are from 1 to -1 x and y, so -1 is the left and bottom, +1 is right and top      
      this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)

      var direction = new THREE.Vector3(-1, 1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      this.TOP = direction.y
      this.LEFT = direction.x
      this.DEPTH = direction.z

      direction = new THREE.Vector3(1, 1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      this.RIGHT = direction.x
      
      direction = new THREE.Vector3(-1, -1, 1).applyMatrix4(this.camera.projectionMatrixInverse).setLength(5)
      this.BOTTOM = direction.y
    }
  
    this.handleChange = () => {
      console.log('got change')
      setTimeout(() => {
        console.log('doing')
        this.getBoundingDirs()
        const game = document.getElementById('game')
        game.setAttribute('initialize-game', '')
      }, 300)
    }

    this.el.sceneEl.addEventListener('realityready', this.handleChange)
    window.addEventListener('resize', this.handleChange)

    
  },
  getTopLeft: function(zpos) {
    const position = new THREE.Vector3(this.LEFT / this.DEPTH * zpos , this.TOP / this.DEPTH * zpos, zpos)      
    return position
  },
  getTopRight: function(zpos) {
    const position = new THREE.Vector3(this.RIGHT / this.DEPTH * zpos , this.TOP / this.DEPTH * zpos, zpos)      
    return position
  },
  getBotLeft: function(zpos) {
    const position = new THREE.Vector3(this.LEFT / this.DEPTH * zpos , this.BOTTOM / this.DEPTH * zpos, zpos)      
    return position
  },
  getBotRight: function(zpos) {
    const position = new THREE.Vector3(this.RIGHT / this.DEPTH * zpos , this.BOTTOM / this.DEPTH * zpos, zpos)      
    return position
  },
});
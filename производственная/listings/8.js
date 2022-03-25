methods: {
    requestRender() {
      if (!this.renderRequested) {
        this.renderRequested = true
        requestAnimationFrame(this.render)
      }
    },

    render() {
      this.renderRequested = false
      this.composer.render()
      this.model?.traverse( child => {
        if (child.isMesh) {
          const uniforms = child.material.uniforms
          if (uniforms) {
            uniforms.u_worldMatrix.value = child.matrixWorld
            uniforms.u_viewProjectionMatrix.value = new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
            if (uniforms.u_viewPosition) uniforms.u_viewPosition.value = this.camera.getWorldPosition(new THREE.Vector3())
            if (uniforms.u_worldInverseTransposeMatrix) uniforms.u_worldInverseTransposeMatrix.value =
              new THREE.Matrix4().setFromMatrix3(new THREE.Matrix3().getNormalMatrix(child.matrixWorld))
          }
        }
      })
      this.controls.update()
    },

    renderLimitedFrames(frames = 60, afterRender = () => {}) {
      if (frames > 0) requestAnimationFrame(() => {
        this.render()
        this.renderLimitedFrames(frames - 1, afterRender)
      })
      else afterRender()
    }
}
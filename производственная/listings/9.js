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
          if (uniforms) // ... ligth and camera/mesh positions recompute
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
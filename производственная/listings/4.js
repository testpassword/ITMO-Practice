watch: {
    //...

    isParamsMenuVisible: {
      immediate: true,
      handler() { if (this.isParamsMenuVisible === true) document.getElementById("paramsHolder").appendChild(this.propEditor.domElement) }
    }

    //...
}

handleMeshOrEnvChange() {
    this.swapScene(this.propEditor?.save())
    this.propEditor?.destroy()
    this.propEditor = new GUI({ autoPlace: false })
    this.propEditor.domElement.childNodes[0].remove()
}

const fillPropertyEditor = (material, uniforms, propEditor, callback, state) => {
    const PARAM_TYPE = {
        ZERO_TO_ONE: Symbol('ZERO_TO_ONE'),
        COLOR: Symbol('COLOR'),
        NUMERIC: Symbol('NUMERIC')
    }
    const addUniformParam = (folder, paramType, uniformName, customParamName, from, to, step) => {
      const p = uniforms[uniformName]
      if (p) {
        const paramName = customParamName ?? uniformName.replaceAll('_', ' ').split(' ').map(capitalize).join(' ')
        switch (paramType) {
          case PARAM_TYPE.ZERO_TO_ONE:
            folder.add(p, 'value', 0, 1).step(0.0001).name(paramName).onChange( () => callback() )
            break
          case PARAM_TYPE.COLOR:
            folder.addColor(new ColorGUIController(uniforms, uniformName), 'value').name(paramName).onChange( () => callback() )
            break
          case PARAM_TYPE.NUMERIC:
            folder.add(uniforms[uniformName], 'value', from, to).step(step).name(paramName).onChange( () => callback() )
            break
        }
      }
    }
    const base = propEditor.addFolder('Base')
    addUniformParam(base, PARAM_TYPE.ZERO_TO_ONE, 'base')
    //...
    propEditor.add({ reset() { propEditor.reset() } }, 'reset').name('Reset')
    if (state) propEditor.load(state)
  }
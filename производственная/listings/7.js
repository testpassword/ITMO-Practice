// function for sending data from iframe to parent
Vue.prototype.$notifyParent = (msg = '', type = 'notification/error') => {
    window?.parent?.postMessage(JSON.stringify({ msg, type }), process.env.VUE_APP_FRONTEND_URL)
}

// example of usage
const mtlxMaterial = await this.catchingLoadMaterial()
if (!Converter.isMtlx(mtlxMaterial)) {
  this.$notifyParent(new Error(`Material '${this.materialPath}' not found on server`))
  new FallbackMaterial(core, doc)
} else if (Converter.getMaterialVersion(mtlxMaterial) < 1.38) {
  this.$notifyParent(new Error('3D mode supports only materials version 1.38 or above'))
  new FallbackMaterial(core, doc)
} else await core.readFromXmlString(doc, mtlxMaterial)

// handling in parent
window.addEventListener(
    'message', 
    e => {
        if (event.origin === process.env.VUE_APP_URL_VIEWER) {
            const data = JSON.parse(event.data);
            this.$store.dispatch(data.type, data.msg)
        }
    }, 
    false
)
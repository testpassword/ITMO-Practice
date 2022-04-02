import { Group, Object3D, LineSegments, WireframeGeometry, LineBasicMaterial } from "three"
import 'core-js/actual/array/group-by'

[Group, Object3D].forEach( it =>
  it.prototype.wireframe = function(color = 'black') {
  return this.clone(true).apply( s =>
    s.traverse( child => {
      if (child.isMesh) {
        const wireframe = new LineSegments(
          new WireframeGeometry(child.geometry),
          new LineBasicMaterial({ color: color })
        )
        child.add(wireframe)
        child.parent?.attach(wireframe)
        child.parent?.remove(child)
      }
    })
  )
})
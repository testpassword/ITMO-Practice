import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { CylinderGeometry, Mesh, PlaneGeometry } from "three"

const GLTF_LOADER = new GLTFLoader()
GLTF_LOADER.setDRACOLoader(new DRACOLoader())

const BASE_MESHES_PATH = 'public/meshes/'

const loadFromFS = async name =>
  new Promise(resolve => GLTF_LOADER.load(`${BASE_MESHES_PATH}${name}.glb`, resolve))
    .then( mesh => mesh.scene )

const getPreviewPaths = name => ({
  previewPath: `${BASE_MESHES_PATH}${name}_preview.png`,
  previewPathSelected: `${BASE_MESHES_PATH}${name}_preview_selected.png`
})

const MESHES_FACTORY = [
  {
    name: 'Sphere',
    builder: async () => loadFromFS('sphere'),
    ...getPreviewPaths('sphere')
  },
  {
    name: 'Shaderball',
    builder: () => loadFromFS('shaderball'),
    ...getPreviewPaths('shaderball')
  },
  {
    name: 'Cylinder',
    builder: () => new Mesh(new CylinderGeometry(0.4, 0.4, 1.68, 60)),
    ...getPreviewPaths('cylinder')
  },
  {
    name: 'Cloth',
    builder: () => loadFromFS('cloth'),
    ...getPreviewPaths('cloth')
  },
  {
    name: 'Plane',
    builder: () => new Mesh(new PlaneGeometry(5, 5)),
    ...getPreviewPaths('plane')
  }
]

export { MESHES_FACTORY }

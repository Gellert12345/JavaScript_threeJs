import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//egeres irányíthatóság:
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement) //canvas element létrehozása

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

//egeres irányítás:
const orbit = new OrbitControls(camera,renderer.domElement)
orbit.update()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
camera.position.set(-10,30,30)

//plane geometry = ?
const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    side: THREE.DoubleSide //minda 2 db oldala ugyan az lesz
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -0.5 * Math.PI;

//egyszerü doboz létrehozás:

const boxGeometry = new THREE.BoxGeometry() //box skeleton
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00}) //kinézete/fedés
const box = new THREE.Mesh(boxGeometry,boxMaterial)//össze mixelés
scene.add(box,plane)
/* sima basic elforgatás
box.rotation.x = 5;
box.rotation.y = 5;
*/

//egyszerű gömb létrehozása:(sphere)
const sphereGeomerty = new THREE.SphereGeometry(4,10,10) //ahogy növeljük az utolsó 2 db érétket annál részletesebb lesz
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: false //hogy csak a váza/keret látszódjon
})
const sphere = new THREE.Mesh(sphereGeomerty,sphereMaterial)
sphere.position.set(-10,10,0) //vizszintesen -10,függelegesen +10 zindex 0

//gui dolog:
const gui = new dat.GUI()

const option = {
    sphereColor: "#ffea00"
}
gui.addColor(option,"sphereColor").onChange(function(e){
    sphere.material.color.set(e) //az "e" tárolja a szín pontos típusát
})

scene.add(box,plane,sphere)
scene.background = new THREE.Color(0x222222)
const gridHelper = new THREE.GridHelper(30,100)
scene.add(gridHelper)


function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//egeres irányíthatóság:
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader, Wireframe } from "three/examples/jsm/Addons.js";

//árnyékok enegedéjezése:
renderer.shadowMap.enabled = true;

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
plane.receiveShadow = true; //legyen árnyéka!

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
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false //hogy csak a váza/keret látszódjon
})
const sphere = new THREE.Mesh(sphereGeomerty,sphereMaterial)
sphere.position.set(-10,10,0) //vizszintesen -10,függelegesen +10 zindex 0
sphere.castShadow = true;
//fényelés:
const amibnetLight = new THREE.AmbientLight(0x333333)
scene.add(amibnetLight)

/**
 

const directionLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
scene.add(directionLight)

//árnyék segiító létrhwtozésa
const dLigthShadowHelper = new THREE.CameraHelper(directionLight.shadow.camera)
scene.add(dLigthShadowHelper)



const dLightHelper = new THREE.DirectionalLightHelper(directionLight,5)
scene.add(dLightHelper)
directionLight.position.set(-30,50,0)
directionLight.castShadow = true
directionLight.shadow.camera.bottom = -12


//gui dolog:
const gui = new dat.GUI()
*/




//bounce:
let step = 0;



//szín választás
const option = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01
}
gui.addColor(option,"sphereColor").onChange(function(e){
    sphere.material.color.set(e) //az "e" tárolja a szín pontos típusát
})
//anyag választás:
gui.add(option,"wireframe").onChange(function(e) {
    sphere.material.wireframe = e;e
})
gui.add(option,"speed",0,0.1)




scene.add(box,plane,sphere)
scene.background = new THREE.Color(0x222222)
const gridHelper = new THREE.GridHelper(30,100)
scene.add(gridHelper)


function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    //föl le mozog
    step += option.speed;
    sphere.position.y = 10* Math.abs(Math.sin(step)) //hogyan és milyen tengelyen mozógjon

    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()


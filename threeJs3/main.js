import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//egeres irányíthatóság:
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader, Wireframe } from "three/examples/jsm/Addons.js";


//háttér importálása:

import nebula from "../src/img/background.png" //import utáni név az egy változó amit brmikor meg lehet hívni a kódba!
import stars from "../src/img/stars.jpeg"
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

*/

//háttér betöltése és változó létrehozása:
const texturaloader = new THREE.TextureLoader()
//scene.background =  texturaloader.load(stars) //texturreloader változóba betöltöjük a hátteret!!
//3d hátásu háttér mert a háttér is csak egy kocka valójába:

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([ // 6 odal mert a kockának 6 oldal van xd
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars

])
/* 
//kocka aminek hasonlóan töljük fel a texturáját mint backgroundnak!!:
const box2Geometry = new THREE.BoxGeometry(4,4,4)
const box2Material = new THREE.MeshBasicMaterial({
    map: texturaloader.load(nebula) 
})
const box2 = new THREE.Mesh(box2Geometry,box2Material)
scene.add(box2)
*/

/* ugyan ez mint itt csak minden oldalnak külön képet adunk texturnának!*/
const box2Geometry = new THREE.BoxGeometry(4,4,4)
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: texturaloader.load(stars)}),
    new THREE.MeshBasicMaterial({map: texturaloader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: texturaloader.load(stars)}),
    new THREE.MeshBasicMaterial({map: texturaloader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: texturaloader.load(stars)}),
    new THREE.MeshBasicMaterial({map: texturaloader.load(nebula)})
]
const box2 = new THREE.Mesh(box2Geometry,box2MultiMaterial)
scene.add(box2)
//gui dolog:
const gui = new dat.GUI()

const spotLight = new THREE.SpotLight(0xFFFFFF)
scene.add(spotLight)
spotLight.position.set(-100,100,0)
const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)
spotLight.castShadow = true
spotLight.angle = 0.2;


//minnél messzebb van valami annál homályosabb lesz:
//scene.fog = new THREE.Fog(0xFFFFFF,0,200) //0,200 => hogy meddig látszdójon vmi

//arányosított:
scene.fog = new THREE.FogExp2(0xFFFFFF,0.01)



//bounce:
let step = 0;



//szín választás
const option = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
}
gui.addColor(option,"sphereColor").onChange(function(e){
    sphere.material.color.set(e) //az "e" tárolja a szín pontos típusát
})
//anyag választás:
gui.add(option,"wireframe").onChange(function(e) {
    sphere.material.wireframe = e;e
})
gui.add(option,"speed",0,0.1)

gui.add(option,"angle",0,1)
gui.add(option,"penumbra",0,1)
gui.add(option,"intesity",0,1)




scene.add(box,plane,sphere)
scene.background = new THREE.Color(0x222222)
const gridHelper = new THREE.GridHelper(30,100)
scene.add(gridHelper)


//egére lekövetés:
const mousePosition = new THREE.Vector2()
window.addEventListener("mousemove",function(e){
    mousePosition.x = (e.clientX / window.innerWidth) *2 -1;
    mousePosition.y =n (e.clientY / window.innerHeight) *2 +1;
})
const raycaster = new THREE.Raycaster()

//3d object id gyűjtés:
const SphereId = sphere.id

//box name adás a hover effect-hez
box2.name = "theBox";




function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    //föl le mozog
    step += option.speed;
    sphere.position.y = 10* Math.abs(Math.sin(step)) //hogyan és milyen tengelyen mozógjon

    spotLight.angle = option.angle;
    spotLight.penumbra = option.penumbra;
    spotLight.angle = option.angle;
    sLightHelper.update() //mert mindig változik a nézet és igazodini kell hozzá a ligth helpernek is!!


    //mouse szar vmi:
    raycaster.setFromCamera(mousePosition,camera) //raycaster gyűjti az adatokat(camera = camera pozícióját is gyűjti)
    const intersects = raycaster.intersectObject(scene.children)
    for(let i = 0;i < intersects.length;i++) {
        if (intersects[i].object.id === sphere.id)
            intersects[i].object.material.color.set(0xFF0000)
        //hover effect => rotate:
        if(intersects[i].object.name === "theBox") {
            intersects[i].object.rotation.x = time/1000;
            intersects[i].object.rotation.y = time/1000;
        }
    }

    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()


//threeJs importálása:
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js" //url api
//import hogy be tudjam tölteni a 3dmodelt:
import {GLTFLoader} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight, //hogy akkora legyen a látótér mint a kijelző 1/1
    0.1,
    1000 //szampk =mekkora távolságba és közelségbe lásson max a camera
)
camera.position.z = 13; //hátrébb kell vinni a camerát hogy jobban lássukl a dolgokat

//scene ami tárolja a modelt,fények stb stb
const scene = new THREE.Scene(); //ebbe fogunk minden vissza tölteni
let bee;
const loader = new GLTFLoader() //meghívjuk az UrlApi-t
loader.load("3d-animation.2/demon_bee_full_texture.glb",
    function(gltf){/*fuction mikor teljesen betölt a model!*/
        bee = gltf.scene //kirakom a kijelzőre
        scene.add(bee)
    }, 
    function(xhr){/*user látja a betöltés folyamatát*/

    },
    function(error){
        
    }
);
const renderer = new THREE.WebGLRenderer({alpha: true}) //webgl api meghivása
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("container3D").appendChild(renderer.domElement)

//model fényezés:
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3) //fény színe és erőssége
const topLight = new THREE.DirectionalLight()
scene.add(ambientLight)

//3d model kirajozlása:
const reRenderer3D = () => {
    requestAnimationFrame(reRenderer3D) //ha nem tudja lerenderelni vissza dobja a fuctionba hogy ujra probalja
    renderer.render(scene,camera)
}
reRenderer3D()
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "#00ff00" } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0,-1,0)
scene.add( cube );

const geoSphere = new THREE.SphereGeometry( 1, 30, 30 );
const matSphere = new THREE.MeshBasicMaterial( { color: "#0000ff" } );
const sphere = new THREE.Mesh( geoSphere, matSphere );
sphere.position.set(0,1,0)
scene.add( sphere );

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry( 0.5, 2, 1 ),
    new THREE.MeshBasicMaterial( { color: "#ff0000" } )
)
cube2.position.set(2,0,0)
scene.add(cube2)


camera.position.z = 5;

function animate() {
    renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.z += 0.01;
}
renderer.setAnimationLoop( animate );

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const initScene = () => {
 const scene = new THREE.Scene();
  
  // Добавляем освещение для зеркальных эффектов
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

    
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    document.body.appendChild(renderer.domElement);
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    return { scene, camera, renderer };
};


const loadGLTFModel = (scene, modelPath) => {
    // Создаем индикатор загрузки
    const loadingElement = document.createElement('div');
    loadingElement.style.position = 'absolute';
    loadingElement.style.top = '20px';
    loadingElement.style.left = '20px';
    loadingElement.style.color = 'white';
    loadingElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    loadingElement.style.padding = '10px';
    loadingElement.style.borderRadius = '5px';
    loadingElement.textContent = 'Loading model...';
    document.body.appendChild(loadingElement);
    
    const loader = new GLTFLoader();
    
    loader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene);
            loadingElement.textContent = 'Model loaded successfully!';
            setTimeout(() => {
                document.body.removeChild(loadingElement);
            }, 2000);
            
            // Центрируем модель
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            gltf.scene.position.sub(center);
        },
        (xhr) => {
            // Прогресс загрузки
            const percentLoaded = (xhr.loaded / xhr.total * 100).toFixed(2);
            loadingElement.textContent = `Loading ${percentLoaded}%`;
        },
        (error) => {
            console.error('Error loading GLTF model:', error);
            loadingElement.textContent = 'Failed to load model!';
            setTimeout(() => {
                document.body.removeChild(loadingElement);
            }, 3000);
        }
    );
};

const main = () => {
    const { scene, camera, renderer } = initScene();
    const envTexture = new THREE.CubeTextureLoader()
        .setPath('https://threejs.org/examples/textures/cube/pisa/')
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
    envTexture.encoding = THREE.sRGBEncoding;
    scene.background = envTexture;
    scene.environment = envTexture;


    // Добавляем OrbitControls для удобного просмотра
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Загружаем GLTF модель (укажите правильный путь)
    loadGLTFModel(scene, './car-peugeot_206/scene.gltf');
    
    
    
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();
};

main();

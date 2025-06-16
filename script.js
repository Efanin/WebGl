import * as THREE from 'three'

const initScene = () => {
    const scene = new THREE.Scene()
    const ambientLight = new THREE.AmbientLight("#000000")
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight("#ffffff", 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    document.body.appendChild(renderer.domElement)
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
    return { scene, camera, renderer }
}

const prefab = () => {
    const group = new THREE.Group()

    const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 32, 32),
        new THREE.MeshStandardMaterial({ 
        color: "#ddddff",
        emissive: "#4444ff",
        shininess: 100
    }))
    sphere1.position.set(0, 3, 0)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshStandardMaterial({ 
        color: "#ffddff",
        emissive: "#4444ff",
        shininess: 100
    }))
    cube1.position.set(0, 0, 0)


    group.add(sphere1,cube1)

    return group
}


const main = () => {
    const { scene, camera, renderer } = initScene()

    const prefab1 = prefab()
    scene.add(prefab1)

    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    let rotationSpeed = 0.02

    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true
        previousMousePosition = { 
        x: e.clientX, 
        y: e.clientY 
        }
    })

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        
        const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
        }
        prefab1.rotation.z += deltaMove.x * rotationSpeed
        prefab1.rotation.x += deltaMove.y * rotationSpeed
        previousMousePosition = {
        x: e.clientX,
        y: e.clientY
        }
    })

    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false
    })

    renderer.domElement.addEventListener('mouseleave', () => {
        isDragging = false
    })

    const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()
}

main()

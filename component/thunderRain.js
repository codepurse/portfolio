import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThunderRain = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cloudParticlesRef = useRef([]);
  const rainRef = useRef(null);
  const rainGeoRef = useRef(null);
  const flashRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    cameraRef.current = camera;

    // Add ambient light
    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Add lightning flash
    const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);
    flashRef.current = flash;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create rain particles
    const rainCount = 15000;
    const positions = [];
    const sizes = [];
    const rainGeo = new THREE.BufferGeometry();

    for (let i = 0; i < rainCount; i++) {
      positions.push(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      sizes.push(30);
    }

    rainGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    rainGeo.setAttribute(
      'size',
      new THREE.BufferAttribute(new Float32Array(sizes), 1)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true,
    });

    const rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);
    rainRef.current = rain;
    rainGeoRef.current = rainGeo;

    // Load cloud texture and create clouds
    const loader = new THREE.TextureLoader();
    loader.load(
      'https://static.vecteezy.com/system/resources/previews/010/884/548/original/dense-fluffy-puffs-of-white-smoke-and-fog-on-transparent-background-abstract-smoke-clouds-movement-blurred-out-of-focus-smoking-blows-from-machine-dry-ice-fly-fluttering-in-air-effect-texture-png.png',
      (texture) => {
        const cloudGeo = new THREE.PlaneGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
        });

        for (let p = 0; p < 25; p++) {
          const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.6;
          cloudParticlesRef.current.push(cloud);
          scene.add(cloud);
        }

        // Start animation after clouds are loaded
        animate();
      }
    );

    // Animation loop
    const animate = () => {
      // Rotate clouds
      for (const cloud of cloudParticlesRef.current) {
        cloud.rotation.z -= 0.002;
      }

      // Animate rain falling
      if (rainRef.current) {
        rainRef.current.position.z -= 0.222;
        if (rainRef.current.position.z < -200) {
          rainRef.current.position.z = 0;
        }
      }

      // Lightning flash effect
      if (flashRef.current) {
        if (Math.random() > 0.93 || flashRef.current.power > 100) {
          if (flashRef.current.power < 100) {
            flashRef.current.position.set(
              Math.random() * 400,
              300 + Math.random() * 200,
              100
            );
          }
          flashRef.current.power = 50 + Math.random() * 500;
        } else {
          // Gradually decay the flash intensity
          flashRef.current.power *= 0.95;
        }
      }

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Remove event listener
      window.removeEventListener('resize', handleResize);

      // Dispose of geometries and materials
      if (rainGeoRef.current) {
        rainGeoRef.current.dispose();
      }

      if (rainRef.current) {
        rainRef.current.material.dispose();
      }

      // Dispose cloud geometries and materials
      for (const cloud of cloudParticlesRef.current) {
        if (cloud.geometry) cloud.geometry.dispose();
        if (cloud.material) {
          if (cloud.material.map) cloud.material.map.dispose();
          cloud.material.dispose();
        }
      }

      // Dispose renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement) {
          rendererRef.current.domElement.remove();
        }
      }

      // Clear scene
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ThunderRain;


import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RainScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
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

    // Lighting
    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Enhanced lightning flash system
    const flash = new THREE.PointLight(0x062d89, 0, 1000, 2);
    flash.position.set(200, 300, 100);
    scene.add(flash);
    
    // Additional lightning flashes for more dramatic effect
    const flash2 = new THREE.PointLight(0x4a90e2, 0, 800, 2);
    flash2.position.set(-150, 350, 150);
    scene.add(flash2);
    
    const flash3 = new THREE.PointLight(0x8b9dc3, 0, 600, 2);
    flash3.position.set(100, 400, -100);
    scene.add(flash3);
    
    // Create lightning bolt geometry for visual effect
    const lightningGeometry = new THREE.BufferGeometry();
    const lightningMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4a90e2, 
      transparent: true,
      opacity: 0 
    });
    const lightningLine = new THREE.Line(lightningGeometry, lightningMaterial);
    scene.add(lightningLine);
    
    // Lightning timing and state variables
    let lightningActive = false;
    let lightningTimer = 0;
    let lightningDuration = 0;
    let nextLightningTime = Math.random() * 5000 + 3000; // 3-8 seconds between flashes

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Set background color to pure black
    renderer.setClearColor(0x0a0a0a); // Pure black
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Rain setup
    const rainCount = 100;
    const positions = [];
    const sizes = [];
    const rainGeo = new THREE.BufferGeometry();

    for (let i = 0; i < rainCount; i++) {
      positions.push(Math.random() * 400 - 200);
      positions.push(Math.random() * 500 - 250);
      positions.push(Math.random() * 400 - 200);
      sizes.push(30);
    }

    rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    rainGeo.setAttribute(
      "size",
      new THREE.BufferAttribute(new Float32Array(sizes), 1)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true
    });

    const rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);

    // Cloud setup
    const cloudParticles = [];
    const loader = new THREE.TextureLoader();
    
    loader.load(
      "https://static.vecteezy.com/system/resources/previews/010/884/548/original/dense-fluffy-puffs-of-white-smoke-and-fog-on-transparent-background-abstract-smoke-clouds-movement-blurred-out-of-focus-smoking-blows-from-machine-dry-ice-fly-fluttering-in-air-effect-texture-png.png",
      function (texture) {
        const cloudGeo = new THREE.PlaneGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });

        for (let p = 0; p < 10; p++) {
          const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.4;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      }
    );

    // Animation function
    const animate = (time) => {
      cloudParticles.forEach((p) => {
        p.rotation.z -= 0.002;
      });

      // Update rain sizes
      if (rainGeo.attributes.size) {
        const sizes = rainGeo.attributes.size.array;
        for (let i = 0; i < sizes.length; i++) {
          sizes[i] += 0.3;
        }
        rainGeo.attributes.size.needsUpdate = true;
      }

      // Move rain
      rain.position.z -= 0.222;
      if (rain.position.z < -200) {
        rain.position.z = 0;
      }

      // Enhanced lightning effect with proper timing
      const deltaTime = time - (animate.lastTime || time);
      animate.lastTime = time;
      
      if (!lightningActive) {
        nextLightningTime -= deltaTime;
        if (nextLightningTime <= 0) {
          lightningActive = true;
          lightningTimer = 0;
          lightningDuration = Math.random() * 200 + 100; // 100-300ms flash duration
          
          // Randomize flash positions for more natural lightning
          flash.position.set(
            Math.random() * 600 - 300,
            200 + Math.random() * 300,
            Math.random() * 400 - 200
          );
          flash2.position.set(
            Math.random() * 500 - 250,
            250 + Math.random() * 350,
            Math.random() * 300 - 150
          );
          flash3.position.set(
            Math.random() * 400 - 200,
            300 + Math.random() * 400,
            Math.random() * 500 - 250
          );
          
          // Set initial flash intensity
           flash.intensity = Math.random() * 80 + 20;
           flash2.intensity = Math.random() * 60 + 15;
           flash3.intensity = Math.random() * 40 + 10;
           
           // Create lightning bolt visual effect
           createLightningBolt();
         }
       } else {
         lightningTimer += deltaTime;
         
         // Create flickering effect during lightning
         if (lightningTimer < lightningDuration) {
           // Random flicker for more realistic lightning
           if (Math.random() > 0.7) {
             flash.intensity = Math.random() * 100 + 30;
             flash2.intensity = Math.random() * 80 + 20;
             flash3.intensity = Math.random() * 60 + 15;
           }
           
           // Animate lightning bolt opacity
           const progress = lightningTimer / lightningDuration;
           lightningMaterial.opacity = Math.sin(progress * Math.PI) * 0.8;
         } else {
           // End lightning flash
           flash.intensity = 0;
           flash2.intensity = 0;
           flash3.intensity = 0;
           lightningMaterial.opacity = 0;
           lightningActive = false;
           nextLightningTime = Math.random() * 5000 + 3000; // 3-8 seconds until next flash
         }
       }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Function to create lightning bolt geometry
    const createLightningBolt = () => {
      const points = [];
      const startX = Math.random() * 400 - 200;
      const startY = 400 + Math.random() * 200;
      const startZ = Math.random() * 300 - 150;
      
      points.push(new THREE.Vector3(startX, startY, startZ));
      
      // Create jagged lightning path
      let currentY = startY;
      let currentX = startX;
      let currentZ = startZ;
      
      for (let i = 0; i < 15; i++) {
        currentY -= 20 + Math.random() * 30;
        currentX += (Math.random() - 0.5) * 40;
        currentZ += (Math.random() - 0.5) * 20;
        points.push(new THREE.Vector3(currentX, currentY, currentZ));
      }
      
      // Update lightning geometry
      lightningGeometry.setFromPoints(points);
      
      // Position the lightning line
      lightningLine.position.copy(points[0]);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mount the renderer and start animation
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      animate();
      window.addEventListener('resize', handleResize);
    }

    // Cleanup function
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }} 
    />
  );
}
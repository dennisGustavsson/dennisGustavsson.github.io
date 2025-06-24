import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const HeroCanvasComponent = () => {
  const canvasRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    // console.log("Component mounted");

    // THE SCENE

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x0f34f0, 1, 8);

    // Animate fog color from blue to magenta
    gsap.to(scene.fog.color, {
      r: 1, // Magenta (1, 0, 1)
      g: 0,
      b: 7,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    let lavaMesh;
    // LOAD MODEL
    const loader = new GLTFLoader();

    //HEADS UP THIS IS NOT THE CORRECT PATH TO THE MODEL

    // const modelPath = "/portfolio-v2/untitleddonut2.glb";
    // const modelPath = "/portfolio-v2/src/assets/untitled.glb";
    // const modelPath = "/portfolio-v2/src/assets/untitleddonut2.glb";
    const modelPath = import.meta.env.BASE_URL + "assets/untitled.glb";
    loader.load(modelPath, function (gltf) {
      lavaMesh = gltf.scene;
      scene.add(lavaMesh);
      lavaMesh.scale.set(1, 1, 1);
      lavaMesh.position.set(0, 0, 0);
    });

    // SIZE
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // THE CAMERA
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 3;

    // THE LIGHT
    // // Add a HemisphereLight for soft, natural fill
    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222233, 1000);
    // scene.add(hemiLight);

    // // Optionally, add a little ambient light for even softer shadows
    // const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    // scene.add(ambient);
    // THE RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);

    // RESIZE
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableRotate = true;

    const handleScroll = () => {
      // console.log("scroll event triggered");
      scrollPositionRef.current = window.scrollY;
      // console.log("Scroll position:", scrollPositionRef.current);
      const rotationAngle = scrollPositionRef.current * 0.0001;
      // console.log("Rotation angle:", rotationAngle);
      controls.target.set(
        Math.sin(rotationAngle) * 5,
        camera.position.y,
        Math.cos(rotationAngle) * 5
      );
      controls.update();
      // console.log("controls.target:", controls.target);
    };

    document.addEventListener("scroll", handleScroll);
    // console.log("Scroll event listener added");

    // ANIMATE
    const loop = () => {
      controls.update();

      if (lavaMesh) {
        lavaMesh.rotation.x += 0.0011; // Rotate on x-axis
      }
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();

    // TIMELINE
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

    // Cleanup function
    return () => {
      document.removeEventListener("scroll", handleScroll);
      // console.log("Scroll event listener removed");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="webgl"></canvas>

      <nav></nav>
      <h1 className="title">DENNIS GUSTAVSSON</h1>

      {/* Add scrollable content */}
      {/* <div style={{ height: "200vh" }}></div> */}
    </>
  );
};

export default HeroCanvasComponent;

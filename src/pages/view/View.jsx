import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";

function View(props) {
  const { character } = props;

  const threeCanvas = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, specular: 0x474747 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    scene.add(plane);

    plane.receiveShadow = true;

    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(3, 0, 3);

    const cameraTarget = new THREE.Vector3(0, 40, 0);

    scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

    function addShadowedLight(x, y, z, color, intensity) {
      const directionalLight = new THREE.DirectionalLight(color, intensity);
      directionalLight.position.set(x, y, z);
      scene.add(directionalLight);

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = -d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = -d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = -0.002;
    }

    addShadowedLight(1, 1, 1, 0xffffff, 3.5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeCanvas.current.innerHTML = "";
    threeCanvas.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new STLLoader();

    loader.load("../test-model.stl", function (geometry) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xd5d5d5,
        specular: 0x494949,
        shininess: 200,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, -0.37, -0.6);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(2, 2, 2);

      scene.add(mesh);
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }

    function render() {
      const timer = Date.now() * 0.0005;

      camera.position.x = Math.cos(timer) * 200;
      camera.position.z = Math.sin(timer) * 200;

      camera.lookAt(cameraTarget);

      renderer.render(scene, camera);
    }

    console.log("Use effect");
    animate();
  }, []);

  return (
    <div>
      <div id="three-scene" ref={threeCanvas} />
      <p>{JSON.stringify(character)}</p>
    </div>
  );
}

function ViewWrapper() {
  const character = useLoaderData();

  return <View character={character} />;
}

export default ViewWrapper;

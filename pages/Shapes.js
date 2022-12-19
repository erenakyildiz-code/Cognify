import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { transition } from "./settings";
import { Canvas, useThree } from "@react-three/fiber";
import { useSmoothTransform } from "./useSmoothTransform";
import * as THREE from 'three'

const material = new THREE.MeshPhongMaterial({
    wireframe: false
  })
  
  const data = { v: -64 }
  
  export function Squirkle(n) {
      const g = new THREE.OctahedronGeometry(1, 16)
      const p = g.attributes.position.array
  
      for (let i = 0; i < p.length; i += 3) {
          const v = new THREE.Vector3(p[i], p[i + 1], p[i + 2])
          v.x = Math.tanh(v.x)
          v.y = Math.tanh(v.y)
          v.z = Math.tanh(v.z)
          p[i] = THREE.MathUtils.lerp(p[i], v.x, n)
          p[i + 1] = THREE.MathUtils.lerp(p[i + 1], v.y, n)
          p[i + 2] = THREE.MathUtils.lerp(p[i + 2], v.z, n)
      }
      return (g);
  }
  
export function Shapes({ isHover, isPress, mouseX, mouseY }) {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  const [locationOfExtremeStuff, setLocationExtremeStuff] = useState(0);
  const [sizeOfExtremeStuff, setSizeOfExtremeStuff] = useState();

  useEffect(() => {
    
    const {innerWidth, innerHeight} = window;
    if (innerWidth < 600 && innerWidth > 400){
      setLocationExtremeStuff(-3.5)
      setSizeOfExtremeStuff(0.03)
    }
    else{
      setSizeOfExtremeStuff(0.07)
    }
    
  });
  return (
    <Canvas className="radialGrad" style={{width:"100vw",height:"100vh", position:"absolute",zIndex:"0"}} shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group
        
      
          center={[0, 0, 0]}
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group>
        <motion.group
        initial={{x:-20 ,opacity:0}}
        animate={{
            x:locationOfExtremeStuff,
            opacity:1
          }}
          transition={{
            duration: 1.5,
            times: [0,  1],
            ease: "easeInOut",
          }}
        >
        <motion.group
        initial={{ scale: 0.07 ,x:4}}
        animate={{
            scale:[sizeOfExtremeStuff,sizeOfExtremeStuff],
            rotateY: [0,  360],
            rotateZ:[0,0]
          }}
          transition={{
            duration: 180,
            times: [0,  1],
            repeat: Infinity,
            ease: "linear",
          }}
          dispose={null}
        >
            <Sphere></Sphere>
            <Torus></Torus>
            
        </motion.group>
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
}

export function Lights() {
  return (
    <>
      <spotLight color="#fff" position={[-10, -10, -10]} intensity={0.2} />
      
      <spotLight color="#fff" position={[0, -10, -10]} intensity={0.02} />
    </>
  );
}

export function Sphere() {
  return (
    <motion.mesh position={[0, 0, 0]}>
      <motion.mesh  args={[Squirkle(-64) ,material]}></motion.mesh>
      <Material />
    </motion.mesh>
  );
}

export function Torus() {
    return (
      <motion.mesh
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <torusGeometry  args={[50, 4, 100, 100]} />
        <Material />
      </motion.mesh>
    );
  }
  
  
export function Material() {
  return <meshPhongMaterial color="#fff"  shininess={1} />;
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }) {
  const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX]);

  return (
    <motion.perspectiveCamera
      ref={cameraRef}
      fov={10}
      position={[0, 0, 50]}
    />
  );
}

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;

import * as THREE from "three";
import React, { useState, Suspense, useEffect } from "react";
import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  Vector3,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

import styles from "./Photo360.module.css";

type Props = {
  src: string;
  sx?: React.CSSProperties;
  position?: Vector3;
};

export default function Photo360({
  src,
  sx = { width: 500, height: 300 },
  position = [0, 0, 2.75],
}: Props) {
  const [fov, setFov] = useState<number>(80);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleFullScreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(isFullscreen);
      }
    };
    document.addEventListener("fullscreenchange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
    };
  }, []);

  function onMouseWheel(e: React.WheelEvent<HTMLDivElement>) {
    const fovVal = Math.sign(e.deltaY) * 0.05 + fov + e.deltaY * 0.3;
    setFov(THREE.MathUtils.clamp(fovVal, 10, 80));
  }

  function Environment() {
    const { scene } = useThree();
    const texture = useLoader(THREE.TextureLoader, src);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;

    useFrame((state: any) => {
      state.camera.fov = fov;
      state.camera.updateProjectionMatrix();
    });

    return null;
  }

  return (
    <div
      className={
        isFullscreen
          ? `${styles.photoWrapper} ${styles.fullscreen}`
          : styles.photoWrapper
      }
      style={sx}
    >
      <Canvas
        camera={{ position: position, fov: fov }}
        flat={true}
        linear={true}
        onWheel={onMouseWheel}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableDamping
            enableZoom={false}
            enablePan={false}
            dampingFactor={0.05}
            rotateSpeed={-0.3}
          />
          <Environment />
        </Suspense>
      </Canvas>
      <div className={styles.controlsWrapper}>
        <span onClick={handleFullScreen}>
          {isFullscreen ? (
            <AiOutlineFullscreenExit
              className={styles.btnControl}
              style={{ margin: 10 }}
            />
          ) : (
            <AiOutlineFullscreen className={styles.btnControl} />
          )}
        </span>
      </div>
    </div>
  );
}

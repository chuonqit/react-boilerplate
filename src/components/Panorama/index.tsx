import React, { useState, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { Html, Loader, OrbitControls } from "@react-three/drei";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";

import "./Panorama.css";

type Props = {
  src: string;
  width?: string | number;
  height?: string | number;
};

const Panorama = ({ src, width = "600px", height = "300px" }: Props) => {
  const [fov, setFov] = useState<number>(80);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const exitFullScreen = () => {
    if (!document.fullscreenElement) {
      setIsFullScreen(isFullScreen);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitFullScreen);
    return () => {
      document.removeEventListener("fullscreenchange", exitFullScreen);
    };
  }, []);

  const Environment = () => {
    const { scene } = useThree();
    const texture = useLoader(THREE.TextureLoader, src);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;

    useFrame((state: any) => {
      state.camera.fov = fov;
      state.camera.updateProjectionMatrix();
    });

    return null;
  };

  const onMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const fovVal = Math.sign(e.deltaY) * 0.05 + fov + e.deltaY * 0.3;
    setFov(THREE.MathUtils.clamp(fovVal, 10, 80));
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div
      className={
        isFullScreen ? "panorama-wrapper fullscreen" : "panorama-wrapper"
      }
      style={{ width: width, height: height }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.75], fov: fov }}
        flat={true}
        linear={true}
        onWheel={onMouseWheel}
      >
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
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
      <div className="panorama-control">
        <div className="panorama-control--wrapper">
          <button className="panorama-control--btn" onClick={handleFullScreen}>
            {isFullScreen ? (
              <AiOutlineFullscreenExit className="panorama-control--btn__icon" />
            ) : (
              <AiOutlineFullscreen className="panorama-control--btn__icon" />
            )}
          </button>
          <div className="panorama-control--btn__group">
            <button
              className="panorama-control--btn"
              onClick={() => setFov(fov <= 10 ? 10 : fov - 5)}
              disabled={fov <= 10}
            >
              <AiOutlinePlus style={{ fontSize: "16px" }} />
            </button>
            <button
              className="panorama-control--btn"
              onClick={() => setFov(fov >= 80 ? 80 : fov + 5)}
              disabled={fov >= 80}
            >
              <AiOutlineMinus style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panorama;

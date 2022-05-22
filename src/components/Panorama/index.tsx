import * as THREE from "three";
import { useState, Suspense, useEffect, WheelEvent } from "react";
import { Canvas, useThree, useLoader, useFrame, Euler } from "@react-three/fiber";
import { Html, OrbitControls, Loader, useProgress } from "@react-three/drei";
import { AiOutlineExpand, AiOutlineCompress, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import "./Panorama.css";

type Props = {
  src: string;
  width?: string | number;
  height?: string | number;
};

const Panorama = ({ src, width = "600px", height = "300px" }: Props) => {
  const [fov, setFov] = useState<number>(80);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [progressActive, errors] = useProgress((state) => {
    return [state.progress, state.errors];
  });

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

    const vector = new THREE.Vector3();
    const center = new THREE.Vector3();
    const spherical = new THREE.Spherical();

    useFrame((state: any) => {
      vector.copy(state.camera.position).sub(center);
      spherical.setFromVector3(vector);
      const sphericalRotation = spherical.theta;
      setRotation(sphericalRotation);

      state.camera.fov = fov;
      state.camera.updateProjectionMatrix();
    });

    return null;
  };

  const onMouseWheel = (e: WheelEvent<HTMLDivElement>) => {
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

  return !errors.includes(src) ? (
    <div
      className={isFullScreen ? "panorama-wrapper fullscreen" : "panorama-wrapper"}
      style={{
        width: width,
        height: height,
      }}
    >
      <Canvas
        flat={true}
        linear={true}
        onWheel={onMouseWheel}
        camera={{ position: [0, 0, 2.75], fov: fov }}
      >
        <Suspense
          fallback={
            <Html>
              <Loader initialState={() => true} />
            </Html>
          }
        >
          <OrbitControls
            enableDamping
            enableZoom={false}
            enablePan={false}
            dampingFactor={0.03}
            rotateSpeed={-0.3}
          />
          <Environment />
        </Suspense>
      </Canvas>
      {progressActive === 100 && (
        <>
          <div className="panorama-control">
            <div className="panorama-control--wrapper">
              <button className="panorama-control--btn" onClick={handleFullScreen}>
                {isFullScreen ? (
                  <AiOutlineCompress className="panorama-control--btn__icon" />
                ) : (
                  <AiOutlineExpand className="panorama-control--btn__icon" />
                )}
              </button>
              <button
                className="panorama-control--btn"
                onClick={() => setFov(fov <= 10 ? 10 : fov - 7)}
                disabled={fov <= 10}
              >
                <AiOutlinePlus className="panorama-control--btn__icon" />
              </button>
              <button
                className="panorama-control--btn"
                onClick={() => setFov(fov >= 80 ? 80 : fov + 7)}
                disabled={fov >= 80}
              >
                <AiOutlineMinus className="panorama-control--btn__icon" />
              </button>
            </div>
          </div>
          <div className="panorama-radar" style={{ transform: `rotate(${rotation}rad)` }}>
            <i></i>
            <i></i>
          </div>
          {/* <div className="panorama-scan" style={{ transform: `rotate(${rotation}rad)` }}></div> */}
        </>
      )}
    </div>
  ) : null;
};

export default Panorama;

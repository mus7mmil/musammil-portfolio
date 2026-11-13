import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    // Graceful check for WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        console.warn("WebGL not supported on this device. Disabling 3D scene.");
        return;
      }
    } catch {
      return;
    }

    const containerDiv = canvasDiv.current;
    const rect = containerDiv.getBoundingClientRect();
    const container = {
      width: rect.width || window.innerWidth,
      height: rect.height || window.innerHeight,
    };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    // Cap devicePixelRatio to 1.5 to prevent GPU buffer exhaustion and WebGL Context Lost
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.width, container.height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerDiv.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Mesh | THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let animationFrameId: number = 0;
    let isDisposed = false;
    let isContextLost = false;
    let activeChar: THREE.Object3D | null = null;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));

    let hasTriggeredLoaded = false;
    const triggerProgressLoaded = () => {
      if (!hasTriggeredLoaded && !isDisposed) {
        hasTriggeredLoaded = true;
        progress.loaded();
      }
    };

    // Safety timeout: ensure progress loader completes even on slow or degraded connections
    const safetyTimeout = window.setTimeout(() => {
      triggerProgressLoaded();
    }, 4500);

    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const onResizeHandler = () => {
      if (!isDisposed && activeChar) {
        handleResize(renderer, camera, canvasDiv, activeChar);
      }
    };

    loadCharacter()
      .then((gltf) => {
        if (!gltf || isDisposed) {
          triggerProgressLoaded();
          return;
        }

        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          animations.hover(gltf, hoverDivRef.current);
        }
        mixer = animations.mixer;
        const charScene = gltf.scene;
        activeChar = charScene;
        scene.add(charScene);

        headBone =
          charScene.getObjectByName("spine006") ||
          charScene.getObjectByName("spine.006") ||
          null;

        screenLight =
          (charScene.getObjectByName("screenlight") as THREE.Mesh) || null;

        triggerProgressLoaded();
        window.clearTimeout(safetyTimeout);

        setTimeout(() => {
          if (!isDisposed) {
            light.turnOnLights();
            animations.startIntro();
          }
        }, 1200);

        window.addEventListener("resize", onResizeHandler);
      })
      .catch((err) => {
        console.warn("Character 3D load error:", err);
        triggerProgressLoaded();
      });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    let debounceTimer: number | undefined;
    const onTouchMoveHandler = (e: TouchEvent) => {
      handleTouchMove(e, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounceTimer = window.setTimeout(() => {
        element?.addEventListener("touchmove", onTouchMoveHandler, {
          passive: true,
        });
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    // WebGL Context Lost handling
    const domElement = renderer.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
      console.warn("WebGL Context Lost. Halting render loop.");
      cancelAnimationFrame(animationFrameId);
    };

    const handleContextRestored = () => {
      console.info("WebGL Context Restored. Resuming render loop.");
      isContextLost = false;
      animate();
    };

    domElement.addEventListener("webglcontextlost", handleContextLost, false);
    domElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
      false
    );

    const onVisibilityChange = () => {
      if (!document.hidden && !isDisposed && !isContextLost) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      if (isDisposed || isContextLost || document.hidden) return;
      animationFrameId = requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(safetyTimeout);
      if (debounceTimer) clearTimeout(debounceTimer);

      window.removeEventListener("resize", onResizeHandler);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }

      domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost,
        false
      );
      domElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored,
        false
      );

      scene.clear();
      renderer.dispose();

      if (containerDiv.contains(domElement)) {
        containerDiv.removeChild(domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;

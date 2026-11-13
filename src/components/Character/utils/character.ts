import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile, isCryptoSubtleSupported } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const setupCharacter = async (gltf: GLTF): Promise<GLTF> => {
    const character = gltf.scene;
    await renderer.compileAsync(character, camera, scene);
    character.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    setCharTimeline(character, camera);
    setAllTimeline();

    const footR =
      character.getObjectByName("footR") ||
      character.getObjectByName("foot.R");
    const footL =
      character.getObjectByName("footL") ||
      character.getObjectByName("foot.L");

    if (footR) footR.position.y = 3.36;
    if (footL) footL.position.y = 3.36;

    dracoLoader.dispose();
    return gltf;
  };

  const loadCharacter = async (): Promise<GLTF | null> => {
    // 1. Direct, high-speed, zero-crypto-dependency load of character.glb
    try {
      return await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            try {
              const readyGltf = await setupCharacter(gltf);
              resolve(readyGltf);
            } catch (setupErr) {
              reject(setupErr);
            }
          },
          undefined,
          (err) => reject(err)
        );
      });
    } catch (directErr) {
      console.warn(
        "Direct GLB load failed, trying encrypted model fallback:",
        directErr
      );

      // 2. Encrypted fallback if crypto.subtle is available
      if (isCryptoSubtleSupported()) {
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          return await new Promise<GLTF>((resolve, reject) => {
            loader.load(
              blobUrl,
              async (gltf) => {
                try {
                  const readyGltf = await setupCharacter(gltf);
                  URL.revokeObjectURL(blobUrl);
                  resolve(readyGltf);
                } catch (setupErr) {
                  reject(setupErr);
                }
              },
              undefined,
              (err) => reject(err)
            );
          });
        } catch (encErr) {
          console.error("Encrypted model fallback also failed:", encErr);
          return null;
        }
      } else {
        console.warn(
          "crypto.subtle is not supported in this non-secure context; cannot decrypt character.enc."
        );
        return null;
      }
    }
  };

  return { loadCharacter };
};

export default setCharacter;

import React from "react";

import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Model = (props) => {
  const model = useLoader(GLTFLoader, props.path);

  // Here's the animation part
  // *************************
  let mixer;
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    // mixer.timeScale=1 // slow down to an hour
    mixer.timeScale = 0.01666666666; // slow down to an hour
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
      mixer.setTime(props.time);
    });
  }

  useFrame((state, delta) => {
    mixer?.update(delta);
  });
  // *************************

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  return (
    <primitive
      position={props.position}
      object={model.scene}
      scale={props.scale}
    />
  );
};

export default Model;

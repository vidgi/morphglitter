import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import { Wave } from "./Wave";
import { Glitch, EffectComposer, Pixelation, ChromaticAberration } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import {
  useGLTF,
  // Text,
  Billboard,
  // Cloud,
  // Decal,
  Edges,
  // Sparkles,
  // Caustics,
  Environment,
  OrbitControls,
  // RenderTexture,
  // RandomizedLight,
  // PerspectiveCamera,
  // AccumulativeShadows,
  MeshTransmissionMaterial,
  // Lightformer,
  Loader,
  // Float,
  Sky,
  Stars,
  Html,
} from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { Geometry, Base, Subtraction } from "@react-three/csg";
// import coral from "./coral_blender.glb";
// import coral2 from "./coral_blender2.glb";
import coral3 from "./dirt_blend.glb";
import { LayerMaterial, Color, Depth, Noise } from "lamina";
import "./App.css";

import { Ocean } from "react-three-ocean";

export default function App() {
  const text2 = [
    // "MORPH DIRT",
    "⊹₊｡ꕤ˚₊⊹",
    "☆⋆｡𖦹°‧★",
    "˚ ༘ ೀ⋆｡˚",
    ".𖥔 ݁ ˖๋ ࣭ ⭑",
    "𖡼𖤣𖥧𖡼𓋼𖤣𖥧𓋼𓍊",
    "｡･:*:･ﾟ★",
    ".⋆｡⋆☂˚｡⋆｡˚☽˚｡⋆.",
    "᠃ ⚘᠂ ⚘ ˚ ⚘ ᠂ ⚘ ᠃",
    " ҉　 ҉　 ҉　 ҉　",
    "✧･ﾟ: *✧",
    "＊*•̩̩͙✩•̩̩͙*",
    "☆♬○♩●♪✧♩",
    "*＊✿❀",
    "❀✿＊*",
    "✿✼:*ﾟ:༅｡",
    "⋇⋆✦⋆⋇",
    "‧̍̊˙· 𓆝.° ｡˚𓆛",
    "᠃ ⚘᠂ ⚘ ˚ ⚘ ᠂ ⚘ ᠃ ",
    "তততততততততততত",
    "。°。°。°。°",
  ];

  // const [count, setCount] = useState(1);

  function handleClick(e) {
    // console.log(e);
    const element = document.getElementById(e.target.id);
    if (element.textContent) {
      // element.textContent = element.textContent + text2[count];
      element.textContent = getRandomElement(text2);
    }

    // if (count >= text2.length - 1) {
    //   setCount(0);
    // } else {
    //   setCount(count + 1);
    // }
  }

  function getRndInteger(min, max, delta) {
    return delta * Math.floor((Math.random() * (max - min)) / delta + min / delta);
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomTextPosition() {
    return [getRndInteger(-70, 70, 10), getRndInteger(0, 40, 5), 50];
  }

  return (
    <>
      <Canvas shadows camera={{ position: [-200, 10, -85], fov: 35 }}>
        <Suspense fallback={null}>
          {/* <Sky
            sunPosition={[-100, 10, -10000]}
            inclination={2.98}
            azimuth={0.23}
            mieDirectionalG={1.2}
            mieCoefficient={0}
            rayleigh={1}
            turbidity={6.7}
          /> */}
          <Stars radius={10} depth={60} count={10000} factor={4} saturation={0.5} fade speed={3} />

          <Ocean
            options={{ waterColor: 0x444444 }}
            dimensions={[10000, 10000]}
            normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
            distortionScale={20}
            size={10}
            position={[0, -6, 0]}
          ></Ocean>
          <Ocean
            options={{ waterColor: 0x444444 }}
            dimensions={[10000, 10000]}
            normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
            distortionScale={20}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            size={10}
            position={[0, 0, 120]}
          ></Ocean>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
          <Coral color={"white"} url={coral3} scale={25} rotation={[0, 0, 0]} position={[-5, 4, -2]} />
          {/* <Html transform position={[20, 50, 0]}>
            <div style={{ height: "1375" }}>
              <img src={[require("./render.png")]} alt="grass" />
            </div>
          </Html> */}
          <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false} // Lock the rotation on the z axis (default=false)
          >
            <Html scale={5} transform position={getRandomTextPosition()}>
              <a href="#" onClick={handleClick}>
                <p id="id01">{getRandomElement(text2)}</p>
              </a>
            </Html>

            <Html scale={5} transform position={getRandomTextPosition()}>
              <a href="#" onClick={handleClick}>
                <p id="id02">{getRandomElement(text2)}</p>
              </a>
            </Html>

            <Html scale={5} transform position={getRandomTextPosition()}>
              <a href="#" onClick={handleClick}>
                <p id="id03">{getRandomElement(text2)}</p>
              </a>
            </Html>
          </Billboard>
          <Environment background resolution={64}>
            <Striplight position={[10, 100, 0]} scale={[1, 3, 10]} />
            <Striplight position={[-10, 100, 0]} scale={[1, 3, 10]} />
            <mesh scale={100}>
              <sphereGeometry args={[1, 20, 20]} />
              <LayerMaterial side={THREE.BackSide}>
                <Color color="#f069ff" alpha={1} mode="normal" />
                <Depth colorA="#38332a" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
              </LayerMaterial>
            </mesh>
          </Environment>

          <EffectComposer>
            <Pixelation
              granularity={7} // pixel granularity
            />
            <Glitch
              delay={[1.5, 5]} // min and max glitch delay
              duration={[0.6, 1.0]} // min and max glitch duration
              strength={[0.3, 1]} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              columns={0.05}
              dtSize={100}
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            />
            {/* <ChromaticAberration
              // blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.02, 0.002]} // color offset
            /> */}
          </EffectComposer>

          <OrbitControls
            autoRotateSpeed={0.2}
            autoRotate={true}
            enablePan={false}
            minDistance={100}
            maxDistance={300}
            // maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI / 2}
            // minAzimuthAngle={-Math.PI}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

// function kao(props) {
//   const { nodes } = useGLTF(props.url);
//   return (
//     <>
//       <group transform scale={props.scale} rotation={props.rotation} position={props.position}>
//         <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material}>
//           <MeshTransmissionMaterial resolution={768} thickness={0.1} anisotropy={1} chromaticAberration={0.5} />

//           <Edges scale={1} threshold={17}>
//             <lineBasicMaterial color={new THREE.Color(0x2eff70)} toneMapped={false} />
//           </Edges>
//         </mesh>
//       </group>
//     </>
//   );
// }

function Coral(props) {
  const { nodes } = useGLTF(props.url);
  return (
    <>
      <group transform scale={props.scale} rotation={props.rotation} position={props.position}>
        <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material}>
          <MeshTransmissionMaterial resolution={768} thickness={0.1} anisotropy={1} chromaticAberration={0.5} />

          <Edges scale={1} threshold={17}>
            <lineBasicMaterial color={new THREE.Color(0x2eff70)} toneMapped={false} />
          </Edges>
        </mesh>
      </group>
    </>
  );
}

function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
}

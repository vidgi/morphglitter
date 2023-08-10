import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Glitch, EffectComposer, Pixelation } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { useGLTF, Billboard, Edges, Environment, OrbitControls, MeshTransmissionMaterial, Loader, Stars, Html } from "@react-three/drei";
import coral3 from "./dirt_blend.glb";
import { LayerMaterial, Color, Depth, Noise } from "lamina";
import "./App.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";
import click3 from "./click3.wav";
import click4 from "./click4.wav";
import click5 from "./click5.wav";
import wave from "./wave.wav";
import reset from "./reset.wav";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";
import VidyaIcon from "@mui/icons-material/AutoAwesome";

import { Ocean } from "react-three-ocean";

export default function App() {
  const playClick1 = () => {
    new Audio(click1).play();
  };

  const playClick2 = () => {
    new Audio(click2).play();
  };

  const playClick3 = () => {
    new Audio(click3).play();
  };
  const playClick4 = () => {
    new Audio(click4).play();
  };
  const playClick5 = () => {
    new Audio(click5).play();
  };

  const clickFunctions = [playClick1, playClick2, playClick3, playClick4, playClick5];

  const playReset = () => {
    new Audio(reset).play();
  };
  const kaomojis = [
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

  const palettes = [
    ["#2eff70", "#f069ff"],
    ["#fa23af", "#cef542"],
    ["#1726ff", "#7fe393"],
    ["#fa23af", "#1726ff"],
    ["#2eff70", "#1726ff"],
    ["#fa23af", "#f069ff"],
    ["#fa23af", "#7fe393"],
  ];

  const [colors, setColors] = useState(getRandomElement(palettes));
  const [pixelSize, setPixelSize] = useState(5);
  const [number, setNumber] = useState(1);
  const [glitter, setGlitter] = useState(0);
  const [morph, setMorph] = useState(0);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffffff",
        main: "#ffffff",
        dark: "#ffffff",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `"Handjet", "courier" monospace`,
    },
    card: {
      backgroundColor: "#c5ccb6 !important",
    },
  });

  function handleClick(e) {
    const x = document.getElementById("audio");
    x.play();
    // playWave();
    const element = document.getElementById(e.target.id);
    if (element.textContent) {
      element.textContent = getRandomElement(kaomojis);
    }
    setPixelSize(pixelSize * 1.2);

    if (number >= 300) {
      playReset();

      setNumber(1);
      setPixelSize(5);
      setColors(getRandomElement(palettes));
      setMorph(morph + 1);
      setGlitter(1);
    } else {
      clickFunctions[glitter % 5]();

      setGlitter(glitter + 1);

      setNumber(number * 1.5);
    }
  }

  function getRndInteger(min, max, delta) {
    return delta * Math.floor((Math.random() * (max - min)) / delta + min / delta);
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomTextPosition() {
    return [getRndInteger(-70, 70, 10), getRndInteger(-20, 60, 1), 50];
  }

  function Kao(props) {
    return (
      <>
        <Html scale={5} transform position={getRandomTextPosition()}>
          <a href="#" onClick={handleClick}>
            <p id={props.id}>{getRandomElement(kaomojis)}</p>
          </a>
        </Html>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            position: "absolute",
            top: "0.2em",
            left: "1em",
            zIndex: "10000",
          }}
        >
          <p>
            <span>
              morphs: {morph}
              <br></br>
              glitters: {glitter}
            </span>
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "0.2em",
            right: "1em",
            zIndex: "10000",
          }}
        >
          <p>
            <span>score: {morph * 10000 + 100 * glitter}</span>
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0.5em",
            right: "0.15em",
            zIndex: "10000",
          }}
        >
          <Tooltip title="vidya's website">
            <Button target="_blank" rel="noreferrer" href="https://vidyagiri.com">
              <VidyaIcon />
            </Button>
          </Tooltip>
        </div>

        <audio id="audio" loop>
          <source src={wave} type="audio/mpeg" />
        </audio>
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
            <Morpho color={colors[0]} url={coral3} scale={25} rotation={[0, 0, 0]} position={[-5, 4, -2]} />

            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
              {[...Array(Math.floor(number))].map((x, i) => (
                <Kao id={i} key={i} />
              ))}
            </Billboard>
            <Environment background resolution={64}>
              <Striplight position={[10, 100, 0]} scale={[1, 3, 10]} />
              <Striplight position={[-10, 100, 0]} scale={[1, 3, 10]} />
              <mesh scale={100}>
                <sphereGeometry args={[1, 20, 20]} />
                <LayerMaterial side={THREE.BackSide}>
                  <Color color={colors[1]} alpha={1} mode="normal" />
                  <Depth colorA="#38332a" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                  <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
                </LayerMaterial>
              </mesh>
            </Environment>

            <EffectComposer>
              <Pixelation granularity={pixelSize} />
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
      </ThemeProvider>
    </>
  );
}

function Morpho(props) {
  const { nodes } = useGLTF(props.url);
  return (
    <>
      <group transform scale={props.scale} rotation={props.rotation} position={props.position}>
        <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material}>
          <MeshTransmissionMaterial resolution={768} thickness={0.1} anisotropy={1} chromaticAberration={0.5} />
          <Edges scale={1} threshold={17}>
            <lineBasicMaterial color={new THREE.Color(props.color)} toneMapped={false} />
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

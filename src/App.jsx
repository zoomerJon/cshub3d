import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Box,
  CameraControls,
  Cylinder,
  Effects,
  Environment,
  Float,
  Html,
  OrbitControls,
  PerformanceMonitor,
  PerspectiveCamera,
  PresentationControls,
  ScrollControls,
  SpotLight,
  useScroll,
} from "@react-three/drei";
import { useParams } from "react-router-dom";
import Dust2 from "./Components/Dust2A";
import Inferno from "./Components/Inferno";
import NewsContainer from "./Components/NewsContainer";
import TwitterContainer from "./Components/TwitterContainer";
import VitalityHeli from "./Components/VitalityHeli";
import { gsap } from "gsap";
import "./App.css";

// STEAM WEB API KEY
// 3E95EF1587C97FDC5340116526A21135

const { DEG2RAD } = THREE.MathUtils;

function App() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    window.innerHeight > window.innerWidth && setMobile(true);
  }, []);

  return <Scene mobile={mobile} />;
}

function SceneCameraControls({ cameraView, mobile }) {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const state = new useThree();

  const cameraControlsRef = useRef();

  const { camera } = useThree();

  useEffect(() => {
    console.log("alsdkalsdaslkdk");
  }, [controlsEnabled]);

  useEffect(() => {
    if (cameraView === "stream") {
      toStream();
      gsap.to(".sidebar", {
        x: 700,
        duration: 1,
      });
    } else if (cameraView === "home") {
      gsap.to(".sidebar", {
        x: 0,
        duration: 1,
      });
      gsap.from(".sidebar div", {
        x: 700,
        stagger: 0.05,
        duration: 0.45,
        delay: 0.5,
      });
      // gsap.to(state.camera.position, {
      //   x: -8.209678830174354,
      //   y: 120.89937095041674,
      //   z: 220,
      //   // ease: "power2.inOut",
      //   duration: 2.3,
      // });
      // gsap.to(state.camera.rotation, {
      //   x: -0.1398525886824376,
      //   y: -0.1016695602909704,
      //   z: -0.02,
      //   // ease: "power2.inOut",
      //   duration: 2.3,
      // });
      gsap.to(state.camera.position, {
        x: 30,
        y: 120.89937095041674,
        z: mobile ? 300 : 220,
        // ease: "power2.inOut",
        duration: 2.3,
      });
      gsap.to(state.camera.rotation, {
        x: -0.1398525886824376,
        y: -0.01,
        z: -0.0,
        // ease: "power2.inOut",
        duration: 2.3,
      });
    } else if (cameraView === "twitter") {
      //       x: -38.38401074288771, y: 97.77230135837033, z: -16.228019431606548, _gsap: GSCache2}
      // VitalityHeli.jsx:126 Euler {isEuler: true, _x: 0.745549163499652, _y: 1.5316344940433289, _z: -0.7451668822199129
      gsap.to(".sidebar", {
        x: 700,
        duration: 1,
      });
      gsap.to(state.camera.position, {
        x: mobile ? 120 : 20,
        y: 97.77230135837033,
        z: mobile ? 0 : -16.228019431606548,
        // ease: "power2.inOut",
        duration: 2.3,
      });
      gsap.to(state.camera.rotation, {
        x: Math.PI / 4,
        y: Math.PI / 2,
        z: -Math.PI / 4,
        // ease: "power2.inOut",
        duration: 2.3,
      });
    }
  }, [cameraView]);

  const toStream = () => {
    //     128.58771833790888, y: 144.91162047027444, z: -79.74135689364863, _gsap: GSCache2}
    // VitalityHeli.jsx:126 Euler {isEuler: true, _x: -0.023098616119923025, _y: 0.017451773981145603, _z: 0.0004031630485913365
    gsap.to(state.camera.position, {
      x: mobile ? 125 : 128.58771833790888,
      y: 144.91162047027444,
      z: mobile ? 160 : -30.74135689364863,
      // ease: "power2.inOut",
      duration: 2.3,
    });
    gsap.to(
      state.camera.rotation,
      {
        x: 0,
        y: 0.0,
        z: 0.0,
        // ease: "power2.inOut",
        duration: 2.3,
      }
      // "-=.5"
    );
  };
  return;
}

function Scene({ mobile }) {
  const [dpr, setDpr] = useState(1.5);
  const [cameraView, setCameraView] = useState("");
  const [useOrbit, setUseOrbit] = useState(false);
  const [playerCount, setPlayerCount] = useState("");
  const [gameNews, setGameNews] = useState({});
  // let playerCount = 2;

  const navRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const responsePlayers = await fetch(
        `https://calm-manatee-723153.netlify.app/.netlify/functions/api/getuserstats`
      );
      const responseNews = await fetch(
        `https://calm-manatee-723153.netlify.app/.netlify/functions/api/getnews?730`
      );
      // const responseNews = await fetch(
      //   "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=3&maxlength=300&format=json"
      // );
      // const responsePlayers = await fetch(
      //   "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=730&count=3&maxlength=300&format=json"
      // );
      // const responseNews = await fetch(
      //   "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=3&maxlength=300&format=json"
      // );

      const dataPlayers = await responsePlayers.json();
      const dataNews = await responseNews.json();

      console.log("json response");
      // console.log(responsePlayers);
      console.log(dataPlayers.response.player_count);
      console.log(dataNews.appnews.newsitems);

      setPlayerCount(dataPlayers.response.player_count);
      setGameNews(dataNews.appnews.newsitems);
    }
    fetchData();

    gsap.from(navRef.current, {
      x: 700,
      // autoAlpha: 0,
      // ease: "none",
      // delay: 1,
    });
    gsap.from(".sidebar div", {
      x: 700,
      stagger: 0.05,
      duration: 0.45,
      delay: 0.5,
    });
  }, []);

  let { stream } = useParams();

  return (
    <div className="main">
      <Canvas className="canvas" dpr={dpr}>
        <SceneCameraControls cameraView={cameraView} mobile={mobile} />
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />

        {/* <ambientLight intensity={0.1} /> */}
        <Environment background preset="dawn" blur={0.6} />
        {/* <Environment background preset="sunset" blur={0.6} /> */}
        {/* <Environment background preset="warehouse" blur={0.6} /> */}
        {/* <Environment
          // files="/blue_photo_studio_1k.hdr"
          // files="/satara_night_no_lamps_1k.exr"
          // files="/hansaplatz_1k.exr"
          // files="/leadenhall_market_1k.exr"
          // files="/shanghai_bund_1k.hdr"
          // files="/viale_giuseppe_garibaldi_1k.hdr"
          background
          blur={0.6}
          // ground={{ height: 50, radius: 300, scale: 200 }}
        /> */}
        {/* <pointLight intensity={0.2} color={"#fff"} position={[0, 180, 60]} /> */}

        <PresentationControls
          global
          cursor={false}
          polar={[-0.8, 0.4]}
          azimuth={[-1.2, 1.2]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 2, tension: 400 }}
        >
          <PerspectiveCamera
            makeDefault
            position={[101.68739144073713, 600, -173.59531734657935]}
            rotation={[-1.5707963372232927, 10e-7, 1.6]}
          />
        </PresentationControls>
        {/* <OrbitControls /> */}
        {/* {useOrbit && <OrbitControls />} */}
        <Dust2 />
        <Inferno position={[60, 65, -105]} rotation={[0, -Math.PI / 2, 0]} />
        <VitalityHeli position={[170, 160, -100]} scale={2} />
        <Html
          position={[125, 180, -220]}
          occlude="blending"
          transform
          scale={[4.8, 4.8, 4.8]}
          playerCount={playerCount}
        >
          <div className="streamContainer">
            <div
              style={{
                paddingBottom: "20px",
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <img className="logo" src="/twitch-logo.png" alt="" />
              <div className="streamHeading">
                Now Watching: {!stream ? "ESLCS" : stream}
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  color: "#fff",
                  top: "30%",
                  maxWidth: "25%  ",
                }}
              >
                📢To change stream, add channel name after URL
                <br />
                E.G. csgohub3d.com/BLASTPremier
                <br />
              </div>
            </div>
            <div className="streamElements">
              <iframe
                className="stream"
                // src={`https://player.twitch.tv/?channel=${
                //   !stream ? "ESL_CSGO" : stream
                // }&parent=127.0.0.1&muted=false`}
                src={`https://player.twitch.tv/?channel=${
                  !stream ? "ESLCS" : stream
                }&parent=cshub3d.com&muted=true`}
                height="540"
                width="960"
                allowFullScreen
              ></iframe>
              <iframe
                // src={`https://www.twitch.tv/embed/${
                //   !stream ? "ESL_CSGO" : stream
                // }/chat?parent=127.0.0.1`}
                src={`https://www.twitch.tv/embed/${
                  !stream ? "ESLCS" : stream
                }/chat?parent=cshub3d.com`}
                height="540"
                width="300"
              ></iframe>
            </div>
          </div>
        </Html>
        <Html
          className="eSportsContainer"
          position={[-77, 180, -124]}
          occlude="blending"
          transform
          scale={[4.8, 4.8, 4.8]}
        >
          <div className="container">
            <div class="marquee-top marquee enable-animation-top desktop">
              <ul class="marquee__content content-top">
                <li>
                  Congratulations Team Vitality - Paris 2023 Major Winners!
                </li>
              </ul>
              <ul aria-hidden="true" class="marquee__content content-top">
                <li>
                  Congratulations Team Vitality - Paris 2023 Major Winners!
                </li>
              </ul>
            </div>
            <div className="rankingsContainer">
              <div
                style={{
                  paddingBottom: "0px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img className="logo" src="/medal.png" alt="" />
                <div className="heading">World Rankings</div>
              </div>
              <div className="rankingsList">
                <div className="rankOne">
                  #1{" "}
                  <span>
                    <img
                      className="rankOne"
                      src="https://img-cdn.hltv.org/teamlogo/6LVaK1MVX06kO1ChAq22v6.svg?ixlib=java-2.1.0&s=1ad0be7366aab3ef6825996762c3e615"
                      alt=""
                    />
                  </span>{" "}
                  Heroic
                </div>
                <div>
                  #2{" "}
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/yeXBldn9w8LZCgdElAenPs.png?ixlib=java-2.1.0&w=100&s=a0731380d1075205aadb30905a49da55"
                      alt=""
                    />
                  </span>{" "}
                  Vitality
                </div>
                <div>
                  #3
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/SMhzsxzbkIrgqCOOKGRXlW.svg?ixlib=java-2.1.0&s=e6a9ce0345c7d703e5eaac14307f69aa"
                      alt=""
                    />
                  </span>{" "}
                  FaZe
                </div>
                <div>
                  #4
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/zFLwAELOD15BjJSDMMNBWQ.png?ixlib=java-2.1.0&w=100&s=88aeba1564bc27de69fb2302e47e1a7c"
                      alt=""
                    />
                  </span>{" "}
                  G2
                </div>
                <div>
                  #5
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/-X8NoyWC_1gYqUHvZqcpkc.svg?ixlib=java-2.1.0&s=85bb9daa6f846fa097c5942f2565fdb8"
                      alt=""
                    />
                  </span>{" "}
                  ENCE
                </div>
                <div>
                  #6
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/bEgST6XoNV4ZdenRKzCQyl.svg?ixlib=java-2.1.0&s=bd9b10a8dfe7b3640103745687389e3c"
                      alt=""
                    />
                  </span>{" "}
                  Cloud9
                </div>
                <div>
                  #7
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/jS__cj2F09Bl8qBU_CvkQR.png?ixlib=java-2.1.0&w=100&s=28ae8e35bdc4bffb0dd245e08235e363"
                      alt=""
                    />
                  </span>{" "}
                  GamerLegion
                </div>
                <div>
                  #8
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/9iMirAi7ArBLNU8p3kqUTZ.svg?ixlib=java-2.1.0&s=4dd8635be16122656093ae9884675d0c"
                      alt=""
                    />
                  </span>{" "}
                  Natus Vincere
                </div>
                <div>
                  #9
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/IBGw2qcLFA7xL1Ju9HwJpe.png?ixlib=java-2.1.0&w=100&s=3e236a12c7f5d2e843553c284b5f275d"
                      alt=""
                    />
                  </span>{" "}
                  Apeks
                </div>
                <div>
                  #10
                  <span>
                    <img
                      src="https://img-cdn.hltv.org/teamlogo/RfR1zmFJ0eP08VmFb6UOu3.png?ixlib=java-2.1.0&w=100&s=b1bf115f05eacdf004c193d48338ff11"
                      alt=""
                    />
                  </span>{" "}
                  MOUZ
                </div>
              </div>
            </div>
            <div className="majorChampsContainer">
              <div
                style={{
                  paddingBottom: "0px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img className="logo" src="/trophy.png" alt="" />
                <div className="heading">Major Champions</div>
              </div>
              <div className="majorChamps">
                <span>
                  <img
                    src="https://img-cdn.hltv.org/teamlogo/yeXBldn9w8LZCgdElAenPs.png?ixlib=java-2.1.0&w=100&s=a0731380d1075205aadb30905a49da55"
                    alt=""
                  />
                </span>{" "}
                Team Vitality
              </div>
              <div className="runnerups">Runner-Ups:</div>
              <div className="majorRunnerups">
                <span>
                  <img
                    src="https://img-cdn.hltv.org/teamlogo/jS__cj2F09Bl8qBU_CvkQR.png?ixlib=java-2.1.0&w=100&s=28ae8e35bdc4bffb0dd245e08235e363"
                    alt=""
                  />
                </span>{" "}
                GamerLegion
              </div>
              <div className="currentPlayers">
                <span>{playerCount}</span> players on Counter-Strike right now
              </div>
            </div>
          </div>
        </Html>
        <Html
          position={[-120, 120, 0]}
          rotation={[0, Math.PI / 2, 0]}
          occlude="blending"
          transform
          // style={{ display: "none" }}
          scale={[4, 4, 4]}
        >
          <NewsContainer gameNews={gameNews} />
          {/* <TwitterContainer /> */}
        </Html>
      </Canvas>
      <div className="sidebar" ref={navRef}>
        <div className="sidebarHeading">
          <span>
            <img className="appLogo" src="/logo_temp.png" alt="" />
          </span>
          Welcome!
        </div>
        <div className="desktop" style={{ marginBottom: "10px" }}>
          🚧 🚧 🚧 This website is under construction 🚧 🚧 🚧
        </div>
        <div className="mobile" style={{ marginBottom: "10px" }}>
          🚧 This website is under construction 🚧
        </div>
        <div style={{ marginBottom: "10px" }}>
          🔈🔈🔈 More features coming soon! 🔈🔈🔈
          <ul>
            <li>- Improved formatting for mobile devices</li>
            <li>- Upcoming Matches/Tournaments</li>
            <li>- Updated Twitter List</li>
            <li>- CS stats (concurrent players, trivia, more)</li>
            <li>- Camera zoom in/out</li>
            <li>- Change background/lighting</li>
            <li>- ???</li>
          </ul>
        </div>
        <div className="sidebarHeading">About</div>
        <div className="description">
          This website is a personal project that aims to bring all things
          Counter-Strike (eSports, entertainment, news, info) to an interactive,
          3D web experience.
        </div>
        <br />
        <div className="sidebarHeading">Contact</div>
        <div className="description">
          ✉️ For comments, suggestions, or business inquiries, contact me at:
          csgohub3d@gmail.com
        </div>
        <div className="description">
          <span style={{ fontSize: "24px", fontWeight: "600" }}>
            Popular CS Sites Around The Web:
          </span>
          <ul className="sourceList">
            <li>
              <a href="hltv.org">hltv.org</a>
              <span> - CS:GO news, coverage, matches, demos, and more</span>
            </li>
            <li>
              <a href="https://liquipedia.net/counterstrike/Main_Page">
                liquipedia.net/counterstrike
              </a>{" "}
              <span>
                {" "}
                - An eSports encyclopedia containing info about players,
                matches, tournaments, and more
              </span>
            </li>
            <li>
              <a href="https://www.reddit.com/r/GlobalOffensive/">
                reddit.com/r/GlobalOffensive
              </a>
              <span>
                {" "}
                - A Counter-Strike subreddit for community discussion and
                sharing of content
              </span>
            </li>
            <li>
              <a href="https://www.reddit.com/r/csgo/">reddit.com/r/csgo</a>
              <span>
                {" "}
                - Another Counter-Strike subreddit that is less eSports focused
              </span>
            </li>
            <li>
              <a href="https://leetify.com/">leetify.com</a>
              <span>
                {" "}
                - A Counter-Strike performance tracker for yourself and friends
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav">
        <div className="desktop" style={{ color: "#fff" }}>
          Navigate:
        </div>
        <div className="link" onClick={() => setCameraView("home")}>
          Home
        </div>
        <div className="link" onClick={() => setCameraView("twitter")}>
          CS News
        </div>
        <div className="link" onClick={() => setCameraView("stream")}>
          Watch Streams
        </div>
        <div style={{ color: "#ccc" }}>⚠️More Features Coming Soon⚠️</div>
      </div>
    </div>
  );
}

export default App;

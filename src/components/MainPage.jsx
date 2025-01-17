
import React from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
const ModelViewer = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} />;
};

const MainPage = () => {
  return (
    <div className="mainDiv">
      <h1 className="heading">SSV  HOME  SIMULATOR</h1>
      <div className="heading-container  text-center">
        {/* <h3  >Explore our 3D Models <span>-Design your House as you desire</span></h3> */}
        <h3 style={{fontSize:"20px",left: "-2px"}}>EXPLORE OUR 3D MODELS <span>TO DESIGN YOUR HOME </span></h3>
        {/* Add droplets */}
        {/* <span className="droplet ">E</span>
        <span className="droplet ">x</span>
        <span className="droplet ">p</span>
        <span className="droplet ">l</span>
        <span className="droplet ">o</span>
        <span className="droplet ">r</span>
        <span className="droplet ">e</span>
        <span className="droplet "></span>
        <span className="droplet ">o</span>
        <span className="droplet ">u</span>
        <span className="droplet ">r</span>
        <span className="droplet "></span>
        <span className="droplet ">3</span>
        <span className="droplet ">D</span>
        <span className="droplet "></span>
        <span className="droplet ">M</span>
        <span className="droplet ">o</span>
        <span className="droplet ">d</span>
        <span className="droplet ">e</span>
        <span className="droplet ">l</span>
       
        */}
      </div>
      <div className="mainPage">
        <div className="row">
          <div className="headBox d-flex justify-content-center flex-wrap g-3">
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="view_model">
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls
                     enablePan={true} // Allows panning the camera
                     enableZoom={true} // Allows zooming the camera
                     enableRotate={true} // Allows rotating the model
                     maxPolarAngle={Math.PI / 2} // Optional: Limit vertical rotation (e.g., prevent flipping)
                      minPolarAngle={0} // Optional: Limit vertical rotation

                    />
                    <Bounds fit clip margin={1.2}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/Apartment.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button className="box-button">
                    <Link
                      to="/model1"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Building
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls />
                    <Bounds fit clip margin={1.7}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/3d_house.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button className="box-button">
                    <Link
                      to="/model2"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Home
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls
                     enablePan={true} // Allows panning the camera
                     enableZoom={true} // Allows zooming the camera
                     enableRotate={true} // Allows rotating the model
                     maxPolarAngle={Math.PI / 2} // Optional: Limit vertical rotation (e.g., prevent flipping)
                      minPolarAngle={0} // Optional: Limit vertical rotation
                    />
                    
                    <Bounds fit clip margin={1}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/house2.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model3"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      House2
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls

                    />
                    <Bounds fit clip margin={1}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/old_station_industrial_building_series_no1.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model4"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Old station
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[20, 20, 10]} />
                    <OrbitControls />
                    <Bounds fit clip margin={1}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/small_residental_house.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model5"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Residental House
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls
                    enablePan={true} // Allows panning the camera
                    enableZoom={true} // Allows zooming the camera
                    enableRotate={true} // Allows rotating the model
                    maxPolarAngle={Math.PI / 3} // Optional: Limit vertical rotation (e.g., prevent flipping)
                     minPolarAngle={0} // Optional: Limit vertical rotation
                    />
                    <Bounds fit clip margin={1.6}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/futuristic_building.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model6"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                     Futuristic Building
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls
                    enablePan={true} // Allows panning the camera
                    enableZoom={true} // Allows zooming the camera
                    enableRotate={true} // Allows rotating the model
                    maxPolarAngle={Math.PI / 3} // Optional: Limit vertical rotation (e.g., prevent flipping)
                     minPolarAngle={0} // Optional: Limit vertical rotation
                    />
                    <Bounds fit clip margin={1}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/house.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model7"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      House
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />

                    <OrbitControls

                    />
                    <Bounds fit clip margin={1.8}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/ichijoushi_007_building.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model8"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Building1
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 box_card">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Canvas>
                  <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} />
                    <OrbitControls

                    />
                    <Bounds fit clip margin={1}>
                      <ModelViewer modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/ichijoushi___-_004.glb" />
                    </Bounds>
                  </Canvas>
                </div>
                <div>
                  <button  className="box-button">
                    <Link
                      to="/model9"
                      style={{ textDecoration: "none", color: "white",fontSize:"15px",fontWeight:"bold" }}
                    >
                      Building2
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;




import React, { useEffect, useState, useRef } from "react";
import "../Models/styles/model.css"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { Box3, Vector3, TextureLoader, RepeatWrapping, Color } from "three";
import * as THREE from "three";
import { texturesData } from "../../data/textures";
import { colorsPalatte } from "../../data/colorsPalatte";
import { tilesData } from "../../data/tiles";
import { ceilingsData } from "../../data/ceilings";
import html2canvas from "html2canvas";

const DynamicMaterialModel = ({
  modelPath,
  materialUpdates,
  onPartSelected,
}) => {
  const { scene } = useGLTF(modelPath);
  const [hoveredPart, setHoveredPart] = useState(null);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const boundingBox = new Box3().setFromObject(modelRef.current);
      const size = new Vector3();
      boundingBox.getSize(size);
      console.log("Width:", size.x);
      console.log("Height:", size.y);
      console.log("Depth:", size.z);
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material.color,
            roughness: 0.5,
            metalness: 0.5,
          });
        }

        const update = materialUpdates[child.uuid];
        if (update) {
          if (update.color) {
            child.material.color = new Color(update.color);
          }
          if (update.texture) {
            const texture = new TextureLoader().load(update.texture);
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.repeat.set(update.tileScaleX || 1, update.tileScaleY || 1);
            child.material.map = texture;
          }
          child.material.needsUpdate = true;
        }

        if (child.uuid === hoveredPart) {
          child.material.emissive = new THREE.Color(0xaaaaaa);
          child.material.emissiveIntensity = 0.5;
        } else {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [scene, materialUpdates, hoveredPart]);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    const selectedPart = event.object.uuid;
    const materialName = event.object.material.name;
    onPartSelected(selectedPart, materialName);
  };

  const handlePointerOver = (event) => {
    setHoveredPart(event.object.uuid);
  };

  const handlePointerOut = () => {
    setHoveredPart(null);
  };

  return (
    <primitive
      object={scene}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      ref={modelRef}
    />
  );
};

const Model2 = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [materialUpdates, setMaterialUpdates] = useState({});
  const [color, setColor] = useState("#ff6347");
  const [selectedTexture, setSelectedTexture] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Master Bedroom");
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedTileCategory, setSelectedTileCategory] =
    useState("Vitrified Tile");
  const [tileScaleX, setTileScaleX] = useState(1);
  const [tileScaleY, setTileScaleY] = useState(1);
  const [fallCeiling, setFallCeiling] = useState(null);
  const scrollRef = useRef(null);
  const [selectedCeilingCategory, setSelectedCeilingCategory] = useState(
    ceilingsData[0]?.category || ""
  );
  const [selectedCeilingTexture, setSelectedCeilingTexture] = useState(null);

  // const ceilings = [{ id: "1", src: "/public/textures/images.jpeg" }];

  const handlePartSelection = (partId, materialName) => {
    setSelectedPart({ id: partId, name: materialName });
    const existingProps = materialUpdates[partId] || {};
    setColor(existingProps.color || "#ff6347");
    setSelectedTexture(existingProps.texture || null);
    setTileScaleX(existingProps.tileScaleX || 5);
    setTileScaleY(existingProps.tileScaleY || 5);
    setFallCeiling(existingProps.texture || null);
  };

  const applyChanges = () => {
    if (selectedPart) {
      setMaterialUpdates((prevUpdates) => ({
        ...prevUpdates,
        [selectedPart.id]: { color },
      }));
    }
  };

  const applyCeiling = () => {
    if (selectedPart && fallCeiling) {
      setMaterialUpdates((prevUpdates) => ({
        ...prevUpdates,
        [selectedPart.id]: { texture: fallCeiling },
      }));
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedTexture(null); // Reset texture selection when the category changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const selectedCategoryTextures =
    texturesData.find((category) => category.category === selectedCategory)
      ?.textures || [];

  const applyTexture = () => {
    if (selectedPart && selectedTexture) {
      setMaterialUpdates((prevUpdates) => ({
        ...prevUpdates,
        [selectedPart.id]: {
          texture: selectedTexture,
          tileScaleX,
          tileScaleY,
        },
      }));
    }
  };

  //apply tile

  const handleTileCategoryChange = (event) => {
    setSelectedTileCategory(event.target.value);
    setSelectedTile(null); // Reset tile selection when the category changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const applyTile = () => {
    if (selectedPart && selectedTile) {
      setMaterialUpdates((prevUpdates) => ({
        ...prevUpdates,
        [selectedPart.id]: { texture: selectedTile, tileScaleX, tileScaleY },
      }));
    }
  };

  const selectedCategoryTiles =
    tilesData.find((category) => category.category === selectedTileCategory)
      ?.tiles || [];
  
  //ceilings
  const handleCeilingCategoryChange = (event) => {
    setSelectedCeilingCategory(event.target.value);
    setSelectedCeilingTexture(null); // Reset ceiling texture selection when category changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };
  
  const applyCeilingTexture = () => {
    if (selectedPart && selectedCeilingTexture) {
      setMaterialUpdates((prevUpdates) => ({
        ...prevUpdates,
        [selectedPart.id]: {
          texture: selectedCeilingTexture,
          tileScaleX,
          tileScaleY,
        },
      }));
    }
  };
  
  const selectedCeilingTextures =
    ceilingsData.find((category) => category.category === selectedCeilingCategory)
      ?.textures || [];
  //buttons print share and reset buttons

  // const canvasRef = useRef();

  // const handlePrint = async () => {
  //   setTimeout(() => {
  //     const canvas = document.querySelector("canvas");
  //     if (canvas) {
  //       try {
  //         const scale = 2; // Increase for higher resolution
  //         const width = canvas.width * scale;
  //         const height = canvas.height * scale;
  
  //         // Create an offscreen canvas
  //         const offscreenCanvas = document.createElement("canvas");
  //         offscreenCanvas.width = width;
  //         offscreenCanvas.height = height;
  //         const ctx = offscreenCanvas.getContext("2d");
  
  //         // Draw the Three.js canvas onto the offscreen canvas
  //         ctx.drawImage(canvas, 0, 0, width, height);
  
  //         // Convert the offscreen canvas to an image
  //         const image = offscreenCanvas.toDataURL("image/png");
  
  //         // Open a new window and display the image
  //         const newWindow = window.open();
  //         newWindow.document.write(`
  //           <html>
  //             <head><title>Print Model</title></head>
  //             <body style="margin: 0;">
  //               <img src="${image}" style="width: 100%; height: auto;" />
  //             </body>
  //           </html>
  //         `);
  //         newWindow.document.close();
  
  //         // Trigger the print dialog
  //         newWindow.print();
  //       } catch (error) {
  //         console.error("Failed to capture or print canvas:", error);
  //       }
  //     } else {
  //       console.error("Canvas not found for printing!");
  //     }
  //   }, 1000); // Wait for 1 second to ensure the scene is rendered
  // };
  
  const handlePrint = () => {
    // Open the print dialog
    window.print();
  };

    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Interactive Page",
            text: "Check out this amazing page!",
            url: window.location.href,
          })
          .catch((error) => console.error("Error sharing:", error));
      } else {
        alert("Sharing is not supported in this browser.");
      }
    };
  

  const handleReset = () => {
    // Reload the page
    window.location.reload();
  };


  return (
    <div className="main">
      <div>
        <h2 className="main_heading">Customize House Model</h2>
        <div className="row">
          <div className="col-lg-2 left" style={{ position: "relative" }}>
            <div>
              <div className="select_part text-center pt-3 ">
                <h5>Selected Part</h5>
                <p className="fw-bold" style={{ color: "#a20000" }}>
                  {selectedPart
                    ? selectedPart.name
                    : "Click on a part of the model"}
                </p>
              </div>

              <div className="text-center mx-lg-2">
                <h4 className="text-center">Choose Colour</h4>
                <div
                  className="custom-scroll"
                  style={{
                    display: "flex",
                    textAlign: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    height: "170px",
                    overflowY: "scroll",
                    backgroundColor: "white",
                    padding: "10px",
                  }}
                >
                  {colorsPalatte.map((paletteColor) => (
                    <div style={{ width: "51px" }}>
                      <p
                        key={paletteColor.code}
                        style={{
                          width: "50px",
                          height: "50px",
                          boxShadow: "1px 1px 3px black",
                          backgroundColor: paletteColor.code,
                          cursor: "pointer",
                          border:
                            color === paletteColor.code
                              ? "2px solid black"
                              : "1px solid gray",
                          marginBottom: "0px",
                        }}
                        onClick={() => setColor(paletteColor.code)}
                      ></p>
                      <p
                        className="mb-0 "
                        style={{ overflow: "hidden", height: "20px" }}
                      >
                        {paletteColor.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className=" d-flex justify-content-around align-items-center">
                  <span className="pr-2">Choose Custom Colour</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={!selectedPart}
                    style={{
                      height: "19px",
                      width: "38px",
                      marginTop: "2px",
                      border: "none",
                    }}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-success fw-bolder"
                  onClick={applyChanges}
                  disabled={!selectedPart}
                >
                  Apply Colour
                </button>
              </div>
            </div>
            <div style={{ paddingLeft: "10px", textAlign: "center" }}>
              <h4>Choose Room</h4>
              <select
                className="selctdrag"
                onChange={handleCategoryChange}
                value={selectedCategory}
                style={{ marginBottom: "10px" }}
              >
                {texturesData.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              <div
                ref={scrollRef}
                className="custom-scroll"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                  height: "180px",
                  overflowY: "scroll",
                  
                }}
              >
                {selectedCategoryTextures.map((texture) => (
                  <div
                    className="imghover"
                    key={texture.id}
                    style={{
                      width: "80px",
                      height: "50px",
                      cursor: "pointer",
                      boxShadow: "1px 1px 3px black",
                      border:
                        selectedTexture === texture.image
                          ? "3px solid green"
                          : "1px solid gray",
                    }}
                    onClick={() => setSelectedTexture(texture.image)}
                  >
                    <img
                      src={texture.image}
                      alt={texture.name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-around w-100 align-items-center mt-2">
                <label>Tile Scale</label>
                <label>
                  X:
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={tileScaleX}
                    onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
                    disabled={!selectedTexture}
                    style={{ width: "47px" }}
                  />
                </label>
                <label>
                  Y:
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={tileScaleY}
                    onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
                    disabled={!selectedTexture}
                    style={{ width: "47px" }}
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn btn-success fw-bolder mt-1"
                onClick={applyTexture}
                disabled={!selectedTexture}
              >
                Apply Tile Pattern
              </button>
            </div>
          </div>
          <div className="col-lg-8">
            <div style={{ width: "100%", height: "100vh" }} className="model-container">
              <Canvas style={{ width: "100%", height: "100vh" }} >
                <ambientLight intensity={0.8} />
                                <directionalLight position={[10, 14, 10]} />
                                <OrbitControls
                                 enablePan={true} // Allows panning the camera
                                 enableZoom={true} // Allows zooming the camera
                                 enableRotate={true} // Allows rotating the model
                                 maxPolarAngle={Math.PI / 1} // Optional: Limit vertical rotation (e.g., prevent flipping)
                                  minPolarAngle={0} // Optional: Limit vertical rotation
                                  enableDamping={true}
                                  dampingFactor={0.9}/>
                <Bounds fit clip margin={3}>
                  <DynamicMaterialModel
                     modelPath="https://ssvconstructions.in/wp-content/uploads/2025/01/glb_files/3d_house.glb"
                    // modelPath="/public/3d house.glb"
                    materialUpdates={materialUpdates}
                    onPartSelected={handlePartSelection}
                  />
                </Bounds>
              </Canvas>
            </div>
            <div>
              <div className="d-flex  gap-2 justify-content-center">
                <div>
                  <button
                    onClick={handlePrint}
                    className="w-30 fw-bold"
                    style={{
                      color: "white",
                      backgroundColor: "#800000",
                      borderRadius: "10px",
                      border: "none",
                      padding: "5px",
                    }}
                  >
                    <img
                      src="	https://cdn-icons-png.flaticon.com/512/10009/10009249.png"
                      alt="SSV"
                      className="footer-image m-1"
                      width="20px"
                      height="20px"
                    />{" "}
                    Download
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleShare}
                    className="w-30 fw-bold"
                    style={{
                      color: "white",
                      backgroundColor: "#800000",
                      borderRadius: "10px",
                      border: "none",
                      padding: "5px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/189/189676.png"
                      alt="SSV"
                      className="footer-image m-1"
                      width="20px"
                      height="20px"
                    />{" "}
                    Share
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleReset}
                    className="w-30 fw-bold"
                    style={{
                      color: "white",
                      backgroundColor: "#800000",
                      borderRadius: "10px",
                      border: "none",
                      padding: "5px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6066/6066733.png"
                      alt="SSV"
                      className="footer-image m-1"
                      width="20px"
                      height="20px"
                    />{" "}
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 left">
          <div className="tiles" style={{ paddingLeft: "10px", textAlign: "center" }}>
  <h4>Choose False Ceiling</h4>
  <select
    className="selctdrag"
    onChange={handleCeilingCategoryChange}
    value={selectedCeilingCategory}
    style={{ marginBottom: "10px" }}
  >
    {ceilingsData.map((category) => (
      <option key={category.category} value={category.category}>
        {category.category}
      </option>
    ))}
  </select>
  <div
    ref={scrollRef}
    className="custom-scroll"
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "center",
      height: "180px",
      overflowY: "scroll",
      backgroundColor: "white",
      padding: "10px",
    }}
  >
    {selectedCeilingTextures.map((ceiling) => (
      <div
        key={ceiling.id}
        style={{
          width: "80px",
          height: "50px",
          cursor: "pointer",
          boxShadow: "1px 1px 3px black",
          border:
            selectedCeilingTexture === ceiling.image
              ? "3px solid green"
              : "1px solid gray",
        }}
        onClick={() => setSelectedCeilingTexture(ceiling.image)}
      >
        <img
          src={ceiling.image}
          alt={ceiling.name}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ))}
  </div>
   <div className="d-flex justify-content-around w-100 align-items-center mt-2">
    <label> Scale</label>
    <label>
      X:
      <input
        type="number"
        min="0.1"
        step="0.1"
        value={tileScaleX}
        onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
        disabled={!selectedCeilingTexture}
        style={{ width: "47px" }}
      />
    </label>
    <label>
      Y:
      <input
        type="number"
        min="0.1"
        step="0.1"
        value={tileScaleY}
        onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
        disabled={!selectedCeilingTexture}
        style={{ width: "47px" }}
      />
    </label>
  </div> 
  <button
    type="button"
    className="btn btn-success fw-bolder mt-2"
    onClick={applyCeilingTexture}
    disabled={!selectedCeilingTexture || !selectedPart}
  >
    Apply False Ceiling
  </button>
</div>

            <div
              className="tiles"
              style={{ paddingLeft: "10px", textAlign: "center" }}
            >
              <h4>Choose Tiles</h4>
              <select
                 className="selctdrag"
                onChange={handleTileCategoryChange}
                value={selectedTileCategory}
                style={{ marginBottom: "10px" }}
              >
                {tilesData.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              <div
                ref={scrollRef}
                className="custom-scroll"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                  height: "180px",
                  overflowY: "scroll",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                {selectedCategoryTiles.map((tile) => (
                  <div
                    key={tile.id}
                    style={{
                      width: "80px",
                      height: "50px",
                      cursor: "pointer",
                      boxShadow: "1px 1px 3px black",
                      border:
                        selectedTile === tile.image
                          ? "3px solid green"
                          : "1px solid gray",
                    }}
                    onClick={() => setSelectedTile(tile.image)}
                  >
                    <img
                      src={tile.image}
                      alt={tile.name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-around w-100 align-items-center mt-2">
                <label>Tile Scale</label>
                <label>
                  X:
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={tileScaleX}
                    onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
                    disabled={!selectedTile}
                    style={{ width: "47px" }}
                  />
                </label>
                <label>
                  Y:
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={tileScaleY}
                    onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
                    disabled={!selectedTile}
                    style={{ width: "47px" }}
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn btn-success fw-bolder mt-2"
                onClick={applyTile}
                disabled={!selectedTile || !selectedPart}
              >
                Apply Tile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model2;

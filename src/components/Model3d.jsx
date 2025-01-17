// import React, { useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
// import { Box3, Vector3, TextureLoader } from "three";
// import * as THREE from "three";
// const DynamicMaterialModel = ({
//   modelPath,
//   materialUpdates,
//   onPartSelected,
// }) => {
//   const { scene } = useGLTF(modelPath);
//   const [hoveredPart, setHoveredPart] = useState(null);
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current) {
//       const boundingBox = new Box3().setFromObject(modelRef.current);
//       const size = new Vector3();
//       boundingBox.getSize(size);
//       console.log("Width:", size.x);
//       console.log("Height:", size.y);
//       console.log("Depth:", size.z);
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         if (!(child.material instanceof THREE.MeshStandardMaterial)) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: child.material.color,
//             roughness: 0.5,
//             metalness: 0.5,
//           });
//         }

//         const update = materialUpdates[child.uuid];
//         if (update) {
//           if (update.color) {
//             child.material.color = new THREE.Color(update.color);
//           }
//           if (update.texture) {
//             const texture = new TextureLoader().load(update.texture);
//             child.material.map = texture;
//           }
//           child.material.needsUpdate = true;
//         }

//         if (child.uuid === hoveredPart) {
//           child.material.emissive = new THREE.Color(0xaaaaaa);
//           child.material.emissiveIntensity = 0.5;
//         } else {
//           child.material.emissive = new THREE.Color(0x000000);
//           child.material.emissiveIntensity = 0;
//         }
//       }
//     });
//   }, [scene, materialUpdates, hoveredPart]);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     const selectedPart = event.object.uuid;
//     const materialName = event.object.material.name;
//     onPartSelected(selectedPart, materialName);
//   };

//   const handlePointerOver = (event) => {
//     setHoveredPart(event.object.uuid);
//   };

//   const handlePointerOut = () => {
//     setHoveredPart(null);
//   };

//   return (
//     <primitive
//       object={scene}
//       onPointerDown={handlePointerDown}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       ref={modelRef}
//     />
//   );
// };

// const Model3d = () => {
//   const [selectedPart, setSelectedPart] = useState(null);
//   const [materialUpdates, setMaterialUpdates] = useState({});
//   const [color, setColor] = useState("#ff6347");
//     const [selectedTexture, setSelectedTexture] = useState(null);
//     const [fallCeiling,setFallCeiling]=useState(null)

//   const textures = [
//     { id: "tile1", src: "/public/textures/andrew-ridley-jR4Zf-riEjI-unsplash (1).jpg" },
//     { id: "tile2", src: "/public/textures/annie-spratt-BAj9EOZiDaE-unsplash.jpg" },
//     { id: "tile3", src: "/public/textures/dulcey-lima-6IVU3CHyL-4-unsplash.jpg" },
//     ];

//   const ceilings = [
//     { id: "1", src: "/public/textures/images.jpeg" },

//     ];

//   const handlePartSelection = (partId, materialName) => {
//     setSelectedPart({ id: partId, name: materialName });
//     const existingProps = materialUpdates[partId] || {};
//     setColor(existingProps.color || "#ff6347");
//     setSelectedTexture(existingProps.texture || null);
//     setFallCeiling(existingProps.texture || null);
//   };

//   const applyChanges = () => {
//     if (selectedPart) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { color },
//       }));
//     }
//   };

//   const applyTexture = () => {
//     if (selectedPart && selectedTexture) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { texture: selectedTexture },
//       }));
//     }
//     };

//     const applyCeiling = () => {
//         if (selectedPart && fallCeiling ) {
//           setMaterialUpdates((prevUpdates) => ({
//             ...prevUpdates,
//             [selectedPart.id]: { texture: fallCeiling },
//           }));
//         }
//       };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ padding: "20px", width: "300px", background: "#f0f0f0" }}>
//         <h2>Material Properties</h2>
//         <p>
//           <strong>Selected Part:</strong>{" "}
//           {selectedPart ? selectedPart.name : "Click on a part of the model"}
//         </p>

//         <h4>Choose Color</h4>
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           disabled={!selectedPart}
//         />
//         <button onClick={applyChanges} disabled={!selectedPart}>
//           Apply Color
//         </button>

//         <h4>Choose Texture</h4>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           {textures.map((texture) => (
//             <div
//               key={texture.id}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 cursor: "pointer",
//                 border:
//                   selectedTexture === texture.src
//                     ? "3px solid green"
//                     : "1px solid gray",
//               }}
//               onClick={() => setSelectedTexture(texture.src)}
//             >
//               <img
//                 src={texture.src}
//                 alt={texture.id}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//           ))}
//         </div>
//         <button onClick={applyTexture} disabled={!selectedTexture || !selectedPart}>
//           Apply Texture
//               </button>

//               <h4>Choose Fall Ceiling</h4>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           {ceilings.map((ceiling) => (
//             <div
//               key={ceiling.id}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 cursor: "pointer",
//                 border:
//                   fallCeiling === ceiling.src
//                     ? "3px solid green"
//                     : "1px solid gray",
//               }}
//               onClick={() => setFallCeiling(ceiling.src)}
//             >
//               <img
//                 src={ceiling.src}
//                 alt={ceiling.id}
//                 style={{ width: "100%", height: "100%" }}
//               />
//               </div>

//           ))}
//                   <button onClick={applyCeiling} disabled={!fallCeiling || !selectedPart}>
//           Apply Fall Ceiling
//               </button>
//         </div>
//       </div>

//       <div style={{ flexGrow: 1 }}>
//         <Canvas>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[100, 100, 10]} />
//           <OrbitControls />
//           <Bounds fit clip margin={3}>
//             <DynamicMaterialModel
//               modelPath="/public/3d house.glb"
//               materialUpdates={materialUpdates}
//               onPartSelected={handlePartSelection}
//             />
//           </Bounds>
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// export default Model3d;

// version 2

// import React, { useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
// import { Box3, Vector3, TextureLoader, RepeatWrapping, Color } from "three";
// import * as THREE from "three";

// const DynamicMaterialModel = ({
//   modelPath,
//   materialUpdates,
//   onPartSelected,
// }) => {
//   const { scene } = useGLTF(modelPath);
//   const [hoveredPart, setHoveredPart] = useState(null);
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current) {
//       const boundingBox = new Box3().setFromObject(modelRef.current);
//       const size = new Vector3();
//       boundingBox.getSize(size);
//       console.log("Width:", size.x);
//       console.log("Height:", size.y);
//       console.log("Depth:", size.z);
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         if (!(child.material instanceof THREE.MeshStandardMaterial)) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: child.material.color,
//             roughness: 0.5,
//             metalness: 0.5,
//           });
//         }

//         const update = materialUpdates[child.uuid];
//         if (update) {
//           if (update.color) {
//             child.material.color = new Color(update.color);
//           }
//           if (update.texture) {
//             const texture = new TextureLoader().load(update.texture);
//             texture.wrapS = RepeatWrapping;
//             texture.wrapT = RepeatWrapping;
//             texture.repeat.set(update.tileScaleX || 1, update.tileScaleY || 1);
//             child.material.map = texture;
//           }
//           child.material.needsUpdate = true;
//         }

//         if (child.uuid === hoveredPart) {
//           child.material.emissive = new THREE.Color(0xaaaaaa);
//           child.material.emissiveIntensity = 0.5;
//         } else {
//           child.material.emissive = new THREE.Color(0x000000);
//           child.material.emissiveIntensity = 0;
//         }
//       }
//     });
//   }, [scene, materialUpdates, hoveredPart]);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     const selectedPart = event.object.uuid;
//     const materialName = event.object.material.name;
//     onPartSelected(selectedPart, materialName);
//   };

//   const handlePointerOver = (event) => {
//     setHoveredPart(event.object.uuid);
//   };

//   const handlePointerOut = () => {
//     setHoveredPart(null);
//   };

//   return (
//     <primitive
//       object={scene}
//       onPointerDown={handlePointerDown}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       ref={modelRef}
//     />
//   );
// };

// const Model3d = () => {
//   const [selectedPart, setSelectedPart] = useState(null);
//   const [materialUpdates, setMaterialUpdates] = useState({});
//   const [color, setColor] = useState("#ff6347");
//   const [selectedTexture, setSelectedTexture] = useState(null);
//   const [tileScaleX, setTileScaleX] = useState(1);
//   const [tileScaleY, setTileScaleY] = useState(1);
//   const [fallCeiling, setFallCeiling] = useState(null);

//   const textures = [
//     {
//       id: "tile1",
//       src: "/public/textures/andrew-ridley-jR4Zf-riEjI-unsplash (1).jpg",
//     },
//     {
//       id: "tile2",
//       src: "/public/textures/annie-spratt-BAj9EOZiDaE-unsplash.jpg",
//     },
//     {
//       id: "tile3",
//       src: "/public/textures/dulcey-lima-6IVU3CHyL-4-unsplash.jpg",
//     },
//   ];

//   const ceilings = [{ id: "1", src: "/public/textures/images.jpeg" }];

//   const handlePartSelection = (partId, materialName) => {
//     setSelectedPart({ id: partId, name: materialName });
//     const existingProps = materialUpdates[partId] || {};
//     setColor(existingProps.color || "#ff6347");
//     setSelectedTexture(existingProps.texture || null);
//     setTileScaleX(existingProps.tileScaleX || 1);
//     setTileScaleY(existingProps.tileScaleY || 1);
//     setFallCeiling(existingProps.texture || null);
//   };

//   const applyChanges = () => {
//     if (selectedPart) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { color },
//       }));
//     }
//   };

//   const applyCeiling = () => {
//     if (selectedPart && fallCeiling) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { texture: fallCeiling },
//       }));
//     }
//   };

//   const applyTexture = () => {
//     if (selectedPart && selectedTexture) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: {
//           texture: selectedTexture,
//           tileScaleX,
//           tileScaleY,
//         },
//       }));
//     }
//   };

//   return (
//       <div className="main" style={{ display: "flex", height: "100vh" }}>
//       <div style={{ padding: "20px", width: "300px", background: "#f0f0f0" }}>
//         <h2>Material Properties</h2>
//         <p>
//           <strong>Selected Part:</strong>{" "}
//           {selectedPart ? selectedPart.name : "Click on a part of the model"}
//         </p>

//         <h4>Choose Color</h4>
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           disabled={!selectedPart}
//         />
//         <button onClick={applyChanges} disabled={!selectedPart}>
//           Apply Color
//         </button>

//         <h4>Choose Texture</h4>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           {textures.map((texture) => (
//             <div
//               key={texture.id}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 cursor: "pointer",
//                 border:
//                   selectedTexture === texture.src
//                     ? "3px solid green"
//                     : "1px solid gray",
//               }}
//               onClick={() => setSelectedTexture(texture.src)}
//             >
//               <img
//                 src={texture.src}
//                 alt={texture.id}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//           ))}
//         </div>

//         <div>
//           <h4>Tile Scale</h4>
//           <label>
//             X:
//             <input
//               type="number"
//               min="0.1"
//               step="0.1"
//               value={tileScaleX}
//               onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
//               disabled={!selectedTexture || !selectedPart}
//             />
//           </label>
//           <label>
//             Y:
//             <input
//               type="number"
//               min="0.1"
//               step="0.1"
//               value={tileScaleY}
//               onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
//               disabled={!selectedTexture || !selectedPart}
//             />
//           </label>
//         </div>
//         <button
//           onClick={applyTexture}
//           disabled={!selectedTexture || !selectedPart}
//         >
//           Apply Texture with Scale
//         </button>
//         <h4>Choose Fall Ceiling</h4>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           {ceilings.map((ceiling) => (
//             <div
//               key={ceiling.id}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 cursor: "pointer",
//                 border:
//                   fallCeiling === ceiling.src
//                     ? "3px solid green"
//                     : "1px solid gray",
//               }}
//               onClick={() => setFallCeiling(ceiling.src)}
//             >
//               <img
//                 src={ceiling.src}
//                 alt={ceiling.id}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//           ))}
//           <button
//             onClick={applyCeiling}
//             disabled={!fallCeiling || !selectedPart}
//           >
//             Apply Fall Ceiling
//           </button>
//         </div>
//       </div>

//       <div style={{ flexGrow: 1 }}>
//         <Canvas>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 10]} />
//           <OrbitControls />
//           <Bounds fit clip margin={3}>
//             <DynamicMaterialModel
//               modelPath="/public/3d house.glb"
//               materialUpdates={materialUpdates}
//               onPartSelected={handlePartSelection}
//             />
//           </Bounds>
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// export default Model3d;

// verson 3 with styling

// import React, { useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
// import { Box3, Vector3, TextureLoader, RepeatWrapping, Color } from "three";
// import * as THREE from "three";
// import "../assets/styles/model3d.css";
// import { colorsPalatte } from "../data/colorsPalatte";
// const DynamicMaterialModel = ({
//   modelPath,
//   materialUpdates,
//   onPartSelected,
// }) => {
//   const { scene } = useGLTF(modelPath);
//   const [hoveredPart, setHoveredPart] = useState(null);
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current) {
//       const boundingBox = new Box3().setFromObject(modelRef.current);
//       const size = new Vector3();
//       boundingBox.getSize(size);
//       console.log("Width:", size.x);
//       console.log("Height:", size.y);
//       console.log("Depth:", size.z);
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         if (!(child.material instanceof THREE.MeshStandardMaterial)) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: child.material.color,
//             roughness: 0.5,
//             metalness: 0.5,
//           });
//         }

//         const update = materialUpdates[child.uuid];
//         if (update) {
//           if (update.color) {
//             child.material.color = new Color(update.color);
//           }
//           if (update.texture) {
//             const texture = new TextureLoader().load(update.texture);
//             texture.wrapS = RepeatWrapping;
//             texture.wrapT = RepeatWrapping;
//             texture.repeat.set(update.tileScaleX || 1, update.tileScaleY || 1);
//             child.material.map = texture;
//           }
//           child.material.needsUpdate = true;
//         }

//         if (child.uuid === hoveredPart) {
//           child.material.emissive = new THREE.Color(0xaaaaaa);
//           child.material.emissiveIntensity = 0.5;
//         } else {
//           child.material.emissive = new THREE.Color(0x000000);
//           child.material.emissiveIntensity = 0;
//         }
//       }
//     });
//   }, [scene, materialUpdates, hoveredPart]);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     const selectedPart = event.object.uuid;
//     const materialName = event.object.material.name;
//     onPartSelected(selectedPart, materialName);
//   };

//   const handlePointerOver = (event) => {
//     setHoveredPart(event.object.uuid);
//   };

//   const handlePointerOut = () => {
//     setHoveredPart(null);
//   };

//   return (
//     <primitive
//       object={scene}
//       onPointerDown={handlePointerDown}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       ref={modelRef}
//     />
//   );
// };

// const Model3d = () => {
//   const [selectedPart, setSelectedPart] = useState(null);
//   const [materialUpdates, setMaterialUpdates] = useState({});
//   const [color, setColor] = useState("#ff6347");
//   const [selectedTexture, setSelectedTexture] = useState(null);
//   const [tileScaleX, setTileScaleX] = useState(1);
//   const [tileScaleY, setTileScaleY] = useState(1);
//   const [fallCeiling, setFallCeiling] = useState(null);

//   const textures = [
//     {
//       id: "tile1",
//       src: "/public/textures/andrew-ridley-jR4Zf-riEjI-unsplash (1).jpg",
//     },
//     {
//       id: "tile2",
//       src: "/public/textures/annie-spratt-BAj9EOZiDaE-unsplash.jpg",
//     },
//     {
//       id: "tile3",
//       src: "/public/textures/dulcey-lima-6IVU3CHyL-4-unsplash.jpg",
//     },
//   ];

//   const ceilings = [{ id: "1", src: "/public/textures/images.jpeg" }];

//   const handlePartSelection = (partId, materialName) => {
//     setSelectedPart({ id: partId, name: materialName });
//     const existingProps = materialUpdates[partId] || {};
//     setColor(existingProps.color || "#ff6347");
//     setSelectedTexture(existingProps.texture || null);
//     setTileScaleX(existingProps.tileScaleX || 1);
//     setTileScaleY(existingProps.tileScaleY || 1);
//     setFallCeiling(existingProps.texture || null);
//   };

//   const applyChanges = () => {
//     if (selectedPart) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { color },
//       }));
//     }
//   };

//   const applyCeiling = () => {
//     if (selectedPart && fallCeiling) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { texture: fallCeiling },
//       }));
//     }
//   };

//   const applyTexture = () => {
//     if (selectedPart && selectedTexture) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: {
//           texture: selectedTexture,
//           tileScaleX,
//           tileScaleY,
//         },
//       }));
//     }
//   };

//   return (
//     <div className="main">
//       <div>
//         <h2 className="main_heading"> SSV 3D DESIGNS</h2>
//         <div className="row">
//           <div className="col-lg-2 left">
//             <div>
//               <div className="select_part text-center pt-3">
//                 <h5>Selected Part</h5>
//                 <p className="fw-bold" style={{ color: "#a20000" }}>
//                   {selectedPart
//                     ? selectedPart.name
//                     : "Click on a part of the model"}
//                 </p>
//               </div>

//               <div className="text-center">
//                 <h4 className="text-center">Choose Color</h4>
//                 <div
//                   style={{
//                     display: "flex",
//                     textAlign: "center",
//                     gap: "10px",
//                     flexWrap: "wrap",
//                     justifyContent: "center",

//                     height: "250px",
//                                       overflowY: "scroll",

//                     backgroundColor: "white",
//                     padding: "10px",
//                   }}
//                 >
//                   {/* Predefined Color Palette */}
//                   {colorsPalatte.map((paletteColor) => (
//                     <div style={{ width: "51px" }}>
//                       <p
//                         key={paletteColor.code}
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           boxShadow: "1px 1px 3px black",
//                           backgroundColor: paletteColor.code,
//                           cursor: "pointer",
//                           border:
//                             color === paletteColor.code
//                               ? "2px solid black"
//                               : "1px solid gray",
//                           marginBottom: "0px",
//                         }}
//                         onClick={() => setColor(paletteColor.code)}
//                       ></p>
//                       <p
//                         className="mb-0 "
//                         style={{ overflow: "hidden", height: "20px" }}
//                       >
//                         {paletteColor.name}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className=" d-flex justify-content-around
//                               align-items-center"
//                 >
//                   <span className="pr-2">Choose Custom Color</span>
//                   <input
//                     type="color"
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}
//                     disabled={!selectedPart}
//                     style={{ height: "19px", width: "38px", marginTop: "2px",border:"none" }}
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-success fw-bolder"
//                   onClick={applyChanges}
//                   disabled={!selectedPart}
//                 >
//                   Apply color
//                 </button>
//               </div>
//             </div>
//             <h4>Choose Texture</h4>
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "10px",
//                 marginTop: "0px",
//               }}
//             >
//               {textures.map((texture) => (
//                 <div
//                   key={texture.id}
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     cursor: "pointer",
//                     border:
//                       selectedTexture === texture.src
//                         ? "3px solid green"
//                         : "1px solid gray",
//                   }}
//                   onClick={() => setSelectedTexture(texture.src)}
//                 >
//                   <img
//                     src={texture.src}
//                     alt={texture.id}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h4>Tile Scale</h4>
//               <label>
//                 X:
//                 <input
//                   type="number"
//                   min="0.1"
//                   step="0.1"
//                   value={tileScaleX}
//                   onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
//                   disabled={!selectedTexture || !selectedPart}
//                 />
//               </label>
//               <label>
//                 Y:
//                 <input
//                   type="number"
//                   min="0.1"
//                   step="0.1"
//                   value={tileScaleY}
//                   onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
//                   disabled={!selectedTexture || !selectedPart}
//                 />
//               </label>
//             </div>
//             <button
//               onClick={applyTexture}
//               disabled={!selectedTexture || !selectedPart}
//             >
//               Apply Texture with Scale
//             </button>
//           </div>
//           <div className="col-lg-8">
//             <div style={{ width: "100%", height: "100vh" }}>
//               <Canvas style={{ width: "100%", height: "100vh" }}>
//                 <ambientLight intensity={0.5} />
//                 <directionalLight position={[10, 10, 10]} />
//                 <OrbitControls />
//                 <Bounds fit clip margin={3}>
//                   <DynamicMaterialModel
//                     modelPath="/public/3d house.glb"
//                     materialUpdates={materialUpdates}
//                     onPartSelected={handlePartSelection}
//                   />
//                 </Bounds>
//               </Canvas>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <h4>Choose Fall Ceiling</h4>
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "10px",
//                 marginTop: "10px",
//               }}
//             >
//               {ceilings.map((ceiling) => (
//                 <div
//                   key={ceiling.id}
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     cursor: "pointer",
//                     border:
//                       fallCeiling === ceiling.src
//                         ? "3px solid green"
//                         : "1px solid gray",
//                   }}
//                   onClick={() => setFallCeiling(ceiling.src)}
//                 >
//                   <img
//                     src={ceiling.src}
//                     alt={ceiling.id}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
//               ))}
//               <button
//                 onClick={applyCeiling}
//                 disabled={!fallCeiling || !selectedPart}
//               >
//                 Apply Fall Ceiling
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{ padding: "20px", width: "300px", background: "#f0f0f0" }}
//       ></div>
//     </div>
//   );
// };

// export default Model3d;

// version 3 modification paint linerar graident

// import React, { useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
// import { Box3, Vector3, TextureLoader, RepeatWrapping, Color } from "three";
// import * as THREE from "three";
// import "../assets/styles/model3d.css";
// import { texturesData } from "../data/textures";
// import { colorsPalatte } from "../data/colorsPalatte";
// const DynamicMaterialModel = ({
//   modelPath,
//   materialUpdates,
//   onPartSelected,
// }) => {
//   const { scene } = useGLTF(modelPath);
//   const [hoveredPart, setHoveredPart] = useState(null);
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current) {
//       const boundingBox = new Box3().setFromObject(modelRef.current);
//       const size = new Vector3();
//       boundingBox.getSize(size);
//       console.log("Width:", size.x);
//       console.log("Height:", size.y);
//       console.log("Depth:", size.z);
//     }

//     scene.traverse((child) => {
//       if (child.isMesh) {
//         if (!(child.material instanceof THREE.MeshStandardMaterial)) {
//           child.material = new THREE.MeshStandardMaterial({
//             color: child.material.color,
//             roughness: 0.5,
//             metalness: 0.5,
//           });
//         }

//         const update = materialUpdates[child.uuid];
//         if (update) {
//           if (update.color) {
//             child.material.color = new Color(update.color);
//           }
//           if (update.texture) {
//             const texture = new TextureLoader().load(update.texture);
//             texture.wrapS = RepeatWrapping;
//             texture.wrapT = RepeatWrapping;
//             texture.repeat.set(update.tileScaleX || 1, update.tileScaleY || 1);
//             child.material.map = texture;
//           }
//           child.material.needsUpdate = true;
//         }

//         if (child.uuid === hoveredPart) {
//           child.material.emissive = new THREE.Color(0xaaaaaa);
//           child.material.emissiveIntensity = 0.5;
//         } else {
//           child.material.emissive = new THREE.Color(0x000000);
//           child.material.emissiveIntensity = 0;
//         }
//       }
//     });
//   }, [scene, materialUpdates, hoveredPart]);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     const selectedPart = event.object.uuid;
//     const materialName = event.object.material.name;
//     onPartSelected(selectedPart, materialName);
//   };

//   const handlePointerOver = (event) => {
//     setHoveredPart(event.object.uuid);
//   };

//   const handlePointerOut = () => {
//     setHoveredPart(null);
//   };

//   return (
//     <primitive
//       object={scene}
//       onPointerDown={handlePointerDown}
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       ref={modelRef}
//     />
//   );
// };

// const Model3d = () => {
//   const [selectedPart, setSelectedPart] = useState(null);
//   const [materialUpdates, setMaterialUpdates] = useState({});
//   const [color, setColor] = useState("#ff6347");
//   const [selectedTexture, setSelectedTexture] = useState(null);
//   const [tileScaleX, setTileScaleX] = useState(1);
//   const [tileScaleY, setTileScaleY] = useState(1);
//   const [fallCeiling, setFallCeiling] = useState(null);
//   const ceilings = [{ id: "1", src: "/public/textures/images.jpeg" }];

//   const handlePartSelection = (partId, materialName) => {
//     setSelectedPart({ id: partId, name: materialName });
//     const existingProps = materialUpdates[partId] || {};
//     setColor(existingProps.color || "#ff6347");
//     setSelectedTexture(existingProps.texture || null);
//     setTileScaleX(existingProps.tileScaleX || 1);
//     setTileScaleY(existingProps.tileScaleY || 1);
//     setFallCeiling(existingProps.texture || null);
//   };

//   const applyChanges = () => {
//     if (selectedPart) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { color },
//       }));
//     }
//   };

//   const applyCeiling = () => {
//     if (selectedPart && fallCeiling) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: { texture: fallCeiling },
//       }));
//     }
//   };

//   const applyTexture = () => {
//     if (selectedPart && selectedTexture) {
//       setMaterialUpdates((prevUpdates) => ({
//         ...prevUpdates,
//         [selectedPart.id]: {
//           texture: selectedTexture,
//           tileScaleX,
//           tileScaleY,
//         },
//       }));
//     }
//   };

//   //gradients

//   return (
//     <div className="main">
//       <div>
//         <h2 className="main_heading"> SSV HOME SIMULATOR</h2>
//         <div className="row">
//           <div className="col-lg-2 left">
//             <div>
//               <div className="select_part text-center pt-3">
//                 <h5>Selected Part</h5>
//                 <p className="fw-bold" style={{ color: "#a20000" }}>
//                   {selectedPart
//                     ? selectedPart.name
//                     : "Click on a part of the model"}
//                 </p>
//               </div>

//               <div className="text-center">
//                 <h4 className="text-center">Choose Colour</h4>
//                 <div className="custom-scroll"
//                   style={{
//                     display: "flex",
//                     textAlign: "center",
//                     gap: "10px",
//                     flexWrap: "wrap",
//                     justifyContent: "center",

//                     height: "170px",
//                     overflowY: "scroll",

//                     backgroundColor: "white",
//                     padding: "10px",
//                   }}
//                 >
//                   {/* Predefined Color Palette */}
//                   {colorsPalatte.map((paletteColor) => (
//                     <div style={{ width: "51px" }}>
//                       <p
//                         key={paletteColor.code}
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           boxShadow: "1px 1px 3px black",
//                           backgroundColor: paletteColor.code,
//                           cursor: "pointer",
//                           border:
//                             color === paletteColor.code
//                               ? "2px solid black"
//                               : "1px solid gray",
//                           marginBottom: "0px",
//                         }}
//                         onClick={() => setColor(paletteColor.code)}
//                       ></p>
//                       <p
//                         className="mb-0 "
//                         style={{ overflow: "hidden", height: "20px" }}
//                       >
//                         {paletteColor.name}
//                       </p>
//                     </div>
//                   ))}

//                 </div>
//                 <div
//                   className=" d-flex justify-content-around
//                               align-items-center"
//                 >
//                   <span className="pr-2">Choose Custom Colour</span>
//                   <input
//                     type="color"
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}
//                     disabled={!selectedPart}
//                     style={{
//                       height: "19px",
//                       width: "38px",
//                       marginTop: "2px",
//                       border: "none",
//                     }}
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-success fw-bolder"
//                   onClick={applyChanges}
//                   disabled={!selectedPart}
//                 >
//                   Apply Colour
//                 </button>
//               </div>
//             </div>
//             <h4>Choose Tile</h4>
//             <div
//               className="custom-scroll"
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "10px",
//                 marginTop: "0px",
//                 justifyContent: "center",
//                 height: "180px",
//                 overflowY: "scroll"
//               }}
//             >
//               {texturesData.map((texture) => (
//                 <div
//                   key={texture.id}
//                   style={{
//                     width: "80px",
//                     height: "50px",
//                     cursor: "pointer",
//                     border:
//                       selectedTexture === texture.image
//                         ? "3px solid green"
//                         : "1px solid gray",
//                   }}
//                   onClick={() => setSelectedTexture(texture.image)}
//                 >
//                   <img
//                     src={texture.image}
//                     alt={texture.id}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="d-flex justify-content-around w-100 align-items-center">
//               <label>Tile Scale</label>
//               <label>
//                 X:
//                 <input
//                   type="number"
//                   min="0.1"
//                   step="0.1"
//                   value={tileScaleX}
//                   onChange={(e) => setTileScaleX(parseFloat(e.target.value))}
//                   disabled={!selectedTexture || !selectedPart}
//                   style={{width:"30px"}}
//                 />
//               </label>
//               <label>
//                 Y:
//                 <input
//                   type="number"
//                   min="0.1"
//                   step="0.1"
//                   value={tileScaleY}
//                   onChange={(e) => setTileScaleY(parseFloat(e.target.value))}
//                   disabled={!selectedTexture || !selectedPart}
//                   style={{width:"30px"}}
//                 />
//               </label>
//             </div>
//             <button  type="button"
//               className="btn btn-success fw-bolder"
//               onClick={applyTexture}
//               disabled={!selectedTexture || !selectedPart}
//             >
//               Apply Tile Pattern
//             </button>
//           </div>
//           <div className="col-lg-8">
//             <div style={{ width: "100%", height: "100vh" }}>
//               <Canvas style={{ width: "100%", height: "100vh" }}>
//                 <ambientLight intensity={0.5} />
//                 <directionalLight position={[10, 10, 10]} />
//                 <OrbitControls />
//                 <Bounds fit clip margin={3}>
//                   <DynamicMaterialModel
//                     modelPath="/public/3d house.glb"
//                     materialUpdates={materialUpdates}
//                     onPartSelected={handlePartSelection}
//                   />
//                 </Bounds>
//               </Canvas>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <h4>Choose Fall Ceiling</h4>
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "10px",
//                 marginTop: "10px",
//               }}
//             >
//               {ceilings.map((ceiling) => (
//                 <div
//                   key={ceiling.id}
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     cursor: "pointer",
//                     border:
//                       fallCeiling === ceiling.src
//                         ? "3px solid green"
//                         : "1px solid gray",
//                   }}
//                   onClick={() => setFallCeiling(ceiling.src)}
//                 >
//                   <img
//                     src={ceiling.src}
//                     alt={ceiling.id}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
//               ))}
//               <button
//                 onClick={applyCeiling}
//                 disabled={!fallCeiling || !selectedPart}
//               >
//                 Apply Fall Ceiling
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Model3d;

// texture dropdown

import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { Box3, Vector3, TextureLoader, RepeatWrapping, Color } from "three";
import * as THREE from "three";
import "../assets/styles/model3d.css";
import { texturesData } from "../data/textures";
import { colorsPalatte } from "../data/colorsPalatte";
import { tilesData } from "../data/tiles";

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

const Model3d = () => {
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

  const ceilings = [{ id: "1", src: "/public/textures/images.jpeg" }];

  const handlePartSelection = (partId, materialName) => {
    setSelectedPart({ id: partId, name: materialName });
    const existingProps = materialUpdates[partId] || {};
    setColor(existingProps.color || "#ff6347");
    setSelectedTexture(existingProps.texture || null);
    setTileScaleX(existingProps.tileScaleX || 1);
    setTileScaleY(existingProps.tileScaleY || 1);
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

  return (
    <div className="main">
      <div>
        <h2 className="main_heading"> SSV HOME SIMULATOR</h2>
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
            <div style={{ width: "100%", height: "100vh" }}>
              <Canvas style={{ width: "100%", height: "100vh" }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <OrbitControls />
                <Bounds fit clip margin={3}>
                  <DynamicMaterialModel
                    modelPath="/public/3d house.glb"
                    materialUpdates={materialUpdates}
                    onPartSelected={handlePartSelection}
                  />
                </Bounds>
              </Canvas>
            </div>
          </div>
          <div className="col-lg-2 left">
            <h4>Choose Fall Ceiling</h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {ceilings.map((ceiling) => (
                <div
                  key={ceiling.id}
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                    border:
                      fallCeiling === ceiling.src
                        ? "3px solid green"
                        : "1px solid gray",
                  }}
                  onClick={() => setFallCeiling(ceiling.src)}
                >
                  <img
                    src={ceiling.src}
                    alt={ceiling.id}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
              <button
                onClick={applyCeiling}
                disabled={!fallCeiling || !selectedPart}
              >
                Apply Fall Ceiling
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

export default Model3d;

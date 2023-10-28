import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { TypeAnimation } from 'react-type-animation';
import video from '../assets/video0.mp4'
import '../Styling/Mythred.scss'
 
const ExampleComponent = () => {
  return (
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed once, initially
      'Welcome To MI Site',
      1000,
      'Enhance Your Experience',
      1000,
      'Adding Random Text',
      1000,
      'Adding More Text',
      1000,
    ]}
    speed={50}
    style={{ fontSize: '2em' }}
    repeat={Infinity}
  />
  );
};

const Robot = () => {
  const earth = useGLTF("./new_model1/adamHead.glb");

  return (
    <primitive
      object={earth.scene}
      // scale={[6, 6, 6]}
      
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const Car = () => {
  const earth = useGLTF("./car_model/McLaren.glb");

  return (
    <primitive
      object={earth.scene}
      scale={[6, 6, 6]}
      
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense>
        <OrbitControls
          autoRotate={true}
          defaultRotate={[Math.PI / 4, 0, 0]}
          enableZoom={false}
          maxPolarAngle={1.5}
          minPolarAngle={-0.8}
        />

        {/* Add a Directional Light */}
        <directionalLight
          intensity={30}
          position={[0, 5, 0]}
          color={"orange"}
        />
        <pointLight
          position={[5, 5, 5]}
          distance={10}
          decay={0.2}
          intensity={100}
          color={"skyblue"}
        />
        {/* <Earth /> */}
        <HOC model={Robot}/>
        

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export { EarthCanvas };

const CarCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense>
        <OrbitControls
          autoRotate={true}
          defaultRotate={[Math.PI, 0, 0]}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Add a Directional Light */}
        <directionalLight
          intensity={3}
          position={[0, 5, 0]}
          color={"orange"}
        />
        <pointLight
          position={[5, 5, 5]}
          distance={10}
          decay={0.2}
          intensity={10}
          color={"skyblue"}
        />
        {/* <Earth /> */}
        
        <HOC model={Car}/>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};



export { CarCanvas };
const HOC=(props)=>{
  return <> <props.model/> </>
}

const Mythred = () => {
  return (
    <div className=" w-[100vw] h-[100vh] bg-gradient-to-tr from-pink-500 to-indigo-800 flex  sm:flex-row flex-col justify-between">
      
      <div className="sm:w-[40vw] sm:h-[50vh] w-[100vw] ">
        
        <EarthCanvas />
        <CarCanvas/>
      </div>
        {/* <div className="animate-border w-[100vw] h-[100vh] absolute rounded-md bg-white bg-gradient-to-r from-red-800 via-green-600 to-blue-800 bg-[length:400%_400%] p-1  z-0"></div> */}
        {/* <img className="absolute z-0 w-[97vw]h-[100vh] mx-[.5rem] mt-2" src="https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvam9iNDA1LW1hZXdoLTAyYS5qcGc.jpg" alt="img" /> */}
        <video autoPlay loop muted className="absolute z-0 w-[100vw] h-[100vh] " >
          <source src = {video} type = 'video/mp4' className="h-[100vh]" />
          </video>
      <div className="absolute left-[30%] top-[15%] p-5 m-5 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent font-bold text-5xl ">
        <div className="z-10">

       <ExampleComponent />
        </div>
      </div>
    </div>
  );
};
export default Mythred;


import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';

const CoachModel = ({ onError }: { onError: () => void }) => {
  try {
    const { scene } = useGLTF('https://darling-gaufre-9b53cc.netlify.app/Coach_0523175336_stylize.glb');
    
    return (
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -1, 0]}
      />
    );
  } catch (error) {
    console.error('Error loading 3D model:', error);
    onError();
    return null;
  }
};

const FallbackModel = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#00ff41" />
    </mesh>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green"></div>
    </div>
  );
};

const AICoach3D = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <FallbackModel />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Suspense fallback={<LoadingSpinner />}>
          <CoachModel onError={() => setHasError(true)} />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default AICoach3D;

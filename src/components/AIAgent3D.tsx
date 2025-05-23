
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CoachModelProps {
  scrollOffset: number;
}

const CoachModel = ({ scrollOffset }: CoachModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/Chxpz/3d-assets@main/Coach_0523175336_stylize.glb');
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle breathing animation
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    meshRef.current.scale.setScalar(breathingScale);
    
    // Scroll-based tilt
    const tiltAmount = scrollOffset * 0.1;
    meshRef.current.rotation.z = tiltAmount;
  });
  
  return (
    <group ref={meshRef} position={[0, -1, 0]} scale={[2, 2, 2]}>
      <primitive object={scene} />
    </group>
  );
};

const AIAgent3D = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollOffset(Math.min(scrolled / 1000, 0.2));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fallback to static image on mobile
  if (isMobile) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/98c8dc37-2b2e-4b00-b464-06ecf3147ffe.png"
          alt="AI Coach"
          className="max-w-full max-h-full object-contain animate-float"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.3))' }}
        />
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#00FF41" />
        
        <Suspense fallback={null}>
          <CoachModel scrollOffset={scrollOffset} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={false}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('https://cdn.jsdelivr.net/gh/Chxpz/3d-assets@main/Coach_0523175336_stylize.glb');

export default AIAgent3D;

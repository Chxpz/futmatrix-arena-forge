
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

interface AgentMeshProps {
  mousePosition: { x: number; y: number };
  scrollOffset: number;
  isMobile: boolean;
}

const AgentMesh = ({ mousePosition, scrollOffset, isMobile }: AgentMeshProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  
  const { viewport } = useThree();
  
  // Load the agent texture
  const agentTexture = useTexture('/lovable-uploads/5b3b912d-a235-4631-a6c4-f4514eec9a53.png');
  
  useFrame((state) => {
    if (!meshRef.current || !headRef.current) return;
    
    // Smooth head rotation following mouse
    const targetRotationY = (mousePosition.x * 0.3);
    const targetRotationX = (mousePosition.y * 0.2);
    
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    
    // Subtle breathing animation
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    meshRef.current.scale.y = breathingScale;
    
    // Scroll-based tilt
    const tiltAmount = scrollOffset * 0.1;
    meshRef.current.rotation.z = tiltAmount;
    
    // Eye tracking
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeTargetX = mousePosition.x * 0.1;
      const eyeTargetY = mousePosition.y * 0.1;
      
      eyeLeftRef.current.position.x = THREE.MathUtils.lerp(
        eyeLeftRef.current.position.x,
        eyeTargetX,
        0.1
      );
      eyeLeftRef.current.position.y = THREE.MathUtils.lerp(
        eyeLeftRef.current.position.y,
        eyeTargetY,
        0.1
      );
      
      eyeRightRef.current.position.x = THREE.MathUtils.lerp(
        eyeRightRef.current.position.x,
        eyeTargetX,
        0.1
      );
      eyeRightRef.current.position.y = THREE.MathUtils.lerp(
        eyeRightRef.current.position.y,
        eyeTargetY,
        0.1
      );
    }
  });
  
  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <group ref={headRef}>
        {/* Main agent body - using a plane with the texture */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[3, 4]} />
          <meshBasicMaterial 
            map={agentTexture} 
            transparent={true}
            alphaTest={0.1}
          />
        </mesh>
        
        {/* Invisible eye tracking points */}
        <mesh ref={eyeLeftRef} position={[-0.3, 0.8, 0.01]} visible={false}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        
        <mesh ref={eyeRightRef} position={[0.3, 0.8, 0.01]} visible={false}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </group>
      
      {/* Subtle ambient lighting effect */}
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#00FF41" />
    </group>
  );
};

const AIAgent3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition({ x, y });
    };
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollOffset(Math.min(scrolled / 1000, 0.2));
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);
  
  // Fallback to static image on mobile or if 3D fails to load
  if (isMobile) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/5b3b912d-a235-4631-a6c4-f4514eec9a53.png"
          alt="AI Agent"
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
        onCreated={() => setIsLoaded(true)}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <AgentMesh 
          mousePosition={mousePosition}
          scrollOffset={scrollOffset}
          isMobile={isMobile}
        />
      </Canvas>
      
      {/* Loading fallback */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/5b3b912d-a235-4631-a6c4-f4514eec9a53.png"
            alt="AI Agent"
            className="max-w-full max-h-full object-contain opacity-50"
          />
        </div>
      )}
    </div>
  );
};

export default AIAgent3D;

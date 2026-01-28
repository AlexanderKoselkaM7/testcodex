import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import * as THREE from "three";
import { BS_COLORS } from "./BuitenstateStyles";

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

const Tree: React.FC<TreeProps> = ({
  position = [0, -1, 0],
  scale = 1,
  rotationSpeed = 0.3
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const groupRef = useRef<THREE.Group>(null);

  // Animation values
  const growthProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 50,
      mass: 1,
    },
  });

  const swayAmount = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [-0.03, 0.03]
  );

  // Gentle rotation
  const rotation = frame * 0.005 * rotationSpeed;

  // Generate branch positions procedurally
  const branches = useMemo(() => {
    const result = [];
    const branchCount = 8;

    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 2;
      const height = 0.5 + (i % 3) * 0.4;
      const length = 0.3 + Math.random() * 0.2;

      result.push({
        angle,
        height,
        length,
        rotationZ: -Math.PI / 4 - Math.random() * 0.3,
      });
    }
    return result;
  }, []);

  // Generate leaf cluster positions
  const leafClusters = useMemo(() => {
    const clusters = [];
    const clusterCount = 12;

    for (let i = 0; i < clusterCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const radius = 0.8 + Math.random() * 0.4;

      clusters.push({
        position: [
          Math.sin(theta) * Math.cos(phi) * radius,
          1.2 + Math.random() * 0.8,
          Math.cos(theta) * Math.cos(phi) * radius,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.3,
      });
    }
    return clusters;
  }, []);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale * growthProgress}
      rotation={[0, rotation, swayAmount]}
    >
      {/* Tree trunk */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>

      {/* Trunk top section */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>

      {/* Branches */}
      {branches.map((branch, i) => (
        <group
          key={i}
          position={[0, branch.height, 0]}
          rotation={[0, branch.angle, branch.rotationZ]}
        >
          <mesh position={[branch.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.04, branch.length, 6]} />
            <meshStandardMaterial color="#6D4C41" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Leaf clusters - using spheres for a stylized look */}
      {leafClusters.map((cluster, i) => (
        <mesh key={i} position={cluster.position}>
          <sphereGeometry args={[cluster.scale, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? BS_COLORS.green : i % 3 === 1 ? BS_COLORS.greenLight : BS_COLORS.greenDark}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Main foliage mass */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={BS_COLORS.green} roughness={0.8} />
      </mesh>

      <mesh position={[0.3, 1.7, 0.2]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color={BS_COLORS.greenLight} roughness={0.8} />
      </mesh>

      <mesh position={[-0.25, 1.6, -0.15]}>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshStandardMaterial color={BS_COLORS.greenDark} roughness={0.8} />
      </mesh>

      <mesh position={[0, 2.0, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color={BS_COLORS.greenLight} roughness={0.8} />
      </mesh>
    </group>
  );
};

interface Tree3DSceneProps {
  cameraPosition?: [number, number, number];
  backgroundColor?: string;
  showGround?: boolean;
}

export const Tree3DScene: React.FC<Tree3DSceneProps> = ({
  cameraPosition = [0, 1.5, 5],
  backgroundColor = "transparent",
  showGround = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom animation
  const zoomProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 30,
      mass: 1,
    },
  });

  const cameraZ = interpolate(zoomProgress, [0, 1], [7, cameraPosition[2]]);

  return (
    <Canvas
      camera={{ position: [cameraPosition[0], cameraPosition[1], cameraZ], fov: 50 }}
      style={{ background: backgroundColor }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        color="#FFF8E7"
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#E8F5E9"
      />

      {/* Main tree */}
      <Tree position={[0, -0.5, 0]} scale={1.2} />

      {/* Background trees (smaller, further back) */}
      <Tree position={[-2.5, -0.5, -2]} scale={0.6} rotationSpeed={0.2} />
      <Tree position={[2.8, -0.5, -2.5]} scale={0.5} rotationSpeed={0.15} />
      <Tree position={[-1.5, -0.5, -3.5]} scale={0.4} rotationSpeed={0.25} />
      <Tree position={[1.8, -0.5, -4]} scale={0.35} rotationSpeed={0.18} />

      {/* Ground plane */}
      {showGround && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={BS_COLORS.sand} roughness={1} />
        </mesh>
      )}
    </Canvas>
  );
};

export default Tree3DScene;

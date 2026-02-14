import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, Object3DNode } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { cities, getCityDependencies, getRegionById, type City } from "@/data/cities";
import { latLngToVector3, createArcPoints, foodCategoryColorHex } from "@/lib/globe-utils";

// Extend R3F to know about Line_ (avoid SVG <line> type conflict)
class Line_ extends THREE.Line {}
extend({ Line_ });

declare module "@react-three/fiber" {
  interface ThreeElements {
    line_: Object3DNode<THREE.Line, typeof THREE.Line>;
  }
}

const GLOBE_RADIUS = 1;

function Earth() {
  return (
    <Sphere args={[GLOBE_RADIUS, 64, 64]}>
      <meshStandardMaterial
        color="#0a1628"
        emissive="#0d2137"
        emissiveIntensity={0.3}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

function GridLines() {
  const geometries = useMemo(() => {
    const geos: THREE.BufferGeometry[] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 2) {
        points.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.002));
      }
      geos.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    for (let lng = -180; lng < 180; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        points.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.002));
      }
      geos.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return geos;
  }, []);

  return (
    <>
      {geometries.map((geo, i) => (
        <line_ key={i} geometry={geo}>
          <lineBasicMaterial color="#1e3a5f" opacity={0.25} transparent />
        </line_>
      ))}
    </>
  );
}

function CityPin({ city, isSelected, onClick }: { city: City; isSelected: boolean; onClick: () => void }) {
  const pos = useMemo(() => latLngToVector3(city.lat, city.lng, GLOBE_RADIUS + 0.01), [city]);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = isSelected ? 1.5 + Math.sin(clock.elapsedTime * 3) * 0.3 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const color = isSelected ? 0x22d3ee : city.vulnerabilityScore > 75 ? 0xef4444 : city.vulnerabilityScore > 50 ? 0xf59e0b : 0x4ade80;

  return (
    <group position={pos}>
      <mesh ref={meshRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 1.2 : 0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.015, 0.022, 32]} />
        <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.6 : 0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FoodFlowArcs({ cityId }: { cityId: string }) {
  const deps = useMemo(() => getCityDependencies(cityId), [cityId]);
  const city = useMemo(() => cities.find((c) => c.id === cityId), [cityId]);

  const arcData = useMemo(() => {
    if (!city) return [];
    return deps.map((dep) => {
      const region = getRegionById(dep.regionId);
      if (!region) return null;
      const start = latLngToVector3(region.lat, region.lng, GLOBE_RADIUS + 0.005);
      const end = latLngToVector3(city.lat, city.lng, GLOBE_RADIUS + 0.005);
      const arcPoints = createArcPoints(start, end, 64, 0.2);
      const color = foodCategoryColorHex[dep.foodCategory] || 0x22d3ee;
      const geo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const mat = new THREE.LineBasicMaterial({ color, opacity: 0.7, transparent: true });
      return { id: dep.id, geo, mat };
    }).filter(Boolean) as { id: string; geo: THREE.BufferGeometry; mat: THREE.LineBasicMaterial }[];
  }, [deps, city]);

  return (
    <>
      {arcData.map((arc) => (
        <line_ key={arc.id} geometry={arc.geo} material={arc.mat} />
      ))}
    </>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[GLOBE_RADIUS + 0.05, 64, 64]}>
      <meshStandardMaterial color="#22d3ee" transparent opacity={0.04} side={THREE.BackSide} />
    </Sphere>
  );
}

interface GlobeSceneProps {
  selectedCity: string | null;
  onSelectCity: (id: string | null) => void;
  autoRotate?: boolean;
  className?: string;
}

export default function GlobeScene({ selectedCity, onSelectCity, autoRotate = true, className = "" }: GlobeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={0.4} color="#88ccff" />
        <pointLight position={[-5, -3, -5]} intensity={0.2} color="#22d3ee" />

        <group>
          <Earth />
          <GridLines />
          <Atmosphere />
          {cities.map((city) => (
            <CityPin
              key={city.id}
              city={city}
              isSelected={selectedCity === city.id}
              onClick={() => onSelectCity(selectedCity === city.id ? null : city.id)}
            />
          ))}
          {selectedCity && <FoodFlowArcs cityId={selectedCity} />}
        </group>

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={1.5}
          maxDistance={4}
          autoRotate={autoRotate && !selectedCity}
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

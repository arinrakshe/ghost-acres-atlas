import * as THREE from "three";

// Convert lat/lng to 3D position on a sphere
export function latLngToVector3(lat: number, lng: number, radius: number = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Create an arc curve between two points on a sphere
export function createArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments: number = 64,
  arcHeight: number = 0.3
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(1 + arcHeight * distance);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3();
    // Quadratic bezier
    point.x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x;
    point.y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y;
    point.z = (1 - t) * (1 - t) * start.z + 2 * (1 - t) * t * mid.z + t * t * end.z;
    points.push(point);
  }

  return points;
}

// Food category colors
export const foodCategoryColors: Record<string, string> = {
  grains: "#22d3ee",    // cyan
  produce: "#4ade80",   // green
  protein: "#f97316",   // orange
  dairy: "#a78bfa",     // purple
};

export const foodCategoryColorHex: Record<string, number> = {
  grains: 0x22d3ee,
  produce: 0x4ade80,
  protein: 0xf97316,
  dairy: 0xa78bfa,
};

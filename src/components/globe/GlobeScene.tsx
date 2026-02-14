import React, { useEffect, useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { _GlobeView as GlobeView, COORDINATE_SYSTEM } from '@deck.gl/core';
import { SolidPolygonLayer, GeoJsonLayer, ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { cities, foodDependencies, regions } from '@/data/cities';
import { foodCategoryColors } from '@/lib/globe-utils';

// Initial view state for the globe
const INITIAL_VIEW_STATE = {
  latitude: 20,
  longitude: 0,
  zoom: 0.5,
  minZoom: 0,
  maxZoom: 20
};

const LAND_DATA = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [255, 255, 255];
}

export default function GlobeScene({ selectedCity, onSelectCity, autoRotate }) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // Focus on selected city
  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(c => c.id === selectedCity);
      if (city) {
        setViewState(v => ({
          ...v,
          longitude: city.lng,
          latitude: city.lat,
          zoom: 2,
          transitionDuration: 1000,
        }));
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    let animationFrame;
    if (autoRotate && !selectedCity) {
      const rotate = () => {
        setViewState(v => ({
          ...v,
          longitude: v.longitude + 0.1
        }));
        animationFrame = requestAnimationFrame(rotate);
      };
      rotate();
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [autoRotate, selectedCity]);

  // Process data for Deck.gl layers
  const flowData = useMemo(() => {
    if (!selectedCity) return []; // Only show flows when a city is selected to avoid clutter? Or show all?
    // Let's show all for now, or filter if selected

    const relevantDeps = selectedCity
      ? foodDependencies.filter(d => d.cityId === selectedCity)
      : foodDependencies;

    return relevantDeps.map(dep => {
      const city = cities.find(c => c.id === dep.cityId);
      const region = regions.find(r => r.id === dep.regionId);
      if (!city || !region) return null;

      return {
        source: [region.lng, region.lat],
        target: [city.lng, city.lat],
        type: dep.foodCategory,
        value: dep.percentOfCitySupply,
        color: hexToRgb(foodCategoryColors[dep.foodCategory] || '#ffffff')
      };
    }).filter(Boolean);
  }, [selectedCity]);

  const cityData = useMemo(() => cities.map(c => ({
    name: c.name,
    id: c.id,
    coordinates: [c.lng, c.lat],
    risk: c.vulnerabilityScore
  })), []);

  const layers = [
    // 1. Ocean/Background Sphere
    new SolidPolygonLayer({
      id: 'background',
      data: [
        [[-180, 90], [180, 90], [180, -90], [-180, -90]]
      ],
      getPolygon: d => d,
      getFillColor: [5, 10, 20], // Deep space/ocean
      stroked: false,
      material: true
    }),

    // 2. Landmasses (Countries)
    new GeoJsonLayer({
      id: 'land',
      data: LAND_DATA,
      // Styles for "Cyber/Ghost" look
      getFillColor: [20, 40, 60], // Dark bluish-grey
      getLineColor: [0, 255, 200, 80], // Cyan glow borders
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      opacity: 0.8,
      material: true
    }),

    // 3. Supply Flows (Arcs)
    new ArcLayer({
      id: 'flows',
      data: flowData,
      getSourcePosition: d => d.source,
      getTargetPosition: d => d.target,
      getSourceColor: d => d.color,
      getTargetColor: d => d.color,
      getWidth: 2,
      opacity: 0.6,
      getHeight: 0.5
    }),

    // 4. Cities
    new ScatterplotLayer({
      id: 'cities',
      data: cityData,
      getPosition: d => d.coordinates,
      getRadius: d => d.id === selectedCity ? 150000 : 100000,
      getFillColor: d => d.id === selectedCity ? [255, 255, 255] : [200, 200, 200],
      getLineColor: [0, 0, 0],
      stroked: true,
      pickable: true,
      onClick: ({ object }) => onSelectCity(object.id),
      updateTriggers: {
        getRadius: [selectedCity],
        getFillColor: [selectedCity]
      }
    })
  ];

  return (
    <DeckGL
      views={new GlobeView()}
      viewState={viewState}
      onViewStateChange={({ viewState }) => setViewState(current => ({ ...current, ...viewState }))}
      controller={true}
      layers={layers}
      // parameters={{
      //   cull: true,
      //   depthTest: true
      // }}
      // Lighting for 3D effect
      effects={[]}
    />
  );
}

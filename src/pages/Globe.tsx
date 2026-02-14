import { useState, Suspense, lazy, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CityPanel from "@/components/CityPanel";
import Navbar from "@/components/layout/Navbar";

// Lazy load deck.gl component
const GlobeScene = lazy(() => import("@/components/globe/GlobeScene"));

export default function GlobePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  const [selectedCity, setSelectedCity] = useState<string | null>(cityParam);

  // Sync state with URL
  useEffect(() => {
    setSelectedCity(cityParam);
  }, [cityParam]);

  const handleSelectCity = (cityId: string | null) => {
    setSelectedCity(cityId);
    if (cityId) {
      setSearchParams({ city: cityId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Navbar />

      {/* Globe */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full bg-black">
            <div className="text-primary font-mono animate-pulse">Initializing Global Model...</div>
          </div>
        }
      >
        <GlobeScene
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
          autoRotate={!selectedCity}
        />
      </Suspense>

      {/* City Panel */}
      <CityPanel cityId={selectedCity} onClose={() => handleSelectCity(null)} />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-20 bg-card/80 backdrop-blur-md border border-border rounded-lg p-4 space-y-2 pointer-events-auto">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Food Flows</p>
        {[
          { label: "Grains", color: "#22d3ee" }, // Cyan
          { label: "Livestock", color: "#f97316" }, // Orange
          { label: "Water", color: "#3b82f6" }, // Blue
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-1 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

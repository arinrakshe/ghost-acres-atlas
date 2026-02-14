import { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap, BarChart3, AlertTriangle } from "lucide-react";
import CityPanel from "@/components/CityPanel";

const GlobeScene = lazy(() => import("@/components/globe/GlobeScene"));

export default function GlobePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">GHOST ACRES</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/crisis"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-crisis border border-border hover:border-crisis/50 rounded-md transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Crisis Sim
          </Link>
          <Link
            to="/compare"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary border border-border hover:border-primary/50 rounded-md transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Compare
          </Link>
        </div>
      </nav>

      {/* Globe */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-primary font-mono animate-pulse">Loading Globe...</div>
          </div>
        }
      >
        <GlobeScene
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          autoRotate
        />
      </Suspense>

      {/* City Panel */}
      <CityPanel cityId={selectedCity} onClose={() => setSelectedCity(null)} />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-20 bg-card/80 backdrop-blur-md border border-border rounded-lg p-4 space-y-2">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Food Categories</p>
        {[
          { label: "Grains", color: "#22d3ee" },
          { label: "Produce", color: "#4ade80" },
          { label: "Protein", color: "#f97316" },
          { label: "Dairy", color: "#a78bfa" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-1 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Hint */}
      {!selectedCity && (
        <div className="absolute bottom-6 right-6 z-20 text-xs font-mono text-muted-foreground animate-pulse">
          <Zap className="w-3 h-3 inline mr-1" />
          Click a city to explore its ghost acres
        </div>
      )}
    </div>
  );
}

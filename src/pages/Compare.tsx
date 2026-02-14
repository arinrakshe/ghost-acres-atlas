import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { cities, getCityDependencies, type City } from "@/data/cities";
import { foodCategoryColors } from "@/lib/globe-utils";

function CityCard({ city }: { city: City }) {
  const deps = getCityDependencies(city.id);
  const categories = ["grains", "produce", "protein", "dairy"] as const;
  const totals = categories.map((cat) => ({
    cat,
    acres: deps.filter((d) => d.foodCategory === cat).reduce((s, d) => s + d.acres, 0),
  }));
  const maxAcres = Math.max(...totals.map((t) => t.acres), 1);

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4">
      <div>
        <h3 className="text-lg font-bold">{city.name}</h3>
        <p className="text-xs text-muted-foreground font-mono">{city.country} · {(city.population / 1e6).toFixed(1)}M</p>
      </div>

      <div className="text-center bg-secondary/30 rounded-md p-3">
        <p className="text-2xl font-bold font-mono text-primary">{(city.totalGhostAcres / 1e6).toFixed(1)}M</p>
        <p className="text-xs text-muted-foreground">Ghost Acres</p>
      </div>

      {/* Vulnerability */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Vulnerability</span>
          <span className={`font-mono ${city.vulnerabilityScore > 75 ? "text-crisis" : city.vulnerabilityScore > 50 ? "text-warning" : "text-healthy"}`}>
            {city.vulnerabilityScore}/100
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              city.vulnerabilityScore > 75 ? "bg-crisis" : city.vulnerabilityScore > 50 ? "bg-warning" : "bg-healthy"
            }`}
            style={{ width: `${city.vulnerabilityScore}%` }}
          />
        </div>
      </div>

      {/* Food bars */}
      <div className="space-y-2">
        {totals.map((t) => (
          <div key={t.cat} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="capitalize text-muted-foreground">{t.cat}</span>
              <span className="font-mono">{(t.acres / 1000).toFixed(0)}k</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(t.acres / maxAcres) * 100}%`, backgroundColor: foodCategoryColors[t.cat] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Resilience */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-secondary/30 rounded p-2">
          <p className="text-sm font-mono font-bold">{city.localFoodPercent}%</p>
          <p className="text-[10px] text-muted-foreground">Local</p>
        </div>
        <div className="bg-secondary/30 rounded p-2">
          <p className="text-sm font-mono font-bold">{city.supplyDiversity}</p>
          <p className="text-[10px] text-muted-foreground">Diversity</p>
        </div>
        <div className="bg-secondary/30 rounded p-2">
          <p className="text-sm font-mono font-bold">{city.storageCapacityDays}d</p>
          <p className="text-[10px] text-muted-foreground">Storage</p>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["nyc", "la", "london"]);
  const sorted = [...cities].sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);
  const selectedCities = selected.map((id) => cities.find((c) => c.id === id)!).filter(Boolean);

  const toggleCity = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link to="/globe" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">GHOST ACRES</span>
        </Link>
        <h1 className="text-sm font-mono uppercase tracking-wider text-primary">
          <BarChart3 className="w-4 h-4 inline mr-1" />
          City Comparison
        </h1>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* City Selector */}
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
            Select up to 3 cities to compare
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCity(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                  selected.includes(c.id)
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        {/* Ranking Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              All Cities — Vulnerability Ranking
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-mono text-muted-foreground uppercase">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-right">Ghost Acres</th>
                  <th className="px-4 py-3 text-right">Vulnerability</th>
                  <th className="px-4 py-3 text-right">Local %</th>
                  <th className="px-4 py-3 text-right">Storage</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((city, i) => (
                  <tr key={city.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold">
                      {city.name}
                      <span className="text-muted-foreground ml-1 text-xs">{city.country}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{(city.totalGhostAcres / 1e6).toFixed(1)}M</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-mono font-bold ${city.vulnerabilityScore > 75 ? "text-crisis" : city.vulnerabilityScore > 50 ? "text-warning" : "text-healthy"}`}>
                        {city.vulnerabilityScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">{city.localFoodPercent}%</td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">{city.storageCapacityDays}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

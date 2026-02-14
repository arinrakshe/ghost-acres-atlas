import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getCityById, getCityDependencies, getRegionById, type City, type FoodDependency } from "@/data/cities";
import { foodCategoryColors } from "@/lib/globe-utils";
import DependencyGraph from "./DependencyGraph";

interface CityPanelProps {
  cityId: string | null;
  onClose: () => void;
}

function VulnerabilityBadge({ score }: { score: number }) {
  const color = score > 75 ? "text-crisis" : score > 50 ? "text-warning" : "text-healthy";
  const bg = score > 75 ? "bg-crisis/10" : score > 50 ? "bg-warning/10" : "bg-healthy/10";
  const label = score > 75 ? "HIGH RISK" : score > 50 ? "MODERATE" : "LOW RISK";
  return (
    <div className={`${bg} ${color} px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider`}>
      {label} — {score}/100
    </div>
  );
}

function FoodBreakdownBar({ deps }: { deps: FoodDependency[] }) {
  const categories = ["grains", "produce", "protein", "dairy"] as const;
  const totals = categories.map((cat) => ({
    cat,
    acres: deps.filter((d) => d.foodCategory === cat).reduce((s, d) => s + d.acres, 0),
  }));
  const totalAcres = totals.reduce((s, t) => s + t.acres, 0);

  return (
    <div className="space-y-2">
      <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
        {totals.map((t) => (
          <div
            key={t.cat}
            className="h-full transition-all duration-500"
            style={{
              width: `${(t.acres / totalAcres) * 100}%`,
              backgroundColor: foodCategoryColors[t.cat],
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {totals.map((t) => (
          <div key={t.cat} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: foodCategoryColors[t.cat] }} />
            <span className="capitalize text-muted-foreground">{t.cat}</span>
            <span className="font-mono ml-auto">{(t.acres / 1000).toFixed(0)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CityPanel({ cityId, onClose }: CityPanelProps) {
  const city = cityId ? getCityById(cityId) : null;
  const deps = cityId ? getCityDependencies(cityId) : [];

  const topRegions = deps
    .sort((a, b) => b.acres - a.acres)
    .slice(0, 5)
    .map((d) => ({ ...d, region: getRegionById(d.regionId) }));

  return (
    <AnimatePresence>
      {city && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full w-[380px] max-w-[90vw] bg-card/95 backdrop-blur-xl border-l border-border z-20 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-glow-cyan">{city.name}</h2>
                <p className="text-muted-foreground text-sm font-mono">
                  {city.country} · Pop. {(city.population / 1e6).toFixed(1)}M
                </p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Vulnerability */}
            <VulnerabilityBadge score={city.vulnerabilityScore} />

            {/* Ghost Acres */}
            <div className="bg-secondary/50 rounded-lg p-4 box-glow-cyan">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Total Ghost Acres</p>
              <p className="text-3xl font-bold font-mono text-primary">
                {(city.totalGhostAcres / 1e6).toFixed(1)}M
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                acres of farmland across the globe feed this city
              </p>
            </div>

            {/* Breakdown */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Food Breakdown</h3>
              <FoodBreakdownBar deps={deps} />
            </div>

            {/* Dependency Graph */}
            <div className="my-4">
              <DependencyGraph cityId={city.id} dependencies={deps} />
            </div>

            {/* Top Regions */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Top Source Regions</h3>
              <div className="space-y-2">
                {topRegions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-secondary/30 rounded-md px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: foodCategoryColors[item.foodCategory] }}
                      />
                      <span className="text-sm">{item.region?.name || item.regionId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-primary">{(item.acres / 1000).toFixed(0)}k acres</span>
                      <span className="text-xs text-muted-foreground ml-2">({item.percentOfCitySupply}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resilience Metrics */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Resilience</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Local Food", value: `${city.localFoodPercent}%`, color: city.localFoodPercent > 10 ? "text-healthy" : "text-crisis" },
                  { label: "Diversity", value: `${city.supplyDiversity}`, color: city.supplyDiversity > 65 ? "text-healthy" : "text-warning" },
                  { label: "Storage", value: `${city.storageCapacityDays}d`, color: city.storageCapacityDays > 7 ? "text-healthy" : "text-crisis" },
                ].map((m) => (
                  <div key={m.label} className="bg-secondary/30 rounded-md p-3 text-center">
                    <p className={`text-lg font-mono font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

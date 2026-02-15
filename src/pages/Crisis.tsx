import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cities, crisisScenarios, computeCrisisImpact, type CrisisScenario } from "@/data/cities";

export default function CrisisPage() {
  const [selectedCityId, setSelectedCityId] = useState("nyc");
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<30 | 60 | 90>(30);

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const impact = useMemo(
    () => (selectedScenarios.length > 0 ? computeCrisisImpact(selectedCityId, selectedScenarios) : null),
    [selectedCityId, selectedScenarios]
  );

  const city = cities.find((c) => c.id === selectedCityId);
  const dayData = impact
    ? activeDay === 30 ? impact.day30 : activeDay === 60 ? impact.day60 : impact.day90
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link to="/globe" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">GHOST ACRES</span>
        </Link>
        <h1 className="text-sm font-mono uppercase tracking-wider text-crisis">
          <AlertTriangle className="w-4 h-4 inline mr-1" />
          Crisis Simulator
        </h1>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          {/* City Select */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Select City</label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.country})
                </option>
              ))}
            </select>
          </div>

          {/* Scenarios */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">Crisis Scenarios</label>
            <div className="space-y-2">
              {crisisScenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleScenario(s.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedScenarios.includes(s.id)
                      ? "border-crisis/60 bg-crisis/10 text-foreground"
                      : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm font-semibold">{s.name}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-70">{s.description.slice(0, 80)}...</p>
                </button>
              ))}
            </div>
          </div>

          {selectedScenarios.length > 1 && (
            <p className="text-xs text-warning font-mono">
              ⚡ {selectedScenarios.length} crises combined — cascading failures active
            </p>
          )}
        </div>

        {/* Right: Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline selector */}
          <div className="flex gap-2">
            {([30, 60, 90] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-mono transition-all ${
                  activeDay === day
                    ? "bg-crisis/20 text-crisis border border-crisis/40"
                    : "bg-secondary/30 text-muted-foreground border border-border hover:bg-secondary/50"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Day {day}
              </button>
            ))}
          </div>

          {!impact ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <AlertTriangle className="w-8 h-8 mb-3 opacity-40" />
              <p className="font-mono text-sm">Select a crisis scenario to see projections</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCityId}-${selectedScenarios.join("-")}-${activeDay}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Big Numbers */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Food Access Lost</p>
                    <p className={`text-5xl font-bold font-mono ${dayData!.foodAccessLost > 40 ? "text-crisis text-glow-red" : dayData!.foodAccessLost > 20 ? "text-warning" : "text-foreground"}`}>
                      {dayData!.foodAccessLost}%
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Days Until Critical</p>
                    <p className={`text-5xl font-bold font-mono ${dayData!.daysUntilCritical < 30 ? "text-crisis text-glow-red" : "text-warning"}`}>
                      {dayData!.daysUntilCritical}
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Categories Hit</p>
                    <p className="text-5xl font-bold font-mono text-foreground">
                      {dayData!.criticalCategories.length}
                    </p>
                  </div>
                </div>

                {/* Severity Timeline Bar */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Impact Progression</h3>
                  <div className="space-y-6">
                    <div className="flex gap-6 items-end justify-around" style={{ height: "240px" }}>
                      {([30, 60, 90] as const).map((day) => {
                        const d = day === 30 ? impact.day30 : day === 60 ? impact.day60 : impact.day90;
                        const heightPx = Math.max((d.foodAccessLost / 100) * 200, 8); // Min 8px visible
                        return (
                          <div key={day} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: heightPx }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              className={`w-12 rounded-t-lg ${
                                d.foodAccessLost > 40 ? "bg-crisis" : d.foodAccessLost > 20 ? "bg-warning" : "bg-primary"
                              } ${activeDay === day ? "shadow-lg" : ""}`}
                            />
                            <div className="text-center">
                              <p className="text-xs font-mono text-muted-foreground">Day {day}</p>
                              <p className="text-sm font-bold font-mono text-foreground">{d.foodAccessLost}%</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Affected Categories */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Affected Categories</h3>
                  <div className="flex gap-3 flex-wrap">
                    {dayData!.criticalCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1.5 rounded-full bg-crisis/10 text-crisis text-xs font-mono uppercase border border-crisis/20"
                      >
                        <TrendingDown className="w-3 h-3 inline mr-1" />
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* City Info */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">{city?.name}</span> depends on{" "}
                    <span className="text-primary font-mono">{((city?.totalGhostAcres || 0) / 1e6).toFixed(1)}M ghost acres</span>.
                    {dayData!.foodAccessLost > 30 && (
                      <span className="text-crisis"> At Day {activeDay}, critical food shortages are imminent.</span>
                    )}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

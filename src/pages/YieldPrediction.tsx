import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, TrendingDown, Cloud, Zap, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { cities, crisisScenarios } from "@/data/cities";
import { useYieldPredictionModel, type YieldPredictionInput } from "@/lib/yieldPredictionModel";

export default function YieldPredictionPage() {
  const [selectedCityId, setSelectedCityId] = useState("nyc");
  const [baselineYield, setBaselineYield] = useState(5.5); // tonnes/hectare
  const [droughtSeverity, setDroughtSeverity] = useState(0);
  const [temperatureAnomaly, setTemperatureAnomaly] = useState(0);
  const [floodingRisk, setFloodingRisk] = useState(0);
  const [fertilizerShortage, setFertilizerShortage] = useState(0);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  const { predict, loading, error } = useYieldPredictionModel();

  const city = cities.find((c) => c.id === selectedCityId);

  // Apply preset crisis scenarios to sliders
  useMemo(() => {
    let drought = 0;
    let temp = 0;
    let flooding = 0;
    let fertilizer = 0;

    selectedScenarios.forEach((scenarioId) => {
      const scenario = crisisScenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;

      if (scenarioId === "midwest-drought") {
        drought = 70;
      } else if (scenarioId === "california-water") {
        drought = 85;
      } else if (scenarioId === "fertilizer-shortage") {
        fertilizer = 75;
      } else if (scenarioId === "gulf-hurricane") {
        flooding = 80;
        temp = -5;
      } else if (scenarioId === "pandemic") {
        fertilizer = 40;
      }
    });

    if (selectedScenarios.length > 0) {
      setDroughtSeverity(drought);
      setTemperatureAnomaly(temp);
      setFloodingRisk(flooding);
      setFertilizerShortage(fertilizer);
    }
  }, [selectedScenarios]);

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const prediction = useMemo(() => {
    if (!predict || loading) return null;

    const input: YieldPredictionInput = {
      droughtSeverity,
      temperatureAnomaly,
      floodingRisk,
      fertilizerShortage,
      baselineYield: baselineYield / 10, // Normalize to 0-1
    };

    const predictedYieldMultiplier = predict(input);
    if (predictedYieldMultiplier === null) return null;

    const predictedYield = baselineYield * predictedYieldMultiplier;
    const yieldLoss = baselineYield - predictedYield;
    const yieldLossPercent = (yieldLoss / baselineYield) * 100;

    return {
      predicted: predictedYield,
      loss: yieldLoss,
      lossPercent: yieldLossPercent,
      multiplier: predictedYieldMultiplier,
    };
  }, [predict, loading, droughtSeverity, temperatureAnomaly, floodingRisk, fertilizerShortage, baselineYield]);

  const severityLevel = useMemo(() => {
    const avg = (droughtSeverity + floodingRisk + fertilizerShortage) / 3 + Math.abs(temperatureAnomaly) * 5;
    if (avg > 60) return { level: "CRITICAL", color: "text-crisis", bg: "bg-crisis/10" };
    if (avg > 30) return { level: "HIGH", color: "text-warning", bg: "bg-warning/10" };
    return { level: "MODERATE", color: "text-primary", bg: "bg-primary/10" };
  }, [droughtSeverity, temperatureAnomaly, floodingRisk, fertilizerShortage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link to="/globe" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">GHOST ACRES</span>
        </Link>
        <h1 className="text-sm font-mono uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-primary">AI Yield Prediction</span>
        </h1>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          {/* City Select */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
              Select City
            </label>
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

          {/* Baseline Yield */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
              Baseline Yield: {baselineYield.toFixed(1)} t/ha
            </label>
            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={baselineYield}
              onChange={(e) => setBaselineYield(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">Global avg: 3.5-6.5 t/ha</p>
          </div>

          {/* Preset Scenarios */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
              Preset Crisis Scenarios
            </label>
            <div className="space-y-2">
              {crisisScenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleScenario(s.id)}
                  className={`w-full text-left p-2 rounded-lg border transition-all text-xs ${
                    selectedScenarios.includes(s.id)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <span>{s.icon} {s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Status */}
          <div className="p-3 bg-secondary/30 rounded-lg border border-border">
            {loading ? (
              <p className="text-xs text-muted-foreground animate-pulse">Training AI model...</p>
            ) : error ? (
              <p className="text-xs text-warning">Model error: {error}</p>
            ) : (
              <p className="text-xs text-primary font-mono">✓ Model ready</p>
            )}
          </div>
        </div>

        {/* Right: Predictions & Sliders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Disaster Sliders */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-foreground mb-4">
              Disaster Impact Sliders
            </h2>

            {/* Drought */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-muted-foreground">
                  <Cloud className="w-3 h-3 inline mr-1" />
                  Drought Severity
                </label>
                <span className="text-xs font-mono text-crisis font-bold">{droughtSeverity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={droughtSeverity}
                onChange={(e) => setDroughtSeverity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-muted-foreground">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Temperature Anomaly
                </label>
                <span className="text-xs font-mono text-warning font-bold">{temperatureAnomaly > 0 ? "+" : ""}{temperatureAnomaly}°C</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={temperatureAnomaly}
                onChange={(e) => setTemperatureAnomaly(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Flooding */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-muted-foreground">
                  <Droplets className="w-3 h-3 inline mr-1" />
                  Flooding Risk
                </label>
                <span className="text-xs font-mono text-primary font-bold">{floodingRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={floodingRisk}
                onChange={(e) => setFloodingRisk(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Fertilizer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-muted-foreground">
                  <TrendingDown className="w-3 h-3 inline mr-1" />
                  Fertilizer Shortage
                </label>
                <span className="text-xs font-mono text-warning font-bold">{fertilizerShortage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fertilizerShortage}
                onChange={(e) => setFertilizerShortage(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Predictions */}
          {!loading && prediction ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Overall Severity */}
              <div className={`${severityLevel.bg} border border-border rounded-lg p-4`}>
                <p className={`text-xs font-mono uppercase tracking-wider ${severityLevel.color} mb-1`}>
                  Overall Crisis Level
                </p>
                <p className={`text-3xl font-bold font-mono ${severityLevel.color}`}>{severityLevel.level}</p>
              </div>

              {/* Yield Prediction */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Baseline Yield</p>
                  <p className="text-2xl font-bold font-mono text-foreground">{baselineYield.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">t/ha</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Predicted Yield</p>
                  <p className={`text-2xl font-bold font-mono ${prediction.predicted > baselineYield * 0.5 ? "text-primary" : "text-crisis"}`}>
                    {prediction.predicted.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">t/ha</p>
                </div>
                <div className="bg-card border border-crisis/30 rounded-lg p-4 text-center">
                  <p className="text-xs font-mono text-crisis uppercase tracking-wider mb-2">Yield Loss</p>
                  <p className="text-2xl font-bold font-mono text-crisis">{prediction.lossPercent.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{prediction.loss.toFixed(1)} t/ha</p>
                </div>
              </div>

              {/* Confidence & Impact */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">Impact Analysis</h3>

                {/* Severity breakdown */}
                <div className="space-y-3">
                  {droughtSeverity > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Drought impact</span>
                      <motion.div
                        className="h-2 bg-crisis rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, droughtSeverity * 0.9)}px` }}
                      />
                      <span className="text-xs font-mono">{(droughtSeverity * 0.9).toFixed(0)}%</span>
                    </div>
                  )}
                  {Math.abs(temperatureAnomaly) > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Temperature shock</span>
                      <motion.div
                        className="h-2 bg-warning rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.abs(temperatureAnomaly) * 3)}px` }}
                      />
                      <span className="text-xs font-mono">{(Math.abs(temperatureAnomaly) * 3).toFixed(0)}%</span>
                    </div>
                  )}
                  {floodingRisk > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Flooding risk</span>
                      <motion.div
                        className="h-2 bg-primary rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, floodingRisk * 0.8)}px` }}
                      />
                      <span className="text-xs font-mono">{(floodingRisk * 0.8).toFixed(0)}%</span>
                    </div>
                  )}
                  {fertilizerShortage > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Fertilizer shortage</span>
                      <motion.div
                        className="h-2 bg-warning rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, fertilizerShortage * 0.6)}px` }}
                      />
                      <span className="text-xs font-mono">{(fertilizerShortage * 0.6).toFixed(0)}%</span>
                    </div>
                  )}
                </div>

                {/* Insight */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {prediction.lossPercent > 70
                      ? "Critical crop failure predicted. Immediate intervention required."
                      : prediction.lossPercent > 40
                      ? "Significant yield reduction expected. Supply chain impacts likely."
                      : prediction.lossPercent > 20
                      ? "Moderate yield loss. Local markets may see price increases."
                      : "Minor impact on yield. Supply chains remain stable."}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : loading ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="font-mono text-sm animate-pulse">Training model to predict yields...</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

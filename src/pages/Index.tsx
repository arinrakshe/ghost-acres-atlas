import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Info, BarChart3, AlertTriangle, Brain } from "lucide-react";
import { totalGhostAcres, totalCities, totalCountries } from "@/data/cities";

const GlobeScene = lazy(() => import("@/components/globe/GlobeScene"));

const stats = [
  { value: `${(totalGhostAcres / 1e6).toFixed(0)}M+`, label: "Ghost Acres Mapped" },
  { value: `${totalCities}`, label: "Cities Tracked" },
  { value: `${totalCountries}`, label: "Countries Involved" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Globe background */}
      <div className="absolute inset-0 opacity-40">
        <Suspense fallback={null}>
          <GlobeScene selectedCity={null} onSelectCity={() => {}} autoRotate />
        </Suspense>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary tracking-wider uppercase">Live Food Security Monitor</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-foreground">How many acres of farmland feed your city? </span>
            <span className="text-glow-cyan text-primary">You have no idea.</span>
            <br />
            <span className="text-crisis text-glow-red">That's terrifying.</span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Ghost Acres maps the invisible farmland that keeps cities alive — and predicts when those lifelines will break.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/globe")}
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg text-lg box-glow-cyan hover:shadow-[0_0_30px_hsl(175_80%_50%/0.3)] transition-all duration-300"
          >
            Explore the Map →
          </motion.button>

          {/* Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <Info className="w-4 h-4" />
              Learn More
            </Link>
            <Link
              to="/crisis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-crisis/30 hover:border-crisis text-muted-foreground hover:text-crisis transition-colors text-sm font-medium"
            >
              <AlertTriangle className="w-4 h-4" />
              Run a Scenario
            </Link>
            <Link
              to="/yield-prediction"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-yellow-500/30 hover:border-yellow-500 text-muted-foreground hover:text-yellow-500 transition-colors text-sm font-medium"
            >
              <Brain className="w-4 h-4" />
              AI Yield Model
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 hover:border-primary text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <BarChart3 className="w-4 h-4" />
              Compare Cities
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute bottom-8 flex gap-8 sm:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-mono text-primary text-glow-cyan">{s.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

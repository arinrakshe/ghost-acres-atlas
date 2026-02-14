import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, TrendingDown, MapPin } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <Link to="/globe" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">GHOST ACRES</span>
        </Link>
      </nav>

      <div className="pt-20 pb-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-6 space-y-12">
          {/* Hero */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              The Invisible Farmland That Feeds Your City
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              You've never heard of "ghost acres," but they keep you alive. Every city on Earth depends on farmland thousands of miles away—land it will never own, control, or protect.
            </p>
          </motion.div>

          {/* The Problem */}
          <motion.div variants={itemVariants} className="space-y-6 bg-card border border-border rounded-lg p-8">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-crisis flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">The Problem: Hidden Dependencies</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong>NYC</strong> depends on 847,000 acres spread across 18 countries.
                    <br />
                    <strong>Tokyo</strong> relies on farmland in Brazil, Argentina, Australia, and Canada.
                    <br />
                    <strong>Dubai</strong> imports 80% of its food.
                  </p>
                  <p className="text-sm border-l-2 border-warning pl-4 py-2">
                    Most people have no idea how many acres of farmland feed their city. Neither do most urban planners.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Risk */}
          <motion.div variants={itemVariants} className="space-y-6 bg-card border border-crisis/30 rounded-lg p-8">
            <div className="flex gap-4">
              <TrendingDown className="w-6 h-6 text-crisis flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">The Risk: Cascade Failures</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-crisis/5 rounded-md p-4 border-l-2 border-crisis">
                    <p className="font-semibold text-foreground mb-2">Scenario: Midwest Drought + Fertilizer Shortage</p>
                    <p className="text-sm">
                      If the US Midwest experiences a severe drought while global fertilizer becomes scarce, Iowa corn production drops 35%. 
                      This impacts 40+ cities worldwide, including NYC, which loses 23% of its grain supply in 60 days.
                    </p>
                  </div>
                  <div className="bg-crisis/5 rounded-md p-4 border-l-2 border-crisis">
                    <p className="font-semibold text-foreground mb-2">Scenario: Port Disruption</p>
                    <p className="text-sm">
                      A hurricane closes Gulf ports for 45 days. Cities dependent on Gulf fish and shrimp lose access within hours. 
                      Food prices spike 40-60% in days, not months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Solution */}
          <motion.div variants={itemVariants} className="space-y-6 bg-card border border-primary/30 rounded-lg p-8">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">The Solution: Ghost Acres Atlas</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Ghost Acres maps every city's invisible agricultural dependencies. It shows:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    {[
                      { title: "Dependency Map", desc: "Which agricultural regions feed which cities, and by how much" },
                      { title: "Vulnerability Score", desc: "How resilient each city is based on supply diversity, storage, & local production" },
                      { title: "Crisis Scenarios", desc: "What happens when droughts, floods, wars, or pandemics hit key regions" },
                      { title: "Cascade Detection", desc: "How crises ripple across the globe, city to city, in days not years" },
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-primary font-semibold whitespace-nowrap">{item.title}:</span>
                        <span>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-bold">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Explore",
                  desc: "Click cities on the globe to see their ghost acres.",
                },
                {
                  step: "2",
                  title: "Analyze",
                  desc: "Compare cities and regions to find vulnerabilities.",
                },
                {
                  step: "3",
                  title: "Simulate",
                  desc: "Test crisis scenarios to see cascade effects in real-time.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{item.step}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why It Matters */}
          <motion.div variants={itemVariants} className="space-y-6 bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold">Why This Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Urban food security isn't abstract—it's existential. As climate change intensifies droughts, floods, and heat waves, 
              and as geopolitical tensions disrupt trade routes, cities need to know their vulnerabilities <em>before</em> crisis hits.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ghost Acres gives cities, planners, and governments the visibility they need to build resilience—whether through 
              diversifying suppliers, increasing local production, improving storage, or negotiating long-term supply agreements.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex gap-4 justify-center pt-6">
            <Link
              to="/globe"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
            >
              Explore the Globe
            </Link>
            <Link
              to="/crisis"
              className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-foreground rounded-lg font-semibold transition-colors"
            >
              Run a Simulation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

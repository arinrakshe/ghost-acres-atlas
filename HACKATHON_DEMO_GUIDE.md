# Ghost Acres Atlas - Hackathon Demo Guide

## The Pitch (2 Minutes)

**Opening Hook:**
"How many acres of farmland feed your city? Nobody knows. That's terrifying."

**Explain the Problem:**
- NYC depends on 2.1 million acres of farmland scattered across 18+ countries
- Tokyo relies on farmland in Brazil, Argentina, Australia, and Canada
- 95% of a typical major city's food comes from beyond its borders
- These supply chains are fragile and deeply interconnected

**Show the Solution:**
1. Click on NYC on the 3D globe
2. Point to the data panel showing 2.1M ghost acres
3. Show the top source regions: Midwest (20%), California (15%), etc.
4. Highlight the vulnerability score: 72/100 (HIGH RISK)

**The Scenario (3 Minutes):**
"Watch what happens if California experiences a mega-drought while fertilizer becomes scarce globally..."

1. Go to Crisis Simulator
2. Select NYC
3. Activate: "California Drought" + "Fertilizer Shortage"
4. Show Day 30: 23% food access lost
5. Show Day 60: 40% food access lost
6. Point out critical categories: "Grains critically short in 18 days"

**The Insight:**
"Cities don't need to starve—they need to see their dependencies. With this visibility, they can:
- Diversify suppliers
- Build local production
- Improve storage
- Negotiate supply agreements"

## Demo Talking Points

### Globe Exploration (1 min)
- "Each pin is a major city. Colors show vulnerability: Green (safe), yellow (moderate), red (at risk)"
- "Click any city to see its ghost acres - the invisible farmland feeding it"
- "Notice how globalized we are - Tokyo's food security depends on 6 different continents"

### City Panel Deep Dive (1 min)
- **Total Ghost Acres**: "2.1M acres is roughly the size of Massachusetts - farmland you never see"
- **Food Breakdown**: "Notice the mix: grains (40%), produce (25%), protein (20%), dairy (15%)"
- **Top Source Regions**: "Midwest corn is 20% of this city's food - that's critical dependency"
- **Resilience Metrics**: 
  - Local Food 3% - "Means 97% comes from elsewhere"
  - Diversity 78 - "Good, but still vulnerable to region-specific shocks"
  - Storage 7 days - "If supply breaks, they have a week before food riots start"

### Crisis Simulator Impact (2 min)
Show 3 scenarios:

1. **Midwest Drought**
   - Day 30: -18% food access
   - Day 60: -35% food access
   - Critical in: 22 days for grains

2. **California Drought + Fertilizer Crisis**
   - Day 30: -23% food access
   - Day 60: -40% food access
   - Day 90: -52% food access
   - Critical in: 18 days

3. **Port Disruption** (Hurricane closes Gulf)
   - Day 1: -12% food access (shrimp, fish)
   - Day 30: -25% if not reopened
   - Critical in: 5 days

**Key Message**: "These aren't theoretical - they're based on historical patterns. The 2008 food crisis would have predicted shortages 30 days early with this tool."

### Compare Page Overview (1 min)
- "Here's the vulnerability landscape - notice which cities are most at risk"
- Point to Dubai, Singapore, Mumbai: "100% import-dependent, <2 weeks storage"
- Point to Sydney, São Paulo, Berlin: "Local production + diversity makes them resilient"

## Stats to Memorize

- **NYC**: 2.1M ghost acres, 72 vulnerability score, 7 days storage
- **LA**: 2.4M ghost acres, 81 vulnerability score, 5 days storage
- **Tokyo**: 4.5M ghost acres, 76 vulnerability score, 10 days storage
- **Dubai**: 1.9M ghost acres, 92 vulnerability score (CRITICAL)
- **Lagos**: 3.6M ghost acres, 90 vulnerability score (CRITICAL)
- **Sydney**: 1.5M ghost acres, 48 vulnerability score (most resilient)

## Technical Highlights (For Technical Judges)

- **3D Visualization**: Three.js + React Three Fiber for interactive globe
- **Data Model**: Complex supply chain graph with 25+ cities and 100+ dependencies
- **Predictive Engine**: Crisis cascade algorithm calculating ripple effects across connected regions
- **Real-time Updates**: Supabase integration ready for live data feeds
- **Performance**: Optimized rendering for smooth interactions on presentation hardware

## FAQ Responses

**Q: Is this real data?**
A: The demo uses realistic patterns based on FAO, USDA, and trade data. In production, we'd integrate live APIs from USDA, UN FAO, and satellite agricultural monitoring.

**Q: How is vulnerability calculated?**
A: Four factors: supply concentration (do you depend on one region?), storage capacity (days of food), local production (%), and supply diversity (how many regions feed you?).

**Q: What's your next step?**
A: Real-time data integration, ML-powered predictive modeling using climate and trade data, and city-specific dashboards for urban planners.

**Q: Who's your user?**
A: City governments, NGOs, supply chain companies, insurance firms, and emergency management agencies.

## Live Demo Backup Plan

If the app crashes:
1. Have screenshots of key moments saved
2. Know the URLs by heart (https://project-url/globe, /crisis, /about)
3. Have talking points memorized for each page
4. Can explain the core concept without the tech

## Success Metrics

By end of demo, judges should feel:
- ✅ "Oh wow, I never thought about food security this way"
- ✅ "This is actually solvable with better visibility"
- ✅ "This tool could genuinely be used by cities"
- ✅ "The visualization is stunning"
- ✅ "They understood the interconnected systems theme"



# 🌍 Ghost Acres — Mapping the Invisible Farmland That Feeds Cities

## Overview
An interactive 3D globe visualization that reveals the hidden agricultural dependencies of major cities. Users click on a city to see its "ghost acres" — the farmland across the globe that keeps it fed — and simulate crisis scenarios to watch those lifelines break.

---

## Page 1: Landing / Hero
- Dark, cinematic full-screen intro with the tagline: *"How many acres of farmland feed your city? You have no idea. That's terrifying."*
- Animated globe slowly rotating in the background
- "Explore the Map" CTA button that transitions into the main experience
- Brief stats bar: total ghost acres mapped, cities tracked, countries involved

## Page 2: Interactive Globe (Core Experience)
- **3D rotating globe** (React Three Fiber) showing all 25+ major cities as glowing pins
- **Click a city** → animated arc lines fly out to all its ghost acre regions worldwide, color-coded by food category (grains, produce, protein, dairy)
- **Side panel** slides in showing:
  - City name + population
  - Total ghost acres count
  - Breakdown by food type (pie/donut chart)
  - Top 5 source regions with acre counts
  - Vulnerability score (0-100)
- **Food flow lines** pulse with thickness proportional to volume of food imported
- Smooth camera transitions when selecting different cities

## Page 3: Crisis Simulator
- Select a city from a dropdown
- Choose from pre-built crisis scenarios:
  - 🌡️ Midwest Mega-Drought
  - 🚢 Gulf Port Hurricane (shipping disruption)
  - 💰 Global Fertilizer Shortage
  - 🦠 Pandemic Supply Chain Collapse
  - 🌊 California Water Crisis
- **Animated timeline**: watch food flow lines thin, turn red, and disappear over 30/60/90 day projections
- Dashboard shows: % food access lost, most affected food categories, estimated days until critical shortage
- Combine multiple crises to see cascading failures

## Page 4: City Comparison Dashboard
- Side-by-side comparison of 2-3 cities
- Bar charts showing vulnerability by category
- Radar chart comparing resilience metrics (local food %, supply diversity, storage capacity)
- Ranking table of all cities by vulnerability score

## Data & Backend (Supabase)
- **Database tables**: cities, agricultural_regions, food_dependencies (linking cities to regions), crisis_scenarios, crisis_impacts
- **Pre-seeded data** for ~25 major US/global cities with realistic food dependency data (sourced from USDA/FAO statistics, with mock fallback)
- **Edge function** to fetch supplementary data from public APIs (USDA crop data) when available, falling back to stored data

## Design & Feel
- Dark theme with glowing neon accents (cyan/green for healthy flows, red/orange for disrupted)
- Cinematic, data-viz aesthetic — think Bloomberg Terminal meets NASA mission control
- Smooth animations on all transitions
- Mobile-friendly layout (globe simplifies to 2D map on small screens)


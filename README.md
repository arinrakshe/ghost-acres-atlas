# 🌍 Ghost Acres Atlas

**Making invisible food dependencies visible.**

How many acres of farmland feed your city? Most people have no idea. Ghost Acres Atlas maps the invisible global agricultural dependencies that keep cities alive—and predicts when those supply lines will break.

## The Problem

- NYC depends on **2.1 million acres** across **18+ countries**
- Tokyo relies on **6 different continents** for food
- Most major cities have **<7 days** of food storage
- When one region fails, **40+ cities are affected**
- Nobody sees the cascade coming until it's too late

## The Solution

Ghost Acres Atlas does 3 things:

1. **Maps Dependencies** - Shows which farmland feeds which cities
2. **Calculates Vulnerability** - Scores cities on supply diversity, storage, & local production
3. **Predicts Cascades** - Shows how one region's crisis becomes multiple cities' crises

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

Create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See `.env.example` for template.

## Features

### 🗺️ Interactive 3D Globe
- Explore 25+ major cities
- Click cities to see their ghost acres
- Visualize supply chain dependencies
- Beautiful animations and transitions

### 📊 City Analysis
- Total ghost acres (farmland feeding the city)
- Food category breakdown (grains, produce, protein, dairy)
- Top source regions with percentages
- Resilience metrics: local food %, supply diversity, storage capacity
- Vulnerability scoring (0-100)

### 🚨 Crisis Simulator
- Model multiple crisis scenarios
- See impact over 30, 60, 90 days
- Identify critical food categories
- Predict days until food shortage becomes critical
- Understand cascade effects

### 📈 City Comparison
- Compare vulnerability across cities
- See which cities are most resilient
- Identify patterns in food security
- Learn from best practices

### ℹ️ Full Explanation
- Learn about "ghost acres" concept
- Understand food system vulnerabilities
- Explore solutions for building resilience

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **3D Visualization**: Three.js + React Three Fiber
- **UI Components**: Shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Routing**: React Router
- **Backend**: Supabase (authentication & data)
- **Build**: Vite

### Project Structure

```
src/
├── components/
│   ├── globe/           # 3D globe visualization
│   ├── CityPanel.tsx    # City detail sidebar
│   └── ui/              # shadcn components
├── pages/
│   ├── Globe.tsx        # Globe exploration
│   ├── Crisis.tsx       # Crisis simulator
│   ├── Compare.tsx      # City comparison
│   ├── About.tsx        # Explanation & narrative
│   └── Index.tsx        # Home page
├── data/
│   └── cities.ts        # City & region data
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── globe-utils.ts   # Globe calculations
└── hooks/
    └── use-supabase-auth.ts  # Auth hook
```

## Key Data

### Vulnerability Scores (0-100)
- **92** - Dubai (CRITICAL - 100% import dependent)
- **90** - Lagos (CRITICAL - <3 days storage)
- **81** - Los Angeles (HIGH RISK)
- **72** - NYC (HIGH RISK)
- **48** - Sydney (SAFE - 15% local production)

### Ghost Acres (Farmland Feeding Cities)
- **5.2M** - Shanghai
- **4.5M** - Tokyo
- **3.8M** - Mumbai
- **3.2M** - London
- **2.4M** - Los Angeles
- **2.1M** - New York City

## Demo

To see Ghost Acres in action:

1. Run `npm run dev`
2. Open http://localhost:5173
3. Click a city on the globe
4. Explore the data panel
5. Try a crisis scenario
6. Compare cities

**For hackathon judges**: See `QUICK_REFERENCE.md` or `DEMO_STORYBOARD.md` for detailed demo guidance.

## Documentation

- `READY_FOR_HACKATHON.md` - Complete readiness summary
- `HACKATHON_PREP_SUMMARY.md` - Comprehensive preparation guide
- `HACKATHON_DEMO_GUIDE.md` - Full demo script & talking points
- `DEMO_STORYBOARD.md` - Visual scene-by-scene walkthrough
- `QUICK_REFERENCE.md` - Last-minute reference card

## The Insight

Urban civilization is built on invisible farmland thousands of miles away. When supply chains break, it's not gradual—it's catastrophic. Ghost Acres gives cities, planners, and governments the visibility they need to build resilience.

**With visibility comes action. With action comes resilience.**

## Next Steps

### Immediate Enhancements
- Real-time data integration (USDA, FAO, satellite imagery)
- ML-powered predictive modeling
- Historical crisis case studies
- Custom scenario builder

### Long-term Vision
- City-specific dashboard for urban planners
- Mobile application
- 50+ cities tracked
- Real supply chain data
- Integration with climate prediction models

## About This Project

Ghost Acres Atlas was created for the **InnovaAte Hackathon** to address existential food security risks using AI-powered supply chain visualization and crisis prediction.

## Contributing

This is a hackathon project. Contributions welcome!

## License

MIT

---

**The question isn't IF the next crisis will hit. The question is: will YOUR city be ready?**

Made with ❤️ for global food security resilience.

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

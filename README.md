Ghost Acres Atlas

Making invisible food dependencies visible—mapping the global agricultural supply chains that feed cities and predicting cascade failures when regions fail.

Details

What problem does this project solve?
Urban civilization is built on invisible farmland thousands of miles away. Most people don't know that NYC depends on 2.1 million acres across 18+ countries, Tokyo relies on 6 different continents, and major cities have less than 7 days of food storage. When one agricultural region fails, 40+ cities are affected simultaneously. Ghost Acres Atlas provides the visibility cities need to understand their vulnerabilities and build resilience before cascade failures occur.

Did you use any interesting libraries or services?
TensorFlow.js - ML-powered yield prediction model trained on agricultural stress factors (drought, temperature anomaly, flooding, fertilizer shortage)
Deck.gl - High-performance 3D globe visualization with optimized rendering for 25+ cities and supply chain flows
Shadcn/ui + Radix UI - Accessible, composable UI component system
Framer Motion - Smooth animations for city selection and data transitions
Supabase - Backend for authentication and real-time data
TanStack React Query - Efficient data fetching and caching
Tailwind CSS - Utility-first styling for the cyber/ghost aesthetic

What extension type(s) did you build?
Full-stack interactive web application with interactive 3D globe with real-time city selection, crisis simulation engine modeling 30/60/90-day scenarios, vulnerability scoring system across 25+ major cities, city comparison dashboard, and AI yield prediction page powered by TensorFlow.js neural networks.

If given longer, what would be the next improvement you would make?
Real-time data integration: Connect to USDA, FAO, and satellite imagery APIs for live agricultural yield monitoring, combined with climate prediction models (NOAA, Copernicus) to provide true predictive warnings. This would transform Ghost Acres from educational tool to actionable early warning system for food crises.

Set Up Instructions

Prerequisites: Node.js (v16+), Bun or npm/yarn package manager

Installation:
npm install

Set up environment variables by creating a .env.local file with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

See .env.example for template.

Running the Project:
npm run dev

Open http://localhost:5173 in your browser

Supabase Setup (Optional):
1. Create a Supabase project at https://supabase.com
2. Set up authentication if using the auth features
3. Add your credentials to .env.local

Build for Production:
npm run build
npm run preview

Screenshots

Interactive Features:
- Click cities on the 3D globe to explore their ghost acres
- View food category breakdown, top source regions, and vulnerability scores
- Run crisis simulations to see supply chain impacts
- Compare cities by vulnerability and resilience metrics
- Use AI yield prediction to model agricultural stress scenarios

Quick Demo:
1. Run npm run dev
2. Click on any city on the globe
3. Review the details panel showing ghost acres and vulnerabilities
4. Navigate to Crisis Sim to model how regional failures cascade
5. Use Compare to identify which cities are most/least resilient

See DEMO_STORYBOARD.md and QUICK_REFERENCE.md for detailed demo scripts.

Collaborators

apulza
vaish

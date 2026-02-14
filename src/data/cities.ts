export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  totalGhostAcres: number;
  vulnerabilityScore: number;
  localFoodPercent: number;
  supplyDiversity: number; // 0-100
  storageCapacityDays: number;
}

export interface AgriculturalRegion {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  totalAcres: number;
  primaryCrops: string[];
}

export interface FoodDependency {
  id: string;
  cityId: string;
  regionId: string;
  foodCategory: "grains" | "produce" | "protein" | "dairy";
  acres: number;
  annualTons: number;
  percentOfCitySupply: number;
}

export interface CrisisScenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  affectedRegionIds: string[];
  severityByDay: { day: number; severity: number }[];
  foodCategoriesAffected: string[];
}

export interface CrisisImpact {
  cityId: string;
  scenarioId: string;
  day30: { foodAccessLost: number; criticalCategories: string[]; daysUntilCritical: number };
  day60: { foodAccessLost: number; criticalCategories: string[]; daysUntilCritical: number };
  day90: { foodAccessLost: number; criticalCategories: string[]; daysUntilCritical: number };
}

// 25 major cities
export const cities: City[] = [
  { id: "nyc", name: "New York City", country: "US", lat: 40.7128, lng: -74.006, population: 8336817, totalGhostAcres: 2100000, vulnerabilityScore: 72, localFoodPercent: 3, supplyDiversity: 78, storageCapacityDays: 7 },
  { id: "la", name: "Los Angeles", country: "US", lat: 34.0522, lng: -118.2437, population: 3979576, totalGhostAcres: 2400000, vulnerabilityScore: 81, localFoodPercent: 5, supplyDiversity: 65, storageCapacityDays: 5 },
  { id: "chicago", name: "Chicago", country: "US", lat: 41.8781, lng: -87.6298, population: 2693976, totalGhostAcres: 1600000, vulnerabilityScore: 58, localFoodPercent: 4, supplyDiversity: 72, storageCapacityDays: 9 },
  { id: "houston", name: "Houston", country: "US", lat: 29.7604, lng: -95.3698, population: 2320268, totalGhostAcres: 1400000, vulnerabilityScore: 65, localFoodPercent: 6, supplyDiversity: 60, storageCapacityDays: 8 },
  { id: "boston", name: "Boston", country: "US", lat: 42.3601, lng: -71.0589, population: 692600, totalGhostAcres: 847000, vulnerabilityScore: 69, localFoodPercent: 5, supplyDiversity: 70, storageCapacityDays: 6 },
  { id: "miami", name: "Miami", country: "US", lat: 25.7617, lng: -80.1918, population: 467963, totalGhostAcres: 620000, vulnerabilityScore: 78, localFoodPercent: 4, supplyDiversity: 55, storageCapacityDays: 4 },
  { id: "sf", name: "San Francisco", country: "US", lat: 37.7749, lng: -122.4194, population: 873965, totalGhostAcres: 780000, vulnerabilityScore: 74, localFoodPercent: 8, supplyDiversity: 68, storageCapacityDays: 5 },
  { id: "seattle", name: "Seattle", country: "US", lat: 47.6062, lng: -122.3321, population: 737015, totalGhostAcres: 690000, vulnerabilityScore: 55, localFoodPercent: 12, supplyDiversity: 75, storageCapacityDays: 8 },
  { id: "denver", name: "Denver", country: "US", lat: 39.7392, lng: -104.9903, population: 715522, totalGhostAcres: 580000, vulnerabilityScore: 52, localFoodPercent: 10, supplyDiversity: 62, storageCapacityDays: 10 },
  { id: "atlanta", name: "Atlanta", country: "US", lat: 33.749, lng: -84.388, population: 498715, totalGhostAcres: 520000, vulnerabilityScore: 63, localFoodPercent: 6, supplyDiversity: 58, storageCapacityDays: 7 },
  { id: "london", name: "London", country: "UK", lat: 51.5074, lng: -0.1278, population: 8982000, totalGhostAcres: 3200000, vulnerabilityScore: 70, localFoodPercent: 4, supplyDiversity: 82, storageCapacityDays: 8 },
  { id: "tokyo", name: "Tokyo", country: "JP", lat: 35.6762, lng: 139.6503, population: 13960000, totalGhostAcres: 4500000, vulnerabilityScore: 76, localFoodPercent: 2, supplyDiversity: 70, storageCapacityDays: 10 },
  { id: "paris", name: "Paris", country: "FR", lat: 48.8566, lng: 2.3522, population: 2161000, totalGhostAcres: 1800000, vulnerabilityScore: 55, localFoodPercent: 8, supplyDiversity: 75, storageCapacityDays: 9 },
  { id: "mumbai", name: "Mumbai", country: "IN", lat: 19.076, lng: 72.8777, population: 12442373, totalGhostAcres: 3800000, vulnerabilityScore: 85, localFoodPercent: 3, supplyDiversity: 45, storageCapacityDays: 4 },
  { id: "shanghai", name: "Shanghai", country: "CN", lat: 31.2304, lng: 121.4737, population: 24870895, totalGhostAcres: 5200000, vulnerabilityScore: 68, localFoodPercent: 6, supplyDiversity: 55, storageCapacityDays: 12 },
  { id: "dubai", name: "Dubai", country: "AE", lat: 25.2048, lng: 55.2708, population: 3331000, totalGhostAcres: 1900000, vulnerabilityScore: 92, localFoodPercent: 1, supplyDiversity: 60, storageCapacityDays: 14 },
  { id: "singapore", name: "Singapore", country: "SG", lat: 1.3521, lng: 103.8198, population: 5686000, totalGhostAcres: 2800000, vulnerabilityScore: 88, localFoodPercent: 2, supplyDiversity: 72, storageCapacityDays: 12 },
  { id: "sydney", name: "Sydney", country: "AU", lat: -33.8688, lng: 151.2093, population: 5312000, totalGhostAcres: 1500000, vulnerabilityScore: 48, localFoodPercent: 15, supplyDiversity: 80, storageCapacityDays: 10 },
  { id: "nairobi", name: "Nairobi", country: "KE", lat: -1.2921, lng: 36.8219, population: 4397073, totalGhostAcres: 1200000, vulnerabilityScore: 82, localFoodPercent: 8, supplyDiversity: 35, storageCapacityDays: 3 },
  { id: "saopaulo", name: "São Paulo", country: "BR", lat: -23.5505, lng: -46.6333, population: 12325232, totalGhostAcres: 3400000, vulnerabilityScore: 45, localFoodPercent: 18, supplyDiversity: 70, storageCapacityDays: 8 },
  { id: "cairo", name: "Cairo", country: "EG", lat: 30.0444, lng: 31.2357, population: 9540000, totalGhostAcres: 2600000, vulnerabilityScore: 87, localFoodPercent: 5, supplyDiversity: 40, storageCapacityDays: 5 },
  { id: "mexico", name: "Mexico City", country: "MX", lat: 19.4326, lng: -99.1332, population: 9209944, totalGhostAcres: 2200000, vulnerabilityScore: 60, localFoodPercent: 10, supplyDiversity: 55, storageCapacityDays: 7 },
  { id: "berlin", name: "Berlin", country: "DE", lat: 52.52, lng: 13.405, population: 3748148, totalGhostAcres: 1400000, vulnerabilityScore: 42, localFoodPercent: 12, supplyDiversity: 78, storageCapacityDays: 12 },
  { id: "moscow", name: "Moscow", country: "RU", lat: 55.7558, lng: 37.6173, population: 12506468, totalGhostAcres: 3100000, vulnerabilityScore: 50, localFoodPercent: 14, supplyDiversity: 58, storageCapacityDays: 15 },
  { id: "lagos", name: "Lagos", country: "NG", lat: 6.5244, lng: 3.3792, population: 15400000, totalGhostAcres: 3600000, vulnerabilityScore: 90, localFoodPercent: 5, supplyDiversity: 30, storageCapacityDays: 2 },
];

// Key agricultural regions
export const regions: AgriculturalRegion[] = [
  { id: "midwest", name: "US Midwest Corn Belt", country: "US", lat: 41.5, lng: -93.0, totalAcres: 90000000, primaryCrops: ["corn", "soybeans", "wheat"] },
  { id: "california", name: "California Central Valley", country: "US", lat: 36.7, lng: -119.8, totalAcres: 6800000, primaryCrops: ["almonds", "grapes", "lettuce", "tomatoes"] },
  { id: "texas", name: "Texas Plains", country: "US", lat: 33.5, lng: -101.8, totalAcres: 25000000, primaryCrops: ["cotton", "cattle", "wheat"] },
  { id: "great-plains", name: "US Great Plains", country: "US", lat: 39.0, lng: -99.0, totalAcres: 45000000, primaryCrops: ["wheat", "cattle", "sorghum"] },
  { id: "southeast-us", name: "US Southeast", country: "US", lat: 33.0, lng: -83.5, totalAcres: 20000000, primaryCrops: ["poultry", "peanuts", "peaches"] },
  { id: "pampas", name: "Argentine Pampas", country: "AR", lat: -35.0, lng: -63.0, totalAcres: 35000000, primaryCrops: ["soybeans", "beef", "wheat"] },
  { id: "cerrado", name: "Brazilian Cerrado", country: "BR", lat: -15.0, lng: -47.0, totalAcres: 50000000, primaryCrops: ["soybeans", "coffee", "sugarcane"] },
  { id: "mekong", name: "Mekong Delta", country: "VN", lat: 10.0, lng: 106.0, totalAcres: 10000000, primaryCrops: ["rice", "shrimp", "catfish"] },
  { id: "punjab", name: "Punjab Region", country: "IN", lat: 30.8, lng: 75.8, totalAcres: 20000000, primaryCrops: ["wheat", "rice", "dairy"] },
  { id: "ukraine", name: "Ukrainian Breadbasket", country: "UA", lat: 49.0, lng: 32.0, totalAcres: 33000000, primaryCrops: ["wheat", "sunflowers", "corn"] },
  { id: "france", name: "Northern France", country: "FR", lat: 48.5, lng: 2.5, totalAcres: 18000000, primaryCrops: ["wheat", "dairy", "wine"] },
  { id: "new-zealand", name: "New Zealand Dairy Belt", country: "NZ", lat: -38.0, lng: 176.0, totalAcres: 8000000, primaryCrops: ["dairy", "lamb", "kiwifruit"] },
  { id: "chile", name: "Chilean Central Valley", country: "CL", lat: -34.0, lng: -71.0, totalAcres: 5000000, primaryCrops: ["grapes", "avocados", "cherries"] },
  { id: "ethiopia", name: "Ethiopian Highlands", country: "ET", lat: 9.0, lng: 38.7, totalAcres: 12000000, primaryCrops: ["coffee", "teff", "legumes"] },
  { id: "thailand", name: "Thai Central Plains", country: "TH", lat: 15.0, lng: 100.5, totalAcres: 12000000, primaryCrops: ["rice", "shrimp", "sugar"] },
  { id: "australia", name: "Australian Wheat Belt", country: "AU", lat: -32.0, lng: 148.0, totalAcres: 25000000, primaryCrops: ["wheat", "beef", "wool"] },
  { id: "spain", name: "Spanish Mediterranean", country: "ES", lat: 37.5, lng: -3.5, totalAcres: 10000000, primaryCrops: ["olives", "citrus", "wine"] },
  { id: "east-africa", name: "East African Rift", country: "KE", lat: -0.5, lng: 37.0, totalAcres: 8000000, primaryCrops: ["tea", "flowers", "beans"] },
  { id: "mississippi", name: "Mississippi Delta", country: "US", lat: 33.0, lng: -91.0, totalAcres: 12000000, primaryCrops: ["rice", "catfish", "cotton"] },
  { id: "china-ne", name: "Northeast China", country: "CN", lat: 45.0, lng: 125.0, totalAcres: 35000000, primaryCrops: ["corn", "soybeans", "rice"] },
];

// Food dependencies linking cities to regions
export const foodDependencies: FoodDependency[] = [
  // NYC
  { id: "nyc-mw-1", cityId: "nyc", regionId: "midwest", foodCategory: "grains", acres: 450000, annualTons: 820000, percentOfCitySupply: 18 },
  { id: "nyc-ca-1", cityId: "nyc", regionId: "california", foodCategory: "produce", acres: 280000, annualTons: 540000, percentOfCitySupply: 14 },
  { id: "nyc-gp-1", cityId: "nyc", regionId: "great-plains", foodCategory: "protein", acres: 380000, annualTons: 290000, percentOfCitySupply: 12 },
  { id: "nyc-se-1", cityId: "nyc", regionId: "southeast-us", foodCategory: "protein", acres: 210000, annualTons: 180000, percentOfCitySupply: 8 },
  { id: "nyc-cl-1", cityId: "nyc", regionId: "chile", foodCategory: "produce", acres: 95000, annualTons: 120000, percentOfCitySupply: 5 },
  { id: "nyc-nz-1", cityId: "nyc", regionId: "new-zealand", foodCategory: "dairy", acres: 85000, annualTons: 95000, percentOfCitySupply: 4 },
  { id: "nyc-mk-1", cityId: "nyc", regionId: "mekong", foodCategory: "protein", acres: 120000, annualTons: 75000, percentOfCitySupply: 3 },
  { id: "nyc-fr-1", cityId: "nyc", regionId: "france", foodCategory: "dairy", acres: 110000, annualTons: 68000, percentOfCitySupply: 3 },
  // LA
  { id: "la-ca-1", cityId: "la", regionId: "california", foodCategory: "produce", acres: 520000, annualTons: 980000, percentOfCitySupply: 22 },
  { id: "la-mw-1", cityId: "la", regionId: "midwest", foodCategory: "grains", acres: 480000, annualTons: 750000, percentOfCitySupply: 16 },
  { id: "la-mx-1", cityId: "la", regionId: "pampas", foodCategory: "protein", acres: 350000, annualTons: 280000, percentOfCitySupply: 10 },
  { id: "la-gp-1", cityId: "la", regionId: "great-plains", foodCategory: "protein", acres: 420000, annualTons: 340000, percentOfCitySupply: 14 },
  { id: "la-cl-1", cityId: "la", regionId: "chile", foodCategory: "produce", acres: 180000, annualTons: 220000, percentOfCitySupply: 8 },
  { id: "la-th-1", cityId: "la", regionId: "thailand", foodCategory: "grains", acres: 150000, annualTons: 190000, percentOfCitySupply: 6 },
  // Chicago
  { id: "chi-mw-1", cityId: "chicago", regionId: "midwest", foodCategory: "grains", acres: 520000, annualTons: 900000, percentOfCitySupply: 28 },
  { id: "chi-gp-1", cityId: "chicago", regionId: "great-plains", foodCategory: "protein", acres: 310000, annualTons: 250000, percentOfCitySupply: 15 },
  { id: "chi-ca-1", cityId: "chicago", regionId: "california", foodCategory: "produce", acres: 180000, annualTons: 320000, percentOfCitySupply: 10 },
  { id: "chi-se-1", cityId: "chicago", regionId: "southeast-us", foodCategory: "protein", acres: 150000, annualTons: 130000, percentOfCitySupply: 7 },
  // Boston
  { id: "bos-mw-1", cityId: "boston", regionId: "midwest", foodCategory: "grains", acres: 280000, annualTons: 420000, percentOfCitySupply: 22 },
  { id: "bos-ca-1", cityId: "boston", regionId: "california", foodCategory: "produce", acres: 150000, annualTons: 280000, percentOfCitySupply: 14 },
  { id: "bos-gp-1", cityId: "boston", regionId: "great-plains", foodCategory: "protein", acres: 180000, annualTons: 140000, percentOfCitySupply: 12 },
  { id: "bos-fr-1", cityId: "boston", regionId: "france", foodCategory: "dairy", acres: 65000, annualTons: 48000, percentOfCitySupply: 5 },
  // London
  { id: "lon-fr-1", cityId: "london", regionId: "france", foodCategory: "grains", acres: 650000, annualTons: 1200000, percentOfCitySupply: 18 },
  { id: "lon-sp-1", cityId: "london", regionId: "spain", foodCategory: "produce", acres: 420000, annualTons: 680000, percentOfCitySupply: 12 },
  { id: "lon-nz-1", cityId: "london", regionId: "new-zealand", foodCategory: "dairy", acres: 380000, annualTons: 320000, percentOfCitySupply: 10 },
  { id: "lon-au-1", cityId: "london", regionId: "australia", foodCategory: "protein", acres: 280000, annualTons: 220000, percentOfCitySupply: 8 },
  { id: "lon-uk-1", cityId: "london", regionId: "ukraine", foodCategory: "grains", acres: 350000, annualTons: 540000, percentOfCitySupply: 9 },
  // Tokyo
  { id: "tok-cn-1", cityId: "tokyo", regionId: "china-ne", foodCategory: "grains", acres: 850000, annualTons: 1400000, percentOfCitySupply: 16 },
  { id: "tok-au-1", cityId: "tokyo", regionId: "australia", foodCategory: "protein", acres: 620000, annualTons: 480000, percentOfCitySupply: 10 },
  { id: "tok-th-1", cityId: "tokyo", regionId: "thailand", foodCategory: "grains", acres: 520000, annualTons: 820000, percentOfCitySupply: 9 },
  { id: "tok-mk-1", cityId: "tokyo", regionId: "mekong", foodCategory: "protein", acres: 380000, annualTons: 290000, percentOfCitySupply: 6 },
  { id: "tok-mw-1", cityId: "tokyo", regionId: "midwest", foodCategory: "grains", acres: 450000, annualTons: 680000, percentOfCitySupply: 8 },
  // Dubai
  { id: "dub-pn-1", cityId: "dubai", regionId: "punjab", foodCategory: "grains", acres: 420000, annualTons: 650000, percentOfCitySupply: 18 },
  { id: "dub-au-1", cityId: "dubai", regionId: "australia", foodCategory: "protein", acres: 350000, annualTons: 280000, percentOfCitySupply: 12 },
  { id: "dub-et-1", cityId: "dubai", regionId: "ethiopia", foodCategory: "produce", acres: 280000, annualTons: 180000, percentOfCitySupply: 8 },
  { id: "dub-fr-1", cityId: "dubai", regionId: "france", foodCategory: "dairy", acres: 220000, annualTons: 150000, percentOfCitySupply: 6 },
  // Mumbai
  { id: "mum-pn-1", cityId: "mumbai", regionId: "punjab", foodCategory: "grains", acres: 1200000, annualTons: 2400000, percentOfCitySupply: 35 },
  { id: "mum-mk-1", cityId: "mumbai", regionId: "mekong", foodCategory: "grains", acres: 450000, annualTons: 620000, percentOfCitySupply: 8 },
  { id: "mum-ea-1", cityId: "mumbai", regionId: "east-africa", foodCategory: "produce", acres: 280000, annualTons: 180000, percentOfCitySupply: 5 },
  // Singapore
  { id: "sg-th-1", cityId: "singapore", regionId: "thailand", foodCategory: "grains", acres: 580000, annualTons: 920000, percentOfCitySupply: 22 },
  { id: "sg-mk-1", cityId: "singapore", regionId: "mekong", foodCategory: "protein", acres: 420000, annualTons: 350000, percentOfCitySupply: 14 },
  { id: "sg-au-1", cityId: "singapore", regionId: "australia", foodCategory: "protein", acres: 380000, annualTons: 280000, percentOfCitySupply: 10 },
  { id: "sg-nz-1", cityId: "singapore", regionId: "new-zealand", foodCategory: "dairy", acres: 320000, annualTons: 240000, percentOfCitySupply: 8 },
  // Lagos
  { id: "lag-ea-1", cityId: "lagos", regionId: "east-africa", foodCategory: "grains", acres: 850000, annualTons: 1200000, percentOfCitySupply: 20 },
  { id: "lag-uk-1", cityId: "lagos", regionId: "ukraine", foodCategory: "grains", acres: 620000, annualTons: 980000, percentOfCitySupply: 15 },
  { id: "lag-ce-1", cityId: "lagos", regionId: "cerrado", foodCategory: "grains", acres: 480000, annualTons: 720000, percentOfCitySupply: 10 },
  // Cairo
  { id: "cai-uk-1", cityId: "cairo", regionId: "ukraine", foodCategory: "grains", acres: 780000, annualTons: 1400000, percentOfCitySupply: 25 },
  { id: "cai-fr-1", cityId: "cairo", regionId: "france", foodCategory: "grains", acres: 420000, annualTons: 680000, percentOfCitySupply: 12 },
  { id: "cai-pn-1", cityId: "cairo", regionId: "punjab", foodCategory: "grains", acres: 350000, annualTons: 520000, percentOfCitySupply: 8 },
  // São Paulo
  { id: "sp-ce-1", cityId: "saopaulo", regionId: "cerrado", foodCategory: "grains", acres: 1200000, annualTons: 2200000, percentOfCitySupply: 30 },
  { id: "sp-pa-1", cityId: "saopaulo", regionId: "pampas", foodCategory: "protein", acres: 680000, annualTons: 520000, percentOfCitySupply: 12 },
  // Mexico City
  { id: "mx-mw-1", cityId: "mexico", regionId: "midwest", foodCategory: "grains", acres: 580000, annualTons: 920000, percentOfCitySupply: 20 },
  { id: "mx-tx-1", cityId: "mexico", regionId: "texas", foodCategory: "protein", acres: 420000, annualTons: 340000, percentOfCitySupply: 12 },
  { id: "mx-ca-1", cityId: "mexico", regionId: "california", foodCategory: "produce", acres: 280000, annualTons: 380000, percentOfCitySupply: 8 },
  // Moscow
  { id: "mos-uk-1", cityId: "moscow", regionId: "ukraine", foodCategory: "grains", acres: 950000, annualTons: 1800000, percentOfCitySupply: 28 },
  { id: "mos-gp-1", cityId: "moscow", regionId: "great-plains", foodCategory: "grains", acres: 620000, annualTons: 980000, percentOfCitySupply: 15 },
  { id: "mos-au-1", cityId: "moscow", regionId: "australia", foodCategory: "protein", acres: 520000, annualTons: 420000, percentOfCitySupply: 12 },
  { id: "mos-fr-1", cityId: "moscow", regionId: "france", foodCategory: "dairy", acres: 380000, annualTons: 280000, percentOfCitySupply: 8 },
  { id: "mos-pn-1", cityId: "moscow", regionId: "punjab", foodCategory: "produce", acres: 280000, annualTons: 200000, percentOfCitySupply: 6 },
  { id: "mos-nz-1", cityId: "moscow", regionId: "new-zealand", foodCategory: "dairy", acres: 220000, annualTons: 160000, percentOfCitySupply: 5 },
  { id: "mos-mw-1", cityId: "moscow", regionId: "midwest", foodCategory: "grains", acres: 180000, annualTons: 280000, percentOfCitySupply: 4 },
];

export const crisisScenarios: CrisisScenario[] = [
  {
    id: "midwest-drought",
    name: "Midwest Mega-Drought",
    icon: "🌡️",
    description: "Extreme drought devastates the US Corn Belt, destroying 60% of grain output and triggering global price spikes.",
    affectedRegionIds: ["midwest", "great-plains"],
    severityByDay: [{ day: 30, severity: 0.3 }, { day: 60, severity: 0.55 }, { day: 90, severity: 0.75 }],
    foodCategoriesAffected: ["grains", "protein"],
  },
  {
    id: "gulf-hurricane",
    name: "Gulf Port Hurricane",
    icon: "🚢",
    description: "Category 5 hurricane destroys major Gulf ports, halting 40% of US food exports and disrupting supply chains.",
    affectedRegionIds: ["texas", "mississippi", "southeast-us"],
    severityByDay: [{ day: 30, severity: 0.5 }, { day: 60, severity: 0.4 }, { day: 90, severity: 0.25 }],
    foodCategoriesAffected: ["grains", "protein", "produce"],
  },
  {
    id: "fertilizer-shortage",
    name: "Global Fertilizer Shortage",
    icon: "💰",
    description: "Geopolitical conflict cuts off 50% of global fertilizer supply, reducing crop yields worldwide.",
    affectedRegionIds: ["midwest", "great-plains", "ukraine", "punjab", "cerrado", "china-ne"],
    severityByDay: [{ day: 30, severity: 0.15 }, { day: 60, severity: 0.35 }, { day: 90, severity: 0.6 }],
    foodCategoriesAffected: ["grains", "produce"],
  },
  {
    id: "pandemic",
    name: "Pandemic Supply Chain Collapse",
    icon: "🦠",
    description: "A global pandemic disrupts labor and logistics, causing cascading failures across food supply chains.",
    affectedRegionIds: ["midwest", "california", "france", "thailand", "mekong", "punjab", "australia"],
    severityByDay: [{ day: 30, severity: 0.2 }, { day: 60, severity: 0.45 }, { day: 90, severity: 0.55 }],
    foodCategoriesAffected: ["grains", "produce", "protein", "dairy"],
  },
  {
    id: "california-water",
    name: "California Water Crisis",
    icon: "🌊",
    description: "Catastrophic water shortage forces 70% of California farmland to go fallow.",
    affectedRegionIds: ["california"],
    severityByDay: [{ day: 30, severity: 0.4 }, { day: 60, severity: 0.65 }, { day: 90, severity: 0.8 }],
    foodCategoriesAffected: ["produce", "dairy"],
  },
];

// Helper: compute crisis impact for a city
export function computeCrisisImpact(cityId: string, scenarioIds: string[]): CrisisImpact | null {
  const cityDeps = foodDependencies.filter((d) => d.cityId === cityId);
  if (cityDeps.length === 0) return null;

  const scenarios = scenarioIds.map((id) => crisisScenarios.find((s) => s.id === id)).filter(Boolean) as CrisisScenario[];
  if (scenarios.length === 0) return null;

  const totalSupply = cityDeps.reduce((sum, d) => sum + d.percentOfCitySupply, 0);

  const computeForDay = (day: number) => {
    let lostPercent = 0;
    const criticalCats = new Set<string>();

    for (const dep of cityDeps) {
      for (const scenario of scenarios) {
        if (scenario.affectedRegionIds.includes(dep.regionId) && scenario.foodCategoriesAffected.includes(dep.foodCategory)) {
          const dayData = scenario.severityByDay.find((s) => s.day === day);
          if (dayData) {
            lostPercent += dep.percentOfCitySupply * dayData.severity;
            criticalCats.add(dep.foodCategory);
          }
        }
      }
    }

    const foodAccessLost = Math.min(Math.round((lostPercent / totalSupply) * 100), 100);
    const daysUntilCritical = Math.max(0, Math.round((1 - foodAccessLost / 100) * 120));

    return { foodAccessLost, criticalCategories: Array.from(criticalCats), daysUntilCritical };
  };

  return {
    cityId,
    scenarioId: scenarioIds.join("+"),
    day30: computeForDay(30),
    day60: computeForDay(60),
    day90: computeForDay(90),
  };
}

// Helpers
export function getCityDependencies(cityId: string) {
  return foodDependencies.filter((d) => d.cityId === cityId);
}

export function getRegionById(regionId: string) {
  return regions.find((r) => r.id === regionId);
}

export function getCityById(cityId: string) {
  return cities.find((c) => c.id === cityId);
}

// Aggregate stats
export const totalGhostAcres = cities.reduce((sum, c) => sum + c.totalGhostAcres, 0);
export const totalCities = cities.length;
export const totalCountries = new Set(cities.map((c) => c.country)).size;

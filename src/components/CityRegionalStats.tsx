import { useMapRegionData } from '../hooks/useMapRegionData';
import { regions } from '@/data/cities';

export function RegionMapOverlay() {
  try {
    const { data, loading, error } = useMapRegionData({
      query: 'agricultural region',
      country: 'USA',
      limit: 5,
    });

    if (loading) return null; // Don't show overlay while loading
    if (error) return null; // Fail silently

    // Show geospatial data for major agricultural regions
    // This component can be used in GlobeScene to overlay regions
    return {
      features: data?.features || [],
      loading,
      error,
    };
  } catch (e) {
    return null;
  }
}

// Component to display agricultural region stats
export function CityRegionalStats({ city }) {
  try {
    // Get regions that feed this city
    const relevantRegions = regions.filter(r => 
      r.name && (
        r.name.includes('Midwest') || 
        r.name.includes('Plains') ||
        r.name.includes('Valley') ||
        r.name.includes('Belt')
      )
    );

    return (
      <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
        <div className="font-mono text-primary">Agricultural Regions</div>
        <div className="space-y-1">
          {relevantRegions.slice(0, 3).map((region) => (
            <div key={region.id} className="flex justify-between">
              <span>{region.name}</span>
              <span className="text-primary font-mono">{region.productionCapacity}M tonnes</span>
            </div>
          ))}
        </div>
        {relevantRegions.length === 0 && (
          <p className="text-muted-foreground">Major agricultural regions nearby</p>
        )}
      </div>
    );
  } catch (e) {
    return null;
  }
}

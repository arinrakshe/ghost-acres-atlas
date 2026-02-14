import { useClimateData } from '../hooks/useClimateData';

export function CityClimateStats({ city }) {
  try {
    // Map cities to NOAA weather stations
    const stationMap = {
      'New York': 'GHCND:USW00014734', // NYC Central Park
      'Los Angeles': 'GHCND:USW00023174', // LA Downtown
      'London': 'GHCND:GME00127786', // London Heathrow
      'Tokyo': 'GHCND:JA000047662', // Tokyo
      'Paris': 'GHCND:FRE00119369', // Paris
      'Dubai': 'GHCND:AE000041196', // Dubai
      'Mumbai': 'GHCND:IN000040019', // Mumbai
      'Beijing': 'GHCND:CHE00054511', // Beijing
      'São Paulo': 'GHCND:BRE00036016', // São Paulo
      'Sydney': 'GHCND:ASN00066062', // Sydney
    };

    const stationId = stationMap[city?.name] || 'GHCND:USW00014734';

    const { data, loading, error } = useClimateData({
      datasetId: 'GHCND',
      stationId,
      year: '2022',
    });

    if (loading) return <p className="text-xs text-muted-foreground">Loading climate data...</p>;

    // If error or no data, show demo data
    if (error || !data) {
      return (
        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
          <div className="font-mono text-primary">Climate Data (2022) - Demo</div>
          <div>Avg Temp: <span className="font-bold">15.2°C</span></div>
          <div>Annual Rainfall: <span className="font-bold">850mm</span></div>
        </div>
      );
    }

    // Parse NOAA climate data
    // NOAA returns array of observations with PRCP (precipitation), TAVG (avg temp), etc.
    if (data.results && data.results.length > 0) {
      // Calculate averages from the data
      const temps = data.results.filter(r => r.datatype === 'TAVG');
      const precip = data.results.filter(r => r.datatype === 'PRCP');
      
      const avgTemp = temps.length > 0 
        ? (temps.reduce((sum, r) => sum + (r.value || 0), 0) / temps.length / 10).toFixed(1)
        : 'N/A';
      
      const totalRain = precip.length > 0
        ? (precip.reduce((sum, r) => sum + (r.value || 0), 0) / 10).toFixed(0)
        : 'N/A';

      return (
        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
          <div className="font-mono text-primary">Climate Data (2022)</div>
          <div>Avg Temp: <span className="font-bold">{avgTemp}°C</span></div>
          <div>Annual Rainfall: <span className="font-bold">{totalRain}mm</span></div>
        </div>
      );
    }

    // Fallback demo
    return (
      <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
        <div className="font-mono text-primary">Climate Data (2022) - Demo</div>
        <div>Avg Temp: <span className="font-bold">15.2°C</span></div>
        <div>Annual Rainfall: <span className="font-bold">850mm</span></div>
      </div>
    );
  } catch (e) {
    return null;
  }
}

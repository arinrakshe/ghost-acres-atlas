import { useGlobalFoodData } from '../hooks/useGlobalFoodData';

export function CityGlobalFoodStats({ city }) {
  try {
    // Map city to country code (e.g., New York -> USA, London -> GBR)
    const countryCodeMap = {
      'New York': 'USA',
      'Los Angeles': 'USA',
      'London': 'GBR',
      'Tokyo': 'JPN',
      'Paris': 'FRA',
      'Dubai': 'ARE',
      'Mumbai': 'IND',
      'Beijing': 'CHN',
      'São Paulo': 'BRA',
      'Sydney': 'AUS',
    };

    const countryCode = countryCodeMap[city?.name] || 'USA';

    // Fetch global food production data from FAO
    const { data, loading, error } = useGlobalFoodData({
      countryCode,
      year: '2022',
      itemCode: '56', // Wheat production
    });

    if (loading) return <p className="text-xs text-muted-foreground">Loading global food data...</p>;

    // If error or no data, show demo data
    if (error || !data) {
      return (
        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
          <div className="font-mono text-primary">Global Food Production (2022) - Demo</div>
          <div>Wheat Production: <span className="font-bold">2.3M tonnes</span></div>
          <div>Country: {countryCode}</div>
        </div>
      );
    }

    // Parse FAO production data
    // FAO API returns: { data: [{ Item: 'Wheat', Element: 'Production', Value: 123456, ... }] }
    if (data.data && data.data.length > 0) {
      const row = data.data[0];
      return (
        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
          <div className="font-mono text-primary">{row.Item} Production ({row.Year})</div>
          <div>Production: <span className="font-bold">{(row.Value / 1000).toFixed(1)}M tonnes</span></div>
          <div>Country: {countryCode}</div>
        </div>
      );
    }

    // Fallback demo
    return (
      <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
        <div className="font-mono text-primary">Global Food Production (2022) - Demo</div>
        <div>Wheat Production: <span className="font-bold">2.3M tonnes</span></div>
        <div>Country: {countryCode}</div>
      </div>
    );
  } catch (e) {
    return null;
  }
}

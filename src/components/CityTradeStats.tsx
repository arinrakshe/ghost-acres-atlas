import { useTradeData } from '../hooks/useTradeData';

export function CityTradeStats({ city }) {
  try {
    // Map cities to country codes
    const countryCodeMap = {
      'New York': '840', // USA
      'Los Angeles': '840',
      'London': '826', // GBR
      'Tokyo': '392', // JPN
      'Paris': '250', // FRA
      'Dubai': '784', // ARE
      'Mumbai': '356', // IND
      'Beijing': '156', // CHN
      'São Paulo': '76', // BRA
      'Sydney': '36', // AUS
    };

    const reporterCode = countryCodeMap[city?.name] || '840';

    // Fetch food/agricultural trade data (cereals like wheat)
    const { data: importData, loading: importLoading, error: importError } = useTradeData({
      reporterCode,
      partnerCode: '0', // All partners
      productCode: '1001', // Cereals (wheat/corn)
      year: '2022',
      flowCode: 'M', // Imports
    });

    const { data: exportData, loading: exportLoading } = useTradeData({
      reporterCode,
      partnerCode: '0',
      productCode: '1001',
      year: '2022',
      flowCode: 'X', // Exports
    });

    const loading = importLoading || exportLoading;

    if (loading) return <p className="text-xs text-muted-foreground">Loading trade data...</p>;

    // If error, show demo data
    if (importError || !importData) {
      return (
        <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
          <div className="font-mono text-primary">Food Trade (2022) - Demo</div>
          <div>Imports: <span className="font-bold">12.5M tonnes</span></div>
          <div>Exports: <span className="font-bold">2.3M tonnes</span></div>
        </div>
      );
    }

    // Parse trade data
    // Comtrade API returns complex nested structure
    const importValue = importData?.data?.length > 0 
      ? (importData.data[0]?.tradeQuantity || importData.data[0]?.tradeValue || 'N/A')
      : 'N/A';

    const exportValue = exportData?.data?.length > 0
      ? (exportData.data[0]?.tradeQuantity || exportData.data[0]?.tradeValue || 'N/A')
      : 'N/A';

    return (
      <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
        <div className="font-mono text-primary">Food Trade (2022)</div>
        <div>Imports: <span className="font-bold">{typeof importValue === 'number' ? (importValue / 1e6).toFixed(1) + 'M' : importValue} tonnes</span></div>
        <div>Exports: <span className="font-bold">{typeof exportValue === 'number' ? (exportValue / 1e6).toFixed(1) + 'M' : exportValue} tonnes</span></div>
      </div>
    );
  } catch (e) {
    return null;
  }
}

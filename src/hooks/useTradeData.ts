import { useEffect, useState } from 'react';

// UN Comtrade API - International trade statistics for food and agricultural products
// Using Vite proxy to avoid CORS errors
// Public API: https://comtradeplus.un.org/
// Docs: https://comtradeplus.un.org/api/swagger/ui
const COMTRADE_URL = '/api/comtrade/get';

export function useTradeData({
  reporterCode = '840', // USA: 840, GBR: 826, CHN: 156, etc.
  partnerCode = '0', // 0 = all partners
  productCode = '1001', // Cereals like wheat/corn
  year = '2022',
  flowCode = 'M', // M = imports, X = exports
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // UN Comtrade API endpoint for trade data (public, no API key needed)
    const params = new URLSearchParams({
      reporterCode,
      partnerCode,
      productCode,
      period: year,
      flowCode,
      format: 'json',
    });

    const url = `${COMTRADE_URL}?${params.toString()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        clearTimeout(timeoutId);
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
        setLoading(false);
      })
      .catch(e => {
        clearTimeout(timeoutId);
        if (e instanceof Error && e.name === 'AbortError') {
          setError('Request timeout');
        } else {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reporterCode, partnerCode, productCode, year, flowCode]);

  return { data, loading, error };
}

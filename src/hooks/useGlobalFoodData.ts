import { useEffect, useState } from 'react';

// UN FAO FAOSTAT API - Global food production, trade, and supply data
// Public API: https://www.fao.org/faostat/en/#home
// Docs: https://fenixservices.fao.org/faostat/static/documents/QCL/QCL_E.pdf
const FAOSTAT_URL = 'https://fenixservices.fao.org/faostat/api/v1/data/QCL'; // Production data

export function useGlobalFoodData({
  countryCode = 'USA', // ISO 3-letter country code
  year = '2022',
  itemCode = '56', // Wheat: 56, Corn: 27, Rice: 27, etc.
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // FAO FAOSTAT API endpoint for production data (public, no API key needed)
    const url = `${FAOSTAT_URL}?countries=${countryCode}&years=${year}&items=${itemCode}&format=json`;

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
  }, [countryCode, year, itemCode]);

  return { data, loading, error };
}

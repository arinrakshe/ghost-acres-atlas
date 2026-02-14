import { useEffect, useState } from 'react';

// Use local API proxy to USDA (Vite dev server proxies this)
const PROXY_URL = '/api/usda';
const API_KEY = import.meta.env.VITE_USDA_API_KEY;

export function useUsdaCropData({
  commodity = 'CORN',
  state = 'IA',
  year = '2022',
  statistic = 'PRODUCTION',
  unit = 'BU',
  aggLevel = 'STATE',
  format = 'JSON',
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setError('USDA API key not configured');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const params = new URLSearchParams({
      key: API_KEY,
      commodity_desc: commodity,
      state_alpha: state,
      year,
      statisticcat_desc: statistic,
      unit_desc: unit,
      agg_level_desc: aggLevel,
      format,
    });
    
    const url = `${PROXY_URL}?${params.toString()}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
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
  }, [commodity, state, year, statistic, unit, aggLevel, format]);

  return { data, loading, error };
}

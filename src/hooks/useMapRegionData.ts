import { useEffect, useState } from 'react';

// Map Data API - Geospatial data for agricultural regions
const MAP_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const MAP_API_URL = 'https://api.mapbox.com/geocoding/v5';

export function useMapRegionData({
  query = 'agricultural region',
  country = 'USA',
  limit = 10,
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!MAP_API_KEY) {
      setError('Map API key not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Mapbox Geocoding API endpoint
    const url = `${MAP_API_URL}/${query}.json?access_token=${MAP_API_KEY}&country=${country}&limit=${limit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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
  }, [query, country, limit]);

  return { data, loading, error };
}

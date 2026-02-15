import { useEffect, useState } from 'react';

// NOAA Climate Data Online API - Historical and real-time climate data
// Using Vite proxy to avoid CORS errors
// Docs: https://www.ncdc.noaa.gov/cdo-web/webservices/v2
const NOAA_URL = '/api/noaa/data';
const NOAA_API_KEY = import.meta.env.VITE_NOAA_API_KEY;

export function useClimateData({
  datasetId = 'GHCND', // Global Historical Climatology Network
  stationId = 'GHCND:USW00014734', // Example: NYC Central Park station
  year = '2022',
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!NOAA_API_KEY) {
      setError('NOAA API key not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // NOAA API endpoint for climate data
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const url = `${NOAA_URL}?datasetid=${datasetId}&stationid=${stationId}&startdate=${startDate}&enddate=${endDate}&limit=1000&units=metric`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(url, {
      signal: controller.signal,
      headers: {
        'token': NOAA_API_KEY,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        clearTimeout(timeoutId);
        if (json.error) {
          setError(json.error.message);
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
  }, [datasetId, stationId, year]);

  return { data, loading, error };
}

import React from 'react';
import { useUsdaCropData } from '../hooks/useUsdaCropData';

export default function UsdaDemoPanel() {
  // Example: Corn production in Iowa, 2022
  const { data, loading, error } = useUsdaCropData({
    commodity: 'CORN',
    state: 'IA',
    year: '2022',
    statistic: 'PRODUCTION',
    unit: 'BU',
    aggLevel: 'STATE',
  });

  return (
    <div style={{ padding: 24, background: '#111827', color: '#fff', borderRadius: 8, maxWidth: 600 }}>
      <h2>USDA Crop Data Demo</h2>
      <p>Showing corn production in Iowa (2022):</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && data.data && data.data.length > 0 ? (
        <table style={{ width: '100%', marginTop: 16, background: '#1e293b', borderRadius: 4 }}>
          <thead>
            <tr>
              <th>Year</th>
              <th>State</th>
              <th>Commodity</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, i) => (
              <tr key={i}>
                <td>{row.year}</td>
                <td>{row.state_alpha}</td>
                <td>{row.commodity_desc}</td>
                <td>{row.Value}</td>
                <td>{row.unit_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading && <p>No data found.</p>}
    </div>
  );
}

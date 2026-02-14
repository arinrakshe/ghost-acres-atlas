// Backend API route to proxy USDA requests (avoids CORS issues)
const API_KEY = import.meta.env.VITE_USDA_API_KEY || process.env.USDA_API_KEY;
const BASE_URL = 'https://quickstats.nass.usda.gov/api/api_GET/';

export default async function handler(req, res) {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: 'USDA API key not configured' });
    }

    const { commodity, state, year, statistic, unit, aggLevel, format } = req.query;

    const url = `${BASE_URL}?key=${API_KEY}&commodity_desc=${commodity}&state_alpha=${state}&year=${year}&statisticcat_desc=${statistic}&unit_desc=${unit}&agg_level_desc=${aggLevel}&format=${format}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('USDA API error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

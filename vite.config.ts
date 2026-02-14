import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/usda': {
        target: 'https://quickstats.nass.usda.gov/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/usda/, '/api_GET/'),
      },
      '/api/fao': {
        target: 'https://www.fao.org/webapis/foodbalance/v1.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fao/, ''),
      },
      '/api/noaa': {
        target: 'https://www.ncei.noaa.gov/cdo-web/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/noaa/, ''),
      },
      '/api/mapbox': {
        target: 'https://api.mapbox.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mapbox/, ''),
      },
      '/api/comtrade': {
        target: 'https://comtradeplus.un.org/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/comtrade/, ''),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

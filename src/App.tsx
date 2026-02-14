import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Index from "./pages/Index";
import Globe from "./pages/Globe";
import Crisis from "./pages/Crisis";
import Compare from "./pages/Compare";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import UsdaDemoPanel from "./components/UsdaDemoPanel";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize Supabase connection only if available
    if (supabase && supabase.auth) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          console.log("User authenticated:", session.user.email);
        }
      }).catch((error) => {
        console.log("Supabase auth error (non-critical):", error);
      });
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/globe" element={<Globe />} />
          <Route path="/crisis" element={<Crisis />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
          <Route path="/usda-demo" element={<UsdaDemoPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;

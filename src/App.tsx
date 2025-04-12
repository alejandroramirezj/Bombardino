import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "@/contexts/AuthContext";
import { VoteProvider } from "@/contexts/VoteContext";
import { CharacterProvider } from "@/contexts/CharacterContext";

import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CharactersPage from "@/pages/CharactersPage";
import CharacterDetailPage from "@/pages/CharacterDetailPage";
import CharacterCreatePage from "@/pages/CharacterCreatePage";
import RankingPage from "@/pages/RankingPage";
import AboutPage from "@/pages/AboutPage";
import BrainrotPage from "@/pages/BrainrotPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/components/layout/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CharacterProvider>
        <VoteProvider>
          <HelmetProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="personajes" element={<CharactersPage />} />
                    <Route path="personajes/:characterSlug" element={<CharacterDetailPage />} />
                    <Route path="crear-personaje" element={<CharacterCreatePage />} />
                    <Route path="ranking" element={<RankingPage />} />
                    <Route path="acerca-de" element={<AboutPage />} />
                    <Route path="brainrot" element={<BrainrotPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<NotFound />} />
                    
                    {/* Redirects for backwards compatibility */}
                    <Route path="characters" element={<Navigate to="/personajes" replace />} />
                    <Route path="characters/:characterSlug" element={<Navigate to="/personajes/:characterSlug" replace />} />
                    <Route path="personajes/crear" element={<Navigate to="/crear-personaje" replace />} />
                    <Route path="about" element={<Navigate to="/acerca-de" replace />} />
                  </Route>
                </Routes>
              </HashRouter>
            </TooltipProvider>
          </HelmetProvider>
        </VoteProvider>
      </CharacterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

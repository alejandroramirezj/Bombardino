import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
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
import BattleFAQPage from "@/pages/BattleFAQPage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/components/layout/NotFound";
import ScrollToTop from "@/components/utils/ScrollToTop";

// Determinar si usamos dominio personalizado o GitHub Pages
const isCustomDomain = window.location.hostname !== 'alejandroramirezj.github.io';
const Router = isCustomDomain ? BrowserRouter : HashRouter;

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
              <Router>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="personajes" element={<CharactersPage />} />
                    <Route path="personajes/:characterSlug" element={<CharacterDetailPage />} />
                    <Route path="crear-personaje" element={<CharacterCreatePage />} />
                    <Route path="ranking" element={<RankingPage />} />
                    <Route path="batallas" element={<BattleFAQPage />} />
                    <Route path="acerca-de" element={<AboutPage />} />
                    <Route path="brainrot" element={<BrainrotPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="perfil" element={<ProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                    
                    {/* Redirects for backwards compatibility */}
                    <Route path="characters" element={<Navigate to="personajes" replace />} />
                    <Route path="characters/:characterSlug" element={<Navigate to={`personajes/${location.pathname.split('/').pop()}`} replace />} />
                    <Route path="personajes/crear" element={<Navigate to="../crear-personaje" replace />} />
                    <Route path="about" element={<Navigate to="acerca-de" replace />} />
                  </Route>
                </Routes>
              </Router>
            </TooltipProvider>
          </HelmetProvider>
        </VoteProvider>
      </CharacterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

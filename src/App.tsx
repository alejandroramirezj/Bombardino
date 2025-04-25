import React, { Suspense, lazy } from 'react';
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
// Lazy load de páginas
const HomePage = lazy(() => import("@/pages/HomePage"));
const CharactersPage = lazy(() => import("@/pages/CharactersPage"));
const CharacterDetailPage = lazy(() => import("@/pages/CharacterDetailPage"));
const CharacterCreatePage = lazy(() => import("@/pages/CharacterCreatePage"));
const RankingPage = lazy(() => import("@/pages/RankingPage"));
const BrainrotPage = lazy(() => import("@/pages/BrainrotPage"));
const BattleFAQPage = lazy(() => import("@/pages/BattleFAQPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFound = lazy(() => import("@/components/layout/NotFound"));

import ScrollToTop from "@/components/utils/ScrollToTop";

// Determinar si usamos dominio personalizado o GitHub Pages
const isCustomDomain = window.location.hostname !== 'alejandroramirezj.github.io';
const Router = isCustomDomain ? BrowserRouter : HashRouter;

const queryClient = new QueryClient();

// Componente de fallback para Suspense (simple)
const LoadingFallback = () => <div className="w-full h-screen flex items-center justify-center"><p>Cargando...</p></div>;

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
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="personajes" element={<CharactersPage />} />
                      <Route path="personajes/:characterSlug" element={<CharacterDetailPage />} />
                      <Route path="crear-personaje" element={<CharacterCreatePage />} />
                      <Route path="ranking" element={<RankingPage />} />
                      <Route path="batallas" element={<BattleFAQPage />} />
                      <Route path="brainrot" element={<BrainrotPage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="perfil" element={<ProfilePage />} />
                      <Route path="*" element={<NotFound />} />
                      
                      {/* Redirects for backwards compatibility */}
                      <Route path="characters" element={<Navigate to="personajes" replace />} />
                      <Route path="characters/:characterSlug" element={<Navigate to={`personajes/${location.pathname.split('/').pop()}`} replace />} />
                      <Route path="personajes/crear" element={<Navigate to="../crear-personaje" replace />} />
                      <Route path="acerca-de" element={<Navigate to="brainrot" replace />} />
                      <Route path="about" element={<Navigate to="brainrot" replace />} />
                    </Route>
                  </Routes>
                </Suspense>
              </Router>
            </TooltipProvider>
          </HelmetProvider>
        </VoteProvider>
      </CharacterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

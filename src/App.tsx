
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CharacterProvider>
        <VoteProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="characters" element={<CharactersPage />} />
                  <Route path="character/:id" element={<CharacterDetailPage />} />
                  <Route path="characters/create" element={<CharacterCreatePage />} />
                  <Route path="ranking" element={<RankingPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="brainrot" element={<BrainrotPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </VoteProvider>
      </CharacterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

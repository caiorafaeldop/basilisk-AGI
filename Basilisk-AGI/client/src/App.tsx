import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminArticles, AllArticles, ArticleView, ArticleEditor } from "@/modules/articles";
import AdminLeads from "@/modules/leads/pages/AdminLeads";
import AdminTestimonials from "@/modules/testimonials/pages/AdminTestimonials";
import TestimonialsDemo from "@/modules/testimonials/pages/TestimonialsDemo";
import AdminTeam from "@/modules/team/pages/AdminTeam";
import TeamDemo from "@/modules/team/pages/TeamDemo";
import AdminSiteConfig from "@/modules/site-config/pages/AdminSiteConfig";
import { Login } from "@/modules/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ModalProvider } from "./hooks/useModal";
import { DynamicThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DesignSystemProvider } from "./components/providers/DesignSystemProvider";
import { AdminSideMenu } from "@/components/admin/AdminSideMenu";
import { SEOManager } from "@/components/SEOManager";
import { GlobalTypography } from "@/components/GlobalTypography";
import { HelmetProvider } from 'react-helmet-async';
import { RootRedirect } from "@/components/RootRedirect";

// Enhanced admin pages
import AdminArticlesEnhanced from "@/modules/articles/pages/AdminArticlesEnhanced";
import AdminTeamEnhanced from "@/modules/team/pages/AdminTeamEnhanced";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ModalProvider>
            <DynamicThemeProvider>
              <DesignSystemProvider>
                <SEOManager />
                <GlobalTypography />
                <Toaster />
                <Sonner />
              <BrowserRouter>
              {/* Sidebar global - sempre visível quando autenticado */}
              <AdminSideMenu />
              
              <Routes>
          {/* Rota pública principal */}
          <Route path="/" element={
            <RootRedirect>
              <Index />
            </RootRedirect>
          } />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas públicas de artigos */}
          <Route path="/artigos" element={<AllArticles />} />
          <Route path="/artigo/:id" element={<ArticleView />} />
          
          {/* Rotas administrativas */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/artigos" element={
            <ProtectedRoute>
              <AdminArticlesEnhanced />
            </ProtectedRoute>
          } />
          <Route path="/admin/artigos/novo" element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/artigos/editar/:id" element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/leads" element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          } />
          <Route path="/admin/depoimentos" element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          } />
          <Route path="/admin/equipe" element={
            <ProtectedRoute>
              <AdminTeamEnhanced />
            </ProtectedRoute>
          } />
          <Route path="/admin/site-config" element={
            <ProtectedRoute>
              <AdminSiteConfig />
            </ProtectedRoute>
          } />
          <Route path="/admin/configuracoes" element={
            <ProtectedRoute>
              <AdminSiteConfig />
            </ProtectedRoute>
          } />
          <Route path="/demo/depoimentos" element={<TestimonialsDemo />} />
          <Route path="/demo/equipe" element={<TeamDemo />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
              </DesignSystemProvider>
            </DynamicThemeProvider>
          </ModalProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
  );
};

export default App;


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Rivalizer from "./pages/Rivalizer";
import AIRivalizer from "./pages/AIRivalizer";
import AICoach from "./pages/AICoach";
import Upload from "./pages/Upload";
import Rankings from "./pages/Rankings";
import Charts from "./pages/Charts";
import ProductionChecklist from "./pages/ProductionChecklist";
import Documentation from "./pages/Documentation";
import Preview from "./pages/Preview";
import PreviewChoice from "./pages/PreviewChoice";
import PreviewDashboard from "./pages/PreviewDashboard";
import PreviewCoach from "./pages/PreviewCoach";
import PreviewRivalizer from "./pages/PreviewRivalizer";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rules" element={<Documentation />} />
          
          {/* Preview routes */}
          <Route path="/preview" element={<Preview />} />
          <Route path="/preview-choice" element={<PreviewChoice />} />
          <Route path="/preview-dashboard" element={<PreviewDashboard />} />
          <Route path="/preview-coach" element={<PreviewCoach />} />
          <Route path="/preview-rivalizer" element={<PreviewRivalizer />} />
          
          {/* Development only route - remove in production */}
          {import.meta.env.DEV && (
            <Route path="/production-checklist" element={<ProductionChecklist />} />
          )}
          
          {/* Protected dashboard routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rivalizer" element={<Rivalizer />} />
            <Route path="/ai-rivalizer" element={<AIRivalizer />} />
            <Route path="/ai-coach" element={<AICoach />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/charts" element={<Charts />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

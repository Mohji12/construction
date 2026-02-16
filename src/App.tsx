import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import Residential from "./pages/products/Residential";
import Commercial from "./pages/products/Commercial";
import Industrial from "./pages/products/Industrial";
import Interior from "./pages/products/Interior";
import LandownerLayout from "./layouts/LandownerLayout";
import BuilderLayout from "./layouts/BuilderLayout";
import LandownerPage from "./pages/landowner/LandownerPage";
import LandownerDashboard from "./pages/landowner/LandownerDashboard";
import LandownerMyProjects from "./pages/landowner/LandownerMyProjects";
import LandownerContractConstruction from "./pages/landowner/LandownerContractConstruction";
import LandownerJointVenture from "./pages/landowner/LandownerJointVenture";
import LandownerInterior from "./pages/landowner/LandownerInterior";
import LandownerReconstruction from "./pages/landowner/LandownerReconstruction";
import BuilderPage from "./pages/builder/BuilderPage";
import BuilderDashboard from "./pages/builder/BuilderDashboard";
import BuilderMyProjects from "./pages/builder/BuilderMyProjects";
import BuilderMatches from "./pages/builder/BuilderMatches";
import BuilderContractConstruction from "./pages/builder/BuilderContractConstruction";
import BuilderJointVenture from "./pages/builder/BuilderJointVenture";
import BuilderInterior from "./pages/builder/BuilderInterior";
import BuilderReconstruction from "./pages/builder/BuilderReconstruction";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/legal-aid" element={<Legal />} />

          {/* Product pages */}
          <Route path="/products/residential" element={<Residential />} />
          <Route path="/products/commercial" element={<Commercial />} />
          <Route path="/products/industrial" element={<Industrial />} />
          <Route path="/products/interior" element={<Interior />} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />

          {/* Landowner space – separate interface with layout and all pages */}
          <Route path="/landowner" element={<LandownerLayout />}>
            <Route index element={<Navigate to="/landowner/options" replace />} />
            <Route
              path="options"
              element={
                <ProtectedRoute requiredUserType="landowner">
                  <LandownerPage />
                </ProtectedRoute>
              }
            />
            <Route path="dashboard" element={<LandownerDashboard />} />
            <Route path="my-projects" element={<LandownerMyProjects />} />
            <Route path="contract-construction" element={<LandownerContractConstruction />} />
            <Route path="joint-venture" element={<LandownerJointVenture />} />
            <Route path="interior" element={<LandownerInterior />} />
            <Route path="reconstruction" element={<LandownerReconstruction />} />
          </Route>

          {/* Builder / Construction interface – separate interface with layout and all pages */}
          <Route path="/builder" element={<BuilderLayout />}>
            <Route index element={<Navigate to="/builder/options" replace />} />
            <Route
              path="options"
              element={
                <ProtectedRoute requiredUserType="builder">
                  <BuilderPage />
                </ProtectedRoute>
              }
            />
            <Route path="dashboard" element={<BuilderDashboard />} />
            <Route path="my-projects" element={<BuilderMyProjects />} />
            <Route path="matches" element={<BuilderMatches />} />
            <Route path="contract-construction" element={<BuilderContractConstruction />} />
            <Route path="joint-venture" element={<BuilderJointVenture />} />
            <Route path="interior" element={<BuilderInterior />} />
            <Route path="reconstruction" element={<BuilderReconstruction />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { FloatingChatbot } from "@/components/FloatingChatbot";

import Index from "./pages/Index";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import WindTunnelDetails from "./pages/WindTunnelDetails";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

// Create AnimatedRoutes component to handle AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/services" element={<Services />} />
          <Route path="/wind-tunnel-details" element={<WindTunnelDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {/* Only show FloatingChatbot on non-services pages since Services page has its own */}
      {location.pathname !== '/services' && <FloatingChatbot />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

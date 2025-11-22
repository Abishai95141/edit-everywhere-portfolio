import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MatrixRain } from "@/components/MatrixRain";
import { VisionOverlay } from "@/components/VisionOverlay";
import { HiddenDesktop } from "@/components/HiddenDesktop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terminal from "./pages/Terminal";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

const SecretListener = () => {
  const navigate = useNavigate();
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      setBuffer(prev => {
        const newBuffer = (prev + e.key).slice(-7).toLowerCase();
        if (newBuffer === "secrets") {
          toast.success("🔓 Access Granted: Terminal Unlocked");
          navigate("/terminal");
          return "";
        }
        return newBuffer;
      });
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MatrixRain />
      <VisionOverlay />
      <HiddenDesktop />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SecretListener />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terminal" element={<Terminal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

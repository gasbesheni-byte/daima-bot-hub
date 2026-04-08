import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/Discover";
import Chats from "./pages/Chats";
import ChatConversation from "./pages/ChatConversation";
import Profile from "./pages/Profile";
import AppSettings from "./pages/AppSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-md min-h-screen bg-background">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<Discover />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chat/:chatId" element={<ChatConversation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<AppSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

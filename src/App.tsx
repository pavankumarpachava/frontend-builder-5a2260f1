import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChecklistView from "./pages/ChecklistView";
import Goals from "./pages/Goals";
import CalendarView from "./pages/CalendarView";
import TeamDirectory from "./pages/TeamDirectory";
import Mentor from "./pages/Mentor";
import Culture from "./pages/Culture";
import Resources from "./pages/Resources";
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Updates from "./pages/Updates";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          
          {/* Dashboard / Home */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Onboarding Group */}
          <Route path="/onboarding/checklist" element={<ChecklistView />} />
          <Route path="/onboarding/goals" element={<Goals />} />
          <Route path="/onboarding/calendar" element={<CalendarView />} />
          
          {/* People Group */}
          <Route path="/people/team" element={<TeamDirectory />} />
          <Route path="/people/mentor" element={<Mentor />} />
          <Route path="/people/culture" element={<Culture />} />
          
          {/* Training Group */}
          <Route path="/training/resources" element={<Resources />} />
          <Route path="/training/courses" element={<Courses />} />
          <Route path="/training/feedback" element={<Feedback />} />
          
          {/* Catch all - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

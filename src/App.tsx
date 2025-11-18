import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatbotWidget } from "@/components/ChatbotWidget";

// Pages
import Index from "./pages/Index";
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
import Team from "./pages/Team";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Updates from "./pages/Updates";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Documents from "./pages/Documents";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminModules from "./pages/AdminModules";
import AdminMentors from "./pages/AdminMentors";
import AdminAnalytics from "./pages/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/demo" element={<Demo />} />
          
          {/* Dashboard / Home */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/team" element={<Team />} />
          
          {/* Onboarding Group */}
          <Route path="/onboarding/checklist" element={<ChecklistView />} />
          <Route path="/onboarding/goals" element={<Goals />} />
          <Route path="/onboarding/calendar" element={<CalendarView />} />
          <Route path="/onboarding/team" element={<TeamDirectory />} />
          <Route path="/onboarding/resources" element={<Resources />} />
          
          {/* People Group */}
          <Route path="/people/team" element={<TeamDirectory />} />
          <Route path="/people/mentor" element={<Mentor />} />
          <Route path="/people/culture" element={<Culture />} />
          
          {/* Training Group */}
          <Route path="/training/resources" element={<Resources />} />
          <Route path="/training/courses" element={<Courses />} />
          <Route path="/training/feedback" element={<Feedback />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/modules" element={<AdminModules />} />
          <Route path="/admin/mentors" element={<AdminMentors />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          
          {/* Catch all - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, BookOpen, Calendar as CalendarIcon, Target, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiGetUser } from "@/lib/api";
import { ProgressWheel } from "@/components/ProgressWheel";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(() => {
    // Load completed tasks from localStorage on mount
    const saved = localStorage.getItem("completedOnboardingTasks");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUser();
    const handleStorageChange = (e: StorageEvent) => {
      const updatedUserData = localStorage.getItem("user");
      if (updatedUserData) setUser(JSON.parse(updatedUserData));
      
      // Listen for task completion changes
      if (e.key === "completedOnboardingTasks") {
        const saved = localStorage.getItem("completedOnboardingTasks");
        setCompletedTasks(saved ? new Set(JSON.parse(saved)) : new Set());
      }
    };
    window.addEventListener('storage', handleStorageChange as any);
    return () => window.removeEventListener('storage', handleStorageChange as any);
  }, []);

  const loadUser = async () => {
    const data = await apiGetUser();
    if (!data) { navigate("/login"); return; }
    setUser(data);
  };

  const checklistItems = [
    { id: 1, title: "Complete Your Profile", description: "Add your photo, bio, and contact details", icon: Users, duration: "5 min" },
    { id: 2, title: "Set Up Your Workspace", description: "Configure your development environment", icon: Target, duration: "15 min" },
    { id: 3, title: "Meet Your Team", description: "Schedule introductions with team members", icon: Users, duration: "30 min" },
    { id: 4, title: "Review Company Policies", description: "Read through our guidelines and procedures", icon: BookOpen, duration: "20 min" },
    { id: 5, title: "Schedule 1-on-1 with Manager", description: "Book your first check-in meeting", icon: CalendarIcon, duration: "10 min" },
  ];

  const upcomingTasks = [
    { title: "Team Introduction Meeting", time: "Today, 2:00 PM", icon: Users, action: () => navigate("/onboarding/calendar") },
    { title: "IT Setup Session", time: "Tomorrow, 10:00 AM", icon: Target, action: () => navigate("/onboarding/calendar") },
  ];

  const quickActions = [
    { title: "View Resources", icon: BookOpen, path: "/training/resources" },
    { title: "Team Directory", icon: Users, path: "/people/team" },
  ];

  const progress = (completedTasks.size / checklistItems.length) * 100;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollTo({ left: carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount), behavior: 'smooth' });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      <main className="flex-1 container px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{user.name}</span>! 👋</h1>
          <p className="text-muted-foreground">Here's your onboarding progress</p>
        </div>

        <Card className="glass-card border-white/20 hover-scale mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Your Onboarding Progress</CardTitle>
            <CardDescription>You're doing great! Keep it up.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ProgressWheel percentage={progress} />
            <p className="text-sm text-muted-foreground mt-6">{completedTasks.size} of {checklistItems.length} tasks completed</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" />Your Onboarding Checklist</CardTitle>
            <CardDescription>Complete these tasks to get started</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="relative px-12">
              <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {checklistItems.map((item, index) => {
                  const isCompleted = completedTasks.has(item.id);
                  return (
                    <motion.div key={item.id} className="flex-none w-80 snap-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.2 }}>
                      <Card className={`h-full cursor-pointer transition-all duration-300 ease-in-out border-2 transform-gpu ${isCompleted ? 'bg-muted/50 border-muted opacity-60' : 'glass-card border-white/20 hover:scale-[1.12] hover:shadow-2xl hover:shadow-primary/35 hover:border-primary/50 hover:z-10'}`} onClick={() => navigate(`/onboarding/task/${item.id}`)} style={{ transformOrigin: 'center', willChange: 'transform' }}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-primary/20' : 'bg-gradient-to-br from-primary to-accent'}`}>
                              <item.icon className={`h-6 w-6 ${isCompleted ? 'text-primary' : 'text-white'}`} />
                            </div>
                            {isCompleted && <Badge variant="secondary" className="bg-primary/10 text-primary"><CheckCircle className="h-3 w-3 mr-1" />Done</Badge>}
                          </div>
                          <h3 className={`font-semibold text-lg mb-2 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span>
                            {!isCompleted && <Button size="sm" variant="ghost" className="text-primary">Start<ArrowRight className="ml-1 h-3 w-3" /></Button>}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-xl hover:bg-background hover:scale-110 transition-transform" onClick={() => scrollCarousel('left')}><ChevronLeft className="h-6 w-6" /></Button>
              <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-xl hover:bg-background hover:scale-110 transition-transform" onClick={() => scrollCarousel('right')}><ChevronRight className="h-6 w-6" /></Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card border-white/20">
            <CardHeader><CardTitle className="text-xl flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-primary" />Upcoming</CardTitle></CardHeader>
            <CardContent><div className="space-y-4">{upcomingTasks.map((task, i) => <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer" onClick={task.action}><div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"><task.icon className="h-5 w-5 text-white" /></div><div className="flex-1"><h4 className="font-medium">{task.title}</h4><p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{task.time}</p></div><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>)}</div></CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Quick Actions</CardTitle></CardHeader>
            <CardContent><div className="space-y-3">{quickActions.map((action, i) => <Button key={i} variant="outline" className="w-full justify-start h-auto py-4 glass-card border-white/20 hover:border-primary/50 hover-scale" onClick={() => navigate(action.path)}><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"><action.icon className="h-5 w-5 text-white" /></div><span className="font-medium">{action.title}</span></div><ArrowRight className="ml-auto h-4 w-4" /></Button>)}</div></CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

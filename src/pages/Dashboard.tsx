import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Users, Target, Send, Sparkles } from "lucide-react";
import { apiAskAssistant } from "@/lib/api";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState(35);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    
    // Listen for storage changes to update user data
    const handleStorageChange = () => {
      const updatedUserData = localStorage.getItem("user");
      if (updatedUserData) {
        setUser(JSON.parse(updatedUserData));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const checklistItems = [
    { title: "Complete your profile", completed: true },
    { title: "Set up your workspace", completed: true },
    { title: "Meet your team", completed: false },
    { title: "Review company policies", completed: false },
    { title: "Schedule 1-on-1 with manager", completed: false },
  ];

  const upcomingTasks = [
    { title: "Team introduction meeting", time: "Today, 2:00 PM", link: "/onboarding/calendar" },
    { title: "IT setup session", time: "Tomorrow, 10:00 AM", link: "/onboarding/calendar" },
    { title: "Department orientation", time: "Friday, 9:00 AM", link: "/onboarding/calendar" },
  ];

  const handleAskAssistant = async () => {
    if (!aiQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiAskAssistant(aiQuestion);
      setAiAnswer(response.answer);
      toast.success("Response received!");
    } catch (error) {
      toast.error("Failed to get response");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to OnboardX, {user.name}! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">Let's get you set up and ready to succeed</p>
        </div>

        {/* Progress Overview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 border-2 border-blue-500/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-foreground">Your Onboarding Progress</h2>
              <p className="text-muted-foreground">You're doing great! Keep going.</p>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{progress}%</div>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Checklist - Netflix Style Cards */}
          <Card className="lg:col-span-2 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Onboarding Checklist</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/onboarding/checklist")}
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    item.completed
                      ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 opacity-75"
                      : "bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20 hover:border-primary/50"
                  } hover:scale-[1.12] hover:shadow-[0_0_25px_rgba(180,80,255,0.35)] hover:z-10`}
                  style={{
                    transformOrigin: 'center',
                    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, border-color 0.25s ease-in-out'
                  }}
                >
                  {/* Status Icon - Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    {item.completed ? (
                      <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <div className="bg-background/80 backdrop-blur-sm border-2 border-primary/40 rounded-full p-1.5 shadow-lg">
                        <div className="h-5 w-5 rounded-full border-2 border-primary" />
                      </div>
                    )}
                  </div>

                  {/* Completed Diagonal Slash */}
                  {item.completed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-1 bg-green-600/60 rotate-[-25deg] shadow-lg" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 pt-12">
                    <h3 className={`text-lg font-semibold mb-2 transition-all group-hover:text-primary ${
                      item.completed ? "text-muted-foreground" : "text-foreground"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.completed ? "Completed ✓" : "In Progress"}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6 h-fit">
          {/* Upcoming Tasks */}
          <Card className="p-6 h-fit hover:shadow-lg transition-shadow duration-300 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Upcoming</h3>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(task.link)}
                    className="w-full text-left pb-3 border-b border-border last:border-0 last:pb-0 hover:opacity-70 transition-opacity"
                  >
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
                  </button>
                ))}
              </div>
                <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate("/onboarding/calendar")}
              >
                <Clock className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 h-fit hover:shadow-lg transition-shadow duration-300 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/people/team")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Team Directory
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/goals")}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Set Your Goals
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
            onClick={() => navigate("/onboarding/checklist")}
          >
            <CheckCircle className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Checklist</h3>
            <p className="text-sm text-muted-foreground">Track your tasks</p>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
            onClick={() => navigate("/team")}
          >
            <Users className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold mb-1">Team</h3>
            <p className="text-sm text-muted-foreground">Meet your colleagues</p>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-blue-500/5 to-cyan-500/10 border-blue-500/20"
            onClick={() => navigate("/goals")}
          >
            <Target className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold mb-1">Goals</h3>
            <p className="text-sm text-muted-foreground">Set objectives</p>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-green-500/5 to-emerald-500/10 border-green-500/20"
            onClick={() => navigate("/resources")}
          >
            <Sparkles className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold mb-1">Resources</h3>
            <p className="text-sm text-muted-foreground">Learn & grow</p>
          </Card>
        </div>

        {/* AI Assistant */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 border-purple-500/20 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-semibold">Ask Your AI Assistant</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Get instant answers about onboarding, company policies, or anything else you need help with.
          </p>

          
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Ask any onboarding questions here..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAskAssistant();
                }
              }}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleAskAssistant} 
              disabled={isLoading}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {aiAnswer && (
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1 font-semibold">Response:</p>
              <p className="text-sm">{aiAnswer}</p>
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

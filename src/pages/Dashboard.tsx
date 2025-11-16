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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to OnboardX, {user.name}! 🎉</h1>
          <p className="text-lg text-muted-foreground">Let's get you set up and ready to succeed</p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 bg-gradient-primary text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Your Onboarding Progress</h2>
              <p className="opacity-90">You're doing great! Keep going.</p>
            </div>
            <div className="text-4xl font-bold">{progress}%</div>
          </div>
          <Progress value={progress} className="h-3 bg-white/20" />
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Checklist */}
          <Card className="lg:col-span-2 p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Onboarding Checklist</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/onboarding/checklist")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/onboarding/checklist")}
                >
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    item.completed 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground"
                  }`}>
                    {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                  </div>
                  <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6 h-fit">
            {/* Upcoming Tasks */}
            <Card className="p-6 h-fit">
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
            <Card className="p-6 h-fit">
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
                  onClick={() => navigate("/onboarding/goals")}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Set Your Goals
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* AI Assistant Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">Ask Our AI Assistant</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Ask any questions about your onboarding experience.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
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
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Ask
              </Button>
            </div>

            {aiAnswer && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Assistant Response:
                </h3>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm leading-relaxed">{aiAnswer}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

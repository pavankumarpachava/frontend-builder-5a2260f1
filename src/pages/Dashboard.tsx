import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rocket, CheckCircle, Clock, Users, Target, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const checklistItems = [
    { title: "Complete your profile", completed: true },
    { title: "Set up your workspace", completed: true },
    { title: "Meet your team", completed: false },
    { title: "Review company policies", completed: false },
    { title: "Schedule 1-on-1 with manager", completed: false },
  ];

  const upcomingTasks = [
    { title: "Team introduction meeting", time: "Today, 2:00 PM", link: "/calendar" },
    { title: "IT setup session", time: "Tomorrow, 10:00 AM", link: "/calendar" },
    { title: "Department orientation", time: "Friday, 9:00 AM", link: "/calendar" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              OnboardX
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Checklist */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Onboarding Checklist</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/checklist")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/checklist")}
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
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="p-6">
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
                onClick={() => navigate("/calendar")}
              >
                <Clock className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/team")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Team Directory
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set Your Goals
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

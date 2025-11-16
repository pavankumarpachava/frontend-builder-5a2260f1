import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Calendar } from "lucide-react";
import { apiGetGoals } from "@/lib/api";

interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  type: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const data = await apiGetGoals();
    setGoals(data);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "30-day": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "60-day": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "90-day": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Goals & Milestones</h1>
            <p className="text-muted-foreground">
              Track your 30/60/90 day onboarding goals
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold">
                    {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Goals List */}
          <div className="space-y-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{goal.title}</h3>
                      <Badge variant="outline" className={getTypeColor(goal.type)}>
                        {goal.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{goal.progress}%</p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                </div>
                
                <Progress value={goal.progress} className="h-3" />
                
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {goal.progress < 30 ? "Getting Started" : goal.progress < 70 ? "In Progress" : "Almost There"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Milestones Section */}
          <Card className="p-6 mt-8 bg-gradient-primary text-white border-0">
            <h2 className="text-2xl font-bold mb-4">Upcoming Milestones</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">30-Day Review</p>
                  <p className="text-sm opacity-90">February 1, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">60-Day Check-in</p>
                  <p className="text-sm opacity-90">March 1, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Goals;

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Users, BookOpen, TrendingUp, Plus } from "lucide-react";
import { toast } from "sonner";

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goalCategories = [
    {
      icon: Target,
      title: "Onboarding Setup",
      description: "Complete your workspace configuration and tool accounts",
      tasks: "Laptop setup, tool accounts, workspace configuration",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Users,
      title: "Team Integration",
      description: "Connect with your team and key stakeholders",
      tasks: "Meet your buddy, meet your manager, join Slack channels",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
    },
    {
      icon: BookOpen,
      title: "Learning Path",
      description: "Complete your training and certification requirements",
      tasks: "Training resources, courses, certifications",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
    },
    {
      icon: TrendingUp,
      title: "Performance Goals",
      description: "Set and achieve your milestone objectives",
      tasks: "30-day, 60-day, 90-day goals",
      gradient: "from-orange-500/10 to-rose-500/10",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/20",
    },
  ];

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Goal created successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-4xl font-bold mb-2">Your Goals</h1>
              <p className="text-lg opacity-90">
                Set, track, and achieve your onboarding objectives.
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Overall Progress</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">8</div>
                <p className="text-sm text-muted-foreground">Goals Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">5</div>
                <p className="text-sm text-muted-foreground">Goals In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-1">3</div>
                <p className="text-sm text-muted-foreground">Upcoming Goals</p>
              </div>
            </div>
            <Progress value={65} className="h-3" />
            <p className="text-center text-sm text-muted-foreground mt-2">65% Complete</p>
          </Card>

          {/* Goal Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Goal Categories</h2>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                      Set a new goal to track your progress and achievements.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateGoal} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Goal Title</Label>
                      <Input id="title" placeholder="Enter goal title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onboarding">Onboarding Setup</SelectItem>
                          <SelectItem value="team">Team Integration</SelectItem>
                          <SelectItem value="learning">Learning Path</SelectItem>
                          <SelectItem value="performance">Performance Goals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="due-date">Due Date</Label>
                        <Input id="due-date" type="date" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your goal..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Goal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goalCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={index}
                    className={`p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${category.gradient} ${category.borderColor} border backdrop-blur-sm animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 text-white`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <p className="text-xs text-muted-foreground mb-4 italic">
                      Tasks: {category.tasks}
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      View Details
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Goals;

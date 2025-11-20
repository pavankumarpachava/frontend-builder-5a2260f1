import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, ArrowLeft, Users, Target, BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const taskDetails = {
  1: {
    id: 1,
    title: "Complete Your Profile",
    description: "Add your photo, bio, and contact details",
    icon: Users,
    duration: "5 min",
    steps: [
      { id: 1, title: "Upload profile photo", description: "Add a professional headshot" },
      { id: 2, title: "Add bio", description: "Write a brief introduction about yourself" },
      { id: 3, title: "Update contact details", description: "Ensure your email and phone are correct" },
      { id: 4, title: "Set preferences", description: "Choose your notification and display preferences" },
    ]
  },
  2: {
    id: 2,
    title: "Set Up Your Workspace",
    description: "Configure your development environment",
    icon: Target,
    duration: "15 min",
    steps: [
      { id: 1, title: "Install required software", description: "Download and install development tools" },
      { id: 2, title: "Configure IDE", description: "Set up your preferred code editor" },
      { id: 3, title: "Clone repositories", description: "Access and clone necessary project repos" },
      { id: 4, title: "Test environment", description: "Run a test build to ensure everything works" },
    ]
  },
  3: {
    id: 3,
    title: "Meet Your Team",
    description: "Schedule introductions with team members",
    icon: Users,
    duration: "30 min",
    steps: [
      { id: 1, title: "Review team structure", description: "Learn about your team organization" },
      { id: 2, title: "Schedule 1-on-1s", description: "Book introduction meetings with key members" },
      { id: 3, title: "Join team channels", description: "Connect on Slack and other communication tools" },
      { id: 4, title: "Attend team standup", description: "Participate in your first team meeting" },
    ]
  },
  4: {
    id: 4,
    title: "Review Company Policies",
    description: "Read through our guidelines and procedures",
    icon: BookOpen,
    duration: "20 min",
    steps: [
      { id: 1, title: "Read employee handbook", description: "Familiarize yourself with company policies" },
      { id: 2, title: "Review code of conduct", description: "Understand behavioral expectations" },
      { id: 3, title: "Learn security protocols", description: "Know how to handle sensitive information" },
      { id: 4, title: "Acknowledge policies", description: "Sign off on policy acknowledgment" },
    ]
  },
  5: {
    id: 5,
    title: "Schedule 1-on-1 with Manager",
    description: "Book your first check-in meeting",
    icon: CalendarIcon,
    duration: "10 min",
    steps: [
      { id: 1, title: "Find manager's calendar", description: "Access your manager's scheduling link" },
      { id: 2, title: "Choose meeting time", description: "Pick a convenient slot for both" },
      { id: 3, title: "Add to your calendar", description: "Ensure the meeting is on your schedule" },
      { id: 4, title: "Prepare questions", description: "Note down topics to discuss" },
    ]
  },
};

const OnboardingTaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isFinishing, setIsFinishing] = useState(false);

  const task = taskDetails[parseInt(taskId || "1") as keyof typeof taskDetails];
  
  if (!task) {
    navigate("/dashboard");
    return null;
  }

  const IconComponent = task.icon;
  const progress = (completedSteps.size / task.steps.length) * 100;
  const allStepsComplete = completedSteps.size === task.steps.length;

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
        if (newSet.size === task.steps.length) {
          toast.success("All steps completed! 🎉");
        }
      }
      return newSet;
    });
  };

  const handleFinish = () => {
    if (!allStepsComplete) {
      toast.error("Please complete all steps first");
      return;
    }

    setIsFinishing(true);
    
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
      });
    }, 250);

    toast.success("Task completed! Great job! 🎉");
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      <main className="flex-1 container px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6 hover-scale"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card border-white/20 mb-6">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{task.title}</CardTitle>
                  <CardDescription className="text-base">{task.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{task.duration}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{completedSteps.size} of {task.steps.length} steps</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Steps to Complete</CardTitle>
              <CardDescription>Check off each step as you complete it</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {task.steps.map((step, index) => {
                  const isCompleted = completedSteps.has(step.id);
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 border-2 ${
                          isCompleted 
                            ? 'bg-primary/5 border-primary/30' 
                            : 'glass-card border-white/20 hover:border-primary/50 hover-scale'
                        }`}
                        onClick={() => toggleStep(step.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isCompleted 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <span className="text-sm font-semibold">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-semibold mb-1 ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                                {step.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center"
              >
                <Button
                  size="lg"
                  onClick={handleFinish}
                  disabled={!allStepsComplete || isFinishing}
                  className={`min-w-[200px] transition-all duration-300 ${
                    allStepsComplete 
                      ? 'bg-gradient-to-r from-primary to-accent hover:scale-105 shadow-lg shadow-primary/50' 
                      : ''
                  }`}
                >
                  {isFinishing ? (
                    <>Finishing...</>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Finish Task
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingTaskDetail;

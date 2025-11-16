import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Rocket, Users, CheckCircle, Calendar, Target, MessageSquare } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Checklists",
      description: "AI-powered onboarding tasks tailored to your role",
    },
    {
      icon: Users,
      title: "Mentor Matching",
      description: "Connect with experienced team members instantly",
    },
    {
      icon: Calendar,
      title: "Timeline Tracking",
      description: "Visual progress through your onboarding journey",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Define and track your first 90-day objectives",
    },
    {
      icon: MessageSquare,
      title: "Real-time Feedback",
      description: "Continuous support and guidance from your team",
    },
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get productive from day one with guided workflows",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              OnboardX
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} className="bg-gradient-primary hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Transform Your Employee Onboarding
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The smart onboarding platform that gets new hires productive faster with AI-powered guidance and personalized workflows.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 shadow-glow"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground">Powerful features designed for modern employee onboarding</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 text-center bg-gradient-primary text-white border-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Onboarding?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies creating exceptional onboarding experiences
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
          >
            Get Started Now
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 OnboardX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

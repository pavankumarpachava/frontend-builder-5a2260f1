import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Sparkles, 
  Route, 
  CheckSquare, 
  FileText, 
  Users, 
  BookOpen, 
  BarChart3, 
  Plug,
  Zap,
  Heart,
  Target
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: Sparkles,
      title: "Smart AI Assistant",
      description: "Answers onboarding questions instantly with intelligent, context-aware responses"
    },
    {
      icon: Route,
      title: "Personalized Learning Paths",
      description: "Auto-generated based on role, team, and skill level for optimal growth"
    },
    {
      icon: CheckSquare,
      title: "Automated Task Tracking",
      description: "Checklist, deadlines, and reminders keep everyone on track"
    },
    {
      icon: FileText,
      title: "Role-Based Content Delivery",
      description: "Company culture, policies, and training modules tailored to each position"
    },
    {
      icon: Users,
      title: "Mentor & Buddy Matching",
      description: "Smart pairing system connects new hires with the perfect mentors"
    },
    {
      icon: BookOpen,
      title: "Team Directory",
      description: "Beautiful profile cards with contact info and expertise areas"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track progress and engagement with real-time insights"
    },
    {
      icon: Plug,
      title: "Seamless Integrations",
      description: "Connect with Google, Slack, and your favorite HR tools"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Faster Ramp-up",
      description: "Reduce time-to-productivity by 40% with structured onboarding"
    },
    {
      icon: Heart,
      title: "Higher Job Satisfaction",
      description: "New hires feel supported and engaged from day one"
    },
    {
      icon: Target,
      title: "Consistent Experience",
      description: "Deliver the same high-quality onboarding to every employee"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Discover What OnboardX Can Do For You
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A powerful AI-driven onboarding platform built to help new hires succeed from Day 1
            </p>
            <Button 
              size="lg" 
              className="mt-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 text-foreground hover:scale-105"
              asChild
            >
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="container px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Core Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need for exceptional onboarding</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why OnboardX Section */}
        <section className="container px-4 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why OnboardX?</h2>
            <p className="text-muted-foreground text-lg">Transform your onboarding process</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="space-y-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-20">
          <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your Onboarding?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of companies using OnboardX to create exceptional first experiences
              </p>
              <Button 
                size="lg" 
                className="mt-4 bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/signup">Start Your Journey</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;

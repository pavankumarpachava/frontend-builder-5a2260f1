import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Rocket, Users, CheckCircle, Calendar, Target, MessageSquare, Zap, TrendingUp, Award, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav 
        className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Rocket className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">
              OnboardX
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")} className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} className="bg-white text-primary hover:bg-white/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Mesh Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-90"></div>
        <div className="absolute inset-0 bg-background/30 backdrop-blur-3xl"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-sm text-primary mb-4">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Revolutionize Your Onboarding Process</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
              Welcome New Hires.<br />
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Accelerate Success.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              OnboardX is the intelligent onboarding platform that transforms confused first days into confident careers. Get new employees productive 3x faster with AI-guided workflows, smart mentorship matching, and personalized learning paths.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 h-auto font-semibold shadow-xl group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-6 h-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
              >
                See How It Works
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">3x</div>
                <div className="text-white/70 text-sm md:text-base">Faster Productivity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">87%</div>
                <div className="text-white/70 text-sm md:text-base">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">2K+</div>
                <div className="text-white/70 text-sm md:text-base">Companies Trust Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How OnboardX Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From day one to day ninety, we guide every step of the onboarding journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center bg-card border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Smart Checklists</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered task lists personalized to each role, ensuring nothing falls through the cracks
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Mentor Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect new hires with experienced team members instantly for guidance and support
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visual dashboards and milestones keep everyone aligned on the onboarding journey
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6">
              <Award className="h-4 w-4" />
              <span className="font-medium">Complete Onboarding Suite</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make employee onboarding seamless and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card group"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ocean opacity-90"></div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-2xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your Onboarding?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Join 2,000+ companies creating exceptional onboarding experiences that drive real results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 h-auto font-semibold shadow-xl group"
              >
                Start Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 h-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
              >
                Schedule a Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-white/70 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="border-t border-white/10 py-8"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
      >
        <div className="container mx-auto px-6 text-center text-white">
          <p>© 2024 OnboardX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

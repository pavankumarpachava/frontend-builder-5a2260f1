import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  Target, 
  MessageSquare,
  BookOpen,
  BarChart3,
  Zap,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      id: 1,
      title: "Smart Onboarding Dashboard",
      description: "New hires land on a personalized dashboard showing their progress, upcoming tasks, and key contacts. Everything they need is in one place.",
      icon: BarChart3,
      features: [
        "Real-time progress tracking",
        "Personalized task list",
        "Quick access to mentors",
        "Upcoming events calendar"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "AI-Powered Assistant",
      description: "Get instant answers to onboarding questions 24/7. Our AI assistant understands company policies, procedures, and culture to provide accurate, helpful responses.",
      icon: MessageSquare,
      features: [
        "Instant answers to questions",
        "Context-aware responses",
        "Multi-language support",
        "Learning from interactions"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Automated Checklists",
      description: "Role-specific tasks automatically generated and tracked. New hires always know what's next, with smart reminders and deadline management.",
      icon: CheckCircle,
      features: [
        "Auto-generated task lists",
        "Smart deadline tracking",
        "Progress notifications",
        "Department-specific items"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Mentor Matching",
      description: "Intelligent pairing connects new hires with experienced team members based on role, interests, and availability for seamless knowledge transfer.",
      icon: Users,
      features: [
        "Smart mentor pairing",
        "Scheduling integration",
        "Chat and video calls",
        "Progress tracking"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      title: "Learning Paths",
      description: "Personalized training modules and resources tailored to each role, ensuring new hires gain the right skills at the right pace.",
      icon: BookOpen,
      features: [
        "Role-based curriculum",
        "Interactive modules",
        "Progress tracking",
        "Certification badges"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      title: "Analytics & Insights",
      description: "Track engagement, measure time-to-productivity, and identify bottlenecks with comprehensive analytics dashboards for HR teams.",
      icon: Target,
      features: [
        "Engagement metrics",
        "Time-to-productivity tracking",
        "Custom reports",
        "Trend analysis"
      ],
      color: "from-pink-500 to-rose-600"
    }
  ];

  const benefits = [
    {
      stat: "40%",
      label: "Faster Onboarding",
      description: "New hires reach full productivity faster with structured guidance"
    },
    {
      stat: "87%",
      label: "Satisfaction Rate",
      description: "New employees feel supported and engaged from day one"
    },
    {
      stat: "60%",
      label: "Time Saved",
      description: "HR teams save hours on manual onboarding administration"
    },
    {
      stat: "3x",
      label: "Better Retention",
      description: "Improved first-year retention with positive onboarding experiences"
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentDemo = demoSteps[currentStep];
  const Icon = currentDemo.icon;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0 px-6 py-2">
              <Play className="h-4 w-4 mr-2 inline" />
              Interactive Demo
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              See OnboardX in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take an interactive tour of our platform and discover how OnboardX transforms 
              the onboarding experience for new hires and HR teams alike
            </p>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="container px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <Card className="p-8 md:p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Step {currentStep + 1} of {demoSteps.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {Math.round(((currentStep + 1) / demoSteps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between mb-12 overflow-x-auto pb-4">
                {demoSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`flex flex-col items-center gap-2 min-w-[80px] transition-all duration-300 ${
                        index === currentStep 
                          ? 'scale-110' 
                          : index < currentStep 
                            ? 'opacity-70' 
                            : 'opacity-40'
                      }`}
                    >
                      <div className={`h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        index === currentStep
                          ? `bg-gradient-to-br ${step.color} shadow-lg`
                          : index < currentStep
                            ? 'bg-primary/20'
                            : 'bg-muted'
                      }`}>
                        <StepIcon className={`h-6 w-6 ${
                          index === currentStep || index < currentStep ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <span className={`text-xs font-medium text-center ${
                        index === currentStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Current Step Content */}
              <div className="space-y-8 animate-fade-in">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                  <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${currentDemo.color} flex items-center justify-center mx-auto shadow-2xl`}>
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">{currentDemo.title}</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    {currentDemo.description}
                  </p>
                </div>

                {/* Screenshot Placeholder */}
                <div className="relative">
                  <div className={`aspect-video rounded-xl bg-gradient-to-br ${currentDemo.color} p-1 shadow-2xl`}>
                    <div className="h-full w-full rounded-lg bg-background/95 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <Icon className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                        <p className="text-sm text-muted-foreground">
                          Interactive Demo: {currentDemo.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {currentDemo.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  size="lg"
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm text-foreground border-2 hover:bg-white/80 dark:hover:bg-gray-900/80"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </Button>

                {currentStep === demoSteps.length - 1 ? (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Schedule a Demo
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Next Step
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container px-4 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Real Results, Real Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how OnboardX delivers measurable improvements to your onboarding process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="space-y-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {benefit.stat}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{benefit.label}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-20">
          <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-foreground">Ready to See More?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Schedule a personalized demo with our team and discover how OnboardX 
                can transform your company's onboarding experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 py-6 h-auto text-lg"
                >
                  Schedule a Demo
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm text-foreground border-2 hover:bg-white/80 dark:hover:bg-gray-900/80 px-8 py-6 h-auto text-lg font-semibold"
                >
                  Start Free Trial
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;

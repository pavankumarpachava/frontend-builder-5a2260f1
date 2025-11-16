import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Sparkles, Users, LayoutDashboard, CheckSquare } from "lucide-react";

const Updates = () => {
  const updates = [
    {
      date: "January 2025",
      icon: Sparkles,
      title: "AI Assistant Upgrade",
      features: [
        "Faster response time",
        "More accurate onboarding answers",
        "Improved role-based knowledge"
      ]
    },
    {
      date: "December 2024",
      icon: Users,
      title: "New Team Directory",
      features: [
        "Photo cards",
        "Search & filters",
        "Peer contact shortcuts"
      ]
    },
    {
      date: "November 2024",
      icon: LayoutDashboard,
      title: "Dashboard Redesign",
      features: [
        "Clean layout",
        "Progress tracking improvements",
        "Faster load time"
      ]
    },
    {
      date: "October 2024",
      icon: CheckSquare,
      title: "Checklist Automation",
      features: [
        "Auto reminders",
        "Smart due date suggestions"
      ]
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
              Product Updates & Improvements
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what's new in OnboardX — we ship features fast to help you onboard faster.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button 
                size="lg" 
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 text-primary hover:text-primary/80 font-semibold hover:scale-105"
              >
                Subscribe to Updates
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-primary hover:text-primary/80 font-semibold hover:scale-105"
                asChild
              >
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Updates Timeline */}
        <section className="container px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            {updates.map((update, index) => {
              const Icon = update.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {update.date}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-semibold">
                          NEW
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{update.title}</h3>
                      <ul className="space-y-2">
                        {update.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="container px-4 py-20">
          <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 max-w-3xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Get Notified About New Features</h2>
              <p className="text-lg text-muted-foreground">
                Stay up to date with the latest improvements and new features we launch.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 text-foreground placeholder:text-muted-foreground"
                />
                <Button 
                  className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Subscribe
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

export default Updates;

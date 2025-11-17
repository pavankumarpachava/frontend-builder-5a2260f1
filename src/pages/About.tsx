import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Rocket, Heart, Zap, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're on a mission to make onboarding seamless and effective for every new hire"
    },
    {
      icon: Users,
      title: "People-First",
      description: "Every feature we build puts the human experience at the center"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries with AI and modern technology"
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding the challenges new employees face on day one"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former HR leader with 15+ years of experience revolutionizing employee experiences",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher and engineer passionate about building intuitive solutions",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Product visionary focused on creating delightful user experiences",
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Head of Design",
      bio: "Design leader crafting beautiful and accessible interfaces",
      avatar: "DK"
    }
  ];

  const stats = [
    { number: "2K+", label: "Companies" },
    { number: "50K+", label: "New Hires Onboarded" },
    { number: "87%", label: "Satisfaction Rate" },
    { number: "3x", label: "Faster Productivity" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              About OnboardX
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Transforming How Companies Welcome New Talent
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe that great onboarding experiences lead to engaged employees, 
              stronger teams, and thriving companies. That's why we built OnboardX.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="p-6 text-center bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="container px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  OnboardX was born from a simple observation: most companies struggle to provide 
                  consistent, engaging onboarding experiences. New hires often feel lost, overwhelmed, 
                  and disconnected during their first weeks.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We set out to change that. By combining AI technology with human-centered design, 
                  we created a platform that guides new employees through every step of their journey—
                  from paperwork to productivity, from confusion to confidence.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we're proud to serve thousands of companies worldwide, helping them create 
                  onboarding experiences that new hires love and remember.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="container px-4 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="container px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind OnboardX, dedicated to making onboarding better for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
              >
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us Section */}
        <section className="container px-4 py-20">
          <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-foreground">Join Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're always looking for talented people who share our passion for 
                creating exceptional employee experiences
              </p>
              <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-6 py-2 text-base">
                careers@onboardx.com
              </Badge>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Rocket, 
  FileText, 
  BookOpen, 
  User, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";

const HelpCenter = () => {
  const categories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Learn the basics of OnboardX"
    },
    {
      icon: FileText,
      title: "Company Policies",
      description: "Access important policies & guidelines"
    },
    {
      icon: BookOpen,
      title: "Training & Resources",
      description: "Find courses and learning materials"
    },
    {
      icon: User,
      title: "Account & Login",
      description: "Manage your account settings"
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get help using the AI features"
    },
    {
      icon: AlertCircle,
      title: "Troubleshooting",
      description: "Solve common technical issues"
    }
  ];

  const faqs = [
    {
      question: "How do I track my onboarding progress?",
      answer: "Navigate to your Dashboard to see your onboarding progress. You'll find a visual progress bar showing completed tasks, upcoming milestones, and your overall completion percentage. The Checklist view provides a detailed breakdown of all tasks."
    },
    {
      question: "How do I contact my mentor or buddy?",
      answer: "Go to the Team Directory or Mentor page to find your assigned mentor's contact information. You can send them a message directly through the platform or use their email/phone details listed on their profile card."
    },
    {
      question: "Where do I find my role-based learning path?",
      answer: "Your personalized learning path is available in the Training section. Click on 'Courses' to see modules specifically curated for your role. The AI assistant has automatically generated these based on your position and team."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on the profile icon in the top right corner, select Settings, then navigate to the Security tab. Click 'Change Password' and follow the prompts. If you're locked out, use the 'Forgot Password' link on the login page."
    },
    {
      question: "How does the AI assistant work?",
      answer: "The AI assistant uses advanced natural language processing to understand your questions about onboarding, company policies, and procedures. Simply type your question in natural language, and it will provide accurate, context-aware answers based on your role and company documentation."
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
              Help Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or reach out if you need assistance.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">Select a topic to explore helpful articles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Questions Section */}
        <section className="container px-4 py-12 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to common questions</p>
            </div>

            <Card className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Contact CTA */}
            <div className="text-center mt-12">
              <Card className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;

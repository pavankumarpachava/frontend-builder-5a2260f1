import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Clock, Globe } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "pavankumarpachava@gmail.com"
    },
    {
      icon: Clock,
      title: "Support Hours",
      detail: "Monday–Friday, 9 AM – 6 PM EST"
    },
    {
      icon: Globe,
      title: "Response Time",
      detail: "Usually within 24 hours"
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
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reach out anytime — our team responds fast.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.detail}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container px-4 py-12 pb-20">
          <Card className="p-8 md:p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon.</p>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your name"
                    className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

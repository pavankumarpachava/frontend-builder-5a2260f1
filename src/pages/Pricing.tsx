import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$9",
      period: "/ month",
      description: "Perfect for small teams getting started",
      features: [
        "Basic onboarding checklist",
        "Access to AI assistant (limited)",
        "Team directory",
        "Basic training modules",
        "Email support"
      ],
      cta: "Choose Starter",
      highlighted: false,
      link: "/signup"
    },
    {
      name: "Pro",
      price: "$19",
      period: "/ month",
      description: "Most popular for growing teams",
      features: [
        "Everything in Starter",
        "Unlimited AI assistance",
        "Custom learning paths",
        "Progress analytics",
        "Role-based resources",
        "Mentor matching system",
        "Priority support"
      ],
      cta: "Choose Pro",
      highlighted: true,
      link: "/signup"
    },
    {
      name: "Enterprise",
      price: "Contact Sales",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "All Pro features",
        "SSO / OAuth enterprise login",
        "Custom integrations",
        "Dedicated success manager",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      highlighted: false,
      link: "/dashboard"
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="container px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index}
                className={`p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative ${
                  tier.highlighted 
                    ? 'border-primary/50 ring-2 ring-primary/20' 
                    : 'border-white/20'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-muted-foreground">{tier.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full mt-6 ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl'
                        : 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 text-foreground hover:bg-white/60 dark:hover:bg-gray-900/60'
                    } transition-all duration-300 hover:scale-105`}
                    size="lg"
                    asChild
                  >
                    <Link to={tier.link}>{tier.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ / Additional Info Section */}
        <section className="container px-4 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl text-left">
                <h3 className="font-semibold text-foreground mb-2">Can I change plans later?</h3>
                <p className="text-sm text-muted-foreground">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </Card>
              
              <Card className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl text-left">
                <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-sm text-muted-foreground">Absolutely! All plans come with a 14-day free trial. No credit card required.</p>
              </Card>
              
              <Card className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl text-left">
                <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-muted-foreground">We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.</p>
              </Card>
              
              <Card className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-xl text-left">
                <h3 className="font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
                <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. No questions asked.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container px-4 py-20">
          <Card className="p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Still Have Questions?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our team is here to help you find the perfect plan for your needs
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-white/20 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300"
                  asChild
                >
                  <Link to="/dashboard">Contact Sales</Link>
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

export default Pricing;

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Flag, 
  MessageCircle, 
  Laptop, 
  GraduationCap, 
  Heart,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Culture = () => {
  const resources = [
    {
      icon: FileText,
      title: "Employee Handbook",
      description: "Policies and guidelines for all employees.",
      color: "from-blue-500/20 to-blue-500/5",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500"
    },
    {
      icon: Flag,
      title: "Company Mission & Vision",
      description: "Learn about the company's purpose and long-term vision.",
      color: "from-purple-500/20 to-purple-500/5",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500"
    },
    {
      icon: MessageCircle,
      title: "Communication Guidelines",
      description: "Best practices for clear, inclusive communication.",
      color: "from-green-500/20 to-green-500/5",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      icon: Laptop,
      title: "Remote Work Guide",
      description: "Expectations and setup tips for remote employees.",
      color: "from-orange-500/20 to-orange-500/5",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Grow your skills with our learning programs.",
      color: "from-pink-500/20 to-pink-500/5",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500"
    },
    {
      icon: Heart,
      title: "Wellness Programs",
      description: "Mental and physical wellness resources.",
      color: "from-red-500/20 to-red-500/5",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500"
    }
  ];

  const handleViewResource = (resourceName: string) => {
    console.log("Opening resource:", resourceName);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Company Culture</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-mesh bg-clip-text text-transparent">
              Culture Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our company values, policies, and resources to help you thrive in our culture
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className={`group p-8 bg-gradient-to-br ${resource.color} border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`h-16 w-16 rounded-2xl ${resource.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <resource.icon className={`h-8 w-8 ${resource.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Button 
                    className="w-full group/btn shadow-md hover:shadow-xl transition-all"
                    onClick={() => handleViewResource(resource.title)}
                  >
                    View Resource
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Questions About Our Culture?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our HR team is here to help you understand and embrace our company culture
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="shadow-lg backdrop-blur-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact HR
                </Button>
                <Button size="lg" variant="outline" className="shadow-lg backdrop-blur-sm bg-white/10 hover:bg-white/20">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Handbook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;

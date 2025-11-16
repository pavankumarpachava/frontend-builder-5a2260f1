import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Heart, Users, Lightbulb, Award, Calendar } from "lucide-react";
import { apiGetCultureInfo } from "@/lib/api";

const Culture = () => {
  const [cultureData, setCultureData] = useState<any>(null);

  useEffect(() => {
    loadCulture();
  }, []);

  const loadCulture = async () => {
    const data = await apiGetCultureInfo();
    setCultureData(data);
  };

  if (!cultureData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Company Culture</h1>
            <p className="text-muted-foreground">
              Learn about our values, traditions, and what makes us unique
            </p>
          </div>

          {/* Hero Card */}
          <Card className="p-8 mb-8 bg-gradient-primary text-white border-0">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="h-10 w-10" />
              <h2 className="text-3xl font-bold">Welcome to Our Culture</h2>
            </div>
            <p className="text-lg opacity-90">
              We believe in creating an environment where everyone can thrive, innovate,
              and make a meaningful impact. Here's what defines us.
            </p>
          </Card>

          {/* Core Values */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cultureData.values.map((value: any, index: number) => (
                <Card key={index} className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {index === 0 && <Lightbulb className="h-6 w-6 text-primary" />}
                    {index === 1 && <Users className="h-6 w-6 text-primary" />}
                    {index === 2 && <Award className="h-6 w-6 text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Traditions & Events */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Our Traditions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cultureData.traditions.map((tradition: any, index: number) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{tradition.title}</h3>
                      <p className="text-muted-foreground">{tradition.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Work Environment */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary">Collaboration</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Open communication channels</li>
                  <li>• Regular team meetings and demos</li>
                  <li>• Cross-functional project work</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Growth</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Learning and development opportunities</li>
                  <li>• Mentorship programs</li>
                  <li>• Conference and training budgets</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Work-Life Balance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Flexible working hours</li>
                  <li>• Remote work options</li>
                  <li>• Generous PTO policy</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Innovation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hackathons and innovation days</li>
                  <li>• Support for new ideas</li>
                  <li>• Latest tools and technologies</li>
                </ul>
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

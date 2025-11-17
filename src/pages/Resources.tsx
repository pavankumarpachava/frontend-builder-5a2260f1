import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, FileText, MessageSquare, Download, Search } from "lucide-react";
import { toast } from "sonner";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Training Resources",
      description: "Access tutorials, company workflows, and onboarding videos",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Video,
      title: "Courses / Videos",
      description: "Watch internal training videos and recorded sessions",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
    },
    {
      icon: FileText,
      title: "Documents Library",
      description: "Browse policies, HR docs, handbooks, and process documents",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
    },
    {
      icon: MessageSquare,
      title: "Feedback Center",
      description: "Submit feedback, questions, and suggestions to the team",
      gradient: "from-orange-500/10 to-rose-500/10",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/20",
    },
  ];

  const documents = [
    { title: "Employee Handbook", type: "PDF", icon: FileText },
    { title: "Onboarding Checklist", type: "PDF", icon: FileText },
    { title: "IT Setup Guide", type: "Document", icon: FileText },
    { title: "Remote Work Guide", type: "Document", icon: FileText },
    { title: "Company Culture Guide", type: "Document", icon: BookOpen },
  ];

  const handleDownload = (docTitle: string) => {
    toast.success(`Downloading ${docTitle}...`);
  };

  const handleOpenResource = (title: string) => {
    toast.info(`Opening ${title}...`);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-4xl font-bold mb-2">Learning Resources</h1>
              <p className="text-lg opacity-90">
                Access training materials, guides, and key documents.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <Card className="p-4 mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </Card>

          {/* Resource Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Resource Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourceCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={index}
                    className={`p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${category.gradient} ${category.borderColor} border backdrop-blur-sm animate-fade-in cursor-pointer`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleOpenResource(category.title)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 text-white`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <Button variant="outline" className="w-full" size="sm">
                      Open
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Documents Library */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Documents Library</h2>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <div className="space-y-3">
                {documents.map((doc, index) => {
                  const Icon = doc.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(doc.title)}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;

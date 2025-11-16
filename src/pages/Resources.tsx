import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MessageSquare, 
  FolderKanban, 
  Building2, 
  FolderOpen,
  FileText,
  Download,
  Target,
  BookOpen,
  ExternalLink,
  CheckCircle,
  Clock
} from "lucide-react";
import { 
  apiDownloadEmployeeHandbook, 
  apiDownloadOnboardingChecklist, 
  apiDownloadGoalTemplate 
} from "@/lib/api";
import { toast } from "sonner";

const Resources = () => {
  const handleDownload = async (downloadFn: () => Promise<void>, fileName: string) => {
    try {
      await downloadFn();
      toast.success(`Downloading ${fileName}...`);
    } catch (error) {
      toast.error("Download failed. Please try again.");
    }
  };

  const tools = [
    {
      icon: Mail,
      title: "Email & Calendar",
      description: "Access your company email and manage your schedule",
      status: "Active",
      url: "#"
    },
    {
      icon: MessageSquare,
      title: "Slack",
      description: "Join team channels and start collaborating",
      status: "Active",
      url: "#"
    },
    {
      icon: FolderKanban,
      title: "Project Management",
      description: "Track tasks and project progress",
      status: "Active",
      url: "#"
    },
    {
      icon: Building2,
      title: "HR Portal",
      description: "Access HR documents and employee benefits",
      status: "Pending Setup",
      url: "#"
    },
    {
      icon: FolderOpen,
      title: "Document Storage",
      description: "Store and share files with your team",
      status: "Active",
      url: "#"
    }
  ];

  const quickLinks = [
    "Department Wiki",
    "Team Drive",
    "Project Templates",
    "Best Practices Guide",
    "FAQ & Troubleshooting"
  ];

  const downloads = [
    {
      icon: FileText,
      title: "Employee Handbook",
      subtitle: "PDF",
      downloadFn: apiDownloadEmployeeHandbook
    },
    {
      icon: CheckCircle,
      title: "Onboarding Checklist",
      subtitle: "PDF",
      downloadFn: apiDownloadOnboardingChecklist
    },
    {
      icon: Target,
      title: "Goal Setting Template",
      subtitle: "PDF",
      downloadFn: apiDownloadGoalTemplate
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Training Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your new role - tools, guides, and essential documents
            </p>
          </div>

          {/* Essential Tools Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <FolderKanban className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Essential Tools</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant={tool.status === "Active" ? "default" : "secondary"}
                      className={tool.status === "Active" ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
                    >
                      {tool.status === "Active" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {tool.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <Button 
                    className="w-full group" 
                    variant="outline"
                    onClick={() => toast.info(`Opening ${tool.title}...`)}
                  >
                    Open Tool
                    <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-sunset flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Quick Links</h2>
            </div>
            
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
              <ul className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg group cursor-pointer">
                    <div className="h-2 w-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                    <span className="group-hover:text-primary transition-colors font-medium">{link}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Downloads Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-mesh flex items-center justify-center">
                <Download className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Downloads</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {downloads.map((download, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-ocean flex items-center justify-center shadow-lg">
                      <download.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{download.title}</h3>
                      <p className="text-sm text-muted-foreground">{download.subtitle}</p>
                    </div>
                    <Button 
                      className="w-full shadow-md hover:shadow-xl transition-shadow"
                      onClick={() => handleDownload(download.downloadFn, download.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Role-Specific Resources Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Resources by Role</h2>
            </div>
            
            <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
              <div className="space-y-8">
                {/* Role Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Resources for Data Analyst</h3>
                    <p className="text-muted-foreground">Curated learning materials for your role</p>
                  </div>
                  <Button size="lg" className="shadow-lg hover:shadow-xl">
                    <Target className="h-4 w-4 mr-2" />
                    Generate Personalized Learning Path
                  </Button>
                </div>

                {/* Tools for Role */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">Essential Tools</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tools.slice(0, 4).map((tool, index) => (
                      <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <tool.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold">{tool.title}</h5>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Links for Role */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {quickLinks.slice(0, 4).map((link, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="hover:text-primary transition-colors cursor-pointer">{link}</span>
                      </div>
                    ))}
                  </div>
                </div>
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

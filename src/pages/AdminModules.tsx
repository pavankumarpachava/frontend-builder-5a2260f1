import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, FileText, Video, Link as LinkIcon, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  title: string;
  description: string;
  resources: number;
  category: string;
}

interface Resource {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Link";
  moduleId: string;
}

const AdminModules = () => {
  const { toast } = useToast();
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Welcome & Company Overview",
      description: "Introduction to company culture, mission, and values",
      resources: 5,
      category: "Onboarding",
    },
    {
      id: "2",
      title: "Tools & Technology Setup",
      description: "Setting up your development environment and tools",
      resources: 8,
      category: "Technical",
    },
    {
      id: "3",
      title: "Team Structure & Processes",
      description: "Understanding team workflows and communication",
      resources: 6,
      category: "Team",
    },
    {
      id: "4",
      title: "First Project Guidelines",
      description: "Best practices for your initial project tasks",
      resources: 4,
      category: "Projects",
    },
  ]);

  const [resources, setResources] = useState<Resource[]>([
    { id: "1", title: "Employee Handbook", type: "PDF", moduleId: "1" },
    { id: "2", title: "Company Vision Video", type: "Video", moduleId: "1" },
    { id: "3", title: "Development Environment Setup", type: "PDF", moduleId: "2" },
    { id: "4", title: "Slack Communication Guide", type: "Link", moduleId: "3" },
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      case "Link":
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleDeleteModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
    toast({
      title: "Module Deleted",
      description: "The module has been removed successfully",
    });
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Modules & Resources
            </h1>
            <p className="text-muted-foreground">Manage onboarding modules and learning materials</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Create Module
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-lg">
              <DialogHeader>
                <DialogTitle>Create New Module</DialogTitle>
                <DialogDescription>Add a new learning module to the platform</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="module-title">Module Title</Label>
                  <Input id="module-title" placeholder="e.g., Introduction to DevOps" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module-category">Category</Label>
                  <Input id="module-category" placeholder="e.g., Technical" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module-description">Description</Label>
                  <Textarea
                    id="module-description"
                    placeholder="Brief description of the module..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Create Module
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all animate-fade-in"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{module.title}</h3>
                    <p className="text-sm text-primary font-medium">{module.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteModule(module.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">{module.description}</p>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {module.resources} resources attached
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Resource
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-lg">
                      <DialogHeader>
                        <DialogTitle>Add Resource to {module.title}</DialogTitle>
                        <DialogDescription>Upload or link a learning resource</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Resource Type</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              PDF
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Video className="mr-2 h-4 w-4" />
                              Video
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <LinkIcon className="mr-2 h-4 w-4" />
                              Link
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resource-title">Resource Title</Label>
                          <Input id="resource-title" placeholder="Enter resource title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resource-url">File or URL</Label>
                          <Input id="resource-url" placeholder="Upload file or paste URL" />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                          Add Resource
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Resources List */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">All Resources</h3>
          <div className="space-y-2">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminModules;

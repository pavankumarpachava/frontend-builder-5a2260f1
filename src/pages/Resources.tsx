import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Search, Download, ExternalLink } from "lucide-react";
import { apiGetTrainingResources } from "@/lib/api";

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  category: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    const data = await apiGetTrainingResources();
    setResources(data);
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Policies":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Technical":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Product":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Training Resources</h1>
            <p className="text-muted-foreground">
              Access documents, guides, and materials to help you succeed
            </p>
          </div>

          {/* Search */}
          <Card className="p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Quick Access Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Company Policies</h3>
              <p className="text-sm text-muted-foreground">
                Guidelines and procedures
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">Technical Docs</h3>
              <p className="text-sm text-muted-foreground">
                Setup and development guides
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Product Videos</h3>
              <p className="text-sm text-muted-foreground">
                Visual tutorials and demos
              </p>
            </Card>
          </div>

          {/* Resources List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">All Resources</h2>
            {filteredResources.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No resources found</p>
              </Card>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">{resource.title}</h3>
                          <Badge variant="outline" className={getCategoryColor(resource.category)}>
                            {resource.category}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;

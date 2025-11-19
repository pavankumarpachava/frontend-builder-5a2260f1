import { useState, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Search,
  File,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  category: string;
}

const AdminSettings = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Employee Handbook.pdf",
      type: "application/pdf",
      size: 2048000,
      uploadedAt: new Date("2024-01-15"),
      uploadedBy: "Admin",
      category: "Policies"
    },
    {
      id: "2",
      name: "Welcome Guide.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 1024000,
      uploadedAt: new Date("2024-01-20"),
      uploadedBy: "Admin",
      category: "Onboarding"
    },
    {
      id: "3",
      name: "Company Values.pdf",
      type: "application/pdf",
      size: 512000,
      uploadedAt: new Date("2024-02-01"),
      uploadedBy: "HR Manager",
      category: "Culture"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["all", "Policies", "Onboarding", "Culture", "Training", "Other"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newDocuments: Document[] = [];
      Array.from(files).forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max 50MB`);
          return;
        }

        const newDoc: Document = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date(),
          uploadedBy: "Admin",
          category: "Other"
        };
        newDocuments.push(newDoc);
      });

      setDocuments([...newDocuments, ...documents]);
      toast.success(`${newDocuments.length} document(s) uploaded`);
    }
    
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document deleted");
  };

  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}`);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return FileText;
    if (type.includes("spreadsheet") || type.includes("excel")) return FileSpreadsheet;
    if (type.includes("image")) return FileImage;
    if (type.includes("video")) return FileVideo;
    if (type.includes("audio")) return FileAudio;
    return File;
  };

  const getFileTypeColor = (type: string) => {
    if (type.includes("pdf")) return "bg-red-500/10 text-red-500 border-red-500/20";
    if (type.includes("spreadsheet") || type.includes("excel")) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (type.includes("image")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (type.includes("video")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    if (type.includes("audio")) return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Document Management
          </h1>
          <p className="text-muted-foreground">
            Upload, manage, and organize documents
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Documents
              </h3>
              <p className="text-sm text-muted-foreground">
                All file types supported (Max 50MB)
              </p>
            </div>
            <Button 
              onClick={triggerFileInput}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="*/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Documents ({filteredDocuments.length})
          </h2>

          {filteredDocuments.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search"
                  : "Upload your first document"}
              </p>
              {!searchQuery && selectedCategory === "all" && (
                <Button onClick={triggerFileInput}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => {
                const FileIcon = getFileIcon(doc.type);
                return (
                  <Card
                    key={doc.id}
                    className="p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg border ${getFileTypeColor(doc.type)}`}>
                        <FileIcon className="h-6 w-6" />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(doc.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <h3 className="font-semibold mb-2 truncate" title={doc.name}>
                      {doc.name}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium">{formatFileSize(doc.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded:</span>
                        <span className="font-medium">{format(doc.uploadedAt, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>By:</span>
                        <span className="font-medium">{doc.uploadedBy}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-4">{doc.category}</Badge>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Storage Used</h3>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))} of 10 GB
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{documents.length}</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

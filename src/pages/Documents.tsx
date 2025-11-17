import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Trash2, FileText, Image, File } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  url?: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Employee Handbook.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2025-01-15",
    },
    {
      id: "2",
      name: "Onboarding Guide.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadedAt: "2025-01-14",
    },
    {
      id: "3",
      name: "Team Photo.jpg",
      type: "JPG",
      size: "856 KB",
      uploadedAt: "2025-01-13",
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);

          // Add uploaded files to list
          Array.from(files).forEach((file) => {
            const newDoc: Document = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              type: file.name.split(".").pop()?.toUpperCase() || "FILE",
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              uploadedAt: new Date().toISOString().split("T")[0],
            };
            setDocuments((prev) => [newDoc, ...prev]);
          });

          toast.success("Documents uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}...`);
    // Implement actual download logic here
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast.success("Document deleted");
  };

  const getFileIcon = (type: string) => {
    if (["JPG", "PNG", "GIF", "WEBP"].includes(type)) return <Image className="h-5 w-5" />;
    if (["PDF", "DOC", "DOCX", "TXT"].includes(type)) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        {/* Hero Section */}
        <div
          className="relative mb-8 p-12 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Document Management
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Upload, manage, and access all your onboarding documents in one secure place.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <Card
          className="p-8 mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-purple-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Upload Documents</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Support for PDF, JPG, PNG, DOCX, XLSX and more
            </p>
            <label htmlFor="file-upload">
              <div
                className="cursor-pointer px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
              >
                Choose Files
              </div>
              <Input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx,.txt"
              />
            </label>

            {uploading && (
              <div className="w-full max-w-md mt-6">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>

          {documents.length === 0 ? (
            <Card
              className="p-12 text-center"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
              <p className="text-muted-foreground">
                Upload your first document to get started
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className="p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, #667eea, #764ba2)",
                        }}
                      >
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Uploaded on {doc.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(doc)}
                        className="hover:bg-purple-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(doc.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

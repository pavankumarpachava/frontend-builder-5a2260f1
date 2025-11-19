import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropModal } from "@/components/ImageCropModal";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Building2, Edit, Camera, Upload, Trash2, Shield,
  Save, Workflow, BookOpen, Settings as SettingsIcon, Bell, CheckCheck,
  FileText, Download as DownloadIcon, Search, File, FileSpreadsheet, FileImage,
  FileVideo, FileAudio, BarChart3, TrendingUp, TrendingDown
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

28: const AdminProfile = () => {
29:   const navigate = useNavigate();
30: 
31:   type Document = {
32:     id: string;
33:     name: string;
34:     type: string;
35:     size: number;
36:     uploadedAt: Date;
37:     uploadedBy: string;
38:     category: string;
39:   };
40: 
41:   const [user, setUser] = useState<any | null>(null);
42:   const [isLoading, setIsLoading] = useState(true);
43:   const [isEditing, setIsEditing] = useState(false);
44:   const [avatarUrl, setAvatarUrl] = useState<string>("");
45:   const [isCropModalOpen, setIsCropModalOpen] = useState(false);
46:   const [selectedImage, setSelectedImage] = useState<string>("");
47:   const avatarFileInputRef = useRef<HTMLInputElement>(null);
48:   const documentsFileInputRef = useRef<HTMLInputElement>(null);
49: 
50:   const [documents, setDocuments] = useState<Document[]>([
51:     {
52:       id: "1",
53:       name: "Employee Handbook.pdf",
54:       type: "application/pdf",
55:       size: 2048000,
56:       uploadedAt: new Date("2024-01-15"),
57:       uploadedBy: "Admin",
58:       category: "Policies",
59:     },
60:     {
61:       id: "2",
62:       name: "Welcome Guide.docx",
63:       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
64:       size: 1024000,
65:       uploadedAt: new Date("2024-01-20"),
66:       uploadedBy: "Admin",
67:       category: "Onboarding",
68:     },
69:     {
70:       id: "3",
71:       name: "Company Values.pdf",
72:       type: "application/pdf",
73:       size: 512000,
74:       uploadedAt: new Date("2024-02-01"),
75:       uploadedBy: "HR Manager",
76:       category: "Culture",
77:     },
78:   ]);
79:   const [searchQuery, setSearchQuery] = useState("");
80:   const [selectedCategory, setSelectedCategory] = useState("all");
81:   const categories = ["all", "Policies", "Onboarding", "Culture", "Training", "Other"];
82:   const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
83:   const [systemAlertsEnabled, setSystemAlertsEnabled] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin" && userRole !== "mentor") {
      navigate("/not-authorized");
      return;
    }

    loadUser();
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, [navigate]);

  const loadUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setAvatarUrl(
        parsedUser.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.email}`
      );
    } else {
      const userEmail = localStorage.getItem("userEmail") || "";
      const defaultUser = {
        id: userEmail || "admin",
        name: "",
        email: userEmail,
        department: "Administration",
        avatar: null,
      };
      setUser(defaultUser);
      setAvatarUrl(
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail || "admin"}`
      );
    }
    setIsLoading(false);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setAvatarUrl(croppedImage);
    const updatedUser = { ...user, avatar: croppedImage };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    const userId = user.id || user.email;
    localStorage.setItem(`profileImage_admin_${userId}`, croppedImage);
    localStorage.setItem("userAvatar", croppedImage);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'userAvatar',
      newValue: croppedImage,
    }));
    toast.success("Profile picture updated successfully!");
  };

  const handleRemoveImage = () => {
    const defaultEmail = user?.email || "admin";
    const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${defaultEmail}`;
    setAvatarUrl(defaultAvatar);
    const updatedUser = { ...user, avatar: null };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("storage"));
    toast.success("Profile picture removed");
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          uploadedBy: user?.name || "Admin",
          category: "Other",
        };
        newDocuments.push(newDoc);
      });

      if (newDocuments.length > 0) {
        setDocuments((prev) => [...newDocuments, ...prev]);
        toast.success(`${newDocuments.length} document(s) uploaded`);
      }
    }

    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDocumentDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast.success("Document deleted");
  };

  const handleDocumentDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}`);
  };

  const triggerFileInput = () => {
    avatarFileInputRef.current?.click();
  };

  const triggerDocumentsFileInput = () => {
    documentsFileInputRef.current?.click();
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

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  if (isLoading || !user) {
    return null;
  }
 
  const userRole = localStorage.getItem("userRole");

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile &amp; Settings
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your admin profile, documents, and account settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-secondary text-white">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 text-white hover:bg-white/20"
                      onClick={triggerFileInput}
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                    {user.avatar && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 text-white hover:bg-white/20"
                        onClick={handleRemoveImage}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
                <input
                  ref={avatarFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={triggerFileInput}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 5MB
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name || ""}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ""}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={userRole === "admin" ? "Administrator" : "Mentor"}
                      disabled
                      className="bg-primary/5 font-semibold text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={user.department || "Administration"}
                      onChange={(e) =>
                        setUser({ ...user, department: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} className="flex-1">
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          loadUser();
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
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
                    onClick={triggerDocumentsFileInput}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Files
                  </Button>
                  <input
                    ref={documentsFileInputRef}
                    type="file"
                    multiple
                    accept="*/*"
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
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
                    <h3 className="text-lg font-semibold mb-2">
                      No documents found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || selectedCategory !== "all"
                        ? "Try adjusting your search"
                        : "Upload your first document"}
                    </p>
                    {!searchQuery && selectedCategory === "all" && (
                      <Button onClick={triggerDocumentsFileInput}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    )}
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDocuments.map((doc) => {
                      const Icon = getFileIcon(doc.type);
                      return (
                        <Card
                          key={doc.id}
                          className="p-4 flex flex-col justify-between"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="font-semibold truncate">
                                  {doc.name}
                                </h3>
                                <Badge variant="outline">{doc.category}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(doc.size)} • Uploaded by {doc.uploadedBy}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(doc.uploadedAt, "PPP")}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDocumentDownload(doc)}
                            >
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDocumentDelete(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    Notification Settings
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Control how you receive updates about activity in the
                    platform.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive important updates in your inbox.
                      </p>
                    </div>
                    <Switch
                      checked={emailNotificationsEnabled}
                      onCheckedChange={setEmailNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System alerts</p>
                      <p className="text-xs text-muted-foreground">
                        Show in-app alerts for critical events.
                      </p>
                    </div>
                    <Switch
                      checked={systemAlertsEnabled}
                      onCheckedChange={setSystemAlertsEnabled}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Account Security
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Review and update your security preferences.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication</p>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Badge variant="outline">Coming soon</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login activity</p>
                      <p className="text-xs text-muted-foreground">
                        Monitor recent sign-ins to your account.
                      </p>
                    </div>
                    <Badge variant="outline">Coming soon</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        imageSrc={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </AdminLayout>
  );
};

export default AdminProfile;

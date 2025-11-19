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

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setAvatarUrl(parsedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.email}`);
    }
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
    const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;
    setAvatarUrl(defaultAvatar);
    const updatedUser = { ...user, avatar: null };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('storage'));
    toast.success("Profile picture removed");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
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
              Profile & Settings
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your admin profile and account
          </p>
        </div>

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
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button variant="outline" size="sm" className="mt-4" onClick={triggerFileInput}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 5MB</p>
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
                  onChange={(e) => setUser({ ...user, department: e.target.value })}
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
                  <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                  <Button variant="outline" onClick={() => { setIsEditing(false); loadUser(); }} className="flex-1">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
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

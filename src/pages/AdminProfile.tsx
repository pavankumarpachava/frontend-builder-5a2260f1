import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropModal } from "@/components/ImageCropModal";
import { User, Mail, Briefcase, Building2, Edit, Camera, Upload, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is admin or mentor
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin" && userRole !== "mentor") {
      navigate("/not-authorized");
      return;
    }

    loadUser();
    
    // Also check for saved avatar in localStorage
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
    // Save updated user to localStorage
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
    // Reset the input so the same file can be selected again
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setAvatarUrl(croppedImage);
    const updatedUser = { ...user, avatar: croppedImage };
    setUser(updatedUser);
    // Persist to localStorage immediately
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Save to a specific key for avatar
    localStorage.setItem("userAvatar", croppedImage);
    // Trigger a storage event for other components to update
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
    // Persist to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Trigger a storage event
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
    <div className="min-h-screen flex flex-col page-transition bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Admin Profile
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage your admin account settings and information
            </p>
          </div>

          {/* Profile Card */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/10 shadow-xl">
            {/* Avatar Section */}
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
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={triggerFileInput}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 5MB
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={user.name || ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={userRole === "admin" ? "Administrator" : "Mentor"}
                    disabled
                    className="disabled:opacity-70 bg-primary/5 font-semibold text-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={user.department || "Administration"}
                    onChange={(e) => setUser({ ...user, department: e.target.value })}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Action Buttons */}
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

          {/* Additional Info Card */}
          <Card className="p-6 mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Admin Access
            </h3>
            <p className="text-sm text-muted-foreground">
              As an {userRole === "admin" ? "administrator" : "mentor"}, you have access to the admin portal where you can manage users, 
              modules, mentors, and view analytics.
            </p>
          </Card>
        </div>
      </main>

      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        imageSrc={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default AdminProfile;

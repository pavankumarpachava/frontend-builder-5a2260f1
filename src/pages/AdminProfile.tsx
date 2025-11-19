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
import { 
  User, Mail, Briefcase, Building2, Edit, Camera, Upload, Trash2, Shield,
  Save, Workflow, BookOpen, Settings as SettingsIcon
} from "lucide-react";
import { toast } from "sonner";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [emailSettings, setEmailSettings] = useState({
    welcomeSubject: "Welcome to OnboardX!",
    welcomeBody: "Hi {{name}},\n\nWelcome to our company! We're excited to have you on board.\n\nBest regards,\nThe OnboardX Team",
    reminderSubject: "Don't forget to complete your onboarding tasks",
    reminderBody: "Hi {{name}},\n\nYou have pending onboarding tasks. Please login to complete them.\n\nBest regards,\nThe OnboardX Team",
  });

  const [workflowSettings, setWorkflowSettings] = useState({
    autoAssignMentor: true,
    sendWelcomeEmail: true,
    requireManagerApproval: false,
    onboardingDuration: "30",
  });

  const [defaultModules, setDefaultModules] = useState([
    { id: "1", name: "Welcome & Company Overview", assigned: true },
    { id: "2", name: "Tools & Technology Setup", assigned: true },
    { id: "3", name: "Team Structure & Processes", assigned: true },
    { id: "4", name: "First Project Guidelines", assigned: false },
  ]);

  const [systemPreferences, setSystemPreferences] = useState({
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    language: "en",
    theme: "light",
  });

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

  const handleSaveEmailTemplates = () => {
    toast.success("Email templates saved successfully");
  };

  const handleSaveWorkflow = () => {
    toast.success("Workflow settings saved successfully");
  };

  const handleSaveModules = () => {
    toast.success("Default modules updated successfully");
  };

  const handleSavePreferences = () => {
    toast.success("System preferences saved successfully");
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
            Manage your profile, email templates, workflows, and system preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="workflow" className="gap-2">
              <Workflow className="h-4 w-4" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="modules" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/10">
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
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 5MB
                </p>
              </div>

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

          <TabsContent value="email" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Welcome Email</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={emailSettings.welcomeSubject}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, welcomeSubject: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Body</Label>
                  <Textarea
                    rows={6}
                    value={emailSettings.welcomeBody}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, welcomeBody: e.target.value })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Task Reminder</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={emailSettings.reminderSubject}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, reminderSubject: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Body</Label>
                  <Textarea
                    rows={6}
                    value={emailSettings.reminderBody}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, reminderBody: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={handleSaveEmailTemplates}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Templates
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Workflow Configuration</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-assign Mentor</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically assign mentors to new employees
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.autoAssignMentor}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, autoAssignMentor: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Welcome Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email when accounts are created
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.sendWelcomeEmail}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, sendWelcomeEmail: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Manager Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Tasks need approval before completion
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.requireManagerApproval}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, requireManagerApproval: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Onboarding Duration (Days)</Label>
                  <Input
                    type="number"
                    value={workflowSettings.onboardingDuration}
                    onChange={(e) =>
                      setWorkflowSettings({ ...workflowSettings, onboardingDuration: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleSaveWorkflow} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Workflow
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Default Modules</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Auto-assign these modules to new employees
              </p>
              
              <div className="space-y-4">
                {defaultModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <Label htmlFor={`module-${module.id}`} className="cursor-pointer">
                      {module.name}
                    </Label>
                    <Switch
                      id={`module-${module.id}`}
                      checked={module.assigned}
                      onCheckedChange={(checked) => {
                        setDefaultModules(
                          defaultModules.map((m) =>
                            m.id === module.id ? { ...m, assigned: checked } : m
                          )
                        );
                      }}
                    />
                  </div>
                ))}

                <Button onClick={handleSaveModules} className="w-full mt-6">
                  <Save className="mr-2 h-4 w-4" />
                  Save Modules
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">System Preferences</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={systemPreferences.timezone}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, timezone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="CST">CST</SelectItem>
                      <SelectItem value="MST">MST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select
                    value={systemPreferences.dateFormat}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, dateFormat: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={systemPreferences.language}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, language: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={systemPreferences.theme}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSavePreferences} className="w-full mt-6">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </Card>
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

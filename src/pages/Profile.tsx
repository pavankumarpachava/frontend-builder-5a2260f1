import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Briefcase, Building2, Edit } from "lucide-react";
import { apiGetUser } from "@/lib/api";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await apiGetUser();
    setUser(data);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information
            </p>
          </div>

          {/* Profile Card */}
          <Card className="p-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-muted-foreground">{user.role}</p>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={user.department}
                    onChange={(e) => setUser({ ...user, department: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Onboarding Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Checklist</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: "65%" }} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">12/18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Active</span>
                  <span className="font-medium">5</span>
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

export default Profile;

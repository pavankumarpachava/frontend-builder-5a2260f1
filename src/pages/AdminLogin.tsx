import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      // Demo credentials check
      if (email === "admin@onboardx.com" && password === "admin123") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", email);
        toast({
          title: "Login Successful",
          description: "Welcome to the Admin Portal",
        });
        navigate("/admin/dashboard");
      } else if (email === "mentor@onboardx.com" && password === "mentor123") {
        localStorage.setItem("userRole", "mentor");
        localStorage.setItem("userEmail", email);
        toast({
          title: "Login Successful",
          description: "Welcome to the Mentor Portal",
        });
        navigate("/mentor/dashboard");
      } else if (email.includes("@onboardx.com")) {
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userEmail", email);
        toast({
          title: "Login Successful",
          description: "Welcome to OnboardX",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-muted-foreground mt-2">Sign in to manage OnboardX</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@onboardx.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Admin: admin@onboardx.com / admin123</p>
          <p>Mentor: mentor@onboardx.com / mentor123</p>
          <p>User: user@onboardx.com / user123</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;

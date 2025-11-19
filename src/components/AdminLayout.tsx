import { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserCog,
  BarChart3,
  LogOut,
  Settings,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "User Management", path: "/admin/users" },
    { icon: BookOpen, label: "Modules & Resources", path: "/admin/modules" },
    { icon: UserCog, label: "Mentor Management", path: "/admin/mentors" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Top Navbar */}
      <header 
        className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center gap-2 group">
            <Rocket className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-white group-hover:scale-105 transition-transform">
              Admin Portal
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

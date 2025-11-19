import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rocket, Home, CheckCircle, Users, BookOpen, User, Settings as SettingsIcon, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(() => JSON.parse(localStorage.getItem("user") || "{}"));
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const userRole = localStorage.getItem("userRole");
  
  // Listen for storage changes to update avatar in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(updatedUser);
      const savedAvatar = localStorage.getItem("userAvatar");
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      } else if (updatedUser.avatar) {
        setAvatarUrl(updatedUser.avatar);
      }
    };
    
    // Initial load
    handleStorageChange();
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    toast.success("Logged out successfully");
    navigate("/landing");
  };

  const isActive = (path: string) => location.pathname === path;

  // Determine if user is logged in
  const isLoggedIn = user.email;
  
  // Admin/Mentor users don't see this header (they use AdminLayout)
  // This header is only for public users and employees
  const isEmployee = isLoggedIn && userRole === "employee";
  const isPublic = !isLoggedIn;

  const onboardingLinks = [
    { href: "/onboarding/checklist", label: "Onboarding Checklist", icon: CheckCircle },
    { href: "/onboarding/goals", label: "Goals & Milestones", icon: CheckCircle },
    { href: "/onboarding/calendar", label: "My Calendar", icon: CheckCircle },
  ];

  const peopleLinks = [
    { href: "/people/team", label: "Team Directory", icon: Users },
    { href: "/people/mentor", label: "Mentor & Buddy", icon: Users },
    { href: "/people/culture", label: "Company Culture", icon: Users },
  ];

  const trainingLinks = [
    { href: "/training/resources", label: "Training Resources", icon: BookOpen },
    { href: "/training/courses", label: "Courses / Videos", icon: BookOpen },
    { href: "/training/feedback", label: "Feedback Page", icon: BookOpen },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl"
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
      }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={isEmployee ? "/dashboard" : "/landing"} className="flex items-center gap-2 group">
          <Rocket className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-white group-hover:scale-105 transition-transform">
            OnboardX
          </span>
        </Link>

        {/* Employee Desktop Navigation */}
        {isEmployee && (
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/dashboard"
              className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            {/* Onboarding Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white/90 hover:bg-white/10 hover:text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Onboarding
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {onboardingLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* People Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white/90 hover:bg-white/10 hover:text-white"
                >
                  <Users className="mr-2 h-4 w-4" />
                  People
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {peopleLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Training Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white/90 hover:bg-white/10 hover:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Training
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {trainingLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}

        {/* Right Side - User Menu or Auth Buttons */}
        <div className="flex items-center gap-4">
          {isEmployee && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-white/30">
                    <AvatarImage 
                      src={avatarUrl || user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                      alt={user.name} 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isPublic && (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                  Get Started
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
                  Admin
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isEmployee && (
        <div className="md:hidden border-t border-white/10 bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl">
          <nav className="container px-4 py-4 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            
            <div className="space-y-1">
              <p className="px-4 py-2 text-sm font-semibold text-white/70">Onboarding</p>
              {onboardingLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 rounded-md hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <p className="px-4 py-2 text-sm font-semibold text-white/70">People</p>
              {peopleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 rounded-md hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <p className="px-4 py-2 text-sm font-semibold text-white/70">Training</p>
              {trainingLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 rounded-md hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

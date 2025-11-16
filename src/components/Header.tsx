import { useState } from "react";
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
import { Rocket, Home, CheckCircle, Users, BookOpen, User, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { toast } from "sonner";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const profileLinks = [
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

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
      className="sticky top-0 z-50 w-full border-b border-white/10"
      style={{ background: 'linear-gradient(90deg, #FFB2F5 0%, #A275FF 25%, #6E8BFF 50%, #8EE3FF 75%, #C0F8FF 100%)' }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <Rocket className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-white group-hover:scale-105 transition-transform">
            OnboardX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Home - Direct Link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {/* Onboarding */}
          <div className="group relative">
            <button className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              <CheckCircle className="h-4 w-4" />
              Onboarding
            </button>
            <div className="absolute top-full left-0 mt-2 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-[10px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)] p-2.5 min-w-[180px]">
                {onboardingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block select-none rounded-md p-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors ${
                      isActive(link.href) ? "bg-gray-100" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* People */}
          <div className="group relative">
            <button className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              <Users className="h-4 w-4" />
              People
            </button>
            <div className="absolute top-full left-0 mt-2 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-[10px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)] p-2.5 min-w-[180px]">
                {peopleLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block select-none rounded-md p-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors ${
                      isActive(link.href) ? "bg-gray-100" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Training */}
          <div className="group relative">
            <button className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              <BookOpen className="h-4 w-4" />
              Training
            </button>
            <div className="absolute top-full left-0 mt-2 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-[10px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)] p-2.5 min-w-[180px]">
                {trainingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block select-none rounded-md p-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors ${
                      isActive(link.href) ? "bg-gray-100" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* User Avatar Dropdown */}
        {user.email && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                  <AvatarFallback className="bg-white text-primary">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white rounded-[10px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)]" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              {profileLinks.map((link) => (
                <DropdownMenuItem key={link.href} onClick={() => navigate(link.href)}>
                  <link.icon className="mr-2 h-4 w-4" />
                  <span>{link.label}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t border-white/10"
          style={{ background: 'linear-gradient(90deg, #FFB2F5 0%, #A275FF 25%, #6E8BFF 50%, #8EE3FF 75%, #C0F8FF 100%)' }}
        >
          <div className="container px-4 py-4 space-y-4">
            {/* Home Link */}
            <div>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </div>

            {/* Onboarding Links */}
            <div>
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Onboarding
              </h3>
              <div className="pl-6 space-y-2">
                {onboardingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block py-2 text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-white font-medium"
                        : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* People Links */}
            <div>
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                People
              </h3>
              <div className="pl-6 space-y-2">
                {peopleLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block py-2 text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-white font-medium"
                        : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Training Links */}
            <div>
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Training
              </h3>
              <div className="pl-6 space-y-2">
                {trainingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block py-2 text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-white font-medium"
                        : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Actions */}
            {user.email && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-4 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                    <AvatarFallback className="bg-white text-primary text-sm">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs opacity-90">{user.email}</p>
                  </div>
                </div>
                {profileLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-2 py-2 text-sm text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:text-white/80 hover:bg-white/10 mt-2"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
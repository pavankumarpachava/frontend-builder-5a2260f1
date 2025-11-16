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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Rocket, Home, CheckCircle, Users, BookOpen, User, Settings, LogOut, Menu, X } from "lucide-react";
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

  const homeLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/notifications", label: "Notifications", icon: Home },
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            OnboardX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Home Group */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  {homeLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                            isActive(link.href) ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <div className="text-sm font-medium leading-none">{link.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Onboarding Group */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Onboarding
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-1 p-2">
                  {onboardingLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                            isActive(link.href) ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <div className="text-sm font-medium leading-none">{link.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* People Group */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <Users className="h-4 w-4 mr-2" />
                People
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  {peopleLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                            isActive(link.href) ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <div className="text-sm font-medium leading-none">{link.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Training Group */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Training
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  {trainingLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                            isActive(link.href) ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <div className="text-sm font-medium leading-none">{link.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Avatar Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 space-y-4">
            {/* Home Group */}
            <div>
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </h3>
              <div className="space-y-1 pl-6">
                {homeLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${isActive(link.href) ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Onboarding Group */}
            <div>
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Onboarding
              </h3>
              <div className="space-y-1 pl-6">
                {onboardingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${isActive(link.href) ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* People Group */}
            <div>
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                People
              </h3>
              <div className="space-y-1 pl-6">
                {peopleLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${isActive(link.href) ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Training Group */}
            <div>
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Training
              </h3>
              <div className="space-y-1 pl-6">
                {trainingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${isActive(link.href) ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

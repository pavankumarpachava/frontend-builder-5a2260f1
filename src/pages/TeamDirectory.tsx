import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rocket, Search, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  location: string;
  avatar?: string;
  bio: string;
}

const TeamDirectory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Mock team data
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Engineering Manager",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Leading the platform team with 10+ years of experience",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@company.com",
      role: "Senior Developer",
      department: "Engineering",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      bio: "Full-stack engineer passionate about clean code",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@company.com",
      role: "Product Manager",
      department: "Product",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      bio: "Driving product strategy and user experience",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.k@company.com",
      role: "UX Designer",
      department: "Design",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      bio: "Creating beautiful and intuitive user interfaces",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.a@company.com",
      role: "HR Manager",
      department: "Human Resources",
      phone: "+1 (555) 567-8901",
      location: "San Francisco, CA",
      bio: "Building great teams and company culture",
    },
    {
      id: "6",
      name: "James Wilson",
      email: "james.w@company.com",
      role: "DevOps Engineer",
      department: "Engineering",
      phone: "+1 (555) 678-9012",
      location: "Denver, CO",
      bio: "Infrastructure and automation specialist",
    },
    {
      id: "7",
      name: "Maria Garcia",
      email: "maria.g@company.com",
      role: "Marketing Lead",
      department: "Marketing",
      phone: "+1 (555) 789-0123",
      location: "Miami, FL",
      bio: "Building brand awareness and growth strategies",
    },
    {
      id: "8",
      name: "Robert Taylor",
      email: "robert.t@company.com",
      role: "Sales Manager",
      department: "Sales",
      phone: "+1 (555) 890-1234",
      location: "Chicago, IL",
      bio: "Helping customers succeed with our solutions",
    },
  ];

  // Get unique departments and roles
  const departments = ["all", ...new Set(teamMembers.map(member => member.department))];
  const roles = ["all", ...new Set(teamMembers.map(member => member.role))];

  // Filter team members
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = 
        departmentFilter === "all" || member.department === departmentFilter;
      
      const matchesRole = 
        roleFilter === "all" || member.role === roleFilter;

      return matchesSearch && matchesDepartment && matchesRole;
    });
  }, [searchQuery, departmentFilter, roleFilter, teamMembers]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      "Engineering": "bg-primary/10 text-primary",
      "Product": "bg-secondary/10 text-secondary",
      "Design": "bg-accent/10 text-accent",
      "Human Resources": "bg-muted text-muted-foreground",
      "Marketing": "bg-primary/10 text-primary",
      "Sales": "bg-secondary/10 text-secondary",
    };
    return colors[department] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                OnboardX
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Team Directory</h1>
          <p className="text-lg text-muted-foreground">
            Connect with your colleagues across the organization
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredMembers.length} of {teamMembers.length} team members
            </span>
            {(searchQuery || departmentFilter !== "all" || roleFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setDepartmentFilter("all");
                  setRoleFilter("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </Card>

        {/* Team Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card 
                key={member.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                  <Badge className={getDepartmentColor(member.department)}>
                    {member.department}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {member.bio}
                </p>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-primary hover:underline truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{member.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{member.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `mailto:${member.email}`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${member.phone}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground mb-2">No team members found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeamDirectory;

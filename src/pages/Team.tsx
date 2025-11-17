import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  bio: string;
  skills: string[];
  avatar: string;
}

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Software Engineer",
      department: "Engineering",
      email: "john.doe@company.com",
      bio: "Experienced software engineer with a passion for building scalable applications and mentoring junior developers.",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      avatar: "",
    },
    {
      id: 2,
      name: "Emma Brown",
      role: "Product Manager",
      department: "Product",
      email: "emma.brown@company.com",
      bio: "Product leader focused on creating user-centric solutions and driving product strategy.",
      skills: ["Product Strategy", "User Research", "Agile", "Analytics"],
      avatar: "",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "UI/UX Designer",
      department: "Design",
      email: "michael.chen@company.com",
      bio: "Creative designer specializing in creating beautiful and intuitive user experiences.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      avatar: "",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "HR Manager",
      department: "People Ops",
      email: "sarah.johnson@company.com",
      bio: "HR professional dedicated to creating a positive workplace culture and supporting employee growth.",
      skills: ["Talent Management", "Employee Relations", "Recruiting", "Culture"],
      avatar: "",
    },
    {
      id: 5,
      name: "David Park",
      role: "Data Analyst",
      department: "Analytics",
      email: "david.park@company.com",
      bio: "Data-driven analyst helping teams make informed decisions through insightful analytics.",
      skills: ["SQL", "Python", "Tableau", "Statistics"],
      avatar: "",
    },
    {
      id: 6,
      name: "Priya Patel",
      role: "QA Engineer",
      department: "QA",
      email: "priya.patel@company.com",
      bio: "Quality assurance specialist ensuring our products meet the highest standards.",
      skills: ["Test Automation", "Selenium", "API Testing", "Quality Assurance"],
      avatar: "",
    },
    {
      id: 7,
      name: "Daniel Lee",
      role: "DevOps Engineer",
      department: "Infrastructure",
      email: "daniel.lee@company.com",
      bio: "DevOps engineer focused on building reliable and scalable infrastructure.",
      skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
      avatar: "",
    },
    {
      id: 8,
      name: "Olivia Garcia",
      role: "Content Writer",
      department: "Marketing",
      email: "olivia.garcia@company.com",
      bio: "Creative writer crafting compelling content that resonates with our audience.",
      skills: ["Content Strategy", "Copywriting", "SEO", "Storytelling"],
      avatar: "",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment;
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const departments = ["all", ...Array.from(new Set(teamMembers.map(m => m.department)))];
  const roles = ["all", ...Array.from(new Set(teamMembers.map(m => m.role)))];

  const handleContact = (email: string) => {
    toast.success(`Opening email to ${email}...`);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-4xl font-bold mb-2">Meet Your Team</h1>
              <p className="text-lg opacity-90">
                Connect with your colleagues and learn who you'll be working with.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search team members…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Department Filter */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.filter(d => d !== "all").map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.filter(r => r !== "all").map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Team Directory Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredMembers.map((member, index) => (
              <Card
                key={member.id}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-primary/20 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xl bg-gradient-primary text-white">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                  <Badge variant="outline" className="mb-3">{member.department}</Badge>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {member.email}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground">No team members found matching your search.</p>
            </Card>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="sr-only">Team Member Profile</DialogTitle>
            <DialogDescription className="sr-only">View detailed information about this team member</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center pb-6 border-b">
                <Avatar className="h-32 w-32 mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="text-3xl bg-gradient-primary text-white">
                    {getInitials(selectedMember.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{selectedMember.name}</h2>
                <p className="text-lg text-primary font-medium mb-2">{selectedMember.role}</p>
                <Badge variant="outline" className="mb-3">{selectedMember.department}</Badge>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {selectedMember.email}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Bio</h3>
                <p className="text-base leading-relaxed">{selectedMember.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full gap-2"
                  onClick={() => handleContact(selectedMember.email)}
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Team;

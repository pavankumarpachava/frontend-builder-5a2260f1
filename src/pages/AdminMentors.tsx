import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Mail, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Mentor {
  id: string;
  name: string;
  email: string;
  department: string;
  expertise: string[];
  mentees: number;
  sessionsCompleted: number;
  rating: number;
}

const AdminMentors = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Michael Chen",
      email: "michael@example.com",
      department: "Engineering",
      expertise: ["Frontend", "React", "TypeScript"],
      mentees: 5,
      sessionsCompleted: 23,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      department: "Product",
      expertise: ["Product Management", "Agile", "Strategy"],
      mentees: 4,
      sessionsCompleted: 18,
      rating: 4.9,
    },
    {
      id: "3",
      name: "David Park",
      email: "david@example.com",
      department: "Design",
      expertise: ["UI/UX", "Figma", "Design Systems"],
      mentees: 6,
      sessionsCompleted: 31,
      rating: 4.7,
    },
    {
      id: "4",
      name: "Emma Brown",
      email: "emma@example.com",
      department: "Marketing",
      expertise: ["Content", "SEO", "Analytics"],
      mentees: 3,
      sessionsCompleted: 15,
      rating: 4.6,
    },
  ]);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAssignMentee = (mentorName: string) => {
    toast({
      title: "Mentee Assigned",
      description: `New mentee has been assigned to ${mentorName}`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mentor Management
            </h1>
            <p className="text-muted-foreground">Manage mentors and track their performance</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Mentor
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-lg">
              <DialogHeader>
                <DialogTitle>Add New Mentor</DialogTitle>
                <DialogDescription>Register a new mentor to the platform</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor-name">Full Name</Label>
                  <Input id="mentor-name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentor-email">Email</Label>
                  <Input id="mentor-email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentor-dept">Department</Label>
                  <Input id="mentor-dept" placeholder="Engineering" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentor-expertise">Expertise (comma separated)</Label>
                  <Input id="mentor-expertise" placeholder="React, TypeScript, Node.js" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Add Mentor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name, department, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mentors.length}</p>
                <p className="text-sm text-muted-foreground">Total Mentors</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mentors.reduce((acc, m) => acc + m.mentees, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Mentees</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mentors.reduce((acc, m) => acc + m.sessionsCompleted, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {(mentors.reduce((acc, m) => acc + m.rating, 0) / mentors.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 bg-gradient-to-r from-primary to-secondary">
                    <AvatarFallback className="text-white font-semibold">
                      {getInitials(mentor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-primary font-medium">{mentor.department}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold">{mentor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mentees:</span>
                    <span className="font-semibold">{mentor.mentees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sessions:</span>
                    <span className="font-semibold">{mentor.sessionsCompleted}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAssignMentee(mentor.name)}
                  >
                    <UserPlus className="mr-2 h-3 w-3" />
                    Assign
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="mr-2 h-3 w-3" />
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMentors;

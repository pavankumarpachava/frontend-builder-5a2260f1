import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MessageCircle } from "lucide-react";
import { apiGetMentorInfo } from "@/lib/api";
import { toast } from "sonner";

interface Mentor {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  availability: string;
  avatar: string;
}

const Mentor = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    const data = await apiGetMentorInfo();
    setMentors(data);
  };

  const handleConnect = (mentorName: string) => {
    toast.success(`Connection request sent to ${mentorName}`);
  };

  const handleSchedule = (mentorName: string) => {
    toast.success(`Opening calendar for ${mentorName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mentor & Buddy Program</h1>
            <p className="text-muted-foreground">
              Connect with experienced team members who can guide your journey
            </p>
          </div>

          {/* Info Banner */}
          <Card className="p-6 mb-8 bg-gradient-primary text-white border-0">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold mb-2">Why Have a Mentor?</h2>
                <p className="opacity-90">
                  Mentors provide guidance, share experiences, and help you navigate your first days.
                  They're here to answer questions and support your growth.
                </p>
              </div>
            </div>
          </Card>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Availability</p>
                  <p className="text-sm font-medium">{mentor.availability}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConnect(mentor.name)}
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button
                    onClick={() => handleSchedule(mentor.name)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Tips for Your First Meeting</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Prepare questions about the team, projects, and company culture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Share your background and what you hope to learn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Schedule regular check-ins to stay connected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Be open about challenges you're facing</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mentor;

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Calendar as CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Mentee {
  id: string;
  name: string;
  email: string;
  department: string;
  progress: number;
  avatar: string;
  startDate: string;
}

interface Session {
  id: string;
  menteeName: string;
  date: string;
  time: string;
  type: "video" | "chat" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
}

const MentorDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const mentees: Mentee[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.j@company.com",
      department: "Engineering",
      progress: 75,
      avatar: "",
      startDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.s@company.com",
      department: "Product",
      progress: 45,
      avatar: "",
      startDate: "2024-02-01",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.d@company.com",
      department: "Design",
      progress: 90,
      avatar: "",
      startDate: "2023-12-10",
    },
  ];

  const upcomingSessions: Session[] = [
    {
      id: "1",
      menteeName: "Alice Johnson",
      date: "2024-03-20",
      time: "2:00 PM",
      type: "video",
      status: "upcoming",
    },
    {
      id: "2",
      menteeName: "Bob Smith",
      date: "2024-03-22",
      time: "10:00 AM",
      type: "chat",
      status: "upcoming",
    },
    {
      id: "3",
      menteeName: "Carol Davis",
      date: "2024-03-25",
      time: "3:30 PM",
      type: "in-person",
      status: "upcoming",
    },
  ];

  const sessionHistory: Session[] = [
    {
      id: "h1",
      menteeName: "Alice Johnson",
      date: "2024-03-15",
      time: "2:00 PM",
      type: "video",
      status: "completed",
    },
    {
      id: "h2",
      menteeName: "Bob Smith",
      date: "2024-03-14",
      time: "11:00 AM",
      type: "video",
      status: "completed",
    },
    {
      id: "h3",
      menteeName: "Carol Davis",
      date: "2024-03-12",
      time: "4:00 PM",
      type: "chat",
      status: "completed",
    },
    {
      id: "h4",
      menteeName: "Alice Johnson",
      date: "2024-03-10",
      time: "1:00 PM",
      type: "in-person",
      status: "cancelled",
    },
  ];

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mentor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your mentees, sessions, and track their progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Mentees</p>
                <p className="text-2xl font-bold">{mentees.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Sessions</p>
                <p className="text-2xl font-bold">
                  {sessionHistory.filter((s) => s.status === "completed").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours This Month</p>
                <p className="text-2xl font-bold">12.5</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mentees & Sessions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assigned Mentees */}
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">My Mentees</h3>
              <div className="space-y-4">
                {mentees.map((mentee) => (
                  <div
                    key={mentee.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentee.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                        {mentee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{mentee.name}</p>
                      <p className="text-sm text-muted-foreground">{mentee.department}</p>
                      <div className="mt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${mentee.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{mentee.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 backdrop-blur-lg">
                        <DialogHeader>
                          <DialogTitle>{mentee.name}</DialogTitle>
                          <DialogDescription>Mentee Profile & Progress</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={mentee.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl">
                                {mentee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-lg">{mentee.name}</p>
                              <p className="text-sm text-muted-foreground">{mentee.email}</p>
                              <p className="text-sm text-muted-foreground">{mentee.department}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Start Date</p>
                            <p className="text-sm text-muted-foreground">{mentee.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Onboarding Progress</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-secondary"
                                  style={{ width: `${mentee.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{mentee.progress}%</span>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                              Schedule Session
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                        {getSessionIcon(session.type)}
                      </div>
                      <div>
                        <p className="font-medium">{session.menteeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.date} at {session.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(session.status)}
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Session History */}
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Session History</h3>
              <div className="space-y-3">
                {sessionHistory.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        {getSessionIcon(session.type)}
                      </div>
                      <div>
                        <p className="font-medium">{session.menteeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.date} at {session.time}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Calendar */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Schedule Calendar</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Sessions on {date?.toLocaleDateString()}</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/50 text-sm">
                    <p className="font-medium">Alice Johnson</p>
                    <p className="text-muted-foreground">2:00 PM - Video Call</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule New Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorDashboard;

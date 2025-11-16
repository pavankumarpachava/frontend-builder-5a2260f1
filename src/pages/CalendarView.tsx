import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Rocket, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Target,
  BookOpen,
  Video,
  Bell
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, addDays, isToday } from "date-fns";
import { toast } from "sonner";

type ViewMode = "month" | "week" | "day";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "meeting" | "milestone" | "training" | "social";
  location?: string;
  attendees?: string[];
  reminder?: boolean;
}

const CalendarView = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);

  // Mock events data
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Welcome Meeting",
      description: "Introduction to the team and company overview",
      date: new Date(2024, 11, 16),
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
      location: "Conference Room A",
      attendees: ["Sarah Johnson", "HR Team"],
      reminder: true,
    },
    {
      id: "2",
      title: "IT Setup Session",
      description: "Set up your laptop, accounts, and development environment",
      date: new Date(2024, 11, 17),
      startTime: "10:00",
      endTime: "11:30",
      type: "training",
      location: "IT Department",
      attendees: ["James Wilson"],
      reminder: true,
    },
    {
      id: "3",
      title: "First Week Milestone",
      description: "Complete onboarding checklist and initial setup",
      date: new Date(2024, 11, 20),
      startTime: "17:00",
      endTime: "17:00",
      type: "milestone",
      reminder: true,
    },
    {
      id: "4",
      title: "Department Orientation",
      description: "Meet your department colleagues and learn about projects",
      date: new Date(2024, 11, 18),
      startTime: "14:00",
      endTime: "16:00",
      type: "meeting",
      location: "Main Office",
      attendees: ["Emily Rodriguez", "Team Members"],
      reminder: true,
    },
    {
      id: "5",
      title: "Team Lunch",
      description: "Casual lunch with your immediate team",
      date: new Date(2024, 11, 19),
      startTime: "12:00",
      endTime: "13:30",
      type: "social",
      location: "Local Restaurant",
      attendees: ["Team"],
      reminder: false,
    },
    {
      id: "6",
      title: "Product Training",
      description: "Deep dive into our product suite and features",
      date: new Date(2024, 11, 23),
      startTime: "10:00",
      endTime: "12:00",
      type: "training",
      location: "Training Room",
      attendees: ["Michael Chen"],
      reminder: true,
    },
    {
      id: "7",
      title: "30-Day Check-in",
      description: "Review progress and set goals for the next month",
      date: new Date(2024, 11, 27),
      startTime: "15:00",
      endTime: "16:00",
      type: "milestone",
      attendees: ["Manager"],
      reminder: true,
    },
  ];

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    const colors = {
      meeting: "bg-primary/10 text-primary border-primary/20",
      milestone: "bg-secondary/10 text-secondary border-secondary/20",
      training: "bg-accent/10 text-accent border-accent/20",
      social: "bg-muted text-muted-foreground border-border",
    };
    return colors[type];
  };

  const getEventTypeIcon = (type: CalendarEvent["type"]) => {
    const icons = {
      meeting: Users,
      milestone: Target,
      training: BookOpen,
      social: Video,
    };
    return icons[type];
  };

  // Calendar navigation
  const goToPreviousPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const goToNextPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get days to display based on view mode
  const displayDays = useMemo(() => {
    if (viewMode === "month") {
      const start = startOfWeek(startOfMonth(currentDate));
      const end = endOfWeek(endOfMonth(currentDate));
      return eachDayOfInterval({ start, end });
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else {
      return [currentDate];
    }
  }, [currentDate, viewMode]);

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  // Format period label
  const getPeriodLabel = () => {
    if (viewMode === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } else {
      return format(currentDate, "EEEE, MMMM d, yyyy");
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const handleSetReminder = () => {
    toast.success("Reminder set! You'll be notified 15 minutes before the event.");
  };

  return (
    <div className="min-h-screen bg-background page-transition">
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
          <h1 className="text-4xl font-bold mb-2">Onboarding Calendar</h1>
          <p className="text-lg text-muted-foreground">
            Track your meetings, milestones, and training sessions
          </p>
        </div>

        {/* Calendar Controls */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={goToPreviousPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {getPeriodLabel()}
              </h2>
              <Button variant="outline" size="sm" onClick={goToNextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={viewMode === "month" ? "bg-gradient-primary" : ""}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={viewMode === "week" ? "bg-gradient-primary" : ""}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("day")}
                className={viewMode === "day" ? "bg-gradient-primary" : ""}
              >
                Day
              </Button>
            </div>
          </div>
        </Card>

        {/* Calendar Grid */}
        <div className="grid gap-6 mb-6">
          {viewMode === "month" && (
            <Card className="p-6">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {displayDays.map((day, index) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isDayToday = isToday(day);

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 rounded-lg border transition-colors ${
                        isCurrentMonth ? "bg-card border-border" : "bg-muted/30 border-transparent"
                      } ${isDayToday ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        isDayToday ? "text-primary font-bold" : 
                        isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const Icon = getEventTypeIcon(event.type);
                          return (
                            <button
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              className={`w-full text-left text-xs p-1 rounded border ${getEventTypeColor(event.type)} hover:opacity-80 transition-opacity`}
                            >
                              <div className="flex items-center gap-1">
                                <Icon className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{event.title}</span>
                              </div>
                            </button>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground pl-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {(viewMode === "week" || viewMode === "day") && (
            <div className="space-y-4">
              {displayDays.map((day) => {
                const dayEvents = getEventsForDay(day);
                const isDayToday = isToday(day);

                return (
                  <Card key={day.toString()} className="p-6">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                      <div className={`${isDayToday ? "text-primary" : ""}`}>
                        <div className="text-sm font-medium">{format(day, "EEEE")}</div>
                        <div className="text-2xl font-bold">{format(day, "d")}</div>
                        <div className="text-xs text-muted-foreground">{format(day, "MMM")}</div>
                      </div>
                      <div className="flex-1">
                        {dayEvents.length > 0 ? (
                          <p className="text-sm text-muted-foreground">
                            {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"} scheduled
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">No events scheduled</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((event) => {
                          const Icon = getEventTypeIcon(event.type);
                          return (
                            <button
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              className={`w-full text-left p-4 rounded-lg border ${getEventTypeColor(event.type)} hover:opacity-80 transition-all hover:-translate-y-0.5`}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                                    <Icon className="h-5 w-5" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold">{event.title}</h3>
                                    {event.reminder && (
                                      <Bell className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {event.description}
                                  </p>
                                  <div className="flex flex-wrap gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{event.startTime} - {event.endTime}</span>
                                    </div>
                                    {event.location && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{event.location}</span>
                                      </div>
                                    )}
                                    {event.attendees && event.attendees.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>{event.attendees.join(", ")}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No events scheduled for this day</p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Events Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event) => {
                const Icon = getEventTypeIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${getEventTypeColor(event.type)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(event.date, "MMM d, yyyy")} at {event.startTime}
                        </p>
                      </div>
                    </div>
                    {event.reminder && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Bell className="h-3 w-3" />
                        Reminder set
                      </Badge>
                    )}
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent && (
                <>
                  {(() => {
                    const Icon = getEventTypeIcon(selectedEvent.type);
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  {selectedEvent.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent && format(selectedEvent.date, "EEEE, MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4 pt-4">
              <p className="text-sm">{selectedEvent.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Attendees:</p>
                      <p className="text-muted-foreground">{selectedEvent.attendees.join(", ")}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Badge className={getEventTypeColor(selectedEvent.type)}>
                    {selectedEvent.type}
                  </Badge>
                  {selectedEvent.reminder && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Bell className="h-3 w-3" />
                      Reminder active
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                {!selectedEvent.reminder && (
                  <Button onClick={handleSetReminder} className="bg-gradient-primary">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                )}
                <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  Rocket, 
  ArrowLeft, 
  CheckCircle2,
  Circle,
  Calendar,
  Upload,
  MessageSquare,
  File,
  X,
  Paperclip,
  Clock,
  Target,
  Trophy
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  dueDate?: Date;
  linkedCalendarEvent?: string;
  milestone?: boolean;
  subtasks: Subtask[];
  comments: Comment[];
  files: UploadedFile[];
}

const ChecklistView = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Your Profile",
      description: "Add your photo, bio, and contact information to help colleagues get to know you.",
      category: "Getting Started",
      completed: true,
      dueDate: new Date(2024, 11, 16),
      milestone: false,
      subtasks: [
        { id: "1-1", title: "Upload profile photo", completed: true },
        { id: "1-2", title: "Fill in bio information", completed: true },
        { id: "1-3", title: "Add contact details", completed: true },
      ],
      comments: [
        {
          id: "c1",
          author: "Sarah Johnson",
          text: "Great profile! Welcome to the team!",
          timestamp: new Date(2024, 11, 16, 14, 30),
        },
      ],
      files: [],
    },
    {
      id: "2",
      title: "Set Up Your Workspace",
      description: "Configure your development environment, tools, and access to necessary systems.",
      category: "Getting Started",
      completed: false,
      dueDate: new Date(2024, 11, 17),
      linkedCalendarEvent: "IT Setup Session",
      milestone: false,
      subtasks: [
        { id: "2-1", title: "Install required software", completed: true },
        { id: "2-2", title: "Configure VPN access", completed: false },
        { id: "2-3", title: "Set up email and calendar", completed: false },
        { id: "2-4", title: "Join team communication channels", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "3",
      title: "Meet Your Team",
      description: "Schedule 1-on-1 meetings with key team members and stakeholders.",
      category: "People & Culture",
      completed: false,
      dueDate: new Date(2024, 11, 19),
      linkedCalendarEvent: "Department Orientation",
      milestone: false,
      subtasks: [
        { id: "3-1", title: "Meet with direct manager", completed: false },
        { id: "3-2", title: "Connect with team mentor", completed: false },
        { id: "3-3", title: "Meet department colleagues", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "4",
      title: "Review Company Policies",
      description: "Read and acknowledge important company policies, handbook, and code of conduct.",
      category: "Compliance",
      completed: false,
      dueDate: new Date(2024, 11, 18),
      milestone: false,
      subtasks: [
        { id: "4-1", title: "Read employee handbook", completed: false },
        { id: "4-2", title: "Review code of conduct", completed: false },
        { id: "4-3", title: "Complete policy acknowledgment form", completed: false },
        { id: "4-4", title: "Upload signed documents", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "5",
      title: "Complete Security Training",
      description: "Finish mandatory security and compliance training modules.",
      category: "Training",
      completed: false,
      dueDate: new Date(2024, 11, 20),
      milestone: false,
      subtasks: [
        { id: "5-1", title: "Watch security awareness videos", completed: false },
        { id: "5-2", title: "Pass security quiz", completed: false },
        { id: "5-3", title: "Set up 2FA on all accounts", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "6",
      title: "First Week Milestone",
      description: "Congratulations on completing your first week! Reflect on your progress.",
      category: "Milestones",
      completed: false,
      dueDate: new Date(2024, 11, 20),
      linkedCalendarEvent: "First Week Milestone",
      milestone: true,
      subtasks: [
        { id: "6-1", title: "Complete self-reflection survey", completed: false },
        { id: "6-2", title: "Share feedback with HR", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "7",
      title: "Learn Product & Services",
      description: "Deep dive into our products, services, and value proposition.",
      category: "Training",
      completed: false,
      dueDate: new Date(2024, 11, 23),
      linkedCalendarEvent: "Product Training",
      milestone: false,
      subtasks: [
        { id: "7-1", title: "Complete product overview course", completed: false },
        { id: "7-2", title: "Explore demo environment", completed: false },
        { id: "7-3", title: "Shadow customer support session", completed: false },
      ],
      comments: [],
      files: [],
    },
    {
      id: "8",
      title: "30-Day Review",
      description: "Review your first month, discuss achievements, and set goals for the next period.",
      category: "Milestones",
      completed: false,
      dueDate: new Date(2024, 11, 27),
      linkedCalendarEvent: "30-Day Check-in",
      milestone: true,
      subtasks: [
        { id: "8-1", title: "Prepare accomplishments summary", completed: false },
        { id: "8-2", title: "Set goals for next 30 days", completed: false },
        { id: "8-3", title: "Schedule review meeting", completed: false },
      ],
      comments: [],
      files: [],
    },
  ]);

  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationTask, setCelebrationTask] = useState<Task | null>(null);

  const categories = Array.from(new Set(tasks.map(t => t.category)));

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        
        // Show celebration for milestones
        if (newCompleted && task.milestone) {
          setCelebrationTask(task);
          setShowCelebration(true);
        }
        
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
    
    toast.success("Progress updated!");
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(st => 
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    }));
  };

  const addComment = (taskId: string) => {
    const commentText = newComment[taskId];
    if (!commentText?.trim()) return;

    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const comment: Comment = {
          id: `c-${Date.now()}`,
          author: "You",
          text: commentText,
          timestamp: new Date(),
        };
        return { ...task, comments: [...task.comments, comment] };
      }
      return task;
    }));

    setNewComment(prev => ({ ...prev, [taskId]: "" }));
    toast.success("Comment added!");
  };

  const handleFileUpload = (taskId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: `f-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
    }));

    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, files: [...task.files, ...newFiles] };
      }
      return task;
    }));

    toast.success(`${newFiles.length} file(s) uploaded successfully!`);
  };

  const removeFile = (taskId: string, fileId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, files: task.files.filter(f => f.id !== fileId) };
      }
      return task;
    }));
    toast.success("File removed");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const calculateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / total) * 100);
  };

  const calculateCategoryProgress = (category: string) => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const completed = categoryTasks.filter(t => t.completed).length;
    return Math.round((completed / categoryTasks.length) * 100);
  };

  const getTaskIcon = (task: Task) => {
    if (task.completed) return CheckCircle2;
    if (task.milestone) return Target;
    return Circle;
  };

  const getTaskColor = (task: Task) => {
    if (task.completed) return "text-primary";
    if (task.milestone) return "text-secondary";
    return "text-muted-foreground";
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
          <h1 className="text-4xl font-bold mb-2">Onboarding Checklist</h1>
          <p className="text-lg text-muted-foreground">
            Complete these tasks to ensure a smooth onboarding experience
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="p-6 mb-8 bg-gradient-primary text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Overall Progress</h2>
              <p className="opacity-90">
                {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
              </p>
            </div>
            <div className="text-4xl font-bold">{calculateProgress()}%</div>
          </div>
          <Progress value={calculateProgress()} className="h-3 bg-white/20" />
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</p>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.milestone).length}</p>
                <p className="text-sm text-muted-foreground">Milestones</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tasks by Category */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryTasks = tasks.filter(t => t.category === category);
            const progress = calculateCategoryProgress(category);

            return (
              <Card key={category} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{category}</h3>
                    <Badge variant="secondary">{progress}% Complete</Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <Accordion type="multiple" className="space-y-2">
                  {categoryTasks.map(task => {
                    const TaskIcon = getTaskIcon(task);
                    const subtaskProgress = task.subtasks.length > 0
                      ? Math.round((task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100)
                      : 0;

                    return (
                      <AccordionItem 
                        key={task.id} 
                        value={task.id}
                        className="border rounded-lg px-4 data-[state=open]:bg-muted/50"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-start gap-3 flex-1 text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTask(task.id);
                              }}
                              className="mt-1"
                            >
                              <TaskIcon className={`h-5 w-5 ${getTaskColor(task)}`} />
                            </button>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                  {task.title}
                                </h4>
                                {task.milestone && (
                                  <Badge className="bg-secondary/10 text-secondary">
                                    <Target className="h-3 w-3 mr-1" />
                                    Milestone
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-2">
                                {task.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 text-xs">
                                {task.dueDate && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Due {format(task.dueDate, "MMM d")}
                                  </Badge>
                                )}
                                
                                {task.linkedCalendarEvent && (
                                  <Badge 
                                    variant="outline" 
                                    className="flex items-center gap-1 cursor-pointer hover:bg-muted"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate("/calendar");
                                    }}
                                  >
                                    <Calendar className="h-3 w-3" />
                                    {task.linkedCalendarEvent}
                                  </Badge>
                                )}
                                
                                {task.subtasks.length > 0 && (
                                  <Badge variant="outline">
                                    {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                                  </Badge>
                                )}
                                
                                {task.comments.length > 0 && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {task.comments.length}
                                  </Badge>
                                )}
                                
                                {task.files.length > 0 && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Paperclip className="h-3 w-3" />
                                    {task.files.length}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-4">
                          <div className="pl-8 space-y-4">
                            {/* Subtasks */}
                            {task.subtasks.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2 flex items-center gap-2">
                                  Subtasks
                                  <Badge variant="secondary" className="text-xs">
                                    {subtaskProgress}%
                                  </Badge>
                                </h5>
                                <Progress value={subtaskProgress} className="h-1.5 mb-3" />
                                <div className="space-y-2">
                                  {task.subtasks.map(subtask => (
                                    <div key={subtask.id} className="flex items-center gap-2">
                                      <Checkbox
                                        checked={subtask.completed}
                                        onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                      />
                                      <label className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>
                                        {subtask.title}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* File Uploads */}
                            <div>
                              <h5 className="font-medium mb-2">Attachments</h5>
                              
                              {task.files.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {task.files.map(file => (
                                    <div 
                                      key={file.id}
                                      className="flex items-center justify-between p-2 rounded border border-border bg-muted/30"
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium truncate">{file.name}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)} • {format(file.uploadedAt, "MMM d, h:mm a")}
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(task.id, file.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <label>
                                <Input
                                  type="file"
                                  multiple
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(task.id, e)}
                                />
                                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                  <span>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Files
                                  </span>
                                </Button>
                              </label>
                            </div>

                            {/* Comments */}
                            <div>
                              <h5 className="font-medium mb-2">Comments</h5>
                              
                              {task.comments.length > 0 && (
                                <div className="space-y-3 mb-3">
                                  {task.comments.map(comment => (
                                    <div key={comment.id} className="p-3 rounded-lg border border-border bg-muted/30">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{comment.author}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {format(comment.timestamp, "MMM d, h:mm a")}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Textarea
                                  placeholder="Add a comment..."
                                  value={newComment[task.id] || ""}
                                  onChange={(e) => setNewComment(prev => ({ ...prev, [task.id]: e.target.value }))}
                                  className="min-h-[60px]"
                                />
                                <Button 
                                  size="sm"
                                  onClick={() => addComment(task.id)}
                                  disabled={!newComment[task.id]?.trim()}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Milestone Celebration Dialog */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-primary">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              Milestone Achieved! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Congratulations on completing: <strong>{celebrationTask?.title}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              You're making great progress on your onboarding journey. Keep up the excellent work!
            </p>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => setShowCelebration(false)}
              className="bg-gradient-primary"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChecklistView;

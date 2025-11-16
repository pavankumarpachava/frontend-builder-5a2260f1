import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { apiGetCourses } from "@/lib/api";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await apiGetCourses();
    setCourses(data);
  };

  const handleStartCourse = (courseTitle: string) => {
    toast.success(`Starting: ${courseTitle}`);
  };

  const completedCount = courses.filter(c => c.completed).length;
  const progressPercent = (completedCount / courses.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Courses & Videos</h1>
            <p className="text-muted-foreground">
              Complete your training to get up to speed
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 mb-8 bg-gradient-primary text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Your Progress</h2>
                <p className="opacity-90">
                  {completedCount} of {courses.length} courses completed
                </p>
              </div>
              <div className="text-4xl font-bold">{Math.round(progressPercent)}%</div>
            </div>
            <Progress value={progressPercent} className="h-3 bg-white/20" />
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{courses.length - completedCount}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Courses List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
            {courses.map((course) => (
              <Card key={course.id} className="p-6">
                <div className="flex items-center gap-6">
                  <div
                    className={`h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      course.completed ? "bg-green-500/10" : "bg-primary/10"
                    }`}
                  >
                    {course.completed ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <PlayCircle className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      {course.completed && (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Duration: {course.duration}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleStartCourse(course.title)}
                    variant={course.completed ? "outline" : "default"}
                  >
                    {course.completed ? "Review" : "Start Course"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;

import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminAnalytics = () => {
  const progressTrendData = [
    { month: "Jan", completed: 45, inProgress: 32, notStarted: 18 },
    { month: "Feb", completed: 52, inProgress: 28, notStarted: 15 },
    { month: "Mar", completed: 61, inProgress: 24, notStarted: 12 },
    { month: "Apr", completed: 68, inProgress: 22, notStarted: 10 },
    { month: "May", completed: 76, inProgress: 18, notStarted: 8 },
    { month: "Jun", completed: 82, inProgress: 15, notStarted: 5 },
  ];

  const moduleCompletionData = [
    { module: "Onboarding", completion: 92 },
    { module: "Technical", completion: 78 },
    { module: "Team", completion: 85 },
    { module: "Projects", completion: 68 },
    { module: "Culture", completion: 88 },
  ];

  const departmentData = [
    { name: "Engineering", value: 45 },
    { name: "Product", value: 25 },
    { name: "Design", value: 15 },
    { name: "Marketing", value: 10 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#a45cff", "#6f2cff", "#e879f9"];

  const handleExport = () => {
    // Mock CSV export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Module,Completion Rate\n"
      + moduleCompletionData.map(d => `${d.module},${d.completion}%`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Analytics & Reporting
            </h1>
            <p className="text-muted-foreground">Track performance and engagement metrics</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Completion Time</p>
              <p className="text-3xl font-bold">24 days</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">-3 days</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Overall Completion</p>
              <p className="text-3xl font-bold">82%</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+6%</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Learners</p>
              <p className="text-3xl font-bold">189</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+12</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Engagement Score</p>
              <p className="text-3xl font-bold">8.4/10</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+0.3</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Trend */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Onboarding Progress Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  name="In Progress"
                />
                <Line
                  type="monotone"
                  dataKey="notStarted"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  name="Not Started"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Distribution */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Users by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Module Completion */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Module Completion Rates</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="module" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip />
                <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Stats Table */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Module Performance Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Module</th>
                  <th className="text-left py-3 px-4 font-semibold">Completion Rate</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Users</th>
                  <th className="text-left py-3 px-4 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {moduleCompletionData.map((module, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{module.module}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[120px]">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${module.completion}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{module.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{5 + index} days</td>
                    <td className="py-3 px-4 text-muted-foreground">{180 + index * 10}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">{(4.5 + Math.random() * 0.4).toFixed(1)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;

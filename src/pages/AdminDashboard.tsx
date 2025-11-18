import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, ListTodo, UserCog, BookOpen, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const stats = [
    { icon: Users, label: "Total Users", value: "248", change: "+12%", color: "from-blue-500 to-cyan-500" },
    { icon: UserCheck, label: "Active Users", value: "189", change: "+8%", color: "from-green-500 to-emerald-500" },
    { icon: ListTodo, label: "Pending Tasks", value: "47", change: "-5%", color: "from-orange-500 to-amber-500" },
    { icon: UserCog, label: "Mentors Assigned", value: "32", change: "+3%", color: "from-purple-500 to-pink-500" },
    { icon: BookOpen, label: "Resources", value: "156", change: "+15%", color: "from-indigo-500 to-violet-500" },
    { icon: TrendingUp, label: "Completion Rate", value: "76%", change: "+4%", color: "from-rose-500 to-pink-500" },
  ];

  const progressData = [
    { month: "Jan", completed: 45, inProgress: 32, notStarted: 18 },
    { month: "Feb", completed: 52, inProgress: 28, notStarted: 15 },
    { month: "Mar", completed: 61, inProgress: 24, notStarted: 12 },
    { month: "Apr", completed: 68, inProgress: 22, notStarted: 10 },
    { month: "May", completed: 76, inProgress: 18, notStarted: 8 },
    { month: "Jun", completed: 82, inProgress: 15, notStarted: 5 },
  ];

  const userActivityData = [
    { day: "Mon", users: 45 },
    { day: "Tue", users: 52 },
    { day: "Wed", users: 48 },
    { day: "Thu", users: 61 },
    { day: "Fri", users: 55 },
    { day: "Sat", users: 38 },
    { day: "Sun", users: 42 },
  ];

  const recentSignups = [
    { name: "Alice Johnson", email: "alice@example.com", date: "2025-01-15", status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", date: "2025-01-14", status: "Pending" },
    { name: "Carol White", email: "carol@example.com", date: "2025-01-13", status: "Active" },
    { name: "David Brown", email: "david@example.com", date: "2025-01-12", status: "Active" },
    { name: "Eve Davis", email: "eve@example.com", date: "2025-01-11", status: "Pending" },
  ];

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Monitor and manage your onboarding platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Onboarding Progress Chart */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Onboarding Progress Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="inProgress" stroke="hsl(var(--secondary))" strokeWidth={2} />
                <Line type="monotone" dataKey="notStarted" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* User Activity Chart */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Weekly User Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Signups Table */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Sign-Ups</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((user, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {user.status}
                      </span>
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

export default AdminDashboard;

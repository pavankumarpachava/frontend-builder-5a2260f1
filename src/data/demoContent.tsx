import { DemoSlide } from "@/components/DemoPlayer";
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  Target, 
  BookOpen,
  TrendingUp,
  MessageSquare,
  Bell,
  Zap,
  Award,
  BarChart3,
  Clock
} from "lucide-react";

export const dashboardDemo: DemoSlide[] = [
  {
    id: 1,
    title: "Dashboard Overview",
    description: "Your personalized command center for onboarding success",
    content: (
      <div className="w-full space-y-6 animate-scale-in">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-white/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Calendar className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-white/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CheckCircle className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">12/20</div>
            <div className="text-sm text-muted-foreground">Tasks Complete</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-6 rounded-xl border border-white/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Team Mentors</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Checklist Progress",
    description: "Track your onboarding journey with visual progress indicators",
    content: (
      <div className="w-full space-y-4 animate-fade-in">
        <div className="space-y-3">
          {['Complete profile setup', 'Meet your mentor', 'Review company policies', 'Complete first training'].map((task, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-foreground flex-1">{task}</span>
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-primary">60%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-scale-in" style={{ width: '60%', transformOrigin: 'left' }} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Team Directory Quick Access",
    description: "Connect with your team members instantly",
    content: (
      <div className="grid grid-cols-4 gap-4 animate-fade-in">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <span className="text-xs text-foreground font-medium">Member {i}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    title: "Goals & Milestones",
    description: "Your personalized roadmap to success",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="relative pl-8">
          {[
            { title: 'Week 1: Getting Started', status: 'completed' },
            { title: 'Week 2: Deep Dive', status: 'current' },
            { title: 'Week 3: Advanced Skills', status: 'upcoming' },
            { title: 'Month 2: Independence', status: 'upcoming' }
          ].map((milestone, i) => (
            <div key={i} className="relative mb-6 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`absolute left-[-2rem] top-2 h-4 w-4 rounded-full border-2 ${
                milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                milestone.status === 'current' ? 'bg-primary border-primary animate-pulse' :
                'bg-muted border-muted'
              }`} />
              {i < 3 && <div className="absolute left-[-1.5rem] top-6 h-full w-0.5 bg-border" />}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="font-semibold text-foreground">{milestone.title}</div>
                <div className="text-sm text-muted-foreground capitalize">{milestone.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Resources & Training",
    description: "Access all your learning materials in one place",
    content: (
      <div className="grid grid-cols-2 gap-4 animate-fade-in">
        {[
          { icon: BookOpen, title: 'Company Handbook', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, title: 'Certifications', color: 'from-purple-500 to-pink-500' },
          { icon: Target, title: 'Skill Guides', color: 'from-green-500 to-teal-500' },
          { icon: Users, title: 'Team Resources', color: 'from-orange-500 to-red-500' }
        ].map((resource, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br ${resource.color} bg-opacity-10 rounded-xl border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
            <resource.icon className="h-10 w-10 text-white mb-3" />
            <h4 className="text-foreground font-semibold">{resource.title}</h4>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 6,
    title: "Quick Actions Panel",
    description: "Everything you need, just one click away",
    content: (
      <div className="grid grid-cols-3 gap-3 animate-fade-in">
        {[
          { icon: Calendar, label: 'Schedule Meeting' },
          { icon: MessageSquare, label: 'Ask Question' },
          { icon: Bell, label: 'View Updates' },
          { icon: Target, label: 'Set Goals' },
          { icon: BookOpen, label: 'Start Learning' },
          { icon: Users, label: 'Find Mentor' }
        ].map((action, i) => (
          <button key={i} className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <action.icon className="h-8 w-8 text-primary" />
            <span className="text-sm text-foreground font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    )
  }
];

export const aiDemo: DemoSlide[] = [
  {
    id: 1,
    title: "AI Assistant Welcome",
    description: "Your 24/7 intelligent onboarding companion",
    content: (
      <div className="flex flex-col items-center justify-center space-y-6 animate-scale-in">
        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
          <MessageSquare className="h-16 w-16 text-white" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Hi! I'm your AI Assistant</h3>
          <p className="text-muted-foreground">Ask me anything about your onboarding journey</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Answering Employee Questions",
    description: "Get instant, accurate responses to your questions",
    content: (
      <div className="space-y-4 max-w-2xl mx-auto animate-fade-in">
        <div className="flex justify-end animate-slide-in-right">
          <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm max-w-xs">
            What's the policy for remote work?
          </div>
        </div>
        <div className="flex justify-start animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/10 border border-white/20 backdrop-blur-sm text-foreground p-4 rounded-2xl rounded-tl-sm max-w-md">
            Our remote work policy allows up to 3 days per week of remote work after your first month. You'll need manager approval and must maintain core hours of 10am-3pm...
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Policy Recommendations",
    description: "Smart suggestions based on your role and questions",
    content: (
      <div className="grid grid-cols-2 gap-4 animate-fade-in">
        {[
          'Time Off Policy',
          'Benefits Guide',
          'Code of Conduct',
          'Security Guidelines'
        ].map((policy, i) => (
          <div key={i} className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <BookOpen className="h-8 w-8 text-primary mb-3" />
            <h4 className="text-foreground font-semibold">{policy}</h4>
            <p className="text-sm text-muted-foreground mt-2">Recommended for you</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    title: "Smart Search",
    description: "Find what you need with AI-powered search",
    content: (
      <div className="space-y-6 animate-fade-in">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full px-6 py-4 bg-white/10 border-2 border-primary rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all duration-300"
            value="vacation policy"
            readOnly
          />
        </div>
        <div className="space-y-3">
          {['Vacation & Time Off Policy', 'Holiday Schedule 2024', 'Sick Leave Guidelines'].map((result, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{result}</div>
                  <div className="text-xs text-muted-foreground">Document • Updated recently</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Personalized Guidance",
    description: "AI learns your needs and suggests relevant tasks",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-white/20 backdrop-blur-sm">
          <Zap className="h-8 w-8 text-primary mb-3" />
          <h4 className="text-lg font-semibold text-foreground mb-2">Suggested Next Steps</h4>
          <ul className="space-y-2">
            {[
              'Complete your security training',
              'Schedule 1-on-1 with your manager',
              'Review the team org chart',
              'Set up your development environment'
            ].map((task, i) => (
              <li key={i} className="flex items-center gap-2 text-foreground animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
];

export const automatedDemo: DemoSlide[] = [
  {
    id: 1,
    title: "Auto-Schedule Tasks",
    description: "Smart scheduling based on your availability",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2">{day}</div>
              <div className={`h-24 rounded-lg ${i < 5 ? 'bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30' : 'bg-muted/20'} animate-scale-in`} style={{ animationDelay: `${i * 0.05}s` }}>
                {i < 5 && (
                  <div className="p-2 space-y-1">
                    <div className="h-2 bg-primary/50 rounded" />
                    <div className="h-2 bg-accent/50 rounded" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Auto-Generate Checklists",
    description: "Role-specific tasks created automatically",
    content: (
      <div className="space-y-3 animate-fade-in">
        {[
          'Complete security training module',
          'Set up development environment',
          'Review codebase documentation',
          'Meet with team members',
          'Configure access permissions'
        ].map((task, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="h-6 w-6 rounded border-2 border-primary flex items-center justify-center animate-scale-in" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <span className="text-foreground flex-1">{task}</span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    )
  },
  {
    id: 3,
    title: "Automated Reminders",
    description: "Never miss important deadlines",
    content: (
      <div className="space-y-4 animate-fade-in">
        {[
          { title: 'Training due tomorrow', time: '2 hours ago', color: 'from-orange-500 to-red-500' },
          { title: 'Meeting with mentor at 2pm', time: '1 hour ago', color: 'from-blue-500 to-cyan-500' },
          { title: 'Complete profile setup', time: '30 min ago', color: 'from-purple-500 to-pink-500' }
        ].map((reminder, i) => (
          <div key={i} className={`p-4 bg-gradient-to-r ${reminder.color} bg-opacity-10 rounded-xl border border-white/20 flex items-start gap-3 animate-fade-in`} style={{ animationDelay: `${i * 0.2}s` }}>
            <Bell className="h-5 w-5 text-primary mt-1 animate-pulse" />
            <div className="flex-1">
              <div className="font-medium text-foreground">{reminder.title}</div>
              <div className="text-xs text-muted-foreground">{reminder.time}</div>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    title: "Integration with HR Tools",
    description: "Seamlessly connected to your existing systems",
    content: (
      <div className="grid grid-cols-3 gap-6 animate-fade-in">
        {[
          { name: 'Slack', color: 'from-purple-500 to-pink-500' },
          { name: 'Google', color: 'from-blue-500 to-cyan-500' },
          { name: 'Microsoft', color: 'from-green-500 to-teal-500' },
          { name: 'Zoom', color: 'from-blue-400 to-blue-600' },
          { name: 'Jira', color: 'from-indigo-500 to-purple-500' },
          { name: 'GitHub', color: 'from-gray-600 to-gray-800' }
        ].map((tool, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br ${tool.color} bg-opacity-10 rounded-xl border border-white/20 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-foreground font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 5,
    title: "End-to-End Automation",
    description: "Complete workflow automation from day one to day 90",
    content: (
      <div className="flex items-center justify-center animate-fade-in">
        <div className="space-y-4 w-full max-w-2xl">
          {[
            { step: 'New Hire Joins', icon: Users },
            { step: 'Auto-Create Profile', icon: CheckCircle },
            { step: 'Generate Tasks', icon: Target },
            { step: 'Schedule Meetings', icon: Calendar },
            { step: 'Track Progress', icon: BarChart3 },
            { step: 'Complete Onboarding', icon: Award }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 animate-slide-in-right" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
              <span className="text-foreground font-medium">{item.step}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

export const mentorDemo: DemoSlide[] = [
  {
    id: 1,
    title: "Mentor Profile",
    description: "Meet your dedicated onboarding mentor",
    content: (
      <div className="flex flex-col items-center space-y-6 animate-scale-in">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Users className="h-16 w-16 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-500 border-4 border-background" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground">Sarah Johnson</h3>
          <p className="text-muted-foreground">Senior Developer • 5 years experience</p>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {[
            { label: 'Mentees', value: '12' },
            { label: 'Rating', value: '4.9' },
            { label: 'Response', value: '<2h' }
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10 text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Weekly Check-Ins",
    description: "Regular conversations to track your progress",
    content: (
      <div className="space-y-4 max-w-2xl mx-auto animate-fade-in">
        {[
          { sender: 'mentor', text: "How's your first week going? Any blockers?" },
          { sender: 'you', text: "Going well! Just have a question about the deployment process." },
          { sender: 'mentor', text: "Great! Let's schedule a quick call to walk through it together." }
        ].map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'} animate-slide-in-right`} style={{ animationDelay: `${i * 0.2}s` }}>
            <div className={`max-w-xs p-4 rounded-2xl ${
              msg.sender === 'you' 
                ? 'bg-primary text-white rounded-tr-sm' 
                : 'bg-white/10 border border-white/20 text-foreground rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 3,
    title: "Feedback System",
    description: "Share and receive constructive feedback",
    content: (
      <div className="space-y-6 animate-fade-in">
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-green-500" />
            <h4 className="font-semibold text-foreground">Recent Feedback</h4>
          </div>
          <p className="text-foreground mb-4">"Great progress on the first project! Your code review skills are already impressive."</p>
          <div className="flex gap-2">
            {['👍', '🎉', '🚀', '💯'].map((emoji, i) => (
              <div key={i} className="text-2xl animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Meeting Scheduler",
    description: "Easy scheduling integrated with your calendar",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="grid grid-cols-5 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2">{day}</div>
              <div className="space-y-2">
                {[10, 14, 16].map((hour, j) => (
                  <button key={j} className={`w-full p-2 rounded-lg text-xs transition-all duration-300 ${
                    i === 2 && j === 1 
                      ? 'bg-gradient-to-br from-primary to-accent text-white' 
                      : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
                  } animate-scale-in`} style={{ animationDelay: `${(i * 3 + j) * 0.05}s` }}>
                    {hour}:00
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Tips & Best Practices",
    description: "Learn from your mentor's experience",
    content: (
      <div className="grid grid-cols-2 gap-4 animate-fade-in">
        {[
          { icon: Target, title: 'Goal Setting', tip: 'Set SMART goals for your first 90 days' },
          { icon: BookOpen, title: 'Learning Path', tip: 'Focus on one skill at a time' },
          { icon: Users, title: 'Networking', tip: 'Meet someone new each week' },
          { icon: Zap, title: 'Quick Wins', tip: 'Celebrate small victories' }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <item.icon className="h-8 w-8 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.tip}</p>
          </div>
        ))}
      </div>
    )
  }
];

export const learningDemo: DemoSlide[] = [
  {
    id: 1,
    title: "Learning Path Overview",
    description: "Your personalized journey to mastery",
    content: (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: 'Foundations', progress: 100, color: 'from-green-500 to-teal-500' },
            { title: 'Intermediate', progress: 60, color: 'from-blue-500 to-cyan-500' },
            { title: 'Advanced', progress: 20, color: 'from-purple-500 to-pink-500' },
            { title: 'Expert', progress: 0, color: 'from-orange-500 to-red-500' }
          ].map((level, i) => (
            <div key={i} className={`p-6 bg-gradient-to-br ${level.color} bg-opacity-10 rounded-xl border border-white/20 animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
              <h4 className="font-semibold text-foreground mb-4">{level.title}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-bold">{level.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${level.color} transition-all duration-1000`} style={{ width: `${level.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Skill Cards",
    description: "Interactive modules for each skill area",
    content: (
      <div className="grid grid-cols-3 gap-4 animate-fade-in">
        {[
          { skill: 'JavaScript', icon: BookOpen, level: 'Advanced' },
          { skill: 'React', icon: BookOpen, level: 'Intermediate' },
          { skill: 'TypeScript', icon: BookOpen, level: 'Beginner' },
          { skill: 'Node.js', icon: BookOpen, level: 'Intermediate' },
          { skill: 'Git', icon: BookOpen, level: 'Advanced' },
          { skill: 'Testing', icon: BookOpen, level: 'Beginner' }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:scale-105 hover:bg-white/10 transition-all duration-300 cursor-pointer animate-scale-in" style={{ animationDelay: `${i * 0.1}s`, transformStyle: 'preserve-3d' }}>
            <item.icon className="h-10 w-10 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-1">{item.skill}</h4>
            <span className="text-xs text-muted-foreground">{item.level}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 3,
    title: "Interactive Lessons",
    description: "Engaging video content and hands-on exercises",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border-2 border-white/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <button className="relative z-10 h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-video bg-white/5 rounded-lg border border-white/10 ${i === 1 ? 'ring-2 ring-primary' : ''} animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Quizzes",
    description: "Test your knowledge and track progress",
    content: (
      <div className="space-y-4 animate-fade-in">
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h4 className="text-lg font-semibold text-foreground mb-4">What is React?</h4>
          <div className="space-y-3">
            {[
              { text: 'A JavaScript library for building UIs', correct: true },
              { text: 'A programming language', correct: false },
              { text: 'A database system', correct: false },
              { text: 'A CSS framework', correct: false }
            ].map((option, i) => (
              <button key={i} className={`w-full p-4 rounded-lg border text-left transition-all duration-300 flex items-center gap-3 ${
                option.correct 
                  ? 'bg-green-500/10 border-green-500/50 text-foreground' 
                  : 'bg-white/5 border-white/10 text-foreground hover:bg-white/10'
              } animate-slide-in-right`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  option.correct ? 'border-green-500' : 'border-white/30'
                }`}>
                  {option.correct && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Certificates",
    description: "Earn recognition for your achievements",
    content: (
      <div className="flex items-center justify-center animate-scale-in">
        <div className="w-full max-w-lg p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="text-center space-y-6">
            <Award className="h-20 w-20 text-primary mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-foreground">Certificate of Completion</h3>
              <p className="text-muted-foreground mt-2">React Fundamentals</p>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground">Awarded to</p>
              <p className="text-xl font-bold text-foreground mt-1">Your Name</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export const analyticsDemo: DemoSlide[] = [
  {
    id: 1,
    title: "Overview of Insights",
    description: "Real-time analytics for better decision making",
    content: (
      <div className="grid grid-cols-4 gap-4 animate-fade-in">
        {[
          { label: 'Active Users', value: '127', change: '+12%', color: 'from-blue-500 to-cyan-500' },
          { label: 'Completion Rate', value: '87%', change: '+5%', color: 'from-green-500 to-teal-500' },
          { label: 'Avg. Time', value: '23d', change: '-3d', color: 'from-purple-500 to-pink-500' },
          { label: 'Satisfaction', value: '4.8', change: '+0.2', color: 'from-orange-500 to-red-500' }
        ].map((metric, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br ${metric.color} bg-opacity-10 rounded-xl border border-white/20 animate-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
            <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-orange-500'}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 2,
    title: "Employee Progress Charts",
    description: "Track individual and team progress over time",
    content: (
      <div className="space-y-6 animate-fade-in">
        {[
          { name: 'Week 1', value: 30 },
          { name: 'Week 2', value: 50 },
          { name: 'Week 3', value: 70 },
          { name: 'Week 4', value: 85 }
        ].map((week, i) => (
          <div key={i} className="space-y-2 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">{week.name}</span>
              <span className="text-primary font-bold">{week.value}%</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                style={{ width: `${week.value}%`, transitionDelay: `${i * 0.1}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 3,
    title: "Engagement Metrics",
    description: "Understand how employees interact with onboarding",
    content: (
      <div className="grid grid-cols-3 gap-6 animate-fade-in">
        {[
          { label: 'Login Frequency', value: 85, color: 'from-blue-500 to-cyan-500' },
          { label: 'Task Completion', value: 72, color: 'from-green-500 to-teal-500' },
          { label: 'Resource Usage', value: 91, color: 'from-purple-500 to-pink-500' }
        ].map((metric, i) => (
          <div key={i} className="flex flex-col items-center animate-scale-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  stroke="url(#gradient)" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - metric.value / 100)}`}
                  className="transition-all duration-1000"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-primary" stopColor="currentColor" />
                    <stop offset="100%" className="text-accent" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{metric.value}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">{metric.label}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    title: "Performance Heatmaps",
    description: "Identify patterns and bottlenecks",
    content: (
      <div className="space-y-3 animate-fade-in">
        {['Orientation', 'Training', 'Documentation', 'Team Integration', 'Tools Setup'].map((category, i) => (
          <div key={i} className="space-y-2 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="text-sm text-foreground font-medium">{category}</span>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }, (_, j) => {
                const intensity = Math.random();
                return (
                  <div 
                    key={j} 
                    className={`aspect-square rounded-sm transition-all duration-300 ${
                      intensity > 0.7 ? 'bg-green-500' :
                      intensity > 0.4 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ 
                      opacity: 0.3 + intensity * 0.7,
                      animationDelay: `${(i * 12 + j) * 0.01}s`
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 5,
    title: "Team Comparison",
    description: "Benchmark performance across departments",
    content: (
      <div className="space-y-4 animate-fade-in">
        {[
          { team: 'Engineering', score: 92 },
          { team: 'Product', score: 88 },
          { team: 'Design', score: 85 },
          { team: 'Marketing', score: 79 },
          { team: 'Sales', score: 76 }
        ].map((team, i) => (
          <div key={i} className="flex items-center gap-4 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-32 text-foreground font-medium">{team.team}</div>
            <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                style={{ width: `${team.score}%`, transitionDelay: `${i * 0.1}s` }}
              >
                <span className="text-white font-bold text-sm">{team.score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
];

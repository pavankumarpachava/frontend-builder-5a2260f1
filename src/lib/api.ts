// REST API Placeholder Functions
// These functions will be connected to a real backend later

export async function apiLogin(payload: { email: string; password: string }) {
  console.log("apiLogin called with:", payload);
  return {
    success: true,
    user: { id: "1", name: "John Doe", email: payload.email },
    token: "mock-jwt-token"
  };
}

export async function apiSignup(payload: { name: string; email: string; password: string }) {
  console.log("apiSignup called with:", payload);
  return {
    success: true,
    user: { id: "1", name: payload.name, email: payload.email }
  };
}

export async function apiGetUser() {
  console.log("apiGetUser called");
  return {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Software Engineer",
    department: "Engineering",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  };
}

export async function apiGetChecklist() {
  console.log("apiGetChecklist called");
  return [
    {
      id: "1",
      title: "Complete your profile",
      description: "Add your photo, bio, and contact info",
      completed: true,
      category: "Setup",
      dueDate: "2025-01-15"
    },
    {
      id: "2",
      title: "Set up your workspace",
      description: "Configure your development environment",
      completed: true,
      category: "Setup",
      dueDate: "2025-01-16"
    },
    {
      id: "3",
      title: "Meet your team",
      description: "Schedule 1-on-1s with team members",
      completed: false,
      category: "People",
      dueDate: "2025-01-20"
    }
  ];
}

export async function apiGetGoals() {
  console.log("apiGetGoals called");
  return [
    {
      id: "1",
      title: "Complete onboarding checklist",
      progress: 65,
      dueDate: "2025-02-01",
      type: "30-day"
    },
    {
      id: "2",
      title: "Ship first feature",
      progress: 30,
      dueDate: "2025-03-01",
      type: "60-day"
    },
    {
      id: "3",
      title: "Lead a project",
      progress: 10,
      dueDate: "2025-04-01",
      type: "90-day"
    }
  ];
}

export async function apiGetCalendarEvents() {
  console.log("apiGetCalendarEvents called");
  return [
    {
      id: "1",
      title: "Team introduction meeting",
      date: "2025-01-20T14:00:00",
      type: "meeting",
      location: "Conference Room A"
    },
    {
      id: "2",
      title: "IT setup session",
      date: "2025-01-21T10:00:00",
      type: "training",
      location: "IT Department"
    },
    {
      id: "3",
      title: "Department orientation",
      date: "2025-01-24T09:00:00",
      type: "milestone",
      location: "Main Hall"
    }
  ];
}

export async function apiGetTeamDirectory() {
  console.log("apiGetTeamDirectory called");
  return [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Engineering Manager",
      department: "Engineering",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: "2",
      name: "Mike Chen",
      role: "Senior Developer",
      department: "Engineering",
      email: "mike@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    {
      id: "3",
      name: "Emily Davis",
      role: "Product Manager",
      department: "Product",
      email: "emily@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    }
  ];
}

export async function apiGetMentorInfo() {
  console.log("apiGetMentorInfo called");
  return [
    {
      id: "1",
      name: "Alex Thompson",
      role: "Senior Engineer",
      expertise: ["React", "Node.js", "System Design"],
      availability: "Monday-Friday, 2-4 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      id: "2",
      name: "Jessica Lee",
      role: "Tech Lead",
      expertise: ["Leadership", "Career Growth", "Architecture"],
      availability: "Tuesday-Thursday, 10-12 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
    }
  ];
}

export async function apiGetCultureInfo() {
  console.log("apiGetCultureInfo called");
  return {
    values: [
      { title: "Innovation", description: "We embrace new ideas and technologies" },
      { title: "Collaboration", description: "We work together to achieve great things" },
      { title: "Excellence", description: "We strive for the highest quality" }
    ],
    traditions: [
      { title: "Friday Demos", description: "Weekly showcase of team achievements" },
      { title: "Team Lunches", description: "Monthly social gatherings" }
    ]
  };
}

export async function apiGetTrainingResources() {
  console.log("apiGetTrainingResources called");
  return [
    {
      id: "1",
      title: "Company Handbook",
      type: "document",
      url: "#",
      category: "Policies"
    },
    {
      id: "2",
      title: "Development Setup Guide",
      type: "document",
      url: "#",
      category: "Technical"
    },
    {
      id: "3",
      title: "Product Overview",
      type: "video",
      url: "#",
      category: "Product"
    }
  ];
}

export async function apiGetCourses() {
  console.log("apiGetCourses called");
  return [
    {
      id: "1",
      title: "Introduction to Our Tech Stack",
      duration: "2 hours",
      completed: false
    },
    {
      id: "2",
      title: "Company Culture & Values",
      duration: "1 hour",
      completed: true
    },
    {
      id: "3",
      title: "Security Best Practices",
      duration: "1.5 hours",
      completed: false
    }
  ];
}

export async function apiSendFeedback(payload: { type: string; message: string }) {
  console.log("apiSendFeedback called with:", payload);
  return {
    success: true,
    message: "Feedback submitted successfully"
  };
}

export async function apiGetNotifications() {
  console.log("apiGetNotifications called");
  return [
    {
      id: "1",
      title: "Welcome to OnboardX!",
      message: "Complete your profile to get started",
      read: false,
      timestamp: "2025-01-15T09:00:00"
    },
    {
      id: "2",
      title: "New task assigned",
      message: "Meet your team - due in 3 days",
      read: false,
      timestamp: "2025-01-16T10:30:00"
    },
    {
      id: "3",
      title: "Upcoming meeting",
      message: "Team introduction at 2:00 PM today",
      read: true,
      timestamp: "2025-01-16T14:00:00"
    }
  ];
}

export async function apiAskAssistant(question: string) {
  console.log("AI Assistant question:", question);
  // Will replace with actual backend call
  return {
    answer: "This is a placeholder AI response. Your question was: " + question
  };
}

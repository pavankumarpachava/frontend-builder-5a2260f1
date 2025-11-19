import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Mail, Workflow, BookOpen, Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [emailSettings, setEmailSettings] = useState({
    welcomeSubject: "Welcome to OnboardX!",
    welcomeBody: "Hi {{name}},\n\nWelcome to our company! We're excited to have you on board.\n\nBest regards,\nThe OnboardX Team",
    reminderSubject: "Don't forget to complete your onboarding tasks",
    reminderBody: "Hi {{name}},\n\nYou have pending onboarding tasks. Please login to complete them.\n\nBest regards,\nThe OnboardX Team",
  });

  const [workflowSettings, setWorkflowSettings] = useState({
    autoAssignMentor: true,
    sendWelcomeEmail: true,
    requireManagerApproval: false,
    onboardingDuration: "30",
  });

  const [defaultModules, setDefaultModules] = useState([
    { id: "1", name: "Welcome & Company Overview", assigned: true },
    { id: "2", name: "Tools & Technology Setup", assigned: true },
    { id: "3", name: "Team Structure & Processes", assigned: true },
    { id: "4", name: "First Project Guidelines", assigned: false },
  ]);

  const [systemPreferences, setSystemPreferences] = useState({
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    language: "en",
    theme: "light",
  });

  const handleSaveEmailTemplates = () => {
    toast({
      title: "Email Templates Saved",
      description: "Your email templates have been updated successfully",
    });
  };

  const handleSaveWorkflow = () => {
    toast({
      title: "Workflow Settings Saved",
      description: "Onboarding workflow has been updated",
    });
  };

  const handleSaveModules = () => {
    toast({
      title: "Default Modules Updated",
      description: "Default module assignments have been saved",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "System Preferences Saved",
      description: "System preferences have been updated",
    });
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Platform Settings
          </h1>
          <p className="text-muted-foreground">
            Configure email templates, workflows, modules, and system preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="email" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="workflow" className="gap-2">
              <Workflow className="h-4 w-4" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="modules" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Default Modules
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Email Templates Tab */}
          <TabsContent value="email" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Email Templates</h3>
              
              <div className="space-y-6">
                {/* Welcome Email */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-primary">Welcome Email</h4>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-subject">Subject Line</Label>
                    <Input
                      id="welcome-subject"
                      value={emailSettings.welcomeSubject}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, welcomeSubject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-body">Email Body</Label>
                    <Textarea
                      id="welcome-body"
                      value={emailSettings.welcomeBody}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, welcomeBody: e.target.value })
                      }
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Available variables: {`{{name}}, {{email}}, {{company}}`}
                    </p>
                  </div>
                </div>

                {/* Reminder Email */}
                <div className="space-y-4 pt-6 border-t">
                  <h4 className="text-lg font-medium text-primary">Reminder Email</h4>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-subject">Subject Line</Label>
                    <Input
                      id="reminder-subject"
                      value={emailSettings.reminderSubject}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, reminderSubject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-body">Email Body</Label>
                    <Textarea
                      id="reminder-body"
                      value={emailSettings.reminderBody}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, reminderBody: e.target.value })
                      }
                      rows={6}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveEmailTemplates}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Email Templates
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Onboarding Workflow</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-assign Mentor</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically assign a mentor to new employees
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.autoAssignMentor}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, autoAssignMentor: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Welcome Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Send welcome email when user account is created
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.sendWelcomeEmail}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, sendWelcomeEmail: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Manager Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Tasks require manager approval before completion
                    </p>
                  </div>
                  <Switch
                    checked={workflowSettings.requireManagerApproval}
                    onCheckedChange={(checked) =>
                      setWorkflowSettings({ ...workflowSettings, requireManagerApproval: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="onboarding-duration">Onboarding Duration (Days)</Label>
                  <Input
                    id="onboarding-duration"
                    type="number"
                    value={workflowSettings.onboardingDuration}
                    onChange={(e) =>
                      setWorkflowSettings({ ...workflowSettings, onboardingDuration: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={handleSaveWorkflow}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Workflow Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Default Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Default Module Assignments</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select which modules should be automatically assigned to new employees
              </p>
              
              <div className="space-y-4">
                {defaultModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <Label htmlFor={`module-${module.id}`} className="cursor-pointer">
                      {module.name}
                    </Label>
                    <Switch
                      id={`module-${module.id}`}
                      checked={module.assigned}
                      onCheckedChange={(checked) => {
                        setDefaultModules(
                          defaultModules.map((m) =>
                            m.id === module.id ? { ...m, assigned: checked } : m
                          )
                        );
                      }}
                    />
                  </div>
                ))}

                <Button
                  onClick={handleSaveModules}
                  className="w-full bg-gradient-to-r from-primary to-secondary mt-6"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Module Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* System Preferences Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">System Preferences</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={systemPreferences.timezone}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, timezone: value })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="CST">Central Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={systemPreferences.dateFormat}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, dateFormat: value })
                    }
                  >
                    <SelectTrigger id="date-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={systemPreferences.language}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, language: value })
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={systemPreferences.theme}
                    onValueChange={(value) =>
                      setSystemPreferences({ ...systemPreferences, theme: value })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSavePreferences}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save System Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

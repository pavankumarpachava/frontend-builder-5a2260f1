import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, User, Building2, Phone } from "lucide-react";
import { toast } from "sonner";

interface ScheduleDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleDemoModal = ({ isOpen, onClose }: ScheduleDemoModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("Demo request submitted:", formData);
    
    toast.success("Demo request submitted!", {
      description: "Our team will contact you within 24 hours to schedule your personalized demo."
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      employees: "",
      message: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-white/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Schedule Your Demo
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Get a personalized walkthrough of OnboardX
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
                className="bg-white/50 dark:bg-gray-900/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Work Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="bg-white/50 dark:bg-gray-900/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Company Name *
              </Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Corp"
                className="bg-white/50 dark:bg-gray-900/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="bg-white/50 dark:bg-gray-900/50 border-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees">Company Size</Label>
            <Input
              id="employees"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              placeholder="e.g., 50-100 employees"
              className="bg-white/50 dark:bg-gray-900/50 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">What would you like to learn about?</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your onboarding challenges and what you'd like to see in the demo..."
              className="bg-white/50 dark:bg-gray-900/50 border-white/20 min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform duration-300 border-0"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Request Demo
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            🎯 Average response time: <span className="font-semibold text-foreground">2 hours</span> • 
            📅 Demos available: <span className="font-semibold text-foreground">Mon-Fri 9AM-6PM EST</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

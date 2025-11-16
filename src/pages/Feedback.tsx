import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send } from "lucide-react";
import { apiSendFeedback } from "@/lib/api";
import { toast } from "sonner";

const Feedback = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiSendFeedback({ type, message });
      toast.success("Thank you! Your feedback has been submitted.");
      setType("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Share Your Feedback</h1>
            <p className="text-muted-foreground">
              Help us improve your onboarding experience
            </p>
          </div>

          {/* Info Card */}
          <Card className="p-6 mb-8 bg-gradient-primary text-white border-0">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-8 w-8 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold mb-2">Your Voice Matters</h2>
                <p className="opacity-90">
                  We're always looking to improve. Whether it's a suggestion, a question,
                  or something that could be better, we want to hear from you.
                </p>
              </div>
            </div>
          </Card>

          {/* Feedback Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="praise">Praise</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </Button>
            </form>
          </Card>

          {/* Additional Info */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-4">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Your feedback is reviewed by our team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>We'll respond within 24-48 hours if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Your suggestions help shape future improvements</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;

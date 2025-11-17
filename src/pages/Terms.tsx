import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="flex-1 container px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Legal
            </Badge>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using OnboardX ("the Service"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials on OnboardX for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                  of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to reverse engineer any software contained on OnboardX</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you create an account with us, you must provide accurate, complete, and current 
                  information at all times. Failure to do so constitutes a breach of the Terms, which may 
                  result in immediate termination of your account on our Service.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You are responsible for safeguarding the password that you use to access the Service and 
                  for any activities or actions under your password.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the 
                  exclusive property of OnboardX and its licensors. The Service is protected by copyright, 
                  trademark, and other laws of both the United States and foreign countries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service allows you to post, link, store, share and otherwise make available certain 
                  information, text, graphics, or other material. You are responsible for the content that 
                  you post on or through the Service, including its legality, reliability, and appropriateness.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may use the Service only for lawful purposes and in accordance with these Terms. 
                  You agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>In any way that violates any applicable national or international law or regulation</li>
                  <li>To transmit any material that is unlawful, threatening, abusive, or obscene</li>
                  <li>To impersonate or attempt to impersonate the Company or another user</li>
                  <li>To engage in any conduct that restricts or inhibits anyone's use of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the Service immediately, without 
                  prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                  limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall OnboardX, nor its directors, employees, partners, agents, suppliers, or 
                  affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  We will provide notice of any significant changes by posting the new Terms on this page with 
                  a new "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-primary font-semibold mt-2">
                  legal@onboardx.com
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

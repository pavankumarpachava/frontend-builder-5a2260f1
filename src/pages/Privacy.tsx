import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="flex-1 container px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Privacy & Security
            </Badge>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Create an account and use our Service</li>
                  <li>Fill out forms or provide feedback</li>
                  <li>Communicate with us via email or chat</li>
                  <li>Upload documents or other content to the platform</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This information may include your name, email address, company name, job title, 
                  and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Personalize your experience and deliver relevant content</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>With your consent or at your direction</li>
                  <li>With service providers who perform services on our behalf</li>
                  <li>To comply with legal obligations or respond to lawful requests</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take reasonable measures to help protect your information from loss, theft, misuse, 
                  unauthorized access, disclosure, alteration, and destruction. We use industry-standard 
                  encryption technologies and secure protocols to protect your data both in transit and at rest.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your information, we cannot 
                  guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide 
                  you services. We will retain and use your information as necessary to comply with our legal 
                  obligations, resolve disputes, and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your data to another service</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can exercise these rights by contacting us at privacy@onboardx.com or through 
                  your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to collect and track information about 
                  your activities on our Service. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent. However, if you do not accept cookies, you may not 
                  be able to use some portions of our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and maintained on computers located outside of your 
                  state, province, country, or other governmental jurisdiction where data protection laws may 
                  differ. We will take all steps reasonably necessary to ensure that your data is treated 
                  securely and in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service is not intended for use by children under the age of 13. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian and 
                  believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
                  advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-primary font-semibold">Email: privacy@onboardx.com</p>
                  <p className="text-muted-foreground">Data Protection Officer: dpo@onboardx.com</p>
                </div>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;

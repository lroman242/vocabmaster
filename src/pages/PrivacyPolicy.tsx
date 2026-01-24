import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Book className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VocabMaster</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="mb-2 text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mb-8 text-muted-foreground">Last updated: January 24, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                At VocabMaster, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our vocabulary learning application. 
                Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
                <li><strong>Profile Information:</strong> Optional profile picture and display name</li>
                <li><strong>Learning Data:</strong> Dictionaries, words, images, and your learning progress</li>
                <li><strong>Usage Data:</strong> Information about how you interact with the Service</li>
                <li><strong>Device Information:</strong> Device type, operating system, and browser type</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve the Service</li>
                <li>Personalize your learning experience using spaced repetition algorithms</li>
                <li>Send you notifications about your learning schedule and progress</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns to improve our Service</li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">4. Data Storage and Security</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. Your data is stored on 
                secure servers and encrypted both in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">5. Data Sharing</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li>With your consent or at your direction</li>
                <li>With service providers who assist in operating our Service</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">6. Your Rights</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal data:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to certain processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">7. Cookies and Tracking</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience. These help us 
                remember your preferences, understand how you use the Service, and improve our offerings. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">8. Children's Privacy</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">9. Changes to This Policy</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
                you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">10. Contact Us</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
                <a href="mailto:privacy@vocabmaster.app" className="text-primary hover:underline">
                  privacy@vocabmaster.app
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

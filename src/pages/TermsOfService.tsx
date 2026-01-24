import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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

          <h1 className="mb-2 text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="mb-8 text-muted-foreground">Last updated: January 24, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                By accessing or using VocabMaster ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service. We reserve the right to modify 
                these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                VocabMaster is a vocabulary learning application that uses spaced repetition techniques to help 
                users learn and retain foreign language vocabulary. The Service includes features such as dictionary 
                creation, word management, and various exercise types for practice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To use certain features of the Service, you must create an account. You are responsible for:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li>Providing accurate and complete registration information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">4. User Content</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                You retain ownership of any content you create using the Service, including dictionaries, words, 
                and images. By using the Service, you grant us a non-exclusive license to store and process your 
                content solely for the purpose of providing the Service to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">5. Acceptable Use</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                You agree not to:
              </p>
              <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Upload content that infringes on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to the Service or its systems</li>
                <li>Interfere with or disrupt the integrity of the Service</li>
                <li>Use automated systems to access the Service without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                The Service, including its original content, features, and functionality, is owned by VocabMaster 
                and is protected by international copyright, trademark, and other intellectual property laws. 
                Our trademarks may not be used without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">7. Termination</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior 
                notice, for conduct that we believe violates these Terms or is harmful to other users, us, or 
                third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                The Service is provided "as is" without warranties of any kind. We shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages resulting from your use of 
                or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">9. Contact Us</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@vocabmaster.app" className="text-primary hover:underline">
                  legal@vocabmaster.app
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Free to start, no credit card required",
  "Create unlimited dictionaries",
  "All 7 exercise types included",
  "Works offline on mobile",
];

const CTA = () => {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-3xl -z-10" />

          {/* Card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-border shadow-lg text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Start Your Learning Journey
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Master a New Language?
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of learners who are building their vocabulary the smart way. 
                15 minutes a day is all it takes.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-sm text-muted-foreground mt-6">
                No credit card required · Set up in 30 seconds
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

import { motion } from "framer-motion";
import { BookPlus, Repeat, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BookPlus,
    title: "Create Your Dictionary",
    description: "Start by creating a dictionary for the language you want to learn. Add words with translations, images, and context sentences to help them stick.",
    color: "bg-primary",
  },
  {
    number: "02",
    icon: Repeat,
    title: "Practice with Spaced Repetition",
    description: "The app schedules reviews at optimal intervals. Words you know well appear less often; struggling words come back sooner until mastered.",
    color: "bg-accent",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Watch your mastery scores climb from 0 to 100. Celebrate streaks, unlock achievements, and see exactly how much you've learned.",
    color: "bg-success",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Effective, Science-Backed
          </h2>
          <p className="text-lg text-muted-foreground">
            Our approach is based on decades of cognitive science research. 
            Start learning in under a minute.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 md:mb-16 last:mb-0 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Step Number & Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center shadow">
                    <span className="text-sm font-bold text-foreground">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`text-center md:text-left ${index % 2 === 1 ? "md:text-right" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { motion } from "framer-motion";
import { Brain, Zap, BarChart3, Image, Globe, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "Words are repeated at scientifically optimal intervals (24h, 72h, 1 week, 3 weeks) to maximize retention.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "7 Exercise Types",
    description: "From simple flashcards to challenging typing exercises, difficulty adapts to your mastery level.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Watch your mastery scores grow with visual progress bars, streaks, and detailed analytics.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Image,
    title: "Rich Media Support",
    description: "Add images, context sentences, and associations to make vocabulary stick in your memory.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Globe,
    title: "Any Language",
    description: "Create dictionaries for any language pair. Learn Spanish, Japanese, Arabic, or any language you choose.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Set your learning goals and receive reminders. Just 15 minutes, 3 times a week is all you need.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
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
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Master Vocabulary
          </h2>
          <p className="text-lg text-muted-foreground">
            Built on cognitive science principles, designed for real results. 
            Every feature is crafted to help you learn faster and remember longer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

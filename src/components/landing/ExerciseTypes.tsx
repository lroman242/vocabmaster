import { motion } from "framer-motion";
import { Eye, Image, MessageSquare, Type, Pencil, Keyboard, CheckCircle } from "lucide-react";

const exercises = [
  {
    icon: Eye,
    name: "Simple Review",
    description: "See word, translation, image & context together",
    level: "Beginner",
    levelColor: "bg-success/10 text-success",
    mastery: "0-20",
  },
  {
    icon: Image,
    name: "Association",
    description: "See an image, choose the matching word",
    level: "Easy",
    levelColor: "bg-success/10 text-success",
    mastery: "0-60",
  },
  {
    icon: MessageSquare,
    name: "Context",
    description: "Fill the blank in a sentence",
    level: "Medium",
    levelColor: "bg-warning/10 text-warning",
    mastery: "0-60",
  },
  {
    icon: Type,
    name: "Translation",
    description: "See translation, choose the word",
    level: "Medium",
    levelColor: "bg-warning/10 text-warning",
    mastery: "0-60",
  },
  {
    icon: Pencil,
    name: "Association Hard",
    description: "See image, type the word correctly",
    level: "Hard",
    levelColor: "bg-danger/10 text-danger",
    mastery: "60+",
  },
  {
    icon: Keyboard,
    name: "Context Hard",
    description: "Fill the blank by typing",
    level: "Hard",
    levelColor: "bg-danger/10 text-danger",
    mastery: "60+",
  },
  {
    icon: CheckCircle,
    name: "Translation Hard",
    description: "See translation, type the word",
    level: "Expert",
    levelColor: "bg-primary/10 text-primary",
    mastery: "60+",
  },
  {
    icon: Pencil,
    name: "Writing",
    description: "Write sentences using the word",
    level: "Expert",
    levelColor: "bg-primary/10 text-primary",
    mastery: "80+",
  },
];

const ExerciseTypes = () => {
  return (
    <section id="exercises" className="py-20 md:py-32 bg-muted/30">
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
            8 Exercise Types
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Progressive Difficulty That Adapts to You
          </h2>
          <p className="text-lg text-muted-foreground">
            Start easy, build confidence, then challenge yourself. 
            Exercises automatically adjust based on your mastery score.
          </p>
        </motion.div>

        {/* Exercise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <exercise.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${exercise.levelColor}`}>
                  {exercise.level}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {exercise.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {exercise.description}
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Mastery:</span> {exercise.mastery}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mastery Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-sm font-medium text-foreground text-center mb-4">Mastery Progress</p>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-danger to-warning" />
              <div className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-r from-warning to-success" />
              <div className="absolute inset-y-0 left-2/3 w-1/3 bg-gradient-to-r from-success to-primary" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>0 - Learning</span>
              <span>50 - Familiar</span>
              <span>100 - Mastered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExerciseTypes;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Star,
  RotateCcw,
  CheckCircle2,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";

// Mock data - same structure as Dictionary page
const mockDictionary = {
  id: "1",
  name: "Spanish Basics",
  language: "Spanish",
  flag: "🇪🇸",
};

const mockWords = [
  {
    id: "1",
    term: "Hola",
    definition: "Hello",
    example: "¡Hola! ¿Cómo estás?",
    mastery: 100,
    image: "",
  },
  {
    id: "2",
    term: "Gracias",
    definition: "Thank you",
    example: "Muchas gracias por tu ayuda.",
    mastery: 85,
    image: "",
  },
  {
    id: "3",
    term: "Por favor",
    definition: "Please",
    example: "Por favor, pásame el agua.",
    mastery: 60,
    image: "",
  },
  {
    id: "4",
    term: "Buenos días",
    definition: "Good morning",
    example: "Buenos días, señor García.",
    mastery: 45,
    image: "",
  },
  {
    id: "5",
    term: "Adiós",
    definition: "Goodbye",
    example: "Adiós, nos vemos mañana.",
    mastery: 20,
    image: "",
  },
];

const getMasteryColor = (mastery: number) => {
  if (mastery === 100) return "text-success";
  if (mastery >= 67) return "text-primary";
  if (mastery >= 34) return "text-warning";
  return "text-muted-foreground";
};

const getMasteryBgColor = (mastery: number) => {
  if (mastery === 100) return "bg-success";
  if (mastery >= 67) return "bg-primary";
  if (mastery >= 34) return "bg-warning";
  return "bg-muted";
};

const getMasteryLabel = (mastery: number) => {
  if (mastery === 100) return "Mastered";
  if (mastery >= 67) return "Learning";
  if (mastery >= 34) return "Familiar";
  if (mastery > 0) return "New";
  return "Not started";
};

const SimpleReview = () => {
  const { dictionaryId } = useParams<{ dictionaryId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedWords, setReviewedWords] = useState<Set<string>>(new Set());

  const words = mockWords;
  const currentWord = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMarkReviewed = () => {
    setReviewedWords(new Set([...reviewedWords, currentWord.id]));
    if (currentIndex < words.length - 1) {
      handleNext();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setReviewedWords(new Set());
  };

  const isCompleted = currentIndex === words.length - 1 && reviewedWords.has(currentWord.id);

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Back to Dictionary */}
      <div className="container py-4">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(`/dictionaries/${dictionaryId}`)}>
          <ArrowLeft className="h-4 w-4" />
          Back to Dictionary
        </Button>
      </div>

      {/* Main Content */}
      <main className="container pb-8">
        <div className="mx-auto max-w-2xl">
          {/* Completion State */}
          {isCompleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-lg"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Review Complete!</h2>
              <p className="mb-8 text-muted-foreground">
                You've reviewed all {words.length} words in this session.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleRestart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Review Again
                </Button>
                <Button onClick={() => navigate(`/dictionaries/${dictionaryId}`)}>
                  Back to Dictionary
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Word Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                >
                  {/* Image Section */}
                  {currentWord.image ? (
                    <div className="relative h-48 w-full bg-muted">
                      <img
                        src={currentWord.image}
                        alt={currentWord.term}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <ImageIcon className="h-12 w-12 text-primary/30" />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Term */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-bold text-foreground">{currentWord.term}</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-muted-foreground hover:text-primary"
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      {currentWord.mastery === 100 && (
                        <Badge variant="secondary" className="border-success/20 bg-success/10 text-success">
                          <Star className="mr-1 h-3 w-3 fill-current" />
                          Mastered
                        </Badge>
                      )}
                    </div>

                    {/* Definition */}
                    <div className="mb-6">
                      <span className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        Definition
                      </span>
                      <p className="text-2xl text-foreground">{currentWord.definition}</p>
                    </div>

                    {/* Example */}
                    {currentWord.example && (
                      <div className="mb-6">
                        <span className="mb-2 block text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Example of usage
                        </span>
                        <p className="text-lg italic text-foreground/80">"{currentWord.example}"</p>
                      </div>
                    )}

                    {/* Mastery Progress */}
                    <div className="rounded-xl bg-muted/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Mastery Level
                        </span>
                        <span className={`text-sm font-semibold ${getMasteryColor(currentWord.mastery)}`}>
                          {currentWord.mastery}% • {getMasteryLabel(currentWord.mastery)}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentWord.mastery}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${getMasteryBgColor(currentWord.mastery)}`}
                        />
                      </div>
                    </div>

                    {/* Reviewed Badge */}
                    {reviewedWords.has(currentWord.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center justify-center gap-2 text-success"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Reviewed</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleMarkReviewed}
                  disabled={reviewedWords.has(currentWord.id)}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {reviewedWords.has(currentWord.id) ? "Reviewed" : "Mark as Reviewed"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentIndex === words.length - 1}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Word Dots Navigation */}
              <div className="mt-6 flex justify-center gap-2">
                {words.map((word, index) => (
                  <button
                    key={word.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-6 bg-primary"
                        : reviewedWords.has(word.id)
                        ? "bg-success"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SimpleReview;

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Image as ImageIcon,
  Volume2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockDictionary = {
  id: "1",
  name: "Spanish Basics",
  language: "Spanish",
  flag: "🇪🇸",
};

// Words with placeholder images for demo
const mockWords = [
  {
    id: "1",
    term: "Manzana",
    definition: "Apple",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2uj81?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    term: "Perro",
    definition: "Dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    term: "Casa",
    definition: "House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    term: "Sol",
    definition: "Sun",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  },
  {
    id: "5",
    term: "Libro",
    definition: "Book",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
  },
  {
    id: "6",
    term: "Agua",
    definition: "Water",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop",
  },
];

type ExerciseType = "image-to-word" | "word-to-image";
type AnswerState = "unanswered" | "correct" | "incorrect";

interface Exercise {
  type: ExerciseType;
  correctWord: typeof mockWords[0];
  options: typeof mockWords;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateExercises = (words: typeof mockWords): Exercise[] => {
  const exercises: Exercise[] = [];
  
  // Generate exercises alternating between types
  words.forEach((word, index) => {
    const type: ExerciseType = index % 2 === 0 ? "image-to-word" : "word-to-image";
    const otherWords = words.filter((w) => w.id !== word.id);
    const randomOthers = shuffleArray(otherWords).slice(0, 3);
    const options = shuffleArray([word, ...randomOthers]);
    
    exercises.push({
      type,
      correctWord: word,
      options,
    });
  });
  
  return shuffleArray(exercises);
};

const AssociationExercise = () => {
  const { dictionaryId } = useParams<{ dictionaryId: string }>();
  const navigate = useNavigate();
  
  const exercises = useMemo(() => generateExercises(mockWords), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex) / exercises.length) * 100;

  const handleSelectOption = (optionId: string) => {
    if (answerState !== "unanswered") return;
    setSelectedId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedId || answerState !== "unanswered") return;
    
    const isCorrect = selectedId === currentExercise.correctWord.id;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedId(null);
      setAnswerState("unanswered");
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedId(null);
    setAnswerState("unanswered");
    setCorrectCount(0);
    setShowResult(false);
  };

  const getOptionStyle = (optionId: string) => {
    if (answerState === "unanswered") {
      if (optionId === selectedId) {
        return "border-primary bg-primary/10 ring-2 ring-primary/30";
      }
      return "border-border hover:border-primary/50 hover:bg-primary/5";
    }
    if (optionId === currentExercise.correctWord.id) {
      return "border-success bg-success/10";
    }
    if (optionId === selectedId && answerState === "incorrect") {
      return "border-destructive bg-destructive/10";
    }
    return "border-border opacity-50";
  };

  const getMasteryPoints = () => {
    if (answerState === "correct") return "+10";
    if (answerState === "incorrect") return "-5";
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/dictionaries/${dictionaryId}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mockDictionary.flag}</span>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Association</h1>
                <p className="text-sm text-muted-foreground">{mockDictionary.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {exercises.length}
            </span>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mx-auto max-w-2xl">
          {showResult ? (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-lg"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Exercise Complete!</h2>
              <p className="mb-4 text-4xl font-bold text-primary">
                {correctCount} / {exercises.length}
              </p>
              <p className="mb-8 text-muted-foreground">
                {correctCount === exercises.length
                  ? "Perfect score! Amazing work!"
                  : correctCount >= exercises.length * 0.7
                  ? "Great job! Keep practicing!"
                  : "Keep learning, you'll get better!"}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleRestart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={() => navigate(`/dictionaries/${dictionaryId}`)}>
                  Back to Dictionary
                </Button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Exercise Type Label */}
                <div className="mb-6 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {currentExercise.type === "image-to-word" ? (
                      <>
                        <ImageIcon className="h-4 w-4" />
                        Choose the matching word
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4" />
                        Choose the matching image
                      </>
                    )}
                  </span>
                </div>

                {/* Question Card */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                  {currentExercise.type === "image-to-word" ? (
                    /* Show Image */
                    <div className="relative aspect-video w-full bg-muted">
                      <img
                        src={currentExercise.correctWord.image}
                        alt="What is this?"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="rounded-full bg-background/90 px-6 py-3 text-lg font-semibold text-foreground shadow-lg">
                          What is this?
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Show Word */
                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-12">
                      <h2 className="mb-2 text-4xl font-bold text-foreground">
                        {currentExercise.correctWord.term}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {currentExercise.correctWord.definition}
                      </p>
                    </div>
                  )}
                </div>

                {/* Options */}
                {currentExercise.type === "image-to-word" ? (
                  /* Word Options */
                  <div className="grid grid-cols-2 gap-3">
                    {currentExercise.options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={answerState === "unanswered" ? { scale: 1.02 } : {}}
                        whileTap={answerState === "unanswered" ? { scale: 0.98 } : {}}
                        onClick={() => handleSelectOption(option.id)}
                        disabled={answerState !== "unanswered"}
                        className={`relative flex flex-col items-center justify-center rounded-xl border-2 bg-card p-6 transition-all ${getOptionStyle(option.id)}`}
                      >
                        <span className="text-xl font-semibold text-foreground">{option.term}</span>
                        <span className="text-sm text-muted-foreground">{option.definition}</span>
                        {answerState !== "unanswered" && option.id === currentExercise.correctWord.id && (
                          <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-success" />
                        )}
                        {answerState === "incorrect" && option.id === selectedId && (
                          <XCircle className="absolute right-3 top-3 h-5 w-5 text-destructive" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  /* Image Options */
                  <div className="grid grid-cols-2 gap-3">
                    {currentExercise.options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={answerState === "unanswered" ? { scale: 1.02 } : {}}
                        whileTap={answerState === "unanswered" ? { scale: 0.98 } : {}}
                        onClick={() => handleSelectOption(option.id)}
                        disabled={answerState !== "unanswered"}
                        className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${getOptionStyle(option.id)}`}
                      >
                        <img
                          src={option.image}
                          alt="Option"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=300&fit=crop";
                          }}
                        />
                        {answerState !== "unanswered" && option.id === currentExercise.correctWord.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-success/20">
                            <CheckCircle2 className="h-12 w-12 text-success drop-shadow-lg" />
                          </div>
                        )}
                        {answerState === "incorrect" && option.id === selectedId && (
                          <div className="absolute inset-0 flex items-center justify-center bg-destructive/20">
                            <XCircle className="h-12 w-12 text-destructive drop-shadow-lg" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Check Button (before answer is checked) */}
                {answerState === "unanswered" && selectedId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Button onClick={handleCheckAnswer} className="w-full">
                      Check Answer
                    </Button>
                  </motion.div>
                )}

                {/* Feedback & Continue (after answer is checked) */}
                <AnimatePresence>
                  {answerState !== "unanswered" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6"
                    >
                      <div
                        className={`mb-4 flex items-center justify-center gap-2 rounded-xl p-4 ${
                          answerState === "correct"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {answerState === "correct" ? (
                          <>
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold">Correct!</span>
                            <span className="ml-2 rounded-full bg-success/20 px-3 py-1 text-sm font-bold">
                              {getMasteryPoints()} mastery
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5" />
                            <span className="font-semibold">
                              Incorrect. The answer is "{currentExercise.correctWord.term}"
                            </span>
                            <span className="ml-2 rounded-full bg-destructive/20 px-3 py-1 text-sm font-bold">
                              {getMasteryPoints()} mastery
                            </span>
                          </>
                        )}
                      </div>
                      <Button onClick={handleNext} className="w-full">
                        {currentIndex < exercises.length - 1 ? "Continue" : "See Results"}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssociationExercise;

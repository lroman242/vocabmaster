import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockDictionary = {
  id: "1",
  name: "Spanish Basics",
  language: "Spanish",
  flag: "🇪🇸",
};

// Words with example sentences containing blanks
const mockWords = [
  {
    id: "1",
    term: "Manzana",
    definition: "Apple",
    sentence: "Me gusta comer una ___ roja.",
    sentenceTranslation: "I like to eat a red apple.",
  },
  {
    id: "2",
    term: "Perro",
    definition: "Dog",
    sentence: "Mi ___ es muy amigable.",
    sentenceTranslation: "My dog is very friendly.",
  },
  {
    id: "3",
    term: "Casa",
    definition: "House",
    sentence: "Vivo en una ___ grande.",
    sentenceTranslation: "I live in a big house.",
  },
  {
    id: "4",
    term: "Sol",
    definition: "Sun",
    sentence: "El ___ brilla en el cielo.",
    sentenceTranslation: "The sun shines in the sky.",
  },
  {
    id: "5",
    term: "Libro",
    definition: "Book",
    sentence: "Estoy leyendo un ___ interesante.",
    sentenceTranslation: "I am reading an interesting book.",
  },
  {
    id: "6",
    term: "Agua",
    definition: "Water",
    sentence: "Necesito beber ___ fresca.",
    sentenceTranslation: "I need to drink fresh water.",
  },
  {
    id: "7",
    term: "Comida",
    definition: "Food",
    sentence: "La ___ está deliciosa.",
    sentenceTranslation: "The food is delicious.",
  },
  {
    id: "8",
    term: "Amigo",
    definition: "Friend",
    sentence: "Mi mejor ___ vive cerca.",
    sentenceTranslation: "My best friend lives nearby.",
  },
  {
    id: "9",
    term: "Tiempo",
    definition: "Time/Weather",
    sentence: "No tengo mucho ___ hoy.",
    sentenceTranslation: "I don't have much time today.",
  },
  {
    id: "10",
    term: "Música",
    definition: "Music",
    sentence: "Me encanta escuchar ___ clásica.",
    sentenceTranslation: "I love listening to classical music.",
  },
];

type AnswerState = "unanswered" | "correct" | "incorrect";

interface Exercise {
  word: (typeof mockWords)[0];
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
  const shuffledWords = shuffleArray(words).slice(0, 10);
  return shuffledWords.map((word) => ({ word }));
};

const ContextHardExercise = () => {
  const { dictionaryId } = useParams<{ dictionaryId: string }>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const exercises = useMemo(() => generateExercises(mockWords), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progress = (currentIndex / exercises.length) * 100;

  useEffect(() => {
    if (answerState === "unanswered" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, answerState]);

  const handleCheckAnswer = () => {
    if (!userInput.trim() || answerState !== "unanswered") return;

    const isCorrect =
      userInput.trim().toLowerCase() ===
      currentExercise.word.term.toLowerCase();
    setAnswerState(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setAnswerState("unanswered");
    } else {
      setShowResult(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (answerState === "unanswered" && userInput.trim()) {
        handleCheckAnswer();
      } else if (answerState !== "unanswered") {
        handleNext();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserInput("");
    setAnswerState("unanswered");
    setCorrectCount(0);
    setShowResult(false);
  };

  const getMasteryPoints = () => {
    if (answerState === "correct") return "+10";
    if (answerState === "incorrect") return "-5";
    return null;
  };

  const getInputStyle = () => {
    if (answerState === "unanswered") {
      return "";
    }
    if (answerState === "correct") {
      return "border-success bg-success/10 text-success focus-visible:ring-success";
    }
    return "border-destructive bg-destructive/10 text-destructive focus-visible:ring-destructive";
  };

  const renderSentenceWithInput = () => {
    const sentence = currentExercise.word.sentence;
    const parts = sentence.split("___");

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-medium text-foreground">
        <span>{parts[0]}</span>
        <Input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answerState !== "unanswered"}
          placeholder="Type here..."
          className={`inline-flex h-auto min-w-[140px] max-w-[200px] px-4 py-2 text-xl font-semibold text-center ${getInputStyle()}`}
        />
        <span>{parts[1]}</span>
      </div>
    );
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
                <h1 className="text-lg font-semibold text-foreground">
                  Context Hard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockDictionary.name}
                </p>
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
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Exercise Complete!
              </h2>
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
                <Button
                  variant="outline"
                  onClick={handleRestart}
                  className="gap-2"
                >
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
                    <MessageSquareText className="h-4 w-4" />
                    Type the correct word to complete the sentence
                  </span>
                </div>

                {/* Sentence Card */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                    {renderSentenceWithInput()}
                  </div>

                  {/* Translation hint */}
                  <div className="border-t border-border bg-muted/30 p-4 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      {currentExercise.word.sentenceTranslation.replace(
                        currentExercise.word.definition.toLowerCase(),
                        "___"
                      )}
                    </p>
                  </div>
                </div>

                {/* Word hint */}
                <div className="mb-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Type the word that means:{" "}
                    <span className="font-semibold text-foreground">
                      {currentExercise.word.definition}
                    </span>
                  </p>
                </div>

                {/* Check Button (before answer is checked) */}
                {answerState === "unanswered" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Button
                      onClick={handleCheckAnswer}
                      className="w-full"
                      disabled={!userInput.trim()}
                    >
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
                              Incorrect. The answer is "
                              {currentExercise.word.term}"
                            </span>
                            <span className="ml-2 rounded-full bg-destructive/20 px-3 py-1 text-sm font-bold">
                              {getMasteryPoints()} mastery
                            </span>
                          </>
                        )}
                      </div>
                      <Button onClick={handleNext} className="w-full">
                        {currentIndex < exercises.length - 1
                          ? "Continue"
                          : "See Results"}
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

export default ContextHardExercise;

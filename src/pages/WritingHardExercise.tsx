import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  PenLine,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockDictionary = {
  id: "1",
  name: "Spanish Basics",
  language: "Spanish",
  nativeLanguage: "English",
  flag: "🇪🇸",
};

const mockSentences = [
  { id: "1", english: "My dog likes bones", spanish: "A mi perro le gustan los huesos" },
  { id: "2", english: "The cat is sleeping on the sofa", spanish: "El gato está durmiendo en el sofá" },
  { id: "3", english: "I eat an apple every day", spanish: "Yo como una manzana cada día" },
  { id: "4", english: "The sun is very hot today", spanish: "El sol está muy caliente hoy" },
  { id: "5", english: "I am reading a book", spanish: "Estoy leyendo un libro" },
  { id: "6", english: "I need water please", spanish: "Necesito agua por favor" },
  { id: "7", english: "The house is very big", spanish: "La casa es muy grande" },
  { id: "8", english: "The moon is beautiful tonight", spanish: "La luna está hermosa esta noche" },
  { id: "9", english: "The tree has many leaves", spanish: "El árbol tiene muchas hojas" },
  { id: "10", english: "I like red flowers", spanish: "Me gustan las flores rojas" },
];

type AnswerState = "unanswered" | "correct" | "incorrect";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const WritingHardExercise = () => {
  const { dictionaryId } = useParams<{ dictionaryId: string }>();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sentences = useMemo(() => shuffleArray(mockSentences), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentSentence = sentences[currentIndex];
  const progress = (currentIndex / sentences.length) * 100;

  useEffect(() => {
    if (answerState === "unanswered" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentIndex, answerState]);

  const normalizeSentence = (sentence: string): string => {
    return sentence
      .toLowerCase()
      .trim()
      .replace(/[.,!?¿¡]/g, "") // Remove punctuation
      .replace(/\s+/g, " "); // Normalize whitespace
  };

  const checkSentenceMatch = (userSentence: string, correctSentence: string): boolean => {
    return normalizeSentence(userSentence) === normalizeSentence(correctSentence);
  };

  const handleCheckAnswer = () => {
    if (!userInput.trim() || answerState !== "unanswered") return;

    const isCorrect = checkSentenceMatch(userInput, currentSentence.spanish);
    setAnswerState(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setAnswerState("unanswered");
    } else {
      setShowResult(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Use Ctrl+Enter or Cmd+Enter to submit (since Enter is for new lines in textarea)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      if (answerState === "unanswered") {
        handleCheckAnswer();
      } else {
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

  const getTextareaStyle = () => {
    if (answerState === "correct") {
      return "border-success bg-success/10 text-success";
    }
    if (answerState === "incorrect") {
      return "border-destructive bg-destructive/10 text-destructive";
    }
    return "";
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
                  Writing Hard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockDictionary.name}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {sentences.length}
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
                {correctCount} / {sentences.length}
              </p>
              <p className="mb-8 text-muted-foreground">
                {correctCount === sentences.length
                  ? "Perfect score! Amazing work!"
                  : correctCount >= sentences.length * 0.7
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
                    <PenLine className="h-4 w-4" />
                    Translate this sentence to {mockDictionary.language}
                  </span>
                </div>

                {/* Sentence Card */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-12">
                    <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {mockDictionary.nativeLanguage}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                      "{currentSentence.english}"
                    </h2>
                  </div>
                </div>

                {/* Hint */}
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Write the complete translation in {mockDictionary.language}.
                    Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>+<kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Enter</kbd> to submit.
                  </p>
                </div>

                {/* Input Area */}
                <div className="mb-6">
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your translation here..."
                      disabled={answerState !== "unanswered"}
                      className={`min-h-[120px] resize-none text-base ${getTextareaStyle()}`}
                    />
                    {answerState === "correct" && (
                      <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-success" />
                    )}
                    {answerState === "incorrect" && (
                      <XCircle className="absolute right-3 top-3 h-5 w-5 text-destructive" />
                    )}
                  </div>
                </div>

                {/* Check Button */}
                {answerState === "unanswered" && (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={!userInput.trim()}
                    className="w-full"
                  >
                    Check Answer
                  </Button>
                )}

                {/* Feedback & Continue */}
                <AnimatePresence>
                  {answerState !== "unanswered" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div
                        className={`mb-4 flex flex-col items-center justify-center gap-2 rounded-xl p-4 ${
                          answerState === "correct"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {answerState === "correct" ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold">Great sentence!</span>
                            <span className="ml-2 rounded-full bg-success/20 px-3 py-1 text-sm font-bold">
                              {getMasteryPoints()} mastery
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-5 w-5" />
                              <span className="font-semibold">
                                Not quite right
                              </span>
                              <span className="ml-2 rounded-full bg-destructive/20 px-3 py-1 text-sm font-bold">
                                {getMasteryPoints()} mastery
                              </span>
                            </div>
                            <p className="mt-2 text-sm">
                              <span className="opacity-80">Correct answer: </span>
                              <strong className="text-foreground">{currentSentence.spanish}</strong>
                            </p>
                          </>
                        )}
                      </div>
                      <Button onClick={handleNext} className="w-full">
                        {currentIndex < sentences.length - 1
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

export default WritingHardExercise;

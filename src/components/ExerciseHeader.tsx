import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ExerciseHeaderProps {
  dictionaryId: string;
  exerciseName: string;
  dictionaryName: string;
  flag: string;
  currentIndex: number;
  totalCount: number;
}

const ExerciseHeader = ({
  dictionaryId,
  exerciseName,
  dictionaryName,
  flag,
  currentIndex,
  totalCount,
}: ExerciseHeaderProps) => {
  const navigate = useNavigate();
  const progress = (currentIndex / totalCount) * 100;

  return (
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
            <span className="text-2xl">{flag}</span>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {exerciseName}
              </h1>
              <p className="text-sm text-muted-foreground">{dictionaryName}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalCount}
          </span>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExerciseHeader;

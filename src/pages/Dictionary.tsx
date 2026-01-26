import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Book,
  Plus,
  Search,
  MoreVertical,
  Trash2,
  Edit2,
  GraduationCap,
  Volume2,
  Settings,
  User,
  LogOut,
  Bell,
  ImagePlus,
  X,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for a dictionary
const mockDictionary = {
  id: "1",
  name: "Spanish Basics",
  language: "Spanish",
  languageCode: "es",
  flag: "🇪🇸",
};

// Mock words data
const mockWords = [
  {
    id: "1",
    term: "Hola",
    definition: "Hello",
    example: "¡Hola! ¿Cómo estás?",
    mastery: 100,
    lastPracticed: "1 hour ago",
  },
  {
    id: "2",
    term: "Gracias",
    definition: "Thank you",
    example: "Muchas gracias por tu ayuda.",
    mastery: 85,
    lastPracticed: "2 hours ago",
  },
  {
    id: "3",
    term: "Por favor",
    definition: "Please",
    example: "Por favor, pásame el agua.",
    mastery: 60,
    lastPracticed: "1 day ago",
  },
  {
    id: "4",
    term: "Buenos días",
    definition: "Good morning",
    example: "Buenos días, señor García.",
    mastery: 45,
    lastPracticed: "2 days ago",
  },
  {
    id: "5",
    term: "Adiós",
    definition: "Goodbye",
    example: "Adiós, nos vemos mañana.",
    mastery: 20,
    lastPracticed: "3 days ago",
  },
  {
    id: "6",
    term: "Perdón",
    definition: "Sorry / Excuse me",
    example: "Perdón, ¿puede repetir eso?",
    mastery: 0,
    lastPracticed: "Never",
  },
];

type Word = typeof mockWords[0] & { image?: string };

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

const Dictionary = () => {
  const { id } = useParams<{ id: string }>();
  const [words, setWords] = useState(mockWords);
  const [searchQuery, setSearchQuery] = useState("");

  // Add word dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWord, setNewWord] = useState({ term: "", definition: "", example: "", image: "" });

  // Edit word dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [editWord, setEditWord] = useState({ term: "", definition: "", example: "", image: "" });

  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingWordId, setDeletingWordId] = useState<string | null>(null);

  const filteredWords = words.filter(
    (word) =>
      word.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWord = () => {
    if (!newWord.term.trim() || !newWord.definition.trim()) return;

    const word: Word = {
      id: Date.now().toString(),
      term: newWord.term,
      definition: newWord.definition,
      example: newWord.example,
      image: newWord.image,
      mastery: 0,
      lastPracticed: "Never",
    };

    setWords([word, ...words]);
    setNewWord({ term: "", definition: "", example: "", image: "" });
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (word: Word) => {
    setEditingWord(word);
    setEditWord({ term: word.term, definition: word.definition, example: word.example, image: word.image || "" });
    setIsEditDialogOpen(true);
  };

  const handleEditWord = () => {
    if (!editingWord || !editWord.term.trim() || !editWord.definition.trim()) return;

    setWords(
      words.map((w) =>
        w.id === editingWord.id
          ? { ...w, term: editWord.term, definition: editWord.definition, example: editWord.example, image: editWord.image }
          : w
      )
    );
    setIsEditDialogOpen(false);
    setEditingWord(null);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeletingWordId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingWordId) {
      setWords(words.filter((w) => w.id !== deletingWordId));
    }
    setIsDeleteDialogOpen(false);
    setDeletingWordId(null);
  };

  const handleStartPractice = (id: string) => {
    // TODO: Navigate to practice/exercise page for this word
    console.log("Starting practice for word:", id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Book className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VocabMaster</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">john@example.com</span>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Back Button & Title */}
        <div className="mb-6">
          <Link
            to="/dictionaries"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dictionaries
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{mockDictionary.flag}</span>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{mockDictionary.name}</h1>
                <p className="mt-1 text-muted-foreground">
                  {words.length} {words.length === 1 ? "word" : "words"} •{" "}
                  {words.filter((w) => w.mastery === 100).length} mastered
                </p>
              </div>
            </div>

            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Word
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search words..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Empty State */}
        {filteredWords.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-16"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {searchQuery ? "No words found" : "Add your first word"}
            </h3>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query."
                : "Start building your vocabulary by adding words to this dictionary."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Word
              </Button>
            )}
          </motion.div>
        )}

        {/* Words List */}
        <AnimatePresence mode="popLayout">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {filteredWords.map((word) => (
              <motion.div
                key={word.id}
                variants={rowVariants}
                layout
                exit={{ opacity: 0, x: -20 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Word Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{word.term}</h3>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      {word.mastery === 100 && (
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Mastered
                        </Badge>
                      )}
                    </div>
                    <p className="text-base text-foreground/80">{word.definition}</p>
                    {word.example && (
                      <p className="mt-2 text-sm text-muted-foreground italic">"{word.example}"</p>
                    )}
                  </div>

                  {/* Mastery Progress & Actions */}
                  <div className="flex items-center gap-4">
                    {/* Mastery Indicator */}
                    <div className="hidden sm:flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getMasteryColor(word.mastery)}`}>
                          {word.mastery}%
                        </span>
                        <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${word.mastery}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full rounded-full ${getMasteryBgColor(word.mastery)}`}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{getMasteryLabel(word.mastery)}</span>
                    </div>

                    {/* Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2 text-primary focus:text-primary"
                          onClick={() => handleStartPractice(word.id)}
                        >
                          <GraduationCap className="h-4 w-4" />
                          Master
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => handleOpenEditDialog(word)}
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => handleOpenDeleteDialog(word.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Mobile Mastery Indicator */}
                <div className="sm:hidden mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{getMasteryLabel(word.mastery)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${word.mastery}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${getMasteryBgColor(word.mastery)}`}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getMasteryColor(word.mastery)}`}>
                        {word.mastery}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Add Word Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Word</DialogTitle>
              <DialogDescription>
                Add a new word to your dictionary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="term">Word / Term</Label>
                <Input
                  id="term"
                  placeholder="e.g., Hola"
                  value={newWord.term}
                  onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="definition">Definition / Translation</Label>
                <Input
                  id="definition"
                  placeholder="e.g., Hello"
                  value={newWord.definition}
                  onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="example">Example of usage (with context)</Label>
                <Textarea
                  id="example"
                  placeholder="e.g., ¡Hola! ¿Cómo estás?"
                  value={newWord.example}
                  onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label>Image (optional)</Label>
                {newWord.image ? (
                  <div className="relative w-full h-32 rounded-md overflow-hidden border border-border">
                    <img src={newWord.image} alt="Word" className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => setNewWord({ ...newWord, image: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-colors">
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewWord({ ...newWord, image: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddWord}>Add Word</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Word Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Word</DialogTitle>
              <DialogDescription>
                Update the word details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-term">Word / Term</Label>
                <Input
                  id="edit-term"
                  placeholder="e.g., Hola"
                  value={editWord.term}
                  onChange={(e) => setEditWord({ ...editWord, term: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-definition">Definition / Translation</Label>
                <Input
                  id="edit-definition"
                  placeholder="e.g., Hello"
                  value={editWord.definition}
                  onChange={(e) => setEditWord({ ...editWord, definition: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-example">Example of usage (with context)</Label>
                <Textarea
                  id="edit-example"
                  placeholder="e.g., ¡Hola! ¿Cómo estás?"
                  value={editWord.example}
                  onChange={(e) => setEditWord({ ...editWord, example: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label>Image (optional)</Label>
                {editWord.image ? (
                  <div className="relative w-full h-32 rounded-md overflow-hidden border border-border">
                    <img src={editWord.image} alt="Word" className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => setEditWord({ ...editWord, image: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-colors">
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditWord({ ...editWord, image: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditWord}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Word?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete "
                {words.find((w) => w.id === deletingWordId)?.term}" from your dictionary.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Dictionary;
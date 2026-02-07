import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Book, ChevronRight, Search, MoreVertical, Trash2, Edit2 } from "lucide-react";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for dictionaries
const mockDictionaries = [
  {
    id: "1",
    name: "Spanish Basics",
    language: "Spanish",
    languageCode: "es",
    wordCount: 145,
    masteryProgress: 72,
    dueWords: 12,
    lastPracticed: "2 hours ago",
  },
  {
    id: "2",
    name: "French Cuisine",
    language: "French",
    languageCode: "fr",
    wordCount: 89,
    masteryProgress: 45,
    dueWords: 8,
    lastPracticed: "1 day ago",
  },
  {
    id: "3",
    name: "German Travel",
    language: "German",
    languageCode: "de",
    wordCount: 203,
    masteryProgress: 88,
    dueWords: 3,
    lastPracticed: "5 hours ago",
  },
  {
    id: "4",
    name: "Japanese N5",
    language: "Japanese",
    languageCode: "ja",
    wordCount: 312,
    masteryProgress: 23,
    dueWords: 45,
    lastPracticed: "3 days ago",
  },
];

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

const getLanguageFlag = (code: string) => {
  return languages.find((l) => l.code === code)?.flag || "🌐";
};

const getMasteryColor = (progress: number) => {
  if (progress < 34) return "bg-destructive";
  if (progress < 67) return "bg-warning";
  return "bg-success";
};

const Dictionaries = () => {
  const [dictionaries, setDictionaries] = useState(mockDictionaries);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDictionaryName, setNewDictionaryName] = useState("");
  const [newDictionaryLanguage, setNewDictionaryLanguage] = useState("");
  
  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDictionary, setEditingDictionary] = useState<typeof mockDictionaries[0] | null>(null);
  const [editDictionaryName, setEditDictionaryName] = useState("");
  const [editDictionaryLanguage, setEditDictionaryLanguage] = useState("");
  
  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingDictionaryId, setDeletingDictionaryId] = useState<string | null>(null);

  const filteredDictionaries = dictionaries.filter((dict) =>
    dict.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDictionary = () => {
    if (!newDictionaryName.trim() || !newDictionaryLanguage) return;

    const language = languages.find((l) => l.code === newDictionaryLanguage);
    const newDict = {
      id: Date.now().toString(),
      name: newDictionaryName,
      language: language?.name || "Unknown",
      languageCode: newDictionaryLanguage,
      wordCount: 0,
      masteryProgress: 0,
      dueWords: 0,
      lastPracticed: "Never",
    };

    setDictionaries([newDict, ...dictionaries]);
    setNewDictionaryName("");
    setNewDictionaryLanguage("");
    setIsCreateDialogOpen(false);
  };

  const handleOpenEditDialog = (dictionary: typeof mockDictionaries[0]) => {
    setEditingDictionary(dictionary);
    setEditDictionaryName(dictionary.name);
    setEditDictionaryLanguage(dictionary.languageCode);
    setIsEditDialogOpen(true);
  };

  const handleEditDictionary = () => {
    if (!editingDictionary || !editDictionaryName.trim() || !editDictionaryLanguage) return;

    const language = languages.find((l) => l.code === editDictionaryLanguage);
    setDictionaries(dictionaries.map((d) =>
      d.id === editingDictionary.id
        ? { ...d, name: editDictionaryName, language: language?.name || "Unknown", languageCode: editDictionaryLanguage }
        : d
    ));
    setIsEditDialogOpen(false);
    setEditingDictionary(null);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeletingDictionaryId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingDictionaryId) {
      setDictionaries(dictionaries.filter((d) => d.id !== deletingDictionaryId));
    }
    setIsDeleteDialogOpen(false);
    setDeletingDictionaryId(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Main Content */}
      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dictionaries</h1>
            <p className="mt-1 text-muted-foreground">
              {dictionaries.length} {dictionaries.length === 1 ? "dictionary" : "dictionaries"} •{" "}
              {dictionaries.reduce((acc, d) => acc + d.dueWords, 0)} words due for review
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Dictionary
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Dictionary</DialogTitle>
                <DialogDescription>
                  Start building your vocabulary by creating a new dictionary.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Dictionary Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Spanish Basics"
                    value={newDictionaryName}
                    onChange={(e) => setNewDictionaryName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={newDictionaryLanguage}
                    onValueChange={setNewDictionaryLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDictionary}>Create Dictionary</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search dictionaries..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Empty State */}
        {filteredDictionaries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-16"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {searchQuery ? "No dictionaries found" : "Create your first dictionary"}
            </h3>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query."
                : "Start building your vocabulary by creating a new dictionary."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Dictionary
              </Button>
            )}
          </motion.div>
        )}

        {/* Dictionary Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredDictionaries.map((dictionary) => (
              <motion.div
                key={dictionary.id}
                variants={cardVariants}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                {/* Language Flag */}
                <div className="absolute right-4 top-4 text-3xl">
                  {getLanguageFlag(dictionary.languageCode)}
                </div>

                {/* Menu */}
                <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="gap-2"
                        onClick={() => handleOpenEditDialog(dictionary)}
                      >
                        <Edit2 className="h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        onClick={() => handleOpenDeleteDialog(dictionary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{dictionary.name}</h3>
                  <p className="text-sm text-muted-foreground">{dictionary.language}</p>
                </div>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">{dictionary.wordCount}</span>
                    <span className="text-muted-foreground"> words</span>
                  </div>
                  {dictionary.dueWords > 0 && (
                    <div className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      {dictionary.dueWords} due
                    </div>
                  )}
                </div>

                {/* Mastery Progress */}
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mastery</span>
                    <span className="font-medium text-foreground">{dictionary.masteryProgress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dictionary.masteryProgress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`h-full rounded-full ${getMasteryColor(dictionary.masteryProgress)}`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Practiced {dictionary.lastPracticed}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary" asChild>
                    <Link to={`/dictionaries/${dictionary.id}`}>
                    Open
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Edit Dictionary Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Dictionary</DialogTitle>
              <DialogDescription>
                Update the name or language of your dictionary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Dictionary Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g., Spanish Basics"
                  value={editDictionaryName}
                  onChange={(e) => setEditDictionaryName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-language">Language</Label>
                <Select
                  value={editDictionaryLanguage}
                  onValueChange={setEditDictionaryLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDictionary}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Dictionary?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the dictionary
                and all {dictionaries.find(d => d.id === deletingDictionaryId)?.wordCount || 0} words within it.
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

export default Dictionaries;

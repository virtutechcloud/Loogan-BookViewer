"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  StickyNote,
  Highlighter,
  ZoomIn,
  ZoomOut,
  Maximize,
  Settings,
  List,
  Clock,
  User,
  Volume2,
  Eye,
  Type,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  RotateCcw,
  RotateCw,
  Download,
  Share,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: number;
  title: string;
  page: number;
  completed: boolean;
  inProgress: boolean;
  duration: string;
}

interface Bookmark {
  id: number;
  title: string;
  page: number;
  chapter: string;
  date: string;
  note?: string;
}

interface Note {
  id: number;
  content: string;
  page: number;
  chapter: string;
  date: string;
  color: string;
}

interface Highlight {
  id: number;
  text: string;
  page: number;
  chapter: string;
  date: string;
  color: "yellow" | "green" | "blue" | "pink";
}

export default function CurrentlyReadingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("toc");
  const [currentPage, setCurrentPage] = useState(45);
  const [totalPages] = useState(320);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  // Mock current book data
  const currentBook = {
    id: 1,
    title: "Introduction to Biology",
    author: "Dr. Sarah Johnson",
    course: "BIO 101",
    courseCode: "BIO 101",
    progress: 75,
    currentChapter: "Chapter 3: Evolution Theory",
    estimatedTimeLeft: "2h 15m",
    lastRead: "2 hours ago",
  };

  // Mock chapters data
  const chapters: Chapter[] = [
    {
      id: 1,
      title: "Cell Structure",
      page: 1,
      completed: true,
      inProgress: false,
      duration: "45 min",
    },
    {
      id: 2,
      title: "Genetics Basics",
      page: 25,
      completed: true,
      inProgress: false,
      duration: "60 min",
    },
    {
      id: 3,
      title: "Evolution Theory",
      page: 45,
      completed: false,
      inProgress: true,
      duration: "50 min",
    },
    {
      id: 4,
      title: "Ecology Systems",
      page: 78,
      completed: false,
      inProgress: false,
      duration: "55 min",
    },
    {
      id: 5,
      title: "Molecular Biology",
      page: 120,
      completed: false,
      inProgress: false,
      duration: "65 min",
    },
    {
      id: 6,
      title: "Biotechnology",
      page: 180,
      completed: false,
      inProgress: false,
      duration: "40 min",
    },
  ];

  // Mock bookmarks data
  const bookmarks: Bookmark[] = [
    {
      id: 1,
      title: "Cell Division Process",
      page: 15,
      chapter: "Chapter 1",
      date: "Nov 15, 2024",
      note: "Important for exam",
    },
    {
      id: 2,
      title: "DNA Replication",
      page: 32,
      chapter: "Chapter 2",
      date: "Nov 12, 2024",
    },
    {
      id: 3,
      title: "Natural Selection",
      page: 52,
      chapter: "Chapter 3",
      date: "Nov 10, 2024",
      note: "Key concept",
    },
  ];

  // Mock notes data
  const notes: Note[] = [
    {
      id: 1,
      content: "Remember to review mitosis stages for the exam",
      page: 18,
      chapter: "Chapter 1",
      date: "Nov 15, 2024",
      color: "yellow",
    },
    {
      id: 2,
      content: "Mendel's laws are fundamental to genetics",
      page: 28,
      chapter: "Chapter 2",
      date: "Nov 12, 2024",
      color: "blue",
    },
  ];

  // Mock highlights data
  const highlights: Highlight[] = [
    {
      id: 1,
      text: "Photosynthesis is the process by which plants convert light energy",
      page: 8,
      chapter: "Chapter 1",
      date: "Nov 14, 2024",
      color: "yellow",
    },
    {
      id: 2,
      text: "Darwin's theory of evolution by natural selection",
      page: 48,
      chapter: "Chapter 3",
      date: "Nov 11, 2024",
      color: "green",
    },
  ];

  const handlePageNavigation = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChapterClick = (chapter: Chapter) => {
    setCurrentPage(chapter.page);
  };

  const handleBookmark = () => {
    console.log("Bookmark added for page:", currentPage);
  };

  const handleHighlight = (color: string) => {
    console.log("Highlight added:", color, "on page:", currentPage);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Note added:", newNote, "on page:", currentPage);
      setNewNote("");
      setShowNoteDialog(false);
    }
  };

  const sidebarTabs = [
    { id: "toc", label: "Contents", icon: List },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "search", label: "Search", icon: Search },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderTableOfContents = () => (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm mb-3">Table of Contents</h3>
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className={cn(
            "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted",
            currentPage >= chapter.page &&
              currentPage <
                (chapters[chapters.indexOf(chapter) + 1]?.page ||
                  totalPages + 1)
              ? "bg-primary/10 border-primary"
              : ""
          )}
          onClick={() => handleChapterClick(chapter)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {chapter.completed ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : chapter.inProgress ? (
                <Clock className="h-4 w-4 text-yellow-500" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{chapter.title}</h4>
              <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                <span>Page {chapter.page}</span>
                <span>{chapter.duration}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookmarks = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Bookmarks</h3>
        <Button size="sm" variant="outline" onClick={handleBookmark}>
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="p-3 rounded-lg border hover:bg-muted cursor-pointer"
          onClick={() => handlePageNavigation(bookmark.page)}
        >
          <div className="flex items-start space-x-3">
            <Bookmark className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{bookmark.title}</h4>
              <p className="text-xs text-muted-foreground">
                {bookmark.chapter} • Page {bookmark.page}
              </p>
              {bookmark.note && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  "{bookmark.note}"
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {bookmark.date}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Notes & Highlights</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowNoteDialog(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>

      {/* Add Note Dialog */}
      {showNoteDialog && (
        <Card className="border-2 border-primary">
          <CardContent className="p-3">
            <Textarea
              placeholder="Add your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNoteDialog(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddNote}>
                Save Note
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-3 rounded-lg border hover:bg-muted cursor-pointer"
          onClick={() => handlePageNavigation(note.page)}
        >
          <div className="flex items-start space-x-3">
            <StickyNote className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {note.chapter} • Page {note.page} • {note.date}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Highlights */}
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="p-3 rounded-lg border hover:bg-muted cursor-pointer"
          onClick={() => handlePageNavigation(highlight.page)}
        >
          <div className="flex items-start space-x-3">
            <Highlighter
              className={cn(
                "h-4 w-4 flex-shrink-0 mt-0.5",
                highlight.color === "yellow"
                  ? "text-yellow-500"
                  : highlight.color === "green"
                  ? "text-green-500"
                  : highlight.color === "blue"
                  ? "text-blue-500"
                  : "text-pink-500"
              )}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm">"{highlight.text}"</p>
              <p className="text-xs text-muted-foreground mt-1">
                {highlight.chapter} • Page {highlight.page} • {highlight.date}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Search in Book</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      {searchQuery && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Search results for "{searchQuery}":
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border hover:bg-muted cursor-pointer">
              <p className="text-sm">Chapter 3: Evolution Theory</p>
              <p className="text-xs text-muted-foreground">
                ...the process of {searchQuery} is fundamental to
                understanding...
              </p>
              <p className="text-xs text-muted-foreground mt-1">Page 52</p>
            </div>
            <div className="p-3 rounded-lg border hover:bg-muted cursor-pointer">
              <p className="text-sm">Chapter 1: Cell Structure</p>
              <p className="text-xs text-muted-foreground">
                ...{searchQuery} plays a crucial role in cellular function...
              </p>
              <p className="text-xs text-muted-foreground mt-1">Page 18</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Reading Settings</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span className="text-sm">Font Size</span>
            </div>
            <span className="text-xs text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            max={24}
            min={12}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <span className="text-sm">Text-to-Speech</span>
          </div>
          <Switch checked={textToSpeech} onCheckedChange={setTextToSpeech} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm">High Contrast</span>
          </div>
          <Switch checked={highContrast} onCheckedChange={setHighContrast} />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium text-sm">Account & Sync</h4>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Sync Status</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600">Synced</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last synced: 2 minutes ago
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Currently Reading: {currentBook.title}
            </h1>
            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
              <span>{currentBook.course}</span>
              <span>•</span>
              <span>{currentBook.currentChapter}</span>
              <span>•</span>
              <span>{currentBook.estimatedTimeLeft} left</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{currentBook.progress}% complete</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Use the sidebar to navigate, search, or manage your notes and
          bookmarks.
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-r bg-background flex flex-col">
            {/* Sidebar Tabs */}
            <div className="border-b p-2">
              <div className="flex space-x-1">
                {sidebarTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab.id)}
                      className="flex-1"
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Content */}
            <ScrollArea className="flex-1 p-4">
              {activeTab === "toc" && renderTableOfContents()}
              {activeTab === "bookmarks" && renderBookmarks()}
              {activeTab === "notes" && renderNotes()}
              {activeTab === "search" && renderSearch()}
              {activeTab === "settings" && renderSettings()}
            </ScrollArea>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Book Viewer Controls */}
          <div className="border-b bg-background p-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageNavigation(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageNavigation(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm min-w-[60px] text-center">
                {zoomLevel}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleHighlight("yellow")}
              >
                <Highlighter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoteDialog(true)}
              >
                <StickyNote className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Book Content Viewer */}
          <div className="flex-1 bg-gray-50 p-8 overflow-auto">
            <div
              className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
                fontSize: `${fontSize}px`,
                filter: highContrast ? "contrast(150%)" : "none",
              }}
            >
              {/* Mock Book Content */}
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold mb-4">
                  Chapter 3: Evolution Theory
                </h1>
                <p className="mb-4">
                  Evolution is the change in the heritable traits of biological
                  populations over successive generations. These traits are the
                  expression of genes that are passed on from parent to
                  offspring during reproduction.
                </p>
                <p className="mb-4">
                  Charles Darwin's theory of evolution by natural selection is
                  one of the most important scientific theories ever developed.
                  It explains how species change over time and how new species
                  arise.
                </p>
                <h2 className="text-xl font-semibold mb-3 mt-6">
                  Natural Selection
                </h2>
                <p className="mb-4">
                  Natural selection is the differential survival and
                  reproduction of individuals due to differences in phenotype.
                  It is a key mechanism of evolution, the change in the
                  heritable traits characteristic of a population over
                  generations.
                </p>
                <p className="mb-4">
                  The concept of natural selection was originally developed in
                  the absence of a valid theory of heredity; at the time of
                  Darwin's writing, science had yet to develop modern theories
                  of genetics.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg my-6">
                  <h3 className="font-semibold mb-2">Key Points:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Variation exists within populations</li>
                    <li>Some variations are heritable</li>
                    <li>More offspring are produced than can survive</li>
                    <li>
                      Individuals with favorable traits are more likely to
                      survive and reproduce
                    </li>
                  </ul>
                </div>
                <p className="mb-4">
                  This process leads to the evolution of species over time, as
                  favorable traits become more common in populations while
                  unfavorable traits become less common.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="border-t bg-background p-3 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Reading Progress:
              </span>
              <Progress value={currentBook.progress} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {currentBook.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

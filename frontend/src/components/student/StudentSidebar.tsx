"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TableOfContents from "@/components/TableOfContents";
import {
  BookOpen,
  List,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Clock,
  Search,
  Type,
  Volume2,
  Eye,
  BarChart3,
  Highlighter,
  StickyNote,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  BookMarked,
  FileText,
  Headphones,
  Target,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TocSection {
  id: string;
  title: string;
  page: number;
  level: number;
  children?: TocSection[];
  completed?: boolean;
  inProgress?: boolean;
  duration?: string;
  bookmarked?: boolean;
}

interface StudentSidebarProps {
  searchQuery: string;
  books: any[];
  currentBook: any;
  setCurrentBook: (book: any) => void;
  bookmarks: any[];
  notes: any[];
  highlights: any[];
  fontSize: number;
  setFontSize: (size: number) => void;
  textToSpeech: boolean;
  setTextToSpeech: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  currentSectionId?: string;
  onSectionClick?: (section: TocSection) => void;
}

export default function StudentSidebar({
  searchQuery,
  books,
  currentBook,
  setCurrentBook,
  bookmarks,
  notes,
  highlights,
  fontSize,
  setFontSize,
  textToSpeech,
  setTextToSpeech,
  highContrast,
  setHighContrast,
  currentSectionId,
  onSectionClick,
}: StudentSidebarProps) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>(["library"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Navigation mapping for sub-menu items
  const getNavigationPath = (subItemId: string): string => {
    const routeMap: Record<string, string> = {
      // Dashboard
      dashboard: "/student",

      // Library routes
      "all-books": "/student/library/all-books",
      "currently-reading": "/student/library/currently-reading",
      completed: "/student/library/completed",

      // Bookmarks & Notes routes
      "bookmarks-list": "/student/bookmarks/bookmarks",
      "notes-list": "/student/bookmarks/notes",
      "highlights-list": "/student/bookmarks/highlights",

      // Accessibility routes
      "font-settings": "/student/accessibility/font-settings",
      "text-to-speech": "/student/accessibility/text-to-speech",
      "display-settings": "/student/accessibility/display-settings",

      // Progress & Stats routes
      "overall-progress": "/student/progress/overall",
      "reading-time": "/student/progress/reading-time",
      achievements: "/student/progress/achievements",

      // Settings routes
      account: "/student/settings/account",
      preferences: "/student/settings/preferences",
      sync: "/student/settings/sync",
    };

    return routeMap[subItemId] || "/student";
  };

  const handleSubItemClick = (subItemId: string) => {
    const path = getNavigationPath(subItemId);
    router.push(path);
  };

  const handleDashboardClick = () => {
    router.push("/student");
  };

  // Mock table of contents data - in real app, this would come from props or API
  const mockTocSections: TocSection[] =
    currentBook?.chapters?.map((chapter: any, index: number) => ({
      id: `chapter-${index + 1}`,
      title: chapter.title,
      page: chapter.page || (index + 1) * 20,
      level: 1,
      completed: chapter.completed,
      inProgress: chapter.inProgress,
      duration: chapter.duration,
      bookmarked: chapter.bookmarked,
      children: chapter.sections?.map((section: any, sIndex: number) => ({
        id: `chapter-${index + 1}-section-${sIndex + 1}`,
        title: section.title,
        page: section.page || (index + 1) * 20 + sIndex * 5,
        level: 2,
        completed: section.completed,
        inProgress: section.inProgress,
        duration: section.duration,
        bookmarked: section.bookmarked,
      })),
    })) || [];

  const handleTocSectionClick = (section: TocSection) => {
    if (onSectionClick) {
      onSectionClick(section);
    }
    console.log("Navigating to section:", section.title, "Page:", section.page);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
      subItems: [],
    },
    {
      id: "library",
      label: "My Library",
      icon: BookOpen,
      badge: books.length,
      subItems: [
        { id: "all-books", label: "All Books", icon: BookOpen },
        {
          id: "currently-reading",
          label: "Currently Reading",
          icon: BookMarked,
        },
        { id: "completed", label: "Completed", icon: Target },
      ],
    },
    {
      id: "bookmarks",
      label: "Bookmarks & Notes",
      icon: Bookmark,
      badge: bookmarks.length + notes.length + highlights.length,
      subItems: [
        { id: "bookmarks-list", label: "Bookmarks", icon: Bookmark },
        { id: "notes-list", label: "Notes", icon: StickyNote },
        { id: "highlights-list", label: "Highlights", icon: Highlighter },
      ],
    },
    {
      id: "accessibility",
      label: "Accessibility",
      icon: Eye,
      badge: null,
      subItems: [
        { id: "font-settings", label: "Font Settings", icon: Type },
        { id: "text-to-speech", label: "Text-to-Speech", icon: Volume2 },
        { id: "display-settings", label: "Display Settings", icon: Eye },
      ],
    },
    {
      id: "progress",
      label: "Progress & Stats",
      icon: BarChart3,
      badge: null,
      subItems: [
        { id: "overall-progress", label: "Overall Progress", icon: BarChart3 },
        { id: "reading-time", label: "Reading Time", icon: Clock },
        { id: "achievements", label: "Achievements", icon: Target },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
      subItems: [
        { id: "account", label: "Account", icon: User },
        { id: "preferences", label: "Preferences", icon: Settings },
        { id: "sync", label: "Sync & Backup", icon: FileText },
      ],
    },
  ];

  const renderLibraryTab = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Current Book</h3>
        <Badge variant="secondary" className="text-xs">
          {currentBook ? "Reading" : "None"}
        </Badge>
      </div>

      {currentBook ? (
        <div className="p-3 rounded-lg border bg-primary/5">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">
                {currentBook.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {currentBook.author}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentBook.course}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{currentBook.progress}%</span>
                </div>
                <Progress value={currentBook.progress} className="h-1" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground">
          <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No book selected</p>
          <p className="text-xs">Choose a book to start reading</p>
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium text-sm">Recent Books</h3>
        {books.slice(0, 3).map((book) => (
          <div
            key={book.id}
            className={cn(
              "p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors",
              currentBook?.id === book.id && "bg-primary/10 border-primary"
            )}
            onClick={() => setCurrentBook(book)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{book.title}</h4>
                <p className="text-xs text-muted-foreground">{book.course}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={book.progress} className="h-1 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {book.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTocTab = () => {
    if (!currentBook || !mockTocSections.length) {
      return (
        <div className="p-6 text-center text-muted-foreground">
          <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No table of contents</p>
          <p className="text-xs">Select a book to view its contents</p>
        </div>
      );
    }

    return (
      <div className="h-full">
        <TableOfContents
          sections={mockTocSections}
          currentSectionId={currentSectionId}
          onSectionClick={handleTocSectionClick}
          showProgress={true}
          showDuration={true}
          showBookmarks={true}
          className="h-full"
        />
      </div>
    );
  };

  const renderBookmarksTab = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Personal Bookmarks</h3>
          <Badge variant="secondary" className="text-xs">
            {bookmarks.length}
          </Badge>
        </div>

        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
            >
              <div className="flex items-start space-x-3">
                <Bookmark className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {bookmark.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {bookmark.chapter} • Page {bookmark.page}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bookmark.date}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <Bookmark className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">No bookmarks yet</p>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Notes & Highlights</h3>
          <Badge variant="secondary" className="text-xs">
            {notes.length + highlights.length}
          </Badge>
        </div>

        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-3">
              <StickyNote className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{note.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Page {note.page} • {note.date}
                </p>
              </div>
            </div>
          </div>
        ))}

        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-3">
              <Highlighter
                className={cn(
                  "h-4 w-4 flex-shrink-0 mt-0.5",
                  highlight.color === "yellow" && "text-yellow-500",
                  highlight.color === "green" && "text-green-500",
                  highlight.color === "blue" && "text-blue-500",
                  highlight.color === "pink" && "text-pink-500"
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm line-clamp-2">"{highlight.text}"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Page {highlight.page} • {highlight.date}
                </p>
              </div>
            </div>
          </div>
        ))}

        {notes.length === 0 && highlights.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            <StickyNote className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">No notes or highlights yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMoreTab = () => (
    <div className="space-y-6">
      {searchQuery && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <h3 className="font-medium text-sm">Search Results</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border hover:bg-muted cursor-pointer">
              <p className="text-sm">Chapter 3: Introduction to Biology</p>
              <p className="text-xs text-muted-foreground">
                ...the process of {searchQuery} is fundamental...
              </p>
            </div>
            <div className="p-3 rounded-lg border hover:bg-muted cursor-pointer">
              <p className="text-sm">Chapter 7: Advanced Concepts</p>
              <p className="text-xs text-muted-foreground">
                ...understanding {searchQuery} requires...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <h3 className="font-medium text-sm">Accessibility</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span className="text-sm">Font Size</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {fontSize}px
              </span>
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
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <h3 className="font-medium text-sm">Progress Tracking</h3>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-muted">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-muted text-center">
              <div className="text-lg font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Books Read</div>
            </div>
            <div className="p-2 rounded-lg bg-muted text-center">
              <div className="text-lg font-bold text-primary">45h</div>
              <div className="text-xs text-muted-foreground">Reading Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-background border-r">
      {/* Navigation Menu */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasSubItems = item.subItems.length > 0;

            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-3",
                    !hasSubItems && "hover:bg-primary/10"
                  )}
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpanded(item.id);
                    } else if (item.id === "dashboard") {
                      handleDashboardClick();
                    }
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge !== null && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {hasSubItems && (
                        <div className="ml-2">
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Button>

                {hasSubItems && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <Button
                          key={subItem.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                          onClick={() => handleSubItemClick(subItem.id)}
                        >
                          <SubIcon className="h-3 w-3 mr-2" />
                          <span className="text-xs">{subItem.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

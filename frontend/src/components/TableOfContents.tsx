"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  Hash,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TocSection {
  id: string;
  title: string;
  page: number;
  level: number; // 1 = chapter, 2 = section, 3 = subsection
  children?: TocSection[];
  completed?: boolean;
  inProgress?: boolean;
  duration?: string;
  bookmarked?: boolean;
}

interface TableOfContentsProps {
  sections: TocSection[];
  currentSectionId?: string;
  onSectionClick: (section: TocSection) => void;
  className?: string;
  showProgress?: boolean;
  showDuration?: boolean;
  showBookmarks?: boolean;
}

export default function TableOfContents({
  sections,
  currentSectionId,
  onSectionClick,
  className,
  showProgress = true,
  showDuration = true,
  showBookmarks = true,
}: TableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [focusedSectionId, setFocusedSectionId] = useState<string | null>(null);
  const currentSectionRef = useRef<HTMLDivElement>(null);

  // Auto-expand sections containing the current section
  useEffect(() => {
    if (currentSectionId) {
      const expandParents = (
        sections: TocSection[],
        targetId: string,
        parentIds: string[] = []
      ): boolean => {
        for (const section of sections) {
          const currentPath = [...parentIds, section.id];

          if (section.id === targetId) {
            setExpandedSections((prev) => new Set([...prev, ...parentIds]));
            return true;
          }

          if (
            section.children &&
            expandParents(section.children, targetId, currentPath)
          ) {
            return true;
          }
        }
        return false;
      };

      expandParents(sections, currentSectionId);
    }
  }, [currentSectionId, sections]);

  // Scroll current section into view
  useEffect(() => {
    if (currentSectionRef.current) {
      currentSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentSectionId]);

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleSectionClick = (section: TocSection, event: React.MouseEvent) => {
    event.preventDefault();
    onSectionClick(section);
  };

  const handleKeyDown = (event: React.KeyboardEvent, section: TocSection) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        onSectionClick(section);
        break;
      case "ArrowRight":
        if (section.children && !expandedSections.has(section.id)) {
          event.preventDefault();
          toggleExpanded(section.id);
        }
        break;
      case "ArrowLeft":
        if (section.children && expandedSections.has(section.id)) {
          event.preventDefault();
          toggleExpanded(section.id);
        }
        break;
    }
  };

  const getIcon = (section: TocSection) => {
    switch (section.level) {
      case 1:
        return <BookOpen className="h-4 w-4" />;
      case 2:
        return <FileText className="h-4 w-4" />;
      case 3:
        return <Hash className="h-3 w-3" />;
      default:
        return <Circle className="h-2 w-2" />;
    }
  };

  const getProgressIcon = (section: TocSection) => {
    if (section.completed) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    } else if (section.inProgress) {
      return <Play className="h-4 w-4 text-blue-500" />;
    } else {
      return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const calculateProgress = (sections: TocSection[]): number => {
    let total = 0;
    let completed = 0;

    const count = (secs: TocSection[]) => {
      secs.forEach((section) => {
        total++;
        if (section.completed) completed++;
        if (section.children) count(section.children);
      });
    };

    count(sections);
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const renderSection = (section: TocSection, depth: number = 0) => {
    const isExpanded = expandedSections.has(section.id);
    const isCurrent = section.id === currentSectionId;
    const isFocused = section.id === focusedSectionId;
    const hasChildren = section.children && section.children.length > 0;

    return (
      <div key={section.id} className="w-full">
        <div
          ref={isCurrent ? currentSectionRef : null}
          className={cn(
            "group flex items-center w-full text-left transition-all duration-200 rounded-md",
            "hover:bg-muted/50 focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
            isCurrent && "bg-primary/10 border-l-2 border-primary",
            isFocused && "ring-2 ring-ring",
            depth > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={(e) => handleSectionClick(section, e)}
          onKeyDown={(e) => handleKeyDown(e, section)}
          onFocus={() => setFocusedSectionId(section.id)}
          onBlur={() => setFocusedSectionId(null)}
          tabIndex={0}
          role="button"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-current={isCurrent ? "page" : undefined}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 mr-1 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(section.id);
              }}
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}

          {/* Progress Icon */}
          {showProgress && (
            <div className="mr-2 flex-shrink-0">{getProgressIcon(section)}</div>
          )}

          {/* Section Icon */}
          <div className="mr-2 flex-shrink-0 text-muted-foreground">
            {getIcon(section)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    "font-medium text-sm truncate transition-colors",
                    isCurrent ? "text-primary" : "text-foreground",
                    section.level === 1 && "font-semibold",
                    section.level === 3 && "text-xs"
                  )}
                >
                  {section.title}
                </h4>

                {/* Page number and duration */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    Page {section.page}
                  </span>

                  {showDuration && section.duration && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {section.duration}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bookmark indicator */}
              {showBookmarks && section.bookmarked && (
                <div className="ml-2 flex-shrink-0">
                  <Bookmark className="h-3 w-3 text-blue-500 fill-current" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {section.children!.map((child) => renderSection(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const overallProgress = calculateProgress(sections);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Table of Contents</h3>
          <Badge variant="secondary" className="text-xs">
            {sections.length} chapters
          </Badge>
        </div>

        {/* Overall Progress */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Reading Progress</span>
              <span className="font-medium">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {sections.map((section) => renderSection(section))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          Use arrow keys to navigate • Enter to jump to section
        </div>
      </div>
    </div>
  );
}

// Example usage component for demonstration
export function TableOfContentsExample() {
  const [currentSection, setCurrentSection] = useState("chapter-1-section-1");

  const mockSections: TocSection[] = [
    {
      id: "chapter-1",
      title: "Introduction to Biology",
      page: 1,
      level: 1,
      completed: true,
      duration: "45 min",
      children: [
        {
          id: "chapter-1-section-1",
          title: "What is Biology?",
          page: 2,
          level: 2,
          completed: true,
          duration: "15 min",
          bookmarked: true,
        },
        {
          id: "chapter-1-section-2",
          title: "Scientific Method",
          page: 8,
          level: 2,
          completed: true,
          duration: "20 min",
          children: [
            {
              id: "chapter-1-section-2-1",
              title: "Hypothesis Formation",
              page: 10,
              level: 3,
              completed: true,
              duration: "8 min",
            },
            {
              id: "chapter-1-section-2-2",
              title: "Experimental Design",
              page: 14,
              level: 3,
              completed: false,
              inProgress: true,
              duration: "12 min",
            },
          ],
        },
        {
          id: "chapter-1-section-3",
          title: "Characteristics of Life",
          page: 18,
          level: 2,
          completed: false,
          duration: "10 min",
        },
      ],
    },
    {
      id: "chapter-2",
      title: "Cell Structure and Function",
      page: 25,
      level: 1,
      completed: false,
      inProgress: true,
      duration: "60 min",
      children: [
        {
          id: "chapter-2-section-1",
          title: "Cell Theory",
          page: 26,
          level: 2,
          completed: false,
          duration: "20 min",
        },
        {
          id: "chapter-2-section-2",
          title: "Prokaryotic vs Eukaryotic",
          page: 32,
          level: 2,
          completed: false,
          duration: "25 min",
          bookmarked: true,
        },
        {
          id: "chapter-2-section-3",
          title: "Organelles",
          page: 40,
          level: 2,
          completed: false,
          duration: "15 min",
        },
      ],
    },
    {
      id: "chapter-3",
      title: "Genetics and Heredity",
      page: 55,
      level: 1,
      completed: false,
      duration: "75 min",
      children: [
        {
          id: "chapter-3-section-1",
          title: "DNA Structure",
          page: 56,
          level: 2,
          completed: false,
          duration: "30 min",
        },
        {
          id: "chapter-3-section-2",
          title: "Gene Expression",
          page: 68,
          level: 2,
          completed: false,
          duration: "25 min",
        },
        {
          id: "chapter-3-section-3",
          title: "Inheritance Patterns",
          page: 78,
          level: 2,
          completed: false,
          duration: "20 min",
        },
      ],
    },
  ];

  const handleSectionClick = (section: TocSection) => {
    setCurrentSection(section.id);
    console.log("Navigating to section:", section.title, "Page:", section.page);
  };

  return (
    <div className="h-[600px] w-[400px] border rounded-lg">
      <TableOfContents
        sections={mockSections}
        currentSectionId={currentSection}
        onSectionClick={handleSectionClick}
        showProgress={true}
        showDuration={true}
        showBookmarks={true}
      />
    </div>
  );
}

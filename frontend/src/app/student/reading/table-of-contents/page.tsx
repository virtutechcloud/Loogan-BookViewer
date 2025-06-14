"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  page: number;
  completed: boolean;
  inProgress: boolean;
  duration: string;
}

export default function TableOfContentsPage() {
  const [currentPage, setCurrentPage] = useState(45);
  const [totalPages] = useState(320);

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

  const handleChapterClick = (chapter: Chapter) => {
    setCurrentPage(chapter.page);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Table of Contents</h1>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{currentBook.title}</h2>
            <p className="text-sm text-muted-foreground">
              by {currentBook.author} • {currentBook.course}
            </p>
          </div>
          <Badge variant="secondary">{currentBook.progress}% complete</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{currentBook.progress}%</span>
        </div>
        <Progress value={currentBook.progress} className="h-2" />
      </div>

      {/* Table of Contents */}
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

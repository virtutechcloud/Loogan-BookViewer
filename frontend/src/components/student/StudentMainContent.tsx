"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Highlighter,
  StickyNote,
  Volume2,
  ZoomIn,
  ZoomOut,
  BookOpen,
} from "lucide-react";

interface StudentMainContentProps {
  currentBook: any;
  fontSize: number;
  textToSpeech: boolean;
  highContrast: boolean;
  onBookmark: () => void;
  onHighlight: (color: string) => void;
  onAddNote: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  currentPage: number;
  totalPages: number;
}

export default function StudentMainContent({
  currentBook,
  fontSize,
  textToSpeech,
  highContrast,
  onBookmark,
  onHighlight,
  onAddNote,
  onPreviousPage,
  onNextPage,
  currentPage,
  totalPages,
}: StudentMainContentProps) {
  if (!currentBook) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-xl font-semibold">No Book Selected</h2>
            <p className="text-muted-foreground">
              Select a book from the library to start reading
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Book Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold">{currentBook.title}</h1>
              <p className="text-sm text-muted-foreground">
                by {currentBook.author}
              </p>
            </div>
            <Badge variant="secondary">{currentBook.course}</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onBookmark}>
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onHighlight("yellow")}
            >
              <Highlighter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onAddNote}>
              <StickyNote className="h-4 w-4" />
            </Button>
            {textToSpeech && (
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Chapter Progress</span>
            <span>{currentBook.currentChapter?.progress || 0}%</span>
          </div>
          <Progress
            value={currentBook.currentChapter?.progress || 0}
            className="h-2"
          />
        </div>
      </div>

      {/* Book Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <Card className={highContrast ? "bg-black text-white" : ""}>
            <CardContent className="p-8">
              <div
                className="prose prose-lg max-w-none"
                style={{ fontSize: `${fontSize}px` }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  {currentBook.currentChapter?.title ||
                    "Chapter 1: Introduction"}
                </h2>

                <div className="space-y-6 leading-relaxed">
                  <p>
                    Welcome to this comprehensive guide on educational
                    technology and digital learning platforms. In this chapter,
                    we will explore the fundamental concepts that drive modern
                    educational systems and how technology has transformed the
                    way we learn and teach.
                  </p>

                  <p>
                    The evolution of educational technology has been remarkable
                    over the past few decades. From traditional blackboards to
                    interactive digital whiteboards, from printed textbooks to
                    dynamic e-books with multimedia content, the landscape of
                    education continues to evolve rapidly.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Key Learning Objectives
                  </h3>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Understand the role of technology in modern education
                    </li>
                    <li>
                      Explore different types of digital learning platforms
                    </li>
                    <li>
                      Learn about adaptive learning systems and personalization
                    </li>
                    <li>
                      Discover the benefits of multimedia content in education
                    </li>
                  </ul>

                  <p>
                    As we progress through this material, you'll notice various
                    interactive elements designed to enhance your learning
                    experience. Feel free to use the highlighting tools, add
                    personal notes, and bookmark important sections for future
                    reference.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-6">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Pro Tip
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200">
                      Use the table of contents in the sidebar to navigate
                      between chapters quickly. Your progress is automatically
                      saved as you read.
                    </p>
                  </div>

                  <p>
                    The integration of artificial intelligence and machine
                    learning in educational platforms has opened up new
                    possibilities for personalized learning experiences. These
                    systems can adapt to individual learning styles, pace, and
                    preferences, making education more effective and engaging
                    for students of all backgrounds.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Interactive Elements
                  </h3>

                  <p>
                    Throughout this book, you'll encounter various interactive
                    elements including:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Embedded videos and animations</li>
                    <li>Interactive quizzes and assessments</li>
                    <li>Downloadable resources and templates</li>
                    <li>Discussion forums and collaborative spaces</li>
                  </ul>

                  <p>
                    Remember to take advantage of the accessibility features
                    available in this platform. You can adjust the font size,
                    enable text-to-speech, and use high contrast mode to
                    optimize your reading experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="w-32">
              <Progress
                value={(currentPage / totalPages) * 100}
                className="h-2"
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  CheckCircle,
  Play,
  BookMarked,
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  course: string;
  courseCode: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  isCurrentlyReading: boolean;
  thumbnail?: string;
  description: string;
  totalPages: number;
  estimatedReadTime: string;
  lastAccessed?: string;
}

export default function AllBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - in real app this would come from API/database
  const books: Book[] = [
    {
      id: 1,
      title: "Introduction to Biology",
      author: "Dr. Sarah Johnson",
      course: "Biology Fundamentals",
      courseCode: "BIO 101",
      progress: 75,
      status: "in-progress",
      isCurrentlyReading: true,
      description:
        "Comprehensive introduction to biological sciences covering cell structure, genetics, and evolution.",
      totalPages: 450,
      estimatedReadTime: "12 hours",
      lastAccessed: "2 hours ago",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Prof. Michael Chen",
      course: "Calculus and Linear Algebra",
      courseCode: "MATH 201",
      progress: 45,
      status: "in-progress",
      isCurrentlyReading: false,
      description:
        "Advanced mathematical concepts including calculus, linear algebra, and differential equations.",
      totalPages: 680,
      estimatedReadTime: "18 hours",
      lastAccessed: "1 day ago",
    },
    {
      id: 3,
      title: "World History",
      author: "Dr. Emily Rodriguez",
      course: "Global Historical Perspectives",
      courseCode: "HIST 150",
      progress: 100,
      status: "completed",
      isCurrentlyReading: false,
      description:
        "Comprehensive overview of world history from ancient civilizations to modern times.",
      totalPages: 520,
      estimatedReadTime: "14 hours",
      lastAccessed: "3 days ago",
    },
    {
      id: 4,
      title: "Physics Principles",
      author: "Dr. James Wilson",
      course: "Introduction to Physics",
      courseCode: "PHYS 101",
      progress: 0,
      status: "not-started",
      isCurrentlyReading: false,
      description:
        "Fundamental principles of physics including mechanics, thermodynamics, and electromagnetism.",
      totalPages: 590,
      estimatedReadTime: "16 hours",
    },
    {
      id: 5,
      title: "Chemistry Essentials",
      author: "Prof. Lisa Anderson",
      course: "General Chemistry",
      courseCode: "CHEM 101",
      progress: 30,
      status: "in-progress",
      isCurrentlyReading: false,
      description:
        "Essential chemistry concepts covering atomic structure, bonding, and chemical reactions.",
      totalPages: 480,
      estimatedReadTime: "13 hours",
      lastAccessed: "5 days ago",
    },
    {
      id: 6,
      title: "English Literature",
      author: "Dr. Robert Thompson",
      course: "Modern Literature",
      courseCode: "ENG 201",
      progress: 85,
      status: "in-progress",
      isCurrentlyReading: false,
      description:
        "Survey of modern English literature from the 19th century to contemporary works.",
      totalPages: 420,
      estimatedReadTime: "11 hours",
      lastAccessed: "1 week ago",
    },
  ];

  // Get unique courses for filter dropdown
  const courses = useMemo(() => {
    const uniqueCourses = Array.from(new Set(books.map((book) => book.course)));
    return uniqueCourses.map((course) => {
      const book = books.find((b) => b.course === course);
      return {
        name: course,
        code: book?.courseCode || "",
      };
    });
  }, [books]);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.courseCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse =
        selectedCourse === "all" || book.course === selectedCourse;
      const matchesStatus =
        selectedStatus === "all" || book.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [books, searchQuery, selectedCourse, selectedStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleBookClick = (book: Book) => {
    // In real app, this would navigate to the reading view
    console.log("Opening book:", book.title);
    // Example: router.push(`/student/reader/${book.id}`)
  };

  const BookCard = ({ book }: { book: Book }) => (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
      onClick={() => handleBookClick(book)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex-shrink-0 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {book.author}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {book.courseCode}
              </Badge>
              {book.isCurrentlyReading && (
                <Badge variant="default" className="text-xs">
                  <BookMarked className="h-3 w-3 mr-1" />
                  Reading
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {book.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              {getStatusIcon(book.status)}
              <span className="text-muted-foreground">
                {getStatusText(book.status)}
              </span>
            </div>
            <span className="text-muted-foreground">{book.progress}%</span>
          </div>
          <Progress value={book.progress} className="h-1" />
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>{book.totalPages} pages</span>
          <span>{book.estimatedReadTime}</span>
        </div>

        {book.lastAccessed && (
          <p className="text-xs text-muted-foreground mt-2">
            Last read: {book.lastAccessed}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const BookListItem = ({ book }: { book: Book }) => (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-md group"
      onClick={() => handleBookClick(book)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex-shrink-0 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {book.description}
                </p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Badge variant="outline" className="text-xs">
                  {book.courseCode}
                </Badge>
                {book.isCurrentlyReading && (
                  <Badge variant="default" className="text-xs">
                    <BookMarked className="h-3 w-3 mr-1" />
                    Reading
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(book.status)}
                  <span>{getStatusText(book.status)}</span>
                </div>
                <span>{book.totalPages} pages</span>
                <span>{book.estimatedReadTime}</span>
                {book.lastAccessed && (
                  <span>Last read: {book.lastAccessed}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {book.progress}%
                </span>
                <Progress value={book.progress} className="h-1 w-20" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Library</h1>
        <p className="text-muted-foreground">
          Browse all your course books. Click any book to open it for reading
          and study.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books, authors, or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.name} value={course.name}>
                  {course.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredBooks.length} of {books.length} books
        </p>
        {(searchQuery ||
          selectedCourse !== "all" ||
          selectedStatus !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCourse("all");
              setSelectedStatus("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Books Display */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find more books.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredBooks.map((book) =>
            viewMode === "grid" ? (
              <BookCard key={book.id} book={book} />
            ) : (
              <BookListItem key={book.id} book={book} />
            )
          )}
        </div>
      )}
    </div>
  );
}

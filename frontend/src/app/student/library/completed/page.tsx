
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  Award,
  Grid3X3,
  List,
  Star,
  Eye,
  RotateCcw,
  CheckCircle2,
  BookMarked,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompletedBook {
  id: number;
  title: string;
  author: string;
  course: string;
  courseCode: string;
  dateCompleted: string;
  timeSpent: string;
  totalPages: number;
  rating?: number;
  notes: number;
  bookmarks: number;
  highlights: number;
  semester: string;
}

export default function CompletedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock completed books data
  const completedBooks: CompletedBook[] = [
    {
      id: 1,
      title: "Introduction to Biology",
      author: "Dr. Sarah Johnson",
      course: "Biology 101",
      courseCode: "BIO 101",
      dateCompleted: "2024-11-15",
      timeSpent: "24h 30m",
      totalPages: 320,
      rating: 5,
      notes: 15,
      bookmarks: 8,
      highlights: 23,
      semester: "Fall 2024",
    },
    {
      id: 2,
      title: "World History: Ancient Civilizations",
      author: "Prof. Michael Chen",
      course: "History 201",
      courseCode: "HIST 201",
      dateCompleted: "2024-11-10",
      timeSpent: "18h 45m",
      totalPages: 280,
      rating: 4,
      notes: 12,
      bookmarks: 6,
      highlights: 18,
      semester: "Fall 2024",
    },
    {
      id: 3,
      title: "Calculus and Analytical Geometry",
      author: "Dr. Emily Rodriguez",
      course: "Mathematics 151",
      courseCode: "MATH 151",
      dateCompleted: "2024-11-05",
      timeSpent: "32h 15m",
      totalPages: 450,
      rating: 4,
      notes: 28,
      bookmarks: 15,
      highlights: 35,
      semester: "Fall 2024",
    },
    {
      id: 4,
      title: "Introduction to Psychology",
      author: "Dr. Amanda Wilson",
      course: "Psychology 101",
      courseCode: "PSY 101",
      dateCompleted: "2024-10-28",
      timeSpent: "21h 20m",
      totalPages: 380,
      rating: 5,
      notes: 19,
      bookmarks: 11,
      highlights: 27,
      semester: "Fall 2024",
    },
    {
      id: 5,
      title: "English Literature: Shakespeare",
      author: "Prof. James Thompson",
      course: "English 250",
      courseCode: "ENG 250",
      dateCompleted: "2024-10-20",
      timeSpent: "16h 50m",
      totalPages: 220,
      rating: 3,
      notes: 8,
      bookmarks: 4,
      highlights: 12,
      semester: "Fall 2024",
    },
    {
      id: 6,
      title: "Chemistry Fundamentals",
      author: "Dr. Lisa Park",
      course: "Chemistry 101",
      courseCode: "CHEM 101",
      dateCompleted: "2024-09-15",
      timeSpent: "26h 40m",
      totalPages: 340,
      rating: 4,
      notes: 22,
      bookmarks: 13,
      highlights: 31,
      semester: "Spring 2024",
    },
  ];

  // Get unique courses and semesters for filters
  const courses = [...new Set(completedBooks.map((book) => book.course))];
  const semesters = [...new Set(completedBooks.map((book) => book.semester))];

  // Filter and sort books
  const filteredBooks = completedBooks
    .filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse =
        selectedCourse === "all" || book.course === selectedCourse;
      const matchesSemester =
        selectedSemester === "all" || book.semester === selectedSemester;

      return matchesSearch && matchesCourse && matchesSemester;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.dateCompleted).getTime() -
            new Date(a.dateCompleted).getTime()
          );
        case "oldest":
          return (
            new Date(a.dateCompleted).getTime() -
            new Date(b.dateCompleted).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "course":
          return a.course.localeCompare(b.course);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBookClick = (book: CompletedBook) => {
    console.log("Opening book for review:", book.title);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <Card
          key={book.id}
          className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          onClick={() => handleBookClick(book)}
        >
          <CardHeader className="pb-3">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <Badge className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-500">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            </div>
            <CardTitle className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div>
                <Badge variant="secondary" className="text-xs">
                  {book.courseCode}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(book.dateCompleted)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{book.timeSpent}</span>
                </div>
              </div>

              {book.rating && (
                <div className="flex items-center space-x-1">
                  {renderStars(book.rating)}
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <BookMarked className="h-3 w-3" />
                    <span>{book.notes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-3 w-3" />
                    <span>{book.highlights}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-1 pt-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Review
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reread
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredBooks.map((book) => (
        <Card
          key={book.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleBookClick(book)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {book.author}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {book.courseCode}
                      </Badge>
                      <Badge className="text-xs bg-green-500 hover:bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Completed {formatDate(book.dateCompleted)}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Reading time: {book.timeSpent}
                    </div>
                    {book.rating && (
                      <div className="flex items-center justify-end space-x-1 mb-2">
                        {renderStars(book.rating)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookMarked className="h-3 w-3" />
                      <span>{book.notes} notes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>{book.highlights} highlights</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{book.totalPages} pages</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reread
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Completed Books</h1>
        <p className="text-muted-foreground">
          Review or revisit books you have finished reading. Track your learning
          journey and revisit key concepts.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedBooks.length}</p>
                <p className="text-xs text-muted-foreground">Books Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">139h</p>
                <p className="text-xs text-muted-foreground">
                  Total Reading Time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookMarked className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">104</p>
                <p className="text-xs text-muted-foreground">Notes Created</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">4.2</p>
                <p className="text-xs text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, course, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Completed</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle and Results */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}{" "}
            found
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Books Display */}
      {filteredBooks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No completed books found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ||
              selectedCourse !== "all" ||
              selectedSemester !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't completed any books yet. Keep reading to build your library!"}
            </p>
            {(searchQuery ||
              selectedCourse !== "all" ||
              selectedSemester !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCourse("all");
                  setSelectedSemester("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>{viewMode === "grid" ? renderGridView() : renderListView()}</>
      )}
    </div>
  );
}

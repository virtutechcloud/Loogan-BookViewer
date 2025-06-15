"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Star,
  StarOff,
  Grid,
  List,
  Filter,
  ChevronDown,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CS101",
    term: "Fall 2024",
    role: "Instructor",
    students: 45,
    status: "published",
    thumbnail: "/placeholder-course.jpg",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    code: "MATH201",
    term: "Fall 2024",
    role: "Co-Instructor",
    students: 32,
    status: "published",
    thumbnail: "/placeholder-course.jpg",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    code: "CS201",
    term: "Spring 2025",
    role: "Instructor",
    students: 0,
    status: "upcoming",
    thumbnail: "/placeholder-course.jpg",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Web Development Fundamentals",
    code: "CS301",
    term: "Spring 2025",
    role: "Instructor",
    students: 28,
    status: "published",
    thumbnail: "/placeholder-course.jpg",
    isFavorite: true,
  },
];

export default function AllCourses() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [termFilter, setTermFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter and sort courses
  const filteredCourses = mockCourses
    .filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesTerm = termFilter === "all" || course.term === termFilter;
      const matchesFavorites = !showFavorites || course.isFavorite;
      return matchesSearch && matchesStatus && matchesTerm && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "students":
          return b.students - a.students;
        case "term":
          return a.term.localeCompare(b.term);
        default:
          return 0;
      }
    });

  const toggleFavorite = (courseId: number) => {
    // TODO: Implement favorite toggle logic
    console.log("Toggle favorite for course:", courseId);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground">
            Manage and access your teaching courses
          </p>
        </div>
        <Button
          onClick={() => router.push("/instructor/courses/create-course")}
        >
          Create Course
        </Button>
      </div>

      {/* Filters and Search Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => setShowFavorites(!showFavorites)}
                className="flex items-center gap-2"
              >
                {showFavorites ? (
                  <>
                    <StarOff className="h-4 w-4" />
                    Show All Courses
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4" />
                    Show Favorites Only
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="concluded">Concluded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={termFilter} onValueChange={setTermFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="Fall 2024">Fall 2024</SelectItem>
              <SelectItem value="Spring 2025">Spring 2025</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Course Title</SelectItem>
              <SelectItem value="students">Number of Students</SelectItem>
              <SelectItem value="term">Term</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className={cn(
              "group cursor-pointer transition-all hover:shadow-md",
              viewMode === "list" && "flex"
            )}
            onClick={() => router.push(`/instructor/courses/${course.id}`)}
          >
            <div className="flex flex-1 flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">
                      {course.title}
                    </CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(course.id);
                      }}
                    >
                      {course.isFavorite ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>
                    <Badge
                      variant={
                        course.status === "published"
                          ? "default"
                          : course.status === "upcoming"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {course.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {course.term}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {course.role}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/instructor/courses/${course.id}`);
                  }}
                >
                  View Course
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

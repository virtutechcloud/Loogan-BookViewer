"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  BarChart3,
  ChevronDown,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  UserPlus,
  Calendar,
  TrendingUp,
  FileText,
  Award,
  MoreHorizontal,
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/john.png",
    courses: [
      {
        id: "CS101",
        name: "Introduction to Computer Science",
        progress: 85,
        readingTime: "45h",
        assignmentsCompleted: 8,
        quizAverage: 92,
        lastActivity: "2024-05-15",
      },
      {
        id: "CS201",
        name: "Data Structures",
        progress: 72,
        readingTime: "32h",
        assignmentsCompleted: 6,
        quizAverage: 88,
        lastActivity: "2024-05-14",
      },
    ],
    overallProgress: 78,
    totalReadingTime: "77h",
    assignmentsCompleted: 14,
    averageQuizScore: 90,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/avatars/jane.png",
    courses: [
      {
        id: "CS101",
        name: "Introduction to Computer Science",
        progress: 92,
        readingTime: "52h",
        assignmentsCompleted: 9,
        quizAverage: 95,
        lastActivity: "2024-05-15",
      },
    ],
    overallProgress: 92,
    totalReadingTime: "52h",
    assignmentsCompleted: 9,
    averageQuizScore: 95,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    avatar: "/avatars/bob.png",
    courses: [
      {
        id: "CS201",
        name: "Data Structures",
        progress: 45,
        readingTime: "18h",
        assignmentsCompleted: 3,
        quizAverage: 75,
        lastActivity: "2024-05-10",
      },
    ],
    overallProgress: 45,
    totalReadingTime: "18h",
    assignmentsCompleted: 3,
    averageQuizScore: 75,
  },
];

// Mock data for courses
const mockCourses = [
  { id: "CS101", name: "Introduction to Computer Science" },
  { id: "CS201", name: "Data Structures" },
  { id: "CS301", name: "Algorithms" },
];

// Mock data for analytics
const mockAnalytics = {
  totalStudents: 150,
  averageProgress: 78,
  averageReadingTime: "45h",
  averageQuizScore: 85,
  completionRate: 72,
};

export default function StudentProgressPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  // Filtering logic
  const filteredStudents = mockStudents.filter((s) => {
    return (
      (courseFilter.length === 0 ||
        s.courses.some((c) => courseFilter.includes(c.id))) &&
      (statusFilter === "all" ||
        (statusFilter === "active" && s.overallProgress > 0) ||
        (statusFilter === "inactive" && s.overallProgress === 0)) &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.courses.some((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        ))
    );
  });

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? filteredStudents.map((s) => s.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected(
      checked ? [...selected, id] : selected.filter((sid) => sid !== id)
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Student Progress</h1>
          <p className="text-muted-foreground">
            Track and analyze student progress across your courses.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Analytics Cards */}
      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Students
                  </p>
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.totalStudents}
                  </h3>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Progress
                  </p>
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageProgress}%
                  </h3>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Reading Time
                  </p>
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageReadingTime}
                  </h3>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Quiz Score
                  </p>
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageQuizScore}%
                  </h3>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex-1 flex gap-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message All
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selected.length} student(s) selected
              </p>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Bulk Actions
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Export Progress Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Raw Data
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" onClick={() => setSelected([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students Progress Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selected.length === filteredStudents.length &&
                      filteredStudents.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Overall Progress</TableHead>
                <TableHead>Reading Time</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Quiz Average</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(s.id)}
                      onCheckedChange={(checked) =>
                        handleSelect(s.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={s.avatar} alt={s.name} />
                        <AvatarFallback>
                          {s.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {s.courses.map((c) => (
                        <Badge key={c.id} variant="outline">
                          {c.id}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={s.overallProgress}
                        className="w-[100px]"
                      />
                      <span className="text-sm text-muted-foreground">
                        {s.overallProgress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{s.totalReadingTime}</TableCell>
                  <TableCell>{s.assignmentsCompleted} completed</TableCell>
                  <TableCell>{s.averageQuizScore}%</TableCell>
                  <TableCell>{s.courses[0].lastActivity}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setSelectedStudent(s.id)}
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Export Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog
        open={selectedStudent !== null}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Student Progress Details</DialogTitle>
            <DialogDescription>
              Detailed progress and performance metrics for{" "}
              {selectedStudent &&
                mockStudents.find((s) => s.id === selectedStudent)?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Course Completion
                            </span>
                            <span className="font-medium">
                              {mockStudents.find(
                                (s) => s.id === selectedStudent
                              )?.overallProgress || 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              mockStudents.find((s) => s.id === selectedStudent)
                                ?.overallProgress || 0
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Reading Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Total Reading Time
                            </span>
                            <span className="font-medium">
                              {mockStudents.find(
                                (s) => s.id === selectedStudent
                              )?.totalReadingTime || "0h"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Last Activity
                            </span>
                            <span className="font-medium">
                              {mockStudents.find(
                                (s) => s.id === selectedStudent
                              )?.courses[0].lastActivity || "Never"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="courses" className="space-y-4">
                  {mockStudents
                    .find((s) => s.id === selectedStudent)
                    ?.courses.map((course) => (
                      <Card key={course.id}>
                        <CardHeader>
                          <CardTitle>{course.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Progress
                                </span>
                                <span className="font-medium">
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress value={course.progress} />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Quiz Average
                                </span>
                                <span className="font-medium">
                                  {course.quizAverage}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Assignments
                                </span>
                                <span className="font-medium">
                                  {course.assignmentsCompleted} completed
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

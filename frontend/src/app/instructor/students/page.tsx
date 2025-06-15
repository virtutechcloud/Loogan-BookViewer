"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  MoreHorizontal,
  ChevronDown,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  UserPlus,
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
        enrollmentDate: "2024-01-15",
        status: "active",
      },
      {
        id: "CS201",
        name: "Data Structures",
        enrollmentDate: "2024-02-01",
        status: "active",
      },
    ],
    lastActivity: "2024-05-15",
    overallProgress: 85,
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
        enrollmentDate: "2024-01-15",
        status: "active",
      },
    ],
    lastActivity: "2024-05-14",
    overallProgress: 92,
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
        enrollmentDate: "2024-02-01",
        status: "inactive",
      },
    ],
    lastActivity: "2024-05-10",
    overallProgress: 45,
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
  activeStudents: 120,
  averageProgress: 78,
  averageReadingTime: "45 min/day",
};

const getStatusBadge = (status: string) => {
  const variants = {
    active: "default",
    inactive: "secondary",
    pending: "outline",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function StudentListPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAnalytics, setShowAnalytics] = useState(true);

  // Filtering logic
  const filteredStudents = mockStudents.filter((s) => {
    return (
      (courseFilter.length === 0 ||
        s.courses.some((c) => courseFilter.includes(c.id))) &&
      (statusFilter === "all" ||
        s.courses.some((c) => c.status === statusFilter)) &&
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
          <h1 className="text-3xl font-bold">Student List</h1>
          <p className="text-muted-foreground">
            View and manage students across all your courses.
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
                    Active Students
                  </p>
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.activeStudents}
                  </h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
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
                <BarChart3 className="h-8 w-8 text-blue-500" />
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
              <SelectItem value="pending">Pending</SelectItem>
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
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark as Active
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XCircle className="mr-2 h-4 w-4" />
                      Mark as Inactive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
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

      {/* Students Table */}
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
                <TableHead>Progress</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{s.lastActivity}</TableCell>
                  <TableCell>
                    {getStatusBadge(
                      s.courses.some((c) => c.status === "active")
                        ? "active"
                        : "inactive"
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Remove from Course
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
    </div>
  );
}

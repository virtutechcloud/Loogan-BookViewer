"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  Settings,
  Check,
  X,
  MoreHorizontal,
  Archive,
  RefreshCw,
  Users,
  Bell,
  Lock,
  Unlock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CS101",
    term: "Fall 2024",
    status: "published",
    enrollmentType: "approval",
    notifications: true,
    students: 45,
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    code: "CS201",
    term: "Fall 2024",
    status: "draft",
    enrollmentType: "open",
    notifications: true,
    students: 0,
  },
  {
    id: 3,
    title: "Web Development",
    code: "CS301",
    term: "Spring 2025",
    status: "unpublished",
    enrollmentType: "manual",
    notifications: false,
    students: 30,
  },
  {
    id: 4,
    title: "Database Systems",
    code: "CS401",
    term: "Spring 2025",
    status: "published",
    enrollmentType: "approval",
    notifications: true,
    students: 38,
  },
];

export default function MultipleCourseSettings() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [termFilter, setTermFilter] = useState<string>("all");
  const [enrollmentFilter, setEnrollmentFilter] = useState<string>("all");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(mockCourses.map((course) => course.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: number, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      published: "default",
      unpublished: "secondary",
      draft: "outline",
      concluded: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Course Settings</h1>
        <p className="text-muted-foreground">
          Manage settings for all your courses
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="concluded">Concluded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={termFilter} onValueChange={setTermFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Terms</SelectItem>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={enrollmentFilter}
                onValueChange={setEnrollmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Enrollment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="approval">Approval Required</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCourses.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedCourses.length} course(s) selected
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
                      <Check className="mr-2 h-4 w-4" />
                      Publish Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <X className="mr-2 h-4 w-4" />
                      Unpublish Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Enrollment</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Unlock className="mr-2 h-4 w-4" />
                      Set to Open
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      Set to Approval Required
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      Toggle Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" onClick={() => setSelectedCourses([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedCourses.length === mockCourses.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Notifications</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCourses.includes(course.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCourse(course.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.code}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.term}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {course.enrollmentType.charAt(0).toUpperCase() +
                        course.enrollmentType.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>
                    <Switch
                      checked={course.notifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/instructor/courses/${course.id}/settings`
                            )
                          }
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reset to Defaults
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Archive className="mr-2 h-4 w-4" />
                          Archive Course
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

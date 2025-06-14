"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  FileText,
  Video,
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

interface InstructorMainContentProps {
  activeTab: string;
  currentCourse: any;
  searchQuery: string;
  courses: any[];
  materials: any[];
  students: any[];
  assignments: any[];
  announcements: any[];
}

export default function InstructorMainContent({
  activeTab,
  currentCourse,
  searchQuery,
  courses,
  materials,
  students,
  assignments,
  announcements,
}: InstructorMainContentProps) {
  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your courses and student progress.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce(
                (total, course) => total + course.studentCount,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                courses.reduce(
                  (total, course) => total + course.avgProgress,
                  0
                ) / courses.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter((a) => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{course.code}</p>
                    <Badge variant="secondary">{course.avgProgress}%</Badge>
                  </div>
                  <Progress value={course.avgProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {course.studentCount} students
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">New assignment submitted</p>
                  <p className="text-xs text-muted-foreground">
                    Sarah Johnson - BIO 101
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">2m ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Student question posted</p>
                  <p className="text-xs text-muted-foreground">
                    Mike Chen - MATH 201
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">15m ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Assignment deadline approaching</p>
                  <p className="text-xs text-muted-foreground">
                    Chapter 3 Quiz - Due tomorrow
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCoursesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and track student progress
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.code}</Badge>
                <Badge variant={course.isActive ? "default" : "outline"}>
                  {course.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{course.semester}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.studentCount} students
                </span>
                <span className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {course.avgProgress}% avg
                </span>
              </div>
              <Progress value={course.avgProgress} className="h-2" />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMaterialsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Materials</h1>
          <p className="text-muted-foreground">
            {currentCourse
              ? `Managing materials for ${currentCourse.name}`
              : "Select a course to manage materials"}
          </p>
        </div>
        {currentCourse && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        )}
      </div>

      {!currentCourse ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Course Selected</h3>
            <p className="text-muted-foreground text-center">
              Select a course from the sidebar to view and manage its materials
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <Card
              key={material.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {material.type === "book" && (
                      <BookOpen className="h-8 w-8 text-blue-500" />
                    )}
                    {material.type === "video" && (
                      <Video className="h-8 w-8 text-red-500" />
                    )}
                    {material.type === "pdf" && (
                      <FileText className="h-8 w-8 text-green-500" />
                    )}
                    {material.type === "image" && (
                      <Image className="h-8 w-8 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {material.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {material.author}
                    </p>
                    <Badge variant="outline" className="text-xs mt-2">
                      {material.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Progress & Analytics</h1>
        <p className="text-muted-foreground">
          {currentCourse
            ? `Analytics for ${currentCourse.name}`
            : "Select a course to view analytics"}
        </p>
      </div>

      {!currentCourse ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Course Selected</h3>
            <p className="text-muted-foreground text-center">
              Select a course from the sidebar to view student analytics
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Course Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentCourse.studentCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Enrolled this semester
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentCourse.avgProgress}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Course completion
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Study Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {students.reduce(
                    (total, student) => total + student.timeSpent,
                    0
                  )}
                  h
                </div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>

          {/* Student Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {student.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{student.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <BarChart3 className="h-3 w-3" />
                          <span>{student.progress}% complete</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{student.timeSpent}h studied</span>
                        </div>
                      </div>
                      <Progress value={student.progress} className="h-2 mt-2" />
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  // Render different views based on active tab
  if (activeTab === "courses") return renderCoursesView();
  if (activeTab === "materials") return renderMaterialsView();
  if (activeTab === "analytics") return renderAnalyticsView();

  // Default dashboard view
  return renderDashboardOverview();
}

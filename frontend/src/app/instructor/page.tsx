"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Users,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BookMarked,
  FileText,
  Megaphone,
} from "lucide-react";

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Biology",
    code: "BIO101",
    students: 45,
    activeAssignments: 3,
    completionRate: 78,
    recentActivity: "2 new submissions",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    code: "MATH201",
    students: 32,
    activeAssignments: 2,
    completionRate: 85,
    recentActivity: "1 new submission",
  },
  {
    id: 3,
    title: "World History",
    code: "HIST101",
    students: 38,
    activeAssignments: 1,
    completionRate: 92,
    recentActivity: "No new activity",
  },
];

// Mock data for student progress
const studentProgress = {
  totalStudents: 115,
  activeStudents: 98,
  averageCompletion: 85,
  engagementRate: 78,
  trend: "up",
};

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "submission",
    course: "BIO101",
    student: "John Doe",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "assignment",
    course: "MATH201",
    action: "Assignment graded",
    time: "3 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "announcement",
    course: "HIST101",
    action: "New announcement posted",
    time: "5 hours ago",
    status: "info",
  },
];

export default function InstructorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your courses, monitor student progress, and access teaching
          tools.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {studentProgress.totalStudents}
                </h3>
              </div>
              <Users className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="text-xs">
                {studentProgress.activeStudents} Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Completion
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {studentProgress.averageCompletion}%
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center mt-4">
              <Badge
                variant="secondary"
                className="text-xs flex items-center gap-1"
              >
                {studentProgress.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                5% from last week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Courses
                </p>
                <h3 className="text-2xl font-bold mt-1">{courses.length}</h3>
              </div>
              <BookOpen className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="text-xs">
                {courses.reduce(
                  (acc, course) => acc + course.activeAssignments,
                  0
                )}{" "}
                Active Assignments
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Engagement Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {studentProgress.engagementRate}%
                </h3>
              </div>
              <BarChart3 className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center mt-4">
              <Progress
                value={studentProgress.engagementRate}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Overview</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className={`cursor-pointer transition-colors ${
                    selectedCourse === course.id
                      ? "border-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.code}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {course.students} Students
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Completion Rate
                        </span>
                        <span className="font-medium">
                          {course.completionRate}%
                        </span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Active Assignments
                        </span>
                        <span className="font-medium">
                          {course.activeAssignments}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.recentActivity}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div className="mt-1">
                      {activity.status === "pending" && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      {activity.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      {activity.status === "info" && (
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {activity.type === "submission" && (
                          <>New submission from {activity.student}</>
                        )}
                        {activity.type === "assignment" && (
                          <>{activity.action}</>
                        )}
                        {activity.type === "announcement" && (
                          <>{activity.action}</>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <ClipboardList className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Megaphone className="h-4 w-4 mr-2" />
                Post Announcement
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookMarked className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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
  Calendar,
  TrendingUp,
  FileText,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Info,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for analytics
const mockAnalytics = {
  totalStudents: 150,
  averageProgress: 78,
  averageReadingTime: "45h",
  averageQuizScore: 85,
  completionRate: 72,
  trends: {
    progress: "+5%",
    readingTime: "+12%",
    quizScore: "+3%",
    completion: "+8%",
  },
};

// Mock data for reading time trends
const readingTimeData = [
  { date: "2024-05-01", time: 120 },
  { date: "2024-05-02", time: 150 },
  { date: "2024-05-03", time: 180 },
  { date: "2024-05-04", time: 160 },
  { date: "2024-05-05", time: 200 },
  { date: "2024-05-06", time: 220 },
  { date: "2024-05-07", time: 190 },
];

// Mock data for course completion
const courseCompletionData = [
  { name: "CS101", value: 85 },
  { name: "CS201", value: 72 },
  { name: "CS301", value: 65 },
  { name: "CS401", value: 58 },
];

// Mock data for performance distribution
const performanceData = [
  { range: "90-100", students: 25 },
  { range: "80-89", students: 35 },
  { range: "70-79", students: 40 },
  { range: "60-69", students: 30 },
  { range: "0-59", students: 20 },
];

// Mock data for insights
const mockInsights = [
  {
    id: 1,
    type: "improvement",
    title: "Reading Time Increase",
    description: "Average reading time has increased by 12% this week",
    trend: "+12%",
  },
  {
    id: 2,
    type: "warning",
    title: "Low Completion Rate",
    description: "CS301 has a completion rate below 60%",
    trend: "-15%",
  },
  {
    id: 3,
    type: "success",
    title: "High Quiz Performance",
    description: "Average quiz scores are above 85%",
    trend: "+5%",
  },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function StudentAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week");
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Student Analytics</h1>
          <p className="text-muted-foreground">
            Gain insights into student engagement and performance across your
            courses.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex-1 flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() =>
              setViewMode(viewMode === "overview" ? "detailed" : "overview")
            }
          >
            {viewMode === "overview" ? "Detailed View" : "Overview"}
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.totalStudents}
                  </h3>
                  <span className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    {mockAnalytics.trends.progress}
                  </span>
                </div>
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
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageProgress}%
                  </h3>
                  <span className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    {mockAnalytics.trends.progress}
                  </span>
                </div>
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
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageReadingTime}
                  </h3>
                  <span className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    {mockAnalytics.trends.readingTime}
                  </span>
                </div>
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
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {mockAnalytics.averageQuizScore}%
                  </h3>
                  <span className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    {mockAnalytics.trends.quizScore}
                  </span>
                </div>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reading Time Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Reading Time Trend</CardTitle>
            <CardDescription>
              Average reading time per day over the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={readingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="time"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Course Completion</CardTitle>
            <CardDescription>
              Completion rates across different courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {courseCompletionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>
              Distribution of student performance across score ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Notable trends and areas for attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                >
                  <div
                    className={`p-2 rounded-full ${
                      insight.type === "improvement"
                        ? "bg-green-100 text-green-600"
                        : insight.type === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {insight.type === "improvement" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : insight.type === "warning" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{insight.title}</h4>
                      <span
                        className={`text-sm ${
                          insight.trend.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {insight.trend}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed View */}
      {viewMode === "detailed" && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Analysis</CardTitle>
            <CardDescription>
              Comprehensive breakdown of student performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Course Completion Rate</TableCell>
                  <TableCell>{mockAnalytics.completionRate}%</TableCell>
                  <TableCell className="text-green-500">
                    {mockAnalytics.trends.completion}
                  </TableCell>
                  <TableCell>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Reading Time</TableCell>
                  <TableCell>{mockAnalytics.averageReadingTime}</TableCell>
                  <TableCell className="text-green-500">
                    {mockAnalytics.trends.readingTime}
                  </TableCell>
                  <TableCell>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quiz Performance</TableCell>
                  <TableCell>{mockAnalytics.averageQuizScore}%</TableCell>
                  <TableCell className="text-green-500">
                    {mockAnalytics.trends.quizScore}
                  </TableCell>
                  <TableCell>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

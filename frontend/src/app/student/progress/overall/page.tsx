"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Clock,
  Calendar,
  Target,
  Trophy,
  TrendingUp,
  BookMarked,
  FileText,
} from "lucide-react";

// Mock data for charts
const readingProgressData = [
  { date: "2024-01", pages: 120 },
  { date: "2024-02", pages: 180 },
  { date: "2024-03", pages: 150 },
  { date: "2024-04", pages: 200 },
  { date: "2024-05", pages: 250 },
  { date: "2024-06", pages: 300 },
];

const booksCompletedData = [
  { month: "Jan", books: 2 },
  { month: "Feb", books: 3 },
  { month: "Mar", books: 1 },
  { month: "Apr", books: 4 },
  { month: "May", books: 2 },
  { month: "Jun", books: 3 },
];

const readingDistributionData = [
  { name: "Science", value: 35 },
  { name: "History", value: 25 },
  { name: "Literature", value: 20 },
  { name: "Mathematics", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    title: "Introduction to Biology",
    date: "2024-06-15",
    pages: 45,
    time: "1h 30m",
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    date: "2024-06-14",
    pages: 30,
    time: "1h 00m",
  },
  {
    id: 3,
    title: "Advanced Mathematics",
    date: "2024-06-13",
    pages: 25,
    time: "45m",
  },
];

// Mock data for achievements
const achievements = [
  {
    id: 1,
    title: "Reading Streak",
    description: "7 days of consecutive reading",
    icon: Calendar,
    progress: 7,
    target: 30,
  },
  {
    id: 2,
    title: "Book Worm",
    description: "Completed 10 books",
    icon: BookOpen,
    progress: 8,
    target: 10,
  },
  {
    id: 3,
    title: "Speed Reader",
    description: "Read 1000 pages",
    icon: TrendingUp,
    progress: 750,
    target: 1000,
  },
];

export default function OverallProgressPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Overall Progress</h1>
          <p className="text-muted-foreground">
            Track your reading achievements and trends over time.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Books Read
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pages Read
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground">
                +150 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reading Streak
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Reading Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45m</div>
              <p className="text-xs text-muted-foreground">per session</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reading Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={readingProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pages"
                      stroke="#8884d8"
                      name="Pages Read"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Books Completed Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Books Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={booksCompletedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="books" fill="#82ca9d" name="Books" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Reading Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={readingDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {readingDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border"
                    >
                      <BookMarked className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{activity.date}</span>
                          <span>•</span>
                          <span>{activity.pages} pages</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const progress =
                  (achievement.progress / achievement.target) * 100;

                return (
                  <div
                    key={achievement.id}
                    className="p-4 rounded-lg border space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">{achievement.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

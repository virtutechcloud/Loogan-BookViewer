"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AreaChart,
  Area,
} from "recharts";
import {
  Clock,
  Calendar,
  BookOpen,
  TrendingUp,
  Target,
  BookMarked,
  FileText,
  Filter,
} from "lucide-react";

// Mock data for charts
const dailyReadingData = [
  { date: "2024-06-01", minutes: 45 },
  { date: "2024-06-02", minutes: 60 },
  { date: "2024-06-03", minutes: 30 },
  { date: "2024-06-04", minutes: 90 },
  { date: "2024-06-05", minutes: 75 },
  { date: "2024-06-06", minutes: 120 },
  { date: "2024-06-07", minutes: 60 },
];

const weeklyReadingData = [
  { week: "Week 1", minutes: 420 },
  { week: "Week 2", minutes: 380 },
  { week: "Week 3", minutes: 450 },
  { week: "Week 4", minutes: 510 },
];

const bookReadingData = [
  { book: "Biology", minutes: 450 },
  { book: "History", minutes: 380 },
  { book: "Mathematics", minutes: 420 },
  { book: "Literature", minutes: 290 },
];

const subjectDistributionData = [
  { name: "Science", value: 35 },
  { name: "History", value: 25 },
  { name: "Mathematics", value: 20 },
  { name: "Literature", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for recent sessions
const recentSessions = [
  {
    id: 1,
    book: "Introduction to Biology",
    date: "2024-06-15",
    startTime: "14:00",
    endTime: "15:30",
    duration: "1h 30m",
    pages: 45,
  },
  {
    id: 2,
    book: "World History: Ancient Civilizations",
    date: "2024-06-14",
    startTime: "10:00",
    endTime: "11:00",
    duration: "1h 00m",
    pages: 30,
  },
  {
    id: 3,
    book: "Advanced Mathematics",
    date: "2024-06-13",
    startTime: "16:00",
    endTime: "16:45",
    duration: "45m",
    pages: 25,
  },
];

export default function ReadingTimePage() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedBook, setSelectedBook] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Reading Time</h1>
          <p className="text-muted-foreground">
            Track how much time you spend reading and identify your reading
            habits.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select book" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="literature">Literature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reading Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32h 45m</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Session
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45m</div>
              <p className="text-xs text-muted-foreground">per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Longest Session
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 15m</div>
              <p className="text-xs text-muted-foreground">on June 6th</p>
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
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Reading Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Reading Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyReadingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatTime(value)}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Reading Time"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Reading Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reading Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyReadingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatTime(value)}
                      labelFormatter={(label) => `Week: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="minutes" fill="#82ca9d" name="Reading Time" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Book Reading Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Time by Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookReadingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="book" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatTime(value)}
                      labelFormatter={(label) => `Book: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="minutes" fill="#8884d8" name="Reading Time" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Subject Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Time by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectDistributionData}
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
                      {subjectDistributionData.map((entry, index) => (
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
        </div>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reading Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <BookMarked className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{session.book}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>
                          {session.startTime} - {session.endTime}
                        </span>
                        <span>•</span>
                        <span>{session.duration}</span>
                        <span>•</span>
                        <span>{session.pages} pages</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

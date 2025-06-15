"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  BookOpen,
  Clock,
  Target,
  Star,
  Share2,
  Lock,
  CheckCircle2,
  BookMarked,
  Calendar,
  Flame,
  BookText,
  BookCheck,
  BookX,
  BookOpenCheck,
  BookOpenText,
  BookOpenIcon,
  BookOpenCheckIcon,
  BookOpenTextIcon,
  BookOpenIcon as BookOpenIcon2,
  BookOpenCheckIcon as BookOpenCheckIcon2,
  BookOpenTextIcon as BookOpenTextIcon2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for achievements
const achievements = [
  {
    id: 1,
    name: "Bookworm Beginner",
    description: "Read your first book",
    icon: BookOpen,
    category: "reading",
    status: "earned",
    dateEarned: "2024-06-01",
    progress: 100,
    total: 1,
  },
  {
    id: 2,
    name: "Reading Streak",
    description: "Read for 7 consecutive days",
    icon: Flame,
    category: "time",
    status: "in_progress",
    progress: 5,
    total: 7,
  },
  {
    id: 3,
    name: "Speed Reader",
    description: "Read 10 books in a month",
    icon: BookMarked,
    category: "reading",
    status: "locked",
    progress: 3,
    total: 10,
  },
  {
    id: 4,
    name: "Night Owl",
    description: "Read for 2 hours after 8 PM",
    icon: Clock,
    category: "time",
    status: "earned",
    dateEarned: "2024-06-05",
    progress: 100,
    total: 1,
  },
  {
    id: 5,
    name: "Subject Master",
    description: "Complete 5 books in one subject",
    icon: BookCheck,
    category: "reading",
    status: "in_progress",
    progress: 3,
    total: 5,
  },
  {
    id: 6,
    name: "Reading Marathon",
    description: "Read for 5 hours in one day",
    icon: Target,
    category: "time",
    status: "locked",
    progress: 0,
    total: 1,
  },
  {
    id: 7,
    name: "Book Collector",
    description: "Add 20 books to your library",
    icon: BookText,
    category: "reading",
    status: "in_progress",
    progress: 12,
    total: 20,
  },
  {
    id: 8,
    name: "Early Bird",
    description: "Read for 1 hour before 8 AM",
    icon: Calendar,
    category: "time",
    status: "locked",
    progress: 0,
    total: 1,
  },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("progress");

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "all") return true;
    return achievement.status === filter;
  });

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (sort === "progress") {
      return b.progress / b.total - a.progress / a.total;
    }
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "date" && a.dateEarned && b.dateEarned) {
      return (
        new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime()
      );
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "earned":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "locked":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "earned":
        return "Earned";
      case "in_progress":
        return "In Progress";
      case "locked":
        return "Locked";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Achievements</h1>
          <p className="text-muted-foreground">
            Celebrate your reading milestones and accomplishments!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Achievements
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                {achievements.filter((a) => a.status === "earned").length}{" "}
                earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Keep going!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Achievement
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Night Owl</div>
              <p className="text-xs text-muted-foreground">
                Earned on June 5th
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Achievements</SelectItem>
              <SelectItem value="earned">Earned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date Earned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAchievements.map((achievement) => (
            <Card key={achievement.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <achievement.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-medium">
                    {achievement.name}
                  </CardTitle>
                </div>
                <Badge
                  variant="secondary"
                  className={getStatusColor(achievement.status)}
                >
                  {getStatusText(achievement.status)}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {achievement.description}
                </p>
                {achievement.status === "in_progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <Progress
                      value={(achievement.progress / achievement.total) * 100}
                    />
                  </div>
                )}
                {achievement.status === "earned" && achievement.dateEarned && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Earned on {achievement.dateEarned}
                    </p>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {achievement.status === "locked" && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4">
                    <Lock className="h-4 w-4" />
                    <span>Complete requirements to unlock</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

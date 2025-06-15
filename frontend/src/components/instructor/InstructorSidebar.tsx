"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Users,
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  Megaphone,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Plus,
  Upload,
  Eye,
  Bell,
  Calendar,
  TrendingUp,
  GraduationCap,
  BookMarked,
  UserCheck,
  Mail,
  Inbox,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InstructorSidebarProps {
  courses: any[];
  currentCourse: any;
  materials: any[];
  students: any[];
  assignments: any[];
  announcements: any[];
}

export default function InstructorSidebar({
  courses,
  currentCourse,
  materials,
  students,
  assignments,
  announcements,
}: InstructorSidebarProps) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>(["courses"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Navigation mapping for sub-menu items
  const getNavigationPath = (subItemId: string): string => {
    const routeMap: Record<string, string> = {
      // Dashboard
      dashboard: "/instructor",

      // Courses routes
      "all-courses": "/instructor/courses/all-courses",
      "create-course": "/instructor/courses/create-course",
      "course-settings": "/instructor/courses/settings",

      // Materials routes
      "all-materials": "/instructor/materials/all-materials",
      "upload-material": "/instructor/materials/upload",
      "material-library": "/instructor/materials/library",

      // Students routes
      "student-list": "/instructor/students",
      "student-progress": "/instructor/students/progress",
      "student-analytics": "/instructor/students/analytics",

      // Assignments routes
      "all-assignments": "/instructor/assignments/all-assignments",
      "create-assignment": "/instructor/assignments/create-assignment",
      grading: "/instructor/assignments/grading",
      "assignment-analytics": "/instructor/assignments/analytics",

      // Communication routes
      announcements: "/instructor/communication/announcements",
      messages: "/instructor/communication/messages",
      inbox: "/instructor/communication/inbox",
      notifications: "/instructor/communication/notifications",

      // Settings routes
      "profile-settings": "/instructor/settings/profile",
      "course-preferences": "/instructor/settings/preferences",
      "sync-backup": "/instructor/settings/sync-backup",
    };

    return routeMap[subItemId] || "/instructor";
  };

  const handleSubItemClick = (subItemId: string) => {
    const path = getNavigationPath(subItemId);
    router.push(path);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      badge: null,
      subItems: [],
    },
    {
      id: "courses",
      label: "My Courses",
      icon: BookOpen,
      badge: courses.length,
      subItems: [
        { id: "all-courses", label: "All Courses", icon: BookOpen },
        { id: "create-course", label: "Create Course", icon: Plus },
        { id: "course-settings", label: "Course Settings", icon: Settings },
      ],
    },
    {
      id: "materials",
      label: "Materials",
      icon: FileText,
      badge: materials.length,
      subItems: [
        { id: "all-materials", label: "All Materials", icon: FileText },
        { id: "upload-material", label: "Upload Material", icon: Upload },
        { id: "material-library", label: "Library", icon: BookMarked },
      ],
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      badge: currentCourse?.studentCount || 0,
      subItems: [
        { id: "student-list", label: "Student List", icon: Users },
        {
          id: "student-progress",
          label: "Progress Tracking",
          icon: TrendingUp,
        },
        { id: "student-analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: ClipboardList,
      badge: assignments.filter((a) => a.status === "active").length,
      subItems: [
        {
          id: "all-assignments",
          label: "All Assignments",
          icon: ClipboardList,
        },
        { id: "create-assignment", label: "Create Assignment", icon: Plus },
        { id: "grading", label: "Grading", icon: GraduationCap },
        { id: "assignment-analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      icon: MessageSquare,
      badge: announcements.length,
      subItems: [
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "messages", label: "Messages", icon: Mail },
        { id: "inbox", label: "Inbox", icon: Inbox },
        { id: "notifications", label: "Notifications", icon: Bell },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
      subItems: [
        { id: "profile-settings", label: "Profile", icon: UserCheck },
        { id: "course-preferences", label: "Preferences", icon: Settings },
        { id: "sync-backup", label: "Sync & Backup", icon: FileText },
      ],
    },
  ];

  return (
    <div className="w-80 border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="font-semibold text-lg">Instructor Portal</h2>
        {currentCourse && (
          <p className="text-sm text-muted-foreground mt-1">
            {currentCourse.code} - {currentCourse.name}
          </p>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isExpanded = expandedItems.includes(item.id);
                const hasSubItems = item.subItems.length > 0;

                return (
                  <div key={item.id}>
                    {/* Main Menu Item */}
                    <button
                      onClick={() =>
                        hasSubItems
                          ? toggleExpanded(item.id)
                          : router.push("/instructor")
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted group"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge !== null && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {hasSubItems && (
                          <div className="transition-transform duration-200">
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Sub Menu Items */}
                    {hasSubItems && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleSubItemClick(subItem.id)}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <SubIcon className="h-3 w-3" />
                              <span>{subItem.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Instructor Dashboard</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

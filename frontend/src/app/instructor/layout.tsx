"use client";

import { useState } from "react";
import InstructorHeader from "@/components/instructor/InstructorHeader";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import InstructorFooter from "@/components/instructor/InstructorFooter";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in real app this would come from context/API
  const instructorData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    avatar: "/avatars/instructor.jpg",
    department: "Biology Department",
  };

  const courses = [
    {
      id: 1,
      name: "Introduction to Biology",
      code: "BIO 101",
      semester: "Fall 2024",
      studentCount: 45,
      avgProgress: 72,
      isActive: true,
    },
    {
      id: 2,
      name: "Advanced Cell Biology",
      code: "BIO 301",
      semester: "Fall 2024",
      studentCount: 28,
      avgProgress: 65,
      isActive: true,
    },
    {
      id: 3,
      name: "Genetics and Evolution",
      code: "BIO 250",
      semester: "Fall 2024",
      studentCount: 35,
      avgProgress: 58,
      isActive: true,
    },
    {
      id: 4,
      name: "Molecular Biology",
      code: "BIO 401",
      semester: "Spring 2024",
      studentCount: 22,
      avgProgress: 100,
      isActive: false,
    },
  ];

  const [currentCourse, setCurrentCourse] = useState(courses[0]);

  const materials = [
    {
      id: 1,
      title: "Cell Structure and Function",
      author: "Dr. Sarah Johnson",
      type: "book",
      courseId: 1,
    },
    {
      id: 2,
      title: "Mitosis Process Video",
      author: "Biology Department",
      type: "video",
      courseId: 1,
    },
    {
      id: 3,
      title: "Lab Manual - Cell Division",
      author: "Dr. Sarah Johnson",
      type: "pdf",
      courseId: 1,
    },
    {
      id: 4,
      title: "Cell Diagram Collection",
      author: "Biology Department",
      type: "image",
      courseId: 1,
    },
  ];

  const students = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@student.edu",
      progress: 85,
      timeSpent: 24,
      courseId: 1,
    },
    {
      id: 2,
      name: "James Rodriguez",
      email: "james.rodriguez@student.edu",
      progress: 72,
      timeSpent: 18,
      courseId: 1,
    },
    {
      id: 3,
      name: "Sarah Chen",
      email: "sarah.chen@student.edu",
      progress: 91,
      timeSpent: 32,
      courseId: 1,
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Cell Biology Quiz",
      courseId: 1,
      dueDate: "Dec 15, 2024, 11:59 PM",
      status: "active",
      submissions: 32,
      totalStudents: 45,
      avgGrade: 87,
    },
    {
      id: 2,
      title: "Lab Report - Mitosis",
      courseId: 1,
      dueDate: "Dec 20, 2024, 11:59 PM",
      status: "active",
      submissions: 28,
      totalStudents: 45,
      avgGrade: 82,
    },
    {
      id: 3,
      title: "Final Exam",
      courseId: 1,
      dueDate: "Dec 22, 2024, 2:00 PM",
      status: "draft",
      submissions: 0,
      totalStudents: 45,
      avgGrade: 0,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm exam will be held on November 25th...",
      date: "Nov 10, 2024",
      courseId: 1,
    },
    {
      id: 2,
      title: "Lab Session Cancelled",
      content:
        "Due to equipment maintenance, lab session on Nov 15th is cancelled...",
      date: "Nov 12, 2024",
      courseId: 1,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <InstructorHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        instructorData={instructorData}
        currentCourse={currentCourse}
        notifications={3}
        messages={5}
      />

      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <InstructorSidebar
            courses={courses}
            currentCourse={currentCourse}
            materials={materials}
            students={students}
            assignments={assignments}
            announcements={announcements}
          />
        )}

        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>

      <InstructorFooter />
    </div>
  );
}

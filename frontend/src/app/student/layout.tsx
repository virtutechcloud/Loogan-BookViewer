"use client";

import { useState } from "react";
import StudentHeader from "@/components/student/StudentHeader";
import StudentSidebar from "@/components/student/StudentSidebar";
import StudentFooter from "@/components/student/StudentFooter";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Mock data - in real app this would come from context/API
  const studentData = {
    name: "John Doe",
    email: "john.doe@university.edu",
    avatar: "/avatars/student.jpg",
  };

  const books = [
    {
      id: 1,
      title: "Introduction to Biology",
      author: "Dr. Sarah Johnson",
      course: "BIO 101",
      progress: 75,
      isCurrentlyReading: true,
      chapters: [
        {
          title: "Cell Structure",
          completed: true,
          progress: 100,
          duration: "45 min",
        },
        {
          title: "Genetics Basics",
          completed: true,
          progress: 100,
          duration: "60 min",
        },
        {
          title: "Evolution Theory",
          inProgress: true,
          progress: 65,
          duration: "50 min",
        },
        {
          title: "Ecology Systems",
          completed: false,
          progress: 0,
          duration: "55 min",
        },
      ],
      currentChapter: { title: "Evolution Theory", progress: 65 },
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Prof. Michael Chen",
      course: "MATH 201",
      progress: 45,
      isCurrentlyReading: false,
      chapters: [
        {
          title: "Calculus Fundamentals",
          completed: true,
          progress: 100,
          duration: "70 min",
        },
        {
          title: "Linear Algebra",
          inProgress: true,
          progress: 30,
          duration: "80 min",
        },
        {
          title: "Differential Equations",
          completed: false,
          progress: 0,
          duration: "90 min",
        },
      ],
    },
    {
      id: 3,
      title: "World History",
      author: "Dr. Emily Rodriguez",
      course: "HIST 150",
      progress: 20,
      isCurrentlyReading: false,
      chapters: [
        {
          title: "Ancient Civilizations",
          inProgress: true,
          progress: 20,
          duration: "65 min",
        },
        {
          title: "Medieval Period",
          completed: false,
          progress: 0,
          duration: "75 min",
        },
        {
          title: "Renaissance Era",
          completed: false,
          progress: 0,
          duration: "60 min",
        },
      ],
    },
  ];

  const [currentBook, setCurrentBook] = useState(books[0]);

  const bookmarks = [
    {
      id: 1,
      title: "Cell Division Process",
      chapter: "Chapter 1: Cell Structure",
      date: "Nov 15, 2024",
    },
    {
      id: 2,
      title: "DNA Replication",
      chapter: "Chapter 2: Genetics Basics",
      date: "Nov 12, 2024",
    },
    {
      id: 3,
      title: "Natural Selection",
      chapter: "Chapter 3: Evolution Theory",
      date: "Nov 10, 2024",
    },
  ];

  const notes = [
    {
      id: 1,
      content: "Remember to review mitosis stages for the exam",
      date: "Nov 15, 2024",
    },
    {
      id: 2,
      content: "Key concept: Mendel's laws of inheritance",
      date: "Nov 12, 2024",
    },
  ];

  const highlights = [
    {
      id: 1,
      text: "Photosynthesis is the process by which plants convert light energy into chemical energy",
      color: "yellow",
      date: "Nov 14, 2024",
    },
    {
      id: 2,
      text: "Darwin's theory of evolution by natural selection",
      color: "green",
      date: "Nov 11, 2024",
    },
    {
      id: 3,
      text: "The double helix structure of DNA",
      color: "blue",
      date: "Nov 9, 2024",
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <StudentHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        studentData={studentData}
      />

      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <StudentSidebar
            searchQuery={searchQuery}
            books={books}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            bookmarks={bookmarks}
            notes={notes}
            highlights={highlights}
            fontSize={fontSize}
            setFontSize={setFontSize}
            textToSpeech={textToSpeech}
            setTextToSpeech={setTextToSpeech}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
          />
        )}

        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>

      <StudentFooter />
    </div>
  );
}

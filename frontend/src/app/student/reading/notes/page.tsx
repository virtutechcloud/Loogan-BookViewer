"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, StickyNote, Edit2, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NoteForm } from "@/components/student/NoteForm";

interface Note {
  id: string;
  title: string;
  content: string;
  page: number;
  section: string;
  createdAt: Date;
  lastEdited: Date;
}

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    // Sample data - replace with actual data from your backend
    {
      id: "1",
      title: "Key Concept: Quantum Mechanics",
      content:
        "The fundamental principles of quantum mechanics include wave-particle duality and the uncertainty principle...",
      page: 42,
      section: "Chapter 3, Section 2",
      createdAt: new Date("2024-03-15"),
      lastEdited: new Date("2024-03-16"),
    },
    // Add more sample notes as needed
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = (
    data: Omit<Note, "id" | "createdAt" | "lastEdited">
  ) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      lastEdited: new Date(),
    };
    setNotes([...notes, newNote]);
    setIsAddDialogOpen(false);
  };

  const handleEditNote = (
    data: Omit<Note, "id" | "createdAt" | "lastEdited">
  ) => {
    if (!editingNote) return;
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? { ...note, ...data, lastEdited: new Date() }
        : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          <p className="text-muted-foreground">
            Review, edit, or jump to any of your saved notes.
          </p>
        </div>

        {/* Search and Add Note */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
              </DialogHeader>
              <NoteForm
                onSubmit={handleAddNote}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes List */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {note.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingNote(note)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <StickyNote className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary">Page {note.page}</Badge>
                      <span className="text-muted-foreground">
                        {note.section}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Created {note.createdAt.toLocaleDateString()}</span>
                      <span>
                        Last edited {note.lastEdited.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Edit Note Dialog */}
      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          {editingNote && (
            <NoteForm
              initialData={editingNote}
              onSubmit={handleEditNote}
              onCancel={() => setEditingNote(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

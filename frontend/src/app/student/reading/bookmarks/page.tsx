"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Bookmark, Edit2, Trash2, Plus } from "lucide-react";
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

interface Bookmark {
  id: string;
  name: string;
  page: number;
  section: string;
  createdAt: Date;
  preview: string;
}

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    // Sample data - replace with actual data from your backend
    {
      id: "1",
      name: "Assignment 1",
      page: 42,
      section: "Chapter 3, Section 2",
      createdAt: new Date("2024-03-15"),
      preview: "The concept of quantum mechanics...",
    },
    // Add more sample bookmarks as needed
  ]);

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Bookmarks</h1>
          <p className="text-muted-foreground">
            Jump to any saved page or section with one click.
          </p>
        </div>

        {/* Search and Add Bookmark */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Bookmark
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bookmark</DialogTitle>
              </DialogHeader>
              {/* Add bookmark form will go here */}
            </DialogContent>
          </Dialog>
        </div>

        {/* Bookmarks List */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {bookmark.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary">Page {bookmark.page}</Badge>
                      <span className="text-muted-foreground">
                        {bookmark.section}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {bookmark.preview}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {bookmark.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

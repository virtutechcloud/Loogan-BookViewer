"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  Video,
  Link2,
  Upload,
  MoreHorizontal,
  Check,
  X,
  Archive,
  Trash2,
  Plus,
  FolderPlus,
  ChevronDown,
  Search,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const mockMaterials = [
  {
    id: 1,
    title: "Intro to Algorithms",
    type: "book",
    courses: ["CS101", "CS201"],
    date: "2024-05-01",
    size: "2.1 MB",
    status: "published",
  },
  {
    id: 2,
    title: "Lecture 1 Slides",
    type: "pdf",
    courses: ["CS101"],
    date: "2024-04-20",
    size: "1.2 MB",
    status: "draft",
  },
  {
    id: 3,
    title: "Sorting Algorithms Video",
    type: "video",
    courses: ["CS201"],
    date: "2024-05-10",
    size: "18:32",
    status: "published",
  },
  {
    id: 4,
    title: "External Reading: Big O Notation",
    type: "link",
    courses: ["CS101", "CS201"],
    date: "2024-05-12",
    size: "-",
    status: "restricted",
  },
];

const typeIcon = {
  book: <BookOpen className="h-4 w-4 text-primary" />,
  pdf: <FileText className="h-4 w-4 text-red-500" />,
  video: <Video className="h-4 w-4 text-blue-500" />,
  link: <Link2 className="h-4 w-4 text-green-500" />,
};

export default function AllMaterialsPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtering logic (simplified for demo)
  const filteredMaterials = mockMaterials.filter((m) => {
    return (
      (typeFilter === "all" || m.type === typeFilter) &&
      (statusFilter === "all" || m.status === statusFilter) &&
      (courseFilter === "all" || m.courses.includes(courseFilter)) &&
      (search === "" ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.courses.some((c) => c.toLowerCase().includes(search.toLowerCase())))
    );
  });

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? filteredMaterials.map((m) => m.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected(
      checked ? [...selected, id] : selected.filter((sid) => sid !== id)
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">All Materials</h1>
        <p className="text-muted-foreground">
          Manage and organize all your course materials.
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex-1 flex gap-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="link">Link</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="CS101">CS101</SelectItem>
              <SelectItem value="CS201">CS201</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Material
          </Button>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Link/Resource
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selected.length} material(s) selected
              </p>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Bulk Actions
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      Publish Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <X className="mr-2 h-4 w-4" />
                      Unpublish Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" onClick={() => setSelected([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Materials Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selected.length === filteredMaterials.length &&
                      filteredMaterials.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Course(s)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size/Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(m.id)}
                      onCheckedChange={(checked) =>
                        handleSelect(m.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{m.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {typeIcon[m.type as keyof typeof typeIcon]}
                      <span className="capitalize">{m.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {m.courses.map((c) => (
                        <Badge key={c} variant="outline">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>{m.size}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        m.status === "published"
                          ? "default"
                          : m.status === "draft"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>
                          Assign to Course/Module
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

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
  Grid,
  List,
  Eye,
  Download,
  Edit,
  Folder,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    type: "book",
    courses: ["CS101", "CS201"],
    date: "2024-05-01",
    size: "2.1 MB",
    status: "published",
    folder: "Algorithms",
  },
  {
    id: 2,
    title: "Data Structures Lecture Slides",
    type: "pdf",
    courses: ["CS101"],
    date: "2024-04-20",
    size: "1.2 MB",
    status: "draft",
    folder: "Data Structures",
  },
  {
    id: 3,
    title: "Sorting Algorithms Tutorial",
    type: "video",
    courses: ["CS201"],
    date: "2024-05-10",
    size: "18:32",
    status: "published",
    folder: "Algorithms",
  },
  {
    id: 4,
    title: "Big O Notation Guide",
    type: "link",
    courses: ["CS101", "CS201"],
    date: "2024-05-12",
    size: "-",
    status: "restricted",
    folder: "Algorithms",
  },
];

// Mock data for folders
const mockFolders = [
  {
    id: "algorithms",
    name: "Algorithms",
    itemCount: 3,
  },
  {
    id: "data-structures",
    name: "Data Structures",
    itemCount: 1,
  },
];

const typeIcon = {
  book: <BookOpen className="h-4 w-4 text-primary" />,
  pdf: <FileText className="h-4 w-4 text-red-500" />,
  video: <Video className="h-4 w-4 text-blue-500" />,
  link: <Link2 className="h-4 w-4 text-green-500" />,
};

export default function MaterialLibraryPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Filtering logic
  const filteredMaterials = mockMaterials.filter((m) => {
    return (
      (typeFilter === "all" || m.type === typeFilter) &&
      (statusFilter === "all" || m.status === statusFilter) &&
      (courseFilter === "all" || m.courses.includes(courseFilter)) &&
      (selectedFolder === null || m.folder === selectedFolder) &&
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
        <h1 className="text-3xl font-bold">Material Library</h1>
        <p className="text-muted-foreground">
          Browse, organize, and manage all your course materials.
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
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Material
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

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant={selectedFolder === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(null)}
              >
                <Folder className="mr-2 h-4 w-4" />
                All Materials
              </Button>
              {mockFolders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={
                    selectedFolder === folder.name ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  {folder.name}
                  <Badge variant="secondary" className="ml-auto">
                    {folder.itemCount}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid/List View */}
        <div className="md:col-span-3">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((m) => (
                <Card key={m.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {typeIcon[m.type as keyof typeof typeIcon]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            {m.title}
                          </h3>
                          <Checkbox
                            checked={selected.includes(m.id)}
                            onCheckedChange={(checked) =>
                              handleSelect(m.id, checked as boolean)
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {m.date}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {m.courses.map((c) => (
                            <Badge
                              key={c}
                              variant="outline"
                              className="text-xs"
                            >
                              {c}
                            </Badge>
                          ))}
                        </div>
                        <Badge
                          variant={
                            m.status === "published"
                              ? "default"
                              : m.status === "draft"
                              ? "outline"
                              : "secondary"
                          }
                          className="mt-2"
                        >
                          {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-1 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
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
                            {m.status.charAt(0).toUpperCase() +
                              m.status.slice(1)}
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
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
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Upload,
  FileText,
  Video,
  Image,
  Link2,
  X,
  Check,
  AlertCircle,
  Calendar,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for courses and modules
const mockCourses = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    modules: [
      { id: "m1", title: "Programming Basics" },
      { id: "m2", title: "Data Structures" },
    ],
  },
  {
    id: "cs201",
    title: "Advanced Programming",
    modules: [
      { id: "m3", title: "Algorithms" },
      { id: "m4", title: "Software Design" },
    ],
  },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["pdf", "video", "image", "link"]),
  visibility: z.enum(["published", "draft", "restricted"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  courses: z.array(z.string()).min(1, "Select at least one course"),
  modules: z.array(z.string()).optional(),
  tags: z.string().optional(),
});

export default function UploadMaterialPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
      visibility: "draft",
      courses: [],
      modules: [],
      tags: "",
    },
  });

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulate upload progress
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    simulateUpload();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Upload Material to Courses</h1>
        <p className="text-muted-foreground">
          Add new materials and assign them to one or more courses.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Drag and drop files or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, video, images, and other file types
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.includes("pdf") ? (
                          <FileText className="h-4 w-4" />
                        ) : file.type.includes("video") ? (
                          <Video className="h-4 w-4" />
                        ) : file.type.includes("image") ? (
                          <Image className="h-4 w-4" />
                        ) : (
                          <Link2 className="h-4 w-4" />
                        )}
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Material Details */}
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
              <CardDescription>
                Provide information about the material
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter material title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter material description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="link">External Link</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="published">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Published
                            </div>
                          </SelectItem>
                          <SelectItem value="draft">
                            <div className="flex items-center gap-2">
                              <EyeOff className="h-4 w-4" />
                              Draft
                            </div>
                          </SelectItem>
                          <SelectItem value="restricted">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Restricted
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Until</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags (comma-separated)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add tags to help organize and find materials
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Course Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Course Assignment</CardTitle>
              <CardDescription>
                Select courses and modules for this material
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="courses"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Courses</FormLabel>
                      <FormDescription>
                        Select one or more courses
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockCourses.map((course) => (
                        <FormField
                          key={course.id}
                          control={form.control}
                          name="courses"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={course.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(course.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            course.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== course.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {course.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modules"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Modules (Optional)</FormLabel>
                      <FormDescription>
                        Select specific modules within courses
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockCourses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <h4 className="text-sm font-medium">
                            {course.title}
                          </h4>
                          {course.modules.map((module) => (
                            <FormField
                              key={module.id}
                              control={form.control}
                              name="modules"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={module.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          module.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                module.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== module.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {module.title}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Preview Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Material Preview</DialogTitle>
                <DialogDescription>
                  Review the material details before uploading
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Files</h4>
                  <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Details</h4>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Title:</span>{" "}
                      {form.getValues("title")}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      {form.getValues("type")}
                    </p>
                    <p>
                      <span className="font-medium">Visibility:</span>{" "}
                      {form.getValues("visibility")}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Assigned Courses</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form
                      .getValues("courses")
                      ?.map((courseId) => {
                        const course = mockCourses.find(
                          (c) => c.id === courseId
                        );
                        return course ? (
                          <Badge key={courseId} variant="secondary">
                            {course.title}
                          </Badge>
                        ) : null;
                      })
                      .filter(Boolean)}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Material"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

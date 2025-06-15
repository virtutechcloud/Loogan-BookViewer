"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookmarkFormProps {
  initialData?: {
    name: string;
    page: number;
    section: string;
    preview: string;
  };
  onSubmit: (data: {
    name: string;
    page: number;
    section: string;
    preview: string;
  }) => void;
  onCancel: () => void;
}

export function BookmarkForm({
  initialData,
  onSubmit,
  onCancel,
}: BookmarkFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    page: initialData?.page || 1,
    section: initialData?.section || "",
    preview: initialData?.preview || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Bookmark Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Assignment 1, Midterm Review"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="page">Page Number</Label>
        <Input
          id="page"
          type="number"
          value={formData.page}
          onChange={(e) =>
            setFormData({ ...formData, page: parseInt(e.target.value) })
          }
          min="1"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="section">Section Reference</Label>
        <Input
          id="section"
          value={formData.section}
          onChange={(e) =>
            setFormData({ ...formData, section: e.target.value })
          }
          placeholder="e.g., Chapter 3, Section 2"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preview">Preview/Context</Label>
        <Textarea
          id="preview"
          value={formData.preview}
          onChange={(e) =>
            setFormData({ ...formData, preview: e.target.value })
          }
          placeholder="Add a brief context or preview of the bookmarked content"
          className="h-24"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Bookmark" : "Add Bookmark"}
        </Button>
      </div>
    </form>
  );
}

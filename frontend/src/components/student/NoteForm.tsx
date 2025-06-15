"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    page: number;
    section: string;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    page: number;
    section: string;
  }) => void;
  onCancel: () => void;
}

export function NoteForm({ initialData, onSubmit, onCancel }: NoteFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    page: initialData?.page || 1,
    section: initialData?.section || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Note Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Key Concept, Question for Class"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Note Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Write your note here..."
          className="h-32"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Note" : "Add Note"}
        </Button>
      </div>
    </form>
  );
}

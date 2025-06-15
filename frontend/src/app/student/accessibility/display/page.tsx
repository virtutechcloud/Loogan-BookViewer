"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "high-contrast", label: "High Contrast" },
];

const BACKGROUND_COLORS = [
  { value: "white", label: "White" },
  { value: "cream", label: "Cream" },
  { value: "sepia", label: "Sepia" },
  { value: "light-gray", label: "Light Gray" },
];

const TEXT_COLORS = [
  { value: "black", label: "Black" },
  { value: "dark-gray", label: "Dark Gray" },
  { value: "navy", label: "Navy" },
  { value: "brown", label: "Brown" },
];

const HIGHLIGHT_COLORS = [
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "pink", label: "Pink" },
];

const LAYOUTS = [
  { value: "single", label: "Single Column" },
  { value: "double", label: "Double Column" },
  { value: "wide", label: "Wide" },
];

const DEFAULT_SETTINGS = {
  theme: "light",
  backgroundColor: "white",
  textColor: "black",
  highlightColor: "yellow",
  lineSpacing: 1.5,
  paragraphSpacing: 1.2,
  layout: "single",
  margins: 1,
};

export default function DisplaySettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleThemeChange = (value: string) => {
    setSettings({ ...settings, theme: value });
  };

  const handleBackgroundColorChange = (value: string) => {
    setSettings({ ...settings, backgroundColor: value });
  };

  const handleTextColorChange = (value: string) => {
    setSettings({ ...settings, textColor: value });
  };

  const handleHighlightColorChange = (value: string) => {
    setSettings({ ...settings, highlightColor: value });
  };

  const handleLineSpacingChange = (value: number[]) => {
    setSettings({ ...settings, lineSpacing: value[0] });
  };

  const handleParagraphSpacingChange = (value: number[]) => {
    setSettings({ ...settings, paragraphSpacing: value[0] });
  };

  const handleLayoutChange = (value: string) => {
    setSettings({ ...settings, layout: value });
  };

  const handleMarginsChange = (value: number[]) => {
    setSettings({ ...settings, margins: value[0] });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Display Settings</h1>
          <p className="text-muted-foreground">
            Adjust your reading experience for comfort and accessibility.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-6">
          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={settings.theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Background Color */}
          <Card>
            <CardHeader>
              <CardTitle>Background Color</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.backgroundColor}
                onValueChange={handleBackgroundColorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select background color" />
                </SelectTrigger>
                <SelectContent>
                  {BACKGROUND_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Text Color */}
          <Card>
            <CardHeader>
              <CardTitle>Text Color</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.textColor}
                onValueChange={handleTextColorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select text color" />
                </SelectTrigger>
                <SelectContent>
                  {TEXT_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Highlight Color */}
          <Card>
            <CardHeader>
              <CardTitle>Highlight Color</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.highlightColor}
                onValueChange={handleHighlightColorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select highlight color" />
                </SelectTrigger>
                <SelectContent>
                  {HIGHLIGHT_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Line Spacing */}
          <Card>
            <CardHeader>
              <CardTitle>Line Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Spacing: {settings.lineSpacing}x</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <Slider
                  value={[settings.lineSpacing]}
                  onValueChange={handleLineSpacingChange}
                  min={1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Paragraph Spacing */}
          <Card>
            <CardHeader>
              <CardTitle>Paragraph Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Spacing: {settings.paragraphSpacing}x</Label>
                </div>
                <Slider
                  value={[settings.paragraphSpacing]}
                  onValueChange={handleParagraphSpacingChange}
                  min={1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Layout Options */}
          <Card>
            <CardHeader>
              <CardTitle>Page Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Select
                  value={settings.layout}
                  onValueChange={handleLayoutChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    {LAYOUTS.map((layout) => (
                      <SelectItem key={layout.value} value={layout.value}>
                        {layout.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-4">
                  <Label>Page Margins: {settings.margins}rem</Label>
                  <Slider
                    value={[settings.margins]}
                    onValueChange={handleMarginsChange}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: settings.backgroundColor,
                  color: settings.textColor,
                  lineHeight: settings.lineSpacing,
                }}
              >
                <p
                  className="mb-4"
                  style={{ marginBottom: `${settings.paragraphSpacing}em` }}
                >
                  This is a sample paragraph to demonstrate how your text will
                  look with the current settings. The line spacing and paragraph
                  spacing are applied here.
                </p>
                <p style={{ marginBottom: `${settings.paragraphSpacing}em` }}>
                  This is another paragraph to show the spacing between
                  paragraphs. You can see how the text color and background
                  color work together.
                </p>
                <p>
                  This text is{" "}
                  <span
                    style={{
                      backgroundColor: settings.highlightColor,
                    }}
                  >
                    highlighted
                  </span>{" "}
                  to show the highlight color you selected.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

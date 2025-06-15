"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RotateCcw } from "lucide-react";

const FONT_FAMILIES = [
  { value: "inter", label: "Inter", className: "font-inter" },
  { value: "roboto", label: "Roboto", className: "font-roboto" },
  { value: "open-sans", label: "Open Sans", className: "font-open-sans" },
  { value: "noto-sans", label: "Noto Sans", className: "font-noto-sans" },
  {
    value: "source-sans-pro",
    label: "Source Sans Pro",
    className: "font-source-sans-pro",
  },
];

const FONT_WEIGHTS = [
  { value: "normal", label: "Regular" },
  { value: "medium", label: "Medium" },
  { value: "semibold", label: "Semibold" },
  { value: "bold", label: "Bold" },
];

const DEFAULT_SETTINGS = {
  fontSize: 16,
  fontFamily: "inter",
  fontWeight: "normal",
};

export default function FontSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleFontSizeChange = (value: number[]) => {
    setSettings({ ...settings, fontSize: value[0] });
  };

  const handleFontFamilyChange = (value: string) => {
    setSettings({ ...settings, fontFamily: value });
  };

  const handleFontWeightChange = (value: string) => {
    setSettings({ ...settings, fontWeight: value });
  };

  const getFontFamilyClass = () => {
    return (
      FONT_FAMILIES.find((font) => font.value === settings.fontFamily)
        ?.className || ""
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Font Settings</h1>
          <p className="text-muted-foreground">
            Customize the font for a better reading experience.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-6">
          {/* Font Size */}
          <Card>
            <CardHeader>
              <CardTitle>Font Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Size: {settings.fontSize}px</Label>
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
                  value={[settings.fontSize]}
                  onValueChange={handleFontSizeChange}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Font Family */}
          <Card>
            <CardHeader>
              <CardTitle>Font Family</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.fontFamily}
                onValueChange={handleFontFamilyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILIES.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span className={font.className}>{font.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Font Weight */}
          <Card>
            <CardHeader>
              <CardTitle>Font Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.fontWeight}
                onValueChange={handleFontWeightChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font weight" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_WEIGHTS.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      <span style={{ fontWeight: weight.value }}>
                        {weight.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`${getFontFamilyClass()}`}
                style={{
                  fontSize: `${settings.fontSize}px`,
                  fontWeight: settings.fontWeight,
                }}
              >
                <p className="mb-4">
                  The quick brown fox jumps over the lazy dog. This sample text
                  demonstrates how your chosen font settings will appear in the
                  book viewer.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
